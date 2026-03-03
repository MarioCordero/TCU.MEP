import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Topic } from "../../../types/cms"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { 
  useCreateBlockNote,
  FormattingToolbar,
  FormattingToolbarController,
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  NestBlockButton,
  UnnestBlockButton,
  TextAlignButton,
  useEditorSelectionChange,
  useBlockNoteEditor
} from "@blocknote/react";
import * as LucideIcons from "lucide-react"
import { API } from "../../../lib/api"
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { AlertModal } from "../../ui/modal";
import { extractFileUrls } from "../../../lib/utils";
import { MathBlock } from "../MathBlock";
import { 
  BlockNoteSchema, 
  defaultBlockSpecs, 
  defaultStyleSpecs,
  createStyleSpec,
} from "@blocknote/core";
import { getDefaultReactSlashMenuItems, SuggestionMenuController } from "@blocknote/react";
import { MathBlockProvider } from "../MathBlockContext"
import { CMSTopicEditorModalProps } from "../../../types/cms";
import SuccessModal from "../../common/modals/SuccessModal"

function TipTapMarkButton({ mark, label }: { mark: string; label: string }) {
  const editor = useBlockNoteEditor();
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEditorSelectionChange(() => {
    setIsActive((editor as any)._tiptapEditor?.isActive(mark) ?? false);
  }, editor);

  return (
    <button
      data-test={`${mark}-button`}
      className={[
        "bn-button",
        isActive ? "bn-button-selected" : "",
      ].join(" ")}
      style={{
        cursor: "pointer",
        paddingInline: "8px",
        backgroundColor: isActive
          ? undefined
          : isHovered ? "#e9ecef" : "transparent",
        borderRadius: "4px",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => {
        e.preventDefault();
        (editor as any)._tiptapEditor?.chain().focus().toggleMark(mark).run();
      }}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
    >
      {mark === "superscript"
        ? <span>A<sup style={{ fontSize: "0.65em", lineHeight: 0 }}>2</sup></span>
        : <span>A<sub style={{ fontSize: "0.65em", lineHeight: 0 }}>2</sub></span>
      }
    </button>
  );
}

const SuperscriptStyle = createStyleSpec(
  {
    type: "superscript",
    propSchema: "boolean",
  },
  {
    render: () => {
      const dom = document.createElement("sup");
      return { dom, contentDOM: dom };
    },
  }
);

const SubscriptStyle = createStyleSpec(
  {
    type: "subscript",
    propSchema: "boolean",
  },
  {
    render: () => {
      const dom = document.createElement("sub");
      return { dom, contentDOM: dom };
    },
  }
);

export default function TopicEditorModal({ show, topic, onClose, onSave }: CMSTopicEditorModalProps) {
  const [editedTopic, setEditedTopic] = useState<Topic | null>(topic)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [savedTitle, setSavedTitle] = useState("")
  const pendingImagesRef = useRef<Map<string, File>>(new Map());
  const [pendingImages, setPendingImages] = useState<Map<string, File>>(new Map());
  const [errorAlert, setErrorAlert] = useState<{ show: boolean, msg: string }>({ show: false, msg: "" });


  const schema = useMemo(() => {
    const mathBlockSpec = typeof MathBlock === "function"
      ? (MathBlock as any)()
      : MathBlock;

    return BlockNoteSchema.create({
      blockSpecs: { 
        ...defaultBlockSpecs, 
        math: mathBlockSpec as any 
      },
      styleSpecs: {
        ...defaultStyleSpecs,
        superscript: SuperscriptStyle,
        subscript: SubscriptStyle,
      },
    });
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const tempUrl = URL.createObjectURL(file);
    pendingImagesRef.current.set(tempUrl, file);
    setPendingImages(new Map(pendingImagesRef.current));
    return tempUrl;
  }, []);

  const editor = useCreateBlockNote({
    schema,
    uploadFile
  });

  const insertMathItem = useMemo(() => ({
    title: "Fórmula Matemática",
    subtext: "Agrega una ecuación visualmente",
    group: "Matemáticas",
    icon: <LucideIcons.Sigma className="h-4 w-4" />,
    aliases: ["math", "latex", "formula", "ecuacion"],
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.insertBlocks([{ type: "math" }], currentBlock, "after");
    },
  }), [editor]);

  useEffect(() => {
    if (!topic || !show) return;
    setEditedTopic(topic);
    const loadContent = async () => {
      const savedDraft = localStorage.getItem(`draft_topic_${topic.id}`);
      try {
        const content = savedDraft ? JSON.parse(savedDraft) : JSON.parse(topic.content);
        editor.replaceBlocks(editor.document, content);
      } catch (e) {
        const blocks = await editor.tryParseHTMLToBlocks(topic.content);
        editor.replaceBlocks(editor.document, blocks);
      }
    };
    loadContent();
  }, [topic, show, editor]);

  const handleEditorChange = useCallback(() => {
    if (topic?.id) {
      localStorage.setItem(`draft_topic_${topic.id}`, JSON.stringify(editor.document));
    }
  }, [editor, topic]);

  const handleSave = async () => {
    if (!editedTopic || !editedTopic.id) {
      return
    }
    setIsSaving(true)

    try {
      // Delete files that are no longer used
      let oldUrls: string[] = [];
      try {
        const oldBlocks = JSON.parse(topic?.content || "[]");
        oldUrls = extractFileUrls(oldBlocks);
      } catch (e) {
        console.warn("No se pudo analizar el contenido anterior para limpieza de archivos.");
      }
      const currentBlocks = editor.document;
      const newUrls = extractFileUrls(currentBlocks);
      const filesToDelete = oldUrls.filter(url => {
        if (url.startsWith("blob:")) return false;
        return !newUrls.includes(url);
      });
      if (filesToDelete.length > 0) {
        await Promise.all(filesToDelete.map(url => {
            const filename = url.split('/').pop();
            if (filename) return API.DeleteFile(filename);
            return Promise.resolve();
        }));
      }

      // Save files and update content
      const currentBlocksCopy = JSON.parse(JSON.stringify(editor.document));
      let hasMissingFiles = false;

      for (const block of currentBlocksCopy) {
        if ((block.type === "image" || block.type === "video" || block.type === "file") && block.props?.url?.startsWith("blob:")) {
          const file = pendingImagesRef.current.get(block.props.url);
          if (file) {
            const response = await API.UploadImage(file);
            editor.updateBlock(block.id, { props: { url: response.url } });
            block.props.url = response.url;
          } else {
            hasMissingFiles = true;
          }
        }
      }

      if (hasMissingFiles) {
        setErrorAlert({
          show: true,
          msg: "⚠️ ATENCIÓN: Al recuperar el borrador, se perdieron las referencias a los archivos locales.\n\nPor seguridad del navegador, los archivos no se guardan en el historial.\n\nPor favor, borra los bloques de archivo rotos y vuelve a arrastrar los archivos."
        });
        setIsSaving(false);
        return;
      }

      const finalJson = JSON.stringify(currentBlocksCopy);
      await API.UpdateTopic(editedTopic.id, {
        ...editedTopic,
        content: finalJson
      });
      
      localStorage.removeItem(`draft_topic_${editedTopic.id}`);
      setSavedTitle(editedTopic.title)
      onSave({ ...editedTopic, content: finalJson });
      setShowSuccess(true)
    } catch (error) {
      // TODO: USE MODALS INSTEAD OF ALERTS
      setErrorAlert({
        show: true,
        msg: "Error crítico al guardar: " + String(error)
      });
    } finally {
      setIsSaving(false);
    }
  }

  const handleSuccessClose = () => {
    console.log("🔵 handleSuccessClose called")
    setShowSuccess(false)
    onClose()
  }

  if (!show || !editedTopic) return null

  return (
    <MathBlockProvider>

      <AlertModal
        isOpen={errorAlert.show}
        onClose={() => setErrorAlert({ show: false, msg: "" })}
        title="Atención requerida"
        message={<span className="whitespace-pre-line">{errorAlert.msg}</span>}
        variant="destructive"
      />

      <SuccessModal
        show={showSuccess}
        onClose={handleSuccessClose}
        title="¡Tópico Guardado!"
        message={`El tópico "${savedTitle}" fue guardado correctamente.`}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 transition-all">
        <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col h-[92vh] border border-slate-200">

          <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <LucideIcons.FileEdit className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Editando Tópico</h2>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-lg leading-none">
                    {editedTopic.title || "Sin título"}
                  </span>
                  {localStorage.getItem(`draft_topic_${topic?.id}`) && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 font-medium animate-pulse flex items-center gap-1">
                      <LucideIcons.Save className="h-3 w-3" /> Borrador recuperado
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <LucideIcons.X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-100/50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col min-h-[70vh]">
              <div className="px-12 pt-12 pb-4">
                <Input
                  value={editedTopic.title}
                  onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
                  className="text-4xl font-extrabold text-slate-800 border-none shadow-none focus-visible:ring-0 p-0 h-auto placeholder:text-slate-300"
                  placeholder="Escribe el título aquí..."
                />
                <div className="h-1 w-20 bg-indigo-500 mt-4 rounded-full opacity-20"></div>
              </div>

              {/*BlockNote HERE THE CODE DOESN'T WORK PROPPERLY*/}
              <div className="flex-1 px-4 pb-12 cursor-text">
                <BlockNoteView
                  editor={editor}
                  theme="light"
                  onChange={handleEditorChange}
                  className="min-h-[500px]"
                  slashMenu={false} // Default menu disabled
                  formattingToolbar={false} // Default toolbar disabled
                >
                  {/* Custom toolbar with chemistry buttons */}
                  <FormattingToolbarController
                    formattingToolbar={() => (
                      <FormattingToolbar>
                        <BlockTypeSelect key="blockTypeSelect" />
                        <FileCaptionButton key="fileCaptionButton" />
                        <FileReplaceButton key="fileReplaceButton" />
                        <BasicTextStyleButton basicTextStyle="bold" key="boldStyleButton" />
                        <BasicTextStyleButton basicTextStyle="italic" key="italicStyleButton" />
                        <BasicTextStyleButton basicTextStyle="underline" key="underlineStyleButton" />
                        <BasicTextStyleButton basicTextStyle="strike" key="strikeStyleButton" />

                        {/* ✅ Chemistry buttons */}
                        <TipTapMarkButton key="superscript" mark="superscript" label="Superíndice" />
                        <TipTapMarkButton key="subscript" mark="subscript" label="Subíndice" />

                        <TextAlignButton textAlignment="left" key="textAlignLeftButton" />
                        <TextAlignButton textAlignment="center" key="textAlignCenterButton" />
                        <TextAlignButton textAlignment="right" key="textAlignRightButton" />
                        <ColorStyleButton key="colorStyleButton" />
                        <NestBlockButton key="nestBlockButton" />
                        <UnnestBlockButton key="unnestBlockButton" />
                        <CreateLinkButton key="createLinkButton" />
                      </FormattingToolbar>
                    )}
                  />

                  <SuggestionMenuController
                    triggerCharacter="/"
                    getItems={async (query) => {
                      const defaultItems = getDefaultReactSlashMenuItems(editor);
                      const allItems = [...defaultItems, insertMathItem];
                      return allItems.filter(
                        (item) =>
                          item.title.toLowerCase().includes(query.toLowerCase()) ||
                          item.aliases?.some((alias) => alias.toLowerCase().includes(query.toLowerCase()))
                      );
                    }}
                  />
                </BlockNoteView>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center shrink-0 z-10">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <LucideIcons.Info className="h-3 w-3" />
              <span>Los cambios se guardan localmente mientras escribes.</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onClose} disabled={isSaving} className="text-slate-600">
                Cancelar
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[160px] shadow-lg shadow-indigo-200 transition-all active:scale-95"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LucideIcons.RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <LucideIcons.Check className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MathBlockProvider>
  )
}