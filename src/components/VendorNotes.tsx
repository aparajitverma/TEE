'use client';

import { useState, useEffect, useRef } from 'react';
import {
  StickyNote,
  Plus,
  Edit,
  Trash2,
  Pin,
  AlertCircle,
  RefreshCw,
  Save,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
} from 'lucide-react';

interface VendorNote {
  id: number;
  noteText: string;
  createdBy: string;
  isPinned: boolean;
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VendorNotesProps {
  vendorId: number;
  vendorName: string;
}

export default function VendorNotes({ vendorId, vendorName }: VendorNotesProps) {
  const [notes, setNotes] = useState<VendorNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNote, setEditingNote] = useState<VendorNote | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors/${vendorId}/notes`);
      const data = await response.json();

      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.error('Error fetching vendor notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [vendorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingNote
        ? `/api/vendors/${vendorId}/notes/${editingNote.id}`
        : `/api/vendors/${vendorId}/notes`;

      const method = editingNote ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteText,
          createdBy: 'Admin',
          isPinned,
          isImportant,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowAddForm(false);
        setEditingNote(null);
        setNoteText('');
        setIsPinned(false);
        setIsImportant(false);
        fetchNotes();
      } else {
        alert(data.error || 'Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (note: VendorNote) => {
    setEditingNote(note);
    setNoteText(note.noteText);
    setIsPinned(note.isPinned);
    setIsImportant(note.isImportant);
    setShowAddForm(true);
  };

  const handleDelete = async (noteId: number) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const response = await fetch(`/api/vendors/${vendorId}/notes/${noteId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchNotes();
      } else {
        alert(data.error || 'Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  const togglePin = async (note: VendorNote) => {
    try {
      const response = await fetch(`/api/vendors/${vendorId}/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPinned: !note.isPinned,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const applyFormatting = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const cancelEdit = () => {
    setShowAddForm(false);
    setEditingNote(null);
    setNoteText('');
    setIsPinned(false);
    setIsImportant(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Notes - {vendorName}</h3>
          <p className="text-gray-400 text-sm mt-1">{notes.length} total notes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchNotes}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </div>

      {/* Add/Edit Note Form */}
      {showAddForm && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            {editingNote ? 'Edit Note' : 'Add New Note'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rich Text Editor Toolbar */}
            <div className="flex gap-2 p-2 bg-gray-900 border border-gray-700 rounded-lg">
              <button
                type="button"
                onClick={() => applyFormatting('bold')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('italic')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4 text-gray-400" />
              </button>
              <div className="w-px bg-gray-700" />
              <button
                type="button"
                onClick={() => applyFormatting('insertUnorderedList')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Bullet List"
              >
                <List className="w-4 h-4 text-gray-400" />
              </button>
              <button
                type="button"
                onClick={() => applyFormatting('insertOrderedList')}
                className="p-2 hover:bg-gray-700 rounded transition-colors"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Rich Text Editor */}
            <div
              ref={editorRef}
              contentEditable
              onInput={(e) => setNoteText(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: noteText }}
              className="min-h-[200px] px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              style={{ whiteSpace: 'pre-wrap' }}
            />

            {/* Options */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-emerald-600 focus:ring-emerald-500"
                />
                <Pin className="w-4 h-4" />
                Pin this note
              </label>

              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-yellow-600 focus:ring-yellow-500"
                />
                <AlertCircle className="w-4 h-4" />
                Mark as important
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !noteText.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {submitting ? 'Saving...' : editingNote ? 'Update Note' : 'Add Note'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
          <StickyNote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Notes Found</h3>
          <p className="text-gray-400 mb-6">No notes added for this vendor yet.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Note
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`bg-gray-800 border rounded-xl p-6 transition-all ${
                note.isPinned
                  ? 'border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'border-gray-700'
              } ${note.isImportant ? 'bg-yellow-900/10' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {note.isPinned && (
                    <Pin className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  )}
                  {note.isImportant && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                  <span className="text-sm text-gray-400">
                    By {note.createdBy} • {new Date(note.createdAt).toLocaleString()}
                  </span>
                  {note.updatedAt !== note.createdAt && (
                    <span className="text-xs text-gray-500">
                      (edited {new Date(note.updatedAt).toLocaleString()})
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => togglePin(note)}
                    className={`p-2 rounded-lg transition-colors ${
                      note.isPinned
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                    }`}
                    title={note.isPinned ? 'Unpin' : 'Pin'}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(note)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                className="text-gray-300 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: note.noteText }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
