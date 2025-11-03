import React from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function TipTapEditor({
  content,
  onChange,
  disabled = false,
  placeholder = "",
}: {
  content: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  React.useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content || "")
    }
    // eslint-disable-next-line
  }, [content])

  if (!editor) return <div>Cargando editor...</div>

  return (
    <div className={`border rounded p-2 bg-white ${disabled ? "opacity-60 pointer-events-none" : ""}`}>
      <EditorContent editor={editor} />
      {placeholder && !content && (
        <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">{placeholder}</div>
      )}
    </div>
  )
}