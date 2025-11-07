'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { notesService } from '@/lib/notes';
import { Note } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  LogOut,
  FileText,
  Sparkles,
  Trash2,
  Edit,
  X,
  Save,
  Wand2,
  Pen,
  Pin,
  PinOff,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import SpotlightCard from '@/components/SpotlightCard';
import Squares from '@/components/Squares';
import GradientText from '@/components/GradientText';

const DrawingCanvas = dynamic(() => import('@/components/DrawingCanvas'), {
  ssr: false,
});

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeTab, setActiveTab] = useState<'notes' | 'insights'>('notes');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [summarizing, setSummarizing] = useState<string | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [drawingNote, setDrawingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'insights' && notes.length > 0) {
      loadInsights();
    }
  }, [activeTab, notes]);

  const loadNotes = async () => {
    try {
      if (user) {
        const fetchedNotes = await notesService.getNotes(user.$id);
        setNotes(fetchedNotes);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInsights = async () => {
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      const data = await response.json();
      setInsights(data.categories || []);
    } catch (error) {
      console.error('Failed to load insights:', error);
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.content || !user) return;

    try {
      const created = await notesService.createNote(
        user.$id,
        newNote.title,
        newNote.content
      );
      setNotes([created, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleUpdateNote = async () => {
    if (!editingNote || !editingNote.$id) return;

    try {
      const updated = await notesService.updateNote(editingNote.$id, {
        title: editingNote.title,
        content: editingNote.content,
      });
      setNotes(notes.map((n) => (n.$id === updated.$id ? updated : n)));
      setEditingNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await notesService.deleteNote(noteId);
      setNotes(notes.filter((n) => n.$id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleSummarize = async (note: Note) => {
    if (!note.$id) return;

    setSummarizing(note.$id);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, content: note.content }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Only update if we got valid data
      if (data.summary || data.tags) {
        const updateData: any = {};
        if (data.summary) updateData.summary = data.summary;
        if (data.tags && Array.isArray(data.tags)) updateData.tags = data.tags;

        const updated = await notesService.updateNote(note.$id, updateData);
        setNotes(notes.map((n) => (n.$id === updated.$id ? updated : n)));
      }
    } catch (error) {
      console.error('Failed to summarize note:', error);
      alert('Failed to summarize note. Please check your Gemini API key.');
    } finally {
      setSummarizing(null);
    }
  };

  const handleSaveDrawing = async (drawingData: string) => {
    if (!drawingNote || !drawingNote.$id) return;

    try {
      const updated = await notesService.updateNote(drawingNote.$id, {
        drawing: drawingData,
      });
      setNotes(notes.map((n) => (n.$id === updated.$id ? updated : n)));
      setDrawingNote(null);
    } catch (error) {
      console.error('Failed to save drawing:', error);
      alert('Failed to save drawing.');
    }
  };

  const handleTogglePin = async (note: Note) => {
    if (!note.$id) return;

    try {
      const updated = await notesService.updateNote(note.$id, {
        pinned: !note.pinned,
      });
      setNotes(notes.map((n) => (n.$id === updated.$id ? updated : n)));
    } catch (error) {
      console.error('Failed to toggle pin:', error);
      alert('Failed to pin/unpin note.');
    }
  };

  // Sort notes: pinned first, then by date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.$createdAt || 0).getTime() - new Date(a.$createdAt || 0).getTime();
  });

  // Filter notes based on search query
  const filteredNotes = sortedNotes.filter((note) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(lowerCaseQuery) ||
      note.content.toLowerCase().includes(lowerCaseQuery) ||
      (note.tags && note.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)))
    );
  });

  return (
    <div className="min-h-screen relative">
      {/* Squares Background */}
      <div className="fixed inset-0 pointer-events-none">
        <Squares
          speed={0.5}
          squareSize={40}
          direction='diagonal'
          borderColor='#8b5cf6'
          hoverFillColor='#1e1b4b'
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl border-b border-white/20 relative z-10 shadow-lg shadow-purple-500/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2.5 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <GradientText
                  colors={['#3b82f6', '#8b5cf6', '#ec4899', '#8b5cf6', '#3b82f6']}
                  animationSpeed={6}
                >
                  <h1 className="text-3xl font-bold tracking-tight">Auralis</h1>
                </GradientText>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-600 font-medium mt-0.5"
                >
                  Welcome back, <span className="text-purple-600 font-semibold">{user?.name}</span>
                </motion.p>
              </div>
            </motion.div>
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="relative group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-red-50 hover:to-orange-50 text-gray-700 hover:text-red-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200/50 hover:border-red-200"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              <span className="font-medium">Logout</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 to-orange-500/0 group-hover:from-red-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                activeTab === 'notes'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              All Notes
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                activeTab === 'insights'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Insights
            </button>
          </div>

          {activeTab === 'notes' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-4 h-4" />
              New Note
            </motion.button>
          )}
        </div>

        {/* Search Bar */}
        {activeTab === 'notes' && (
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by title, content, or tags..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'notes' ? (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.$id}
                  note={note}
                  onEdit={setEditingNote}
                  onDelete={handleDeleteNote}
                  onSummarize={handleSummarize}
                  onDraw={setDrawingNote}
                  onTogglePin={handleTogglePin}
                  isSummarizing={summarizing === note.$id}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <InsightsView notes={notes} categories={insights} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Note Modal */}
      <AnimatePresence>
        {isCreating && (
          <NoteModal
            title="Create New Note"
            note={newNote}
            onChange={setNewNote}
            onSave={handleCreateNote}
            onClose={() => setIsCreating(false)}
          />
        )}
      </AnimatePresence>

      {/* Edit Note Modal */}
      <AnimatePresence>
        {editingNote && (
          <NoteModal
            title="Edit Note"
            note={editingNote}
            onChange={setEditingNote}
            onSave={handleUpdateNote}
            onClose={() => setEditingNote(null)}
          />
        )}
      </AnimatePresence>

      {/* Drawing Canvas Modal */}
      {drawingNote && (
        <DrawingCanvas
          initialData={drawingNote.drawing}
          onSave={handleSaveDrawing}
          onClose={() => setDrawingNote(null)}
        />
      )}
    </div>
  );
}

function NoteCard({
  note,
  onEdit,
  onDelete,
  onSummarize,
  onDraw,
  onTogglePin,
  isSummarizing,
}: {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onSummarize: (note: Note) => void;
  onDraw: (note: Note) => void;
  onTogglePin: (note: Note) => void;
  isSummarizing: boolean;
}) {
  return (
    <SpotlightCard
      className="rounded-xl overflow-hidden"
      spotlightColor="rgba(139, 92, 246, 0.15)"
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition ${
          note.pinned ? 'ring-2 ring-yellow-400' : ''
        }`}
      >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{note.title}</h3>
        <button
          onClick={() => onTogglePin(note)}
          className={`p-1.5 rounded-lg transition ${
            note.pinned
              ? 'text-yellow-600 bg-yellow-50'
              : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
          }`}
          title={note.pinned ? 'Unpin note' : 'Pin note'}
        >
          {note.pinned ? <Pin className="w-4 h-4 fill-current" /> : <Pin className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>

      {note.summary && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-blue-900 mb-1">AI Summary</p>
          <p className="text-sm text-blue-700">{note.summary}</p>
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {note.drawing && (
        <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
          <div className="flex items-center gap-2">
            <Pen className="w-4 h-4 text-green-700" />
            <p className="text-xs font-medium text-green-900">
              Contains drawing/sketch
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex gap-3">
          <button
            onClick={() => onSummarize(note)}
            disabled={isSummarizing}
            className="flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm disabled:opacity-50"
          >
            <Wand2 className="w-4 h-4" />
            {isSummarizing ? 'Summarizing...' : 'Summarize'}
          </button>

          <button
            onClick={() => onDraw(note)}
            className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm"
          >
            <Pen className="w-4 h-4" />
            {note.drawing ? 'Edit Drawing' : 'Draw'}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => note.$id && onDelete(note.$id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
    </SpotlightCard>
  );
}

function NoteModal({
  title,
  note,
  onChange,
  onSave,
  onClose,
}: {
  title: string;
  note: any;
  onChange: (note: any) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={note.title}
            onChange={(e) => onChange({ ...note, title: e.target.value })}
            placeholder="Note title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <textarea
            value={note.content}
            onChange={(e) => onChange({ ...note, content: e.target.value })}
            placeholder="Write your note here..."
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Save className="w-4 h-4" />
            Save Note
          </motion.button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InsightsView({
  notes,
  categories,
}: {
  notes: Note[];
  categories: string[];
}) {
  const notesWithSummary = notes.filter((n) => n.summary);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Main Categories
        </h2>
        {categories.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-900 rounded-full font-medium"
              >
                {category}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No insights available yet. Create more notes!</p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Summarized Notes</h2>
        <div className="space-y-4">
          {notesWithSummary.length > 0 ? (
            notesWithSummary.map((note) => (
              <motion.div
                key={note.$id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="font-semibold text-gray-900 mb-1">{note.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{note.summary}</p>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">
              No summaries yet. Use the "Summarize" button on your notes!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
