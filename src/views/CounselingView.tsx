import React from 'react';
import { CounselingRecord, Student } from '../types';
import { HeartHandshake } from 'lucide-react';

interface CounselingViewProps {
  counselings: CounselingRecord[];
  students: Student[];
}

export const CounselingView: React.FC<CounselingViewProps> = ({ counselings, students }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Bimbingan & Konseling (BK)</h2>
        <p className="text-xs text-slate-500">Catatan konseling siswa dan pendampingan psikososial oleh Guru BK.</p>
      </div>

      <div className="space-y-3">
        {counselings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
            Belum ada catatan konseling BK tercatat.
          </div>
        ) : (
          counselings.map((c) => {
            const student = students.find((s) => s.id === c.studentId);
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
                <div className="flex justify-between font-bold text-xs">
                  <span>{c.purpose}</span>
                  <span className="text-slate-400">{c.date}</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">Siswa: {student ? student.fullName : 'Siswa'}</p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">{c.notes}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
