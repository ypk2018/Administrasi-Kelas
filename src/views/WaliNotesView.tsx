import React, { useState } from 'react';
import { WaliNote, Student } from '../types';
import { FileText, Plus } from 'lucide-react';

interface WaliNotesViewProps {
  waliNotes: WaliNote[];
  students: Student[];
  onAddWaliNote: (note: WaliNote) => void;
}

export const WaliNotesView: React.FC<WaliNotesViewProps> = ({
  waliNotes,
  students,
  onAddWaliNote
}) => {
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [category, setCategory] = useState<any>('Akademik');
  const [note, setNote] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note || !studentId) return;
    const newNote: WaliNote = {
      id: 'wn_' + Date.now(),
      studentId,
      date: new Date().toISOString().split('T')[0],
      category,
      note,
      action,
      status: 'Aktif'
    };
    onAddWaliNote(newNote);
    setShowModal(false);
    setNote('');
    setAction('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Catatan Perkembangan Wali Kelas</h2>
          <p className="text-xs text-slate-500">Pencatatan perkembangan akademik, sikap, sosial, dan minat bakat peserta didik.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Catatan</span>
        </button>
      </div>

      <div className="space-y-3">
        {waliNotes.map((n) => {
          const student = students.find((s) => s.id === n.studentId);
          return (
            <div key={n.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
              <div className="flex justify-between font-bold text-xs">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg">Kategori: {n.category}</span>
                <span className="text-slate-400">{n.date}</span>
              </div>
              <p className="text-xs font-bold text-slate-900">Siswa: {student ? student.fullName : 'Siswa'}</p>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">{n.note}</p>
              <p className="text-xs text-emerald-800 font-medium">Tindak Lanjut: {n.action}</p>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Tambah Catatan Wali Kelas</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Peserta Didik</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.fullName} (Kelas {s.classId})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategori Catatan</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Kehadiran">Kehadiran</option>
                  <option value="Sikap/Perilaku">Sikap/Perilaku</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Kedisiplinan">Kedisiplinan</option>
                  <option value="Minat & Bakat">Minat & Bakat</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Catatan</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl h-20 resize-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tindak Lanjut / Anjuran</label>
                <input
                  type="text"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
