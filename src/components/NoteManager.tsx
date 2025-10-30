'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, StickyNote, AlertCircle, CheckCircle, MessageSquare, Phone } from 'lucide-react';

interface Note {
  id: number;
  category: string;
  noteText: string;
  createdBy: string;
  createdDate: string;
}

interface NoteManagerProps {
  clientId: number;
  existingNotes?: string;
}

const CATEGORIES = [
  { value: 'General', icon: StickyNote, color: 'bg-gray-500/20 text-gray-400' },
  { value: 'Strengths', icon: CheckCircle, color: 'bg-green-500/20 text-green-400' },
  { value: 'Concerns', icon: AlertCircle, color: 'bg-red-500/20 text-red-400' },
  { value: 'Meeting notes', icon: MessageSquare, color: 'bg-blue-500/20 text-blue-400' },
  { value: 'Call notes', icon: Phone, color: 'bg-purple-500/20 text-purple-400' },
];

export default function NoteManager({ clientId, existingNotes }: NoteManagerProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [noteText, setNoteText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const getCategoryConfig = (category: string) => {
    return CATEGORIES.find(c => c.value === category) || CATEGORIES[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    if (editingId) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, noteText, category: selectedCategory }
          : note
      ));
      setEditingId(null);
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now(),
        category: selectedCategory,
        noteText: noteText.trim(),
        createdBy: 'Admin',
        createdDate: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    setNoteText('');
    setSelectedCategory('General');
    setShowAddForm(false);
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setNoteText(note.noteText);
    setSelectedCategory(note.category);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this note?')) return;
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setNoteText('');
    setSelectedCategory('General');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Notes</h2>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {/* Add/Edit Note Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-white font-medium mb-4">
            {editingId ? 'Edit Note' : 'Add New Note'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.value
                          ? cat.color + ' border-2 border-current'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-750'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{cat.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Note</label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                required
                placeholder="Enter your note here..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm resize-none focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm"
              >
                {editingId ? 'Update Note' : 'Save Note'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button className="px-3 py-1.5 bg-gray-700 text-white rounded-lg text-sm">
          All ({notes.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = notes.filter(n => n.category === cat.value).length;
          return (
            <button
              key={cat.value}
              className={`px-3 py-1.5 rounded-lg text-sm ${cat.color} border border-current`}
            >
              {cat.value} ({count})
            </button>
          );
        })}
      </div>

      {/* Existing Notes from Client */}
      {existingNotes && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote className="w-4 h-4 text-gray-400" />
            <h4 className="text-sm font-medium text-gray-400">Client Notes</h4>
          </div>
          <p className="text-white whitespace-pre-wrap">{existingNotes}</p>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <StickyNote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No additional notes yet</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            Add your first note
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => {
            const categoryConfig = getCategoryConfig(note.category);
            const Icon = categoryConfig.icon;
            
            return (
              <div key={note.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span className={`px-2 py-0.5 rounded text-xs ${categoryConfig.color}`}>
                      {note.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-1 hover:bg-gray-800 rounded text-blue-400 hover:text-blue-300"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-1 hover:bg-gray-800 rounded text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-white whitespace-pre-wrap mb-3">{note.noteText}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>By {note.createdBy}</span>
                  <span>•</span>
                  <span>{new Date(note.createdDate).toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
