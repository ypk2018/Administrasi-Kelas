import React, { useState } from 'react';
import { Teacher, Subject, Rombel } from '../types';
import { Database, Plus } from 'lucide-react';

interface MasterDataViewProps {
  teachers: Teacher[];
  subjects: Subject[];
  rombels: Rombel[];
  onAddTeacher: (teacher: Teacher) => void;
}

export const MasterDataView: React.FC<MasterDataViewProps> = ({
  teachers,
  subjects,
  rombels,
  onAddTeacher
}) => {
  const [activeTab, setActiveTab] = useState<'teachers' | 'subjects' | 'rombels'>('teachers');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [subject, setSubject] = useState('Matematika');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nip) return;
    const newT: Teacher = {
      id: 't_' + Date.now(),
      nip,
      name,
      gender: 'L',
      phone: '081234567890',
      email: 'guru@smp.belajar.id',
      subject,
      status: 'PNS'
    };
    onAddTeacher(newT);
    setShowModal(false);
    setName('');
    setNip('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Data Master Sekolah</h2>
          <p className="text-xs text-slate-500">Kelola master data Guru, Mata Pelajaran, dan Rombongan Belajar.</p>
        </div>
        {activeTab === 'teachers' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Guru</span>
          </button>
        )}
      </div>

      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'teachers', label: 'Data Guru & Pendidik' },
          { id: 'subjects', label: 'Mata Pelajaran' },
          { id: 'rombels', label: 'Rombel' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-colors ${
              activeTab === tab.id ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'teachers' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">NIP</th>
                <th className="p-4">Nama Guru & Gelar</th>
                <th className="p-4">Mata Pelajaran</th>
                <th className="p-4">Status Kepegawaian</th>
                <th className="p-4">Kontak HP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((t, idx) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono text-slate-500">{idx + 1}</td>
                  <td className="p-4 font-mono font-medium text-slate-900">{t.nip}</td>
                  <td className="p-4 font-bold text-slate-900">{t.name}</td>
                  <td className="p-4 font-medium text-emerald-800">{t.subject}</td>
                  <td className="p-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold">{t.status}</span></td>
                  <td className="p-4 text-slate-600">{t.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">Kode</th>
                <th className="p-4">Nama Mata Pelajaran</th>
                <th className="p-4">Kelompok</th>
                <th className="p-4">KKM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-emerald-800">{sub.code}</td>
                  <td className="p-4 font-bold text-slate-900">{sub.name}</td>
                  <td className="p-4 font-medium text-slate-600">{sub.category}</td>
                  <td className="p-4 font-mono font-bold">{sub.kkm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'rombels' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">Nama Rombel</th>
                <th className="p-4">Tingkat</th>
                <th className="p-4">Tahun Pelajaran</th>
                <th className="p-4">Semester</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rombels.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-emerald-800">Kelas {r.name}</td>
                  <td className="p-4">Tingkat {r.gradeLevel}</td>
                  <td className="p-4 font-mono">{r.academicYear}</td>
                  <td className="p-4 font-medium">{r.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Tambah Guru Baru</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <form onSubmit={handleAddTeacher} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Yulianus Keiya, S.Pd."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">NIP *</label>
                <input
                  type="text"
                  required
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mata Pelajaran Diampu</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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
                  Simpan Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
