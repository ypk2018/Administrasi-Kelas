import React from 'react';
import { MutasiRecord, Student } from '../types';
import { ArrowLeftRight } from 'lucide-react';

interface MutasiViewProps {
  mutations: MutasiRecord[];
  students: Student[];
}

export const MutasiView: React.FC<MutasiViewProps> = ({ mutations, students }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Mutasi & Kelulusan Siswa</h2>
        <p className="text-xs text-slate-500">Pencatatan siswa masuk, siswa keluar, pindah sekolah, dan kelulusan.</p>
      </div>

      <div className="space-y-3">
        {mutations.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
            Belum ada data mutasi tercatat. Semua siswa aktif.
          </div>
        ) : (
          mutations.map((m) => {
            const student = students.find((s) => s.id === m.studentId);
            return (
              <div key={m.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
                <div className="flex justify-between font-bold text-xs">
                  <span>Jenis: {m.type}</span>
                  <span className="text-slate-400">{m.date}</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium">Siswa: {student ? student.fullName : 'Siswa'}</p>
                <p className="text-xs text-slate-600">Alasan / Keterangan: {m.reason}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
