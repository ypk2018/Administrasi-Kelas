import React, { useState } from 'react';
import { ParentCommunication, Student } from '../types';
import { MessageSquare, Plus } from 'lucide-react';

interface ParentCommViewProps {
  parentComms: ParentCommunication[];
  students: Student[];
  onAddComm: (comm: ParentCommunication) => void;
}

export const ParentCommView: React.FC<ParentCommViewProps> = ({
  parentComms,
  students,
  onAddComm
}) => {
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [media, setMedia] = useState<any>('WhatsApp');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !studentId) return;
    const newComm: ParentCommunication = {
      id: 'pc_' + Date.now(),
      studentId,
      date: new Date().toISOString().split('T')[0],
      parentName: 'Orang Tua Siswa',
      media,
      topic,
      summary,
      followUp: 'Komunikasi lancar',
      status: 'Selesai'
    };
    onAddComm(newComm);
    setShowModal(false);
    setTopic('');
    setSummary('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Komunikasi dengan Orang Tua / Wali</h2>
          <p className="text-xs text-slate-500">Pencatatan konsultasi, WhatsApp, telepon, dan pertemuan dengan orang tua.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Komunikasi</span>
        </button>
      </div>

      <div className="space-y-3">
        {parentComms.map((pc) => {
          const student = students.find((s) => s.id === pc.studentId);
          return (
            <div key={pc.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
              <div className="flex justify-between font-bold text-xs">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg">Media: {pc.media}</span>
                <span className="text-slate-400">{pc.date}</span>
              </div>
              <p className="text-xs font-bold text-slate-900">Siswa: {student ? student.fullName : 'Siswa'} ({pc.parentName})</p>
              <h4 className="text-sm font-bold text-slate-900">{pc.topic}</h4>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">{pc.summary}</p>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Catat Komunikasi Orang Tua</h3>
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
                <label className="block font-bold text-slate-700 mb-1">Media Komunikasi</label>
                <select
                  value={media}
                  onChange={(e) => setMedia(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telepon">Telepon</option>
                  <option value="Tatap Muka">Tatap Muka</option>
                  <option value="Surat">Surat</option>
                  <option value="Pertemuan Sekolah">Pertemuan Sekolah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Topik Diskusi *</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Komunikasi</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl h-20 resize-none"
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
