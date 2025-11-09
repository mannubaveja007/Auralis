export interface Note {
  $id?: string;
  $createdAt?: string;
  $updatedAt?: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  drawing?: string; // JSON string of Excalidraw data
  pinned?: boolean; // Pin note to top
  userId: string;
  favorite?: boolean; // Mark note as favorite
}

export interface User {
  $id: string;
  email: string;
  name: string;
}

export interface AIInsight {
  noteId: string;
  title: string;
  summary: string;
  tags: string[];
  createdAt: string;
}
