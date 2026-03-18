export type ActivityType = 'quiz' | 'match' | 'word_soup' | 'fill_blank' | 'drag_drop';

export interface Activity {
  id: number;
  topic_id: number;
  type: ActivityType;
  question?: string;
  content: string;
  order_in_topic?: number;
  created_at?: string;
  updated_at?: string;
}

export interface NewActivity { // TODO: IS THIS USEFUL?
  topic_id: number;
  type: ActivityType;
  question?: string;
  content: string;
  order_in_topic?: number;
}

export interface ActivityManagerModalProps {
  show: boolean;
  onClose: () => void;
  topicId: number;
  topicTitle: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface DragItem {
  id: string;
  text: string;
  order: number;
}

export interface WordSoupRow {
  id: string;
  word: string;
  clue: string;
}

export interface QuizActivityProps {
  activity: Activity
}

export interface TopicActivitiesRendererProps {
  moduleId: number
  topicId: number
  topicTitle: string
  onBack: () => void
  onPassed?: () => void
}

export type ActivityResult = {
  earned: number
  total: number
}

export type OnActivityResult = (earned: number, total: number) => void;

export interface ActivityComponentProps {
  activity: Activity;
  onResult?: OnActivityResult;
}

export interface ActivityEditorModalProps {
  show: boolean
  activity: Activity
  onClose: () => void
  onSave: (activity: Activity) => void
}