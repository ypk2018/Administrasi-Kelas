import React, { useState } from 'react';
import { Violation, Student } from '../types';
import { AlertTriangle, Plus } from 'lucide-react';

interface ViolationsViewProps {
  violations: Violation[];
  students: Student[];
  onAddViolation: (violation: Violation) => void;
}

export const ViolationsView: React.FC<ViolationsViewProps> = ({
  violations,
  students,
  onAddViolation
}) => {
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [violationType, setViolationType] = useState('');
  const [category, setCategory] = useState<'Ringan' | 'Sedang' | 'Berat'>('Ringan');
  const [chronology, setChronology] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [handler, setHandler] = useState('Sartika Wandikbo, S.Pd.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!violationType || !studentId) return;
    const newVio: Violation = {
      id: 'vio_' + Date.now(),
      studentId,
      date: new Date().toISOString().split('T')[0],
      violationType,
      category,
      chronology,
      actionTaken,
      handler,
      parentContacted: true,
      followUp: 'Pembinaan lanjutan oleh wali kelas',
      status: 'Selesai'
    };
    onAddViolation(newVio);
    setShowModal(false);
    setViolationType('');
    setChronology('');
    setActionTaken('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pelanggaran & Tata Tertib Siswa</h2>
          <p className="text-xs text-slate-500">Pencatatan kejadian kedisiplinan, kronologi, dan tindakan pembinaan edukatif.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Pelanggaran</span>
        </button>
      </div>

      <div className="space-y-3">
        {violations.map((v) => {
          const student = students.find((s) => s.id === v.studentId);
          return (
            <div key={v.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-red-50 text-red-800 rounded-lg text-xs font-bold">Kategori: {v.category}</span>
                <span className="text-xs text-slate-400">{v.date}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{v.violationType}</h3>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">Siswa: {student ? student.fullName : 'Siswa'}</p>
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                <strong>Kronologi:</strong> {v.chronology} <br />
                <strong>Tindakan Pembinaan:</strong> {v.actionTaken} (Penangan: {v.handler})
              </p>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Catat Pelanggaran / Disiplin</h3>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Pelanggaran</label>
                  <input
                    type="text"
                    required
                    value={violationType}
                    onChange={(e) => setViolationType(e.target.value)}
                    placeholder="Contoh: Terlambat hadir"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Ringan">Ringan</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Berat">Berat</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Kronologi Kejadian</label>
                <textarea
                  value={chronology}
                  onChange={(e) => setChronology(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl h-20 resize-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tindakan Pembinaan</label>
                <input
                  type="text"
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  placeholder="Contoh: Peringatan lisan & bimbingan"
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
