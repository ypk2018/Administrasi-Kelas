import React, { useState } from 'react';
import { Subject, Rombel, GradeRecord, Student } from '../types';
import { BookOpen, CheckCircle2, AlertCircle, Lock } from 'lucide-react';

interface GradesViewProps {
  subjects: Subject[];
  rombels: Rombel[];
  grades: GradeRecord[];
  students: Student[];
}

export const GradesView: React.FC<GradesViewProps> = ({ subjects, rombels, grades, students }) => {
  const [selectedClassId, setSelectedClassId] = useState(rombels[0]?.id || 'r1');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Monitoring Kelengkapan Nilai Mata Pelajaran</h2>
        <p className="text-xs text-slate-500">Pemeriksaan status input nilai dari guru mata pelajaran sesuai kewenangan kurikulum.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700">Pilih Rombel:</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-700"
          >
            {rombels.map((r) => (
              <option key={r.id} value={r.id}>Kelas {r.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => {
          const isComplete = true; // Mock status
          return (
            <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">{sub.code}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" /> Lengkap
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{sub.name}</h3>
                <p className="text-[11px] text-slate-400">{sub.category} · KKM: {sub.kkm}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Status: Terverifikasi</span>
                <span className="font-mono text-emerald-800 font-bold">100% Selesai</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
