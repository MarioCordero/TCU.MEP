import { useState } from 'react';
import { Modal } from '../../ui/modal';
import { Button } from '../../ui/button';
import * as LucideIcons from 'lucide-react';
import { Activity, ActivityManagerModalProps, ActivityType, QuizOption, MatchPair, DragItem, WordSoupRow } from '../../../types/activities';

// ─── Activity Type Config ─────────────────────────────────────────────────────

const ACTIVITY_TYPES: {
  type: ActivityType;
  label: string;
  icon: keyof typeof LucideIcons;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}[] = [
  {
    type: 'quiz',
    label: 'Quiz',
    icon: 'HelpCircle',
    description: 'Pregunta con opciones múltiples y una respuesta correcta.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    type: 'match',
    label: 'Relacionar',
    icon: 'GitMerge',
    description: 'Relacionar columnas entre conceptos y definiciones.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    type: 'fill_blank',
    label: 'Completar',
    icon: 'PenLine',
    description: 'Completar espacios en blanco dentro de un texto.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    type: 'drag_drop',
    label: 'Arrastrar',
    icon: 'GripVertical',
    description: 'Arrastrar y soltar elementos en el orden correcto.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    type: 'word_soup',
    label: 'Sopa de Letras',
    icon: 'Grid3x3',
    description: 'Encontrar palabras ocultas en una sopa de letras.',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
];

// ─── Sub-forms ────────────────────────────────────────────────────────────────

// --- Quiz Form ---
function QuizForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
}: {
  question: string;
  onQuestionChange: (v: string) => void;
  content: string;
  onContentChange: (v: string) => void;
}) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content);
      return {
        options: Array.isArray(p?.options) && p.options.length > 0
          ? p.options
          : [{ id: '1', text: '', isCorrect: false }, { id: '2', text: '', isCorrect: false }]
      };
    } catch {
      return { options: [{ id: '1', text: '', isCorrect: false }, { id: '2', text: '', isCorrect: false }] };
    }
  })();

  const [options, setOptions] = useState<QuizOption[]>(parsed.options);

  const update = (newOptions: QuizOption[]) => {
    setOptions(newOptions);
    onContentChange(JSON.stringify({ options: newOptions }));
  };

  const handleOptionText = (id: string, text: string) => {
    update(options.map(o => o.id === id ? { ...o, text } : o));
  };

  const handleCorrect = (id: string) => {
    update(options.map(o => ({ ...o, isCorrect: o.id === id })));
  };

  const addOption = () => {
    update([...options, { id: Date.now().toString(), text: '', isCorrect: false }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) return;
    update(options.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Pregunta</label>
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          rows={3}
          placeholder="Escribe la pregunta aquí..."
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Opciones <span className="text-slate-400 font-normal">(marca la correcta)</span>
        </label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={opt.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCorrect(opt.id)}
                className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  opt.isCorrect
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 hover:border-emerald-400'
                }`}
                title="Marcar como correcta"
              >
                {opt.isCorrect && <LucideIcons.Check className="h-3 w-3" />}
              </button>
              <span className="shrink-0 text-xs text-slate-400 w-5">{String.fromCharCode(65 + i)}.</span>
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder={`Opción ${String.fromCharCode(65 + i)}`}
                value={opt.text}
                onChange={e => handleOptionText(opt.id, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeOption(opt.id)}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors"
                disabled={options.length <= 2}
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addOption}
          className="mt-3 flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-700"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar opción
        </button>
      </div>
    </div>
  );
}

// --- Match Form ---
function MatchForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
}: {
  question: string;
  onQuestionChange: (v: string) => void;
  content: string;
  onContentChange: (v: string) => void;
}) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content);
      return {
        pairs: Array.isArray(p?.pairs) && p.pairs.length > 0
          ? p.pairs
          : [{ id: '1', left: '', right: '' }, { id: '2', left: '', right: '' }]
      };
    } catch {
      return { pairs: [{ id: '1', left: '', right: '' }, { id: '2', left: '', right: '' }] };
    }
  })();

  const [pairs, setPairs] = useState<MatchPair[]>(parsed.pairs);

  const update = (newPairs: MatchPair[]) => {
    setPairs(newPairs);
    onContentChange(JSON.stringify({ pairs: newPairs }));
  };

  const handlePair = (id: string, side: 'left' | 'right', value: string) => {
    update(pairs.map(p => p.id === id ? { ...p, [side]: value } : p));
  };

  const addPair = () => {
    update([...pairs, { id: Date.now().toString(), left: '', right: '' }]);
  };

  const removePair = (id: string) => {
    if (pairs.length <= 2) return;
    update(pairs.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          placeholder="Ej: Relaciona cada elemento con su definición"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">Columna A</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">Columna B</span>
        </div>
        <div className="space-y-2">
          {pairs.map((pair, i) => (
            <div key={pair.id} className="flex items-center gap-2">
              <span className="shrink-0 text-xs text-slate-400 w-5">{i + 1}.</span>
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Concepto"
                value={pair.left}
                onChange={e => handlePair(pair.id, 'left', e.target.value)}
              />
              <LucideIcons.ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Definición"
                value={pair.right}
                onChange={e => handlePair(pair.id, 'right', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removePair(pair.id)}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors"
                disabled={pairs.length <= 2}
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPair}
          className="mt-3 flex items-center gap-1.5 text-sm text-purple-500 hover:text-purple-700"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar par
        </button>
      </div>
    </div>
  );
}

// --- Fill Blank Form ---
function FillBlankForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
}: {
  question: string;
  onQuestionChange: (v: string) => void;
  content: string;
  onContentChange: (v: string) => void;
}) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content);
      return {
        text: typeof p?.text === 'string' ? p.text : '',
        answers: Array.isArray(p?.answers) ? p.answers : []
      };
    } catch {
      return { text: '', answers: [] };
    }
  })();

  const [text, setText] = useState(parsed.text);

  const handleTextChange = (val: string) => {
    setText(val);
    // Extract answers from {{answer}} placeholders
    const answers = [...val.matchAll(/\{\{(.+?)\}\}/g)].map(m => m[1].trim());
    onContentChange(JSON.stringify({ text: val, answers }));
  };

  // Extract detected blanks for preview
  const blanks = [...text.matchAll(/\{\{(.+?)\}\}/g)].map(m => m[1].trim());

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          placeholder="Ej: Completa el espacio en blanco"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Texto con espacios{' '}
          <span className="text-slate-400 font-normal">
            — usa <code className="bg-slate-100 px-1 rounded text-emerald-600">{`{{respuesta}}`}</code> para marcar blancos
          </span>
        </label>
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 font-mono resize-none"
          rows={5}
          placeholder={`Ej: El agua tiene fórmula {{H2O}} y es un {{líquido}} a temperatura ambiente.`}
          value={text}
          onChange={e => handleTextChange(e.target.value)}
        />
      </div>
      {blanks.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-2">
            <LucideIcons.CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
            {blanks.length} respuesta(s) detectada(s):
          </p>
          <div className="flex flex-wrap gap-2">
            {blanks.map((b, i) => (
              <span key={i} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                {i + 1}. {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Drag Drop Form ---
function DragDropForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
}: {
  question: string;
  onQuestionChange: (v: string) => void;
  content: string;
  onContentChange: (v: string) => void;
}) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content);
      return {
        items: Array.isArray(p?.items) && p.items.length > 0
          ? p.items
          : [{ id: '1', text: '', order: 1 }, { id: '2', text: '', order: 2 }]
      };
    } catch {
      return { items: [{ id: '1', text: '', order: 1 }, { id: '2', text: '', order: 2 }] };
    }
  })();

  const [items, setItems] = useState<DragItem[]>(parsed.items);

  const update = (newItems: DragItem[]) => {
    setItems(newItems);
    onContentChange(JSON.stringify({ items: newItems }));
  };

  const handleItem = (id: string, text: string) => {
    update(items.map(item => item.id === id ? { ...item, text } : item));
  };

  const addItem = () => {
    const newOrder = items.length + 1;
    update([...items, { id: Date.now().toString(), text: '', order: newOrder }]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 2) return;
    const filtered = items.filter(i => i.id !== id).map((item, index) => ({ ...item, order: index + 1 }));
    update(filtered);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Ej: Ordena los pasos del procedimiento"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Elementos en orden correcto
        </label>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg text-xs font-bold">
                {item.order}
              </div>
              <LucideIcons.GripVertical className="h-4 w-4 text-slate-300 shrink-0" />
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder={`Elemento ${item.order}`}
                value={item.text}
                onChange={e => handleItem(item.id, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors"
                disabled={items.length <= 2}
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-3 flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-700"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar elemento
        </button>
      </div>
    </div>
  );
}

// --- Word Soup Form ---
function WordSoupForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
}: {
  question: string;
  onQuestionChange: (v: string) => void;
  content: string;
  onContentChange: (v: string) => void;
}) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content);
      return {
        words: Array.isArray(p?.words) ? p.words : [],
        clues: Array.isArray(p?.clues) ? p.clues : []
      };
    } catch {
      return { words: [], clues: [] };
    }
  })();

  const [rows, setRows] = useState<WordSoupRow[]>(
    parsed.words.length > 0
      ? parsed.words.map((w: string, i: number) => ({ id: String(i + 1), word: w, clue: parsed.clues[i] || '' }))
      : [{ id: '1', word: '', clue: '' }, { id: '2', word: '', clue: '' }]
  );

  const update = (newRows: WordSoupRow[]) => {
    setRows(newRows);
    onContentChange(JSON.stringify({ 
      words: newRows.map((r: WordSoupRow) => r.word.toUpperCase()), 
      clues: newRows.map((r: WordSoupRow) => r.clue) 
    }));
  };

  const handleRow = (id: string, field: 'word' | 'clue', value: string) => {
    update(rows.map((row: WordSoupRow) => row.id === id ? { ...row, [field]: value } : row));
  };

  const addRow = () => update([...rows, { id: Date.now().toString(), word: '', clue: '' }]);
  
  const removeRow = (id: string) => { 
    if (rows.length > 2) update(rows.filter((r: WordSoupRow) => r.id !== id)); 
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          placeholder="Ej: Encuentra las palabras relacionadas con los elementos químicos"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 mb-2 px-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Palabra</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pista (opcional)</span>
        </div>
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div key={row.id} className="flex items-center gap-2">
              <span className="shrink-0 text-xs text-slate-400 w-5">{i + 1}.</span>
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 uppercase font-mono"
                placeholder="PALABRA"
                value={row.word}
                onChange={e => handleRow(row.id, 'word', e.target.value.toUpperCase())}
              />
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Ej: Símbolo del Oro"
                value={row.clue}
                onChange={e => handleRow(row.id, 'clue', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors"
                disabled={rows.length <= 2}
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-3 flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-700"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar palabra
        </button>
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function ActivityManagerModal({
  show,
  onClose,
  topicId,
  topicTitle,
}: ActivityManagerModalProps) {
  const [step, setStep] = useState<'select' | 'create'>('select');
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [question, setQuestion] = useState('');
  const [content, setContent] = useState('{}');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectType = (type: ActivityType) => {
    setSelectedType(type);
    setQuestion('');
    setContent('{}');
    setError(null);
    setStep('create');
  };

  const handleBack = () => {
    setStep('select');
    setSelectedType(null);
    setError(null);
  };

  const handleClose = () => {
    setStep('select');
    setSelectedType(null);
    setQuestion('');
    setContent('{}');
    setError(null);
    onClose();
  };

  const handleSave = async () => {
    if (!selectedType) return;
    if (!question.trim()) {
      setError('La pregunta o instrucción es requerida.');
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const payload: Omit<Activity, 'id' | 'created_at' | 'updated_at'> = {
        topic_id: topicId,
        type: selectedType,
        question: question.trim(),
        content,
        order_in_topic: 0,
      };

      const res = await fetch(`/api/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Error al guardar la actividad.');
      }

      handleClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error inesperado.');
    } finally {
      setIsSaving(false);
    }
  };

  const selectedConfig = ACTIVITY_TYPES.find(a => a.type === selectedType);

  const renderForm = () => {
    const formProps = {
      question,
      onQuestionChange: setQuestion,
      content,
      onContentChange: setContent,
    };
    switch (selectedType) {
      case 'quiz':       return <QuizForm {...formProps} />;
      case 'match':      return <MatchForm {...formProps} />;
      case 'fill_blank': return <FillBlankForm {...formProps} />;
      case 'drag_drop':  return <DragDropForm {...formProps} />;
      case 'word_soup':  return <WordSoupForm {...formProps} />;
      default:           return null;
    }
  };

  return (
    <Modal isOpen={show} onClose={handleClose} maxWidth="max-w-2xl">
      <div className="flex flex-col max-h-[85vh]">

        {/* ── Header ── */}
        <div className="p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            {step === 'create' && (
              <button
                onClick={handleBack}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <LucideIcons.ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <LucideIcons.Trophy className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-slate-800">
                {step === 'select' ? 'Nueva Actividad' : `Crear: ${selectedConfig?.label}`}
              </h2>
              <p className="text-xs text-slate-400 truncate">
                Tópico: <span className="font-medium text-slate-500">{topicTitle}</span>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LucideIcons.X className="h-5 w-5" />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {['select', 'create'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && <div className="w-8 h-px bg-slate-200" />}
                <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                  step === s
                    ? 'bg-purple-100 text-purple-700'
                    : i < ['select', 'create'].indexOf(step)
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {i < ['select', 'create'].indexOf(step)
                    ? <LucideIcons.Check className="h-3 w-3" />
                    : <span>{i + 1}</span>}
                  {s === 'select' ? 'Tipo' : 'Configurar'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Step 1: Select Type */}
          {step === 'select' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ACTIVITY_TYPES.map(({ type, label, icon, description, color, bgColor, borderColor }) => {
                const Icon = LucideIcons[icon] as React.ComponentType<{ className?: string }>;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleSelectType(type)}
                    className={`group text-left p-4 rounded-xl border-2 ${borderColor} ${bgColor} hover:shadow-md transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-300`}
                  >
                    <div className={`${color} mb-3`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm mb-1">{label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{description}</div>
                    <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Seleccionar <LucideIcons.ArrowRight className="h-3 w-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Create Form */}
          {step === 'create' && selectedConfig && (
            <div>
              {/* Type pill */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${selectedConfig.bgColor} ${selectedConfig.color} border ${selectedConfig.borderColor}`}>
                {(() => {
                  const Icon = LucideIcons[selectedConfig.icon] as React.ComponentType<{ className?: string }>;
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
                {selectedConfig.label}
              </div>

              {renderForm()}

              {error && (
                <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                  <LucideIcons.AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {step === 'create' && (
          <div className="p-6 border-t border-slate-100 shrink-0 flex gap-3 justify-end">
            <Button variant="ghost" onClick={handleBack} className="text-slate-600">
              Atrás
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200"
            >
              {isSaving ? (
                <>
                  <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <LucideIcons.Save className="h-4 w-4 mr-2" />
                  Guardar Actividad
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}