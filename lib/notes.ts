import { databases, DATABASE_ID, NOTES_COLLECTION_ID } from './appwrite';
import { Note } from '@/types';
import { ID, Query } from 'appwrite';

export const notesService = {
  async createNote(userId: string, title: string, content: string): Promise<Note> {
    const note = await databases.createDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        title,
        content,
        // Let Appwrite use default values for optional fields
      }
    );
    return note as unknown as Note;
  },

  async getNotes(userId: string): Promise<Note[]> {
    const response = await databases.listDocuments(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
      ]
    );
    return response.documents as unknown as Note[];
  },

  async getNote(noteId: string): Promise<Note> {
    const note = await databases.getDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      noteId
    );
    return note as unknown as Note;
  },

  async updateNote(noteId: string, data: Partial<Note>): Promise<Note> {
    // Filter out undefined values and Appwrite's internal fields
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.summary !== undefined) updateData.summary = data.summary;
    if (data.tags !== undefined && data.tags !== null) updateData.tags = data.tags;
    if (data.drawing !== undefined) updateData.drawing = data.drawing;
    if (data.pinned !== undefined) updateData.pinned = data.pinned;
    if (data.favorite !== undefined) updateData.favorite = data.favorite;

    // Make sure we have at least one field to update
    if (Object.keys(updateData).length === 0) {
      throw new Error('No data to update');
    }

    const note = await databases.updateDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      noteId,
      updateData
    );
    return note as unknown as Note;
  },

  async deleteNote(noteId: string): Promise<void> {
    await databases.deleteDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      noteId
    );
  },
};
