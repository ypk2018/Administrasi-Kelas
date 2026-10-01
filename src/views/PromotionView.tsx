import React, { useState } from 'react';
import { PromotionRecord, Student, Rombel } from '../types';
import { TrendingUp } from 'lucide-react';

interface PromotionViewProps {
  promotions: PromotionRecord[];
  students: Student[];
  rombels: Rombel[];
  onUpdatePromotion: (promo: PromotionRecord) => void;
}

export const PromotionView: React.FC<PromotionViewProps> = ({
  promotions,
  students,
  rombels,
  onUpdatePromotion
}) => {
  const [selectedClassId, setSelectedClassId] = useState(rombels[0]?.id || 'r1');
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Kenaikan Kelas (Semester Genap)</h2>
        <p className="text-xs text-slate-500">Modul verifikasi dan rekomendasi kenaikan kelas sesuai hasil rapat dewan guru SMP Negeri 7 Sentani.</p>
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

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">NIS</th>
                <th className="p-4">Nama Peserta Didik</th>
                <th className="p-4">L/P</th>
                <th className="p-4">Status Administrasi</th>
                <th className="p-4">Keputusan Rapat / Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-slate-500">{idx + 1}</td>
                  <td className="p-4 font-mono font-medium text-slate-900">{s.nis}</td>
                  <td className="p-4 font-bold text-slate-900">{s.fullName}</td>
                  <td className="p-4 font-medium">{s.gender}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold text-[10px]">
                      Lengkap
                    </span>
                  </td>
                  <td className="p-4 font-medium text-emerald-800">
                    Naik ke Kelas Berikutnya (Disetujui)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
