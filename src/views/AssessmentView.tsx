import React from 'react';
import { Assessment, Subject, Rombel } from '../types';
import { ClipboardList, Plus } from 'lucide-react';

interface AssessmentViewProps {
  assessments: Assessment[];
  subjects: Subject[];
  rombels: Rombel[];
  onAddAssessment: (assessment: Assessment) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  assessments,
  subjects,
  rombels,
  onAddAssessment
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Asesmen Formatif & Sumatif</h2>
          <p className="text-xs text-slate-500">Pencatatan tujuan asesmen, materi, dan instrumen penilaian pembelajaran.</p>
        </div>
        <button
          onClick={() => {
            const title = prompt('Masukkan Nama/Tujuan Asesmen:');
            if (!title) return;
            const newAssessment: Assessment = {
              id: 'asm_' + Date.now(),
              title,
              subjectId: subjects[0]?.name || 'Bahasa Indonesia',
              classId: rombels[0]?.name || 'VII-A',
              type: 'Sumatif',
              scope: 'Lingkup Materi Bab 1',
              date: new Date().toISOString().split('T')[0],
              maxScore: 100
            };
            onAddAssessment(newAssessment);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Asesmen</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Judul / Tujuan Asesmen</th>
                <th className="p-4">Jenis</th>
                <th className="p-4">Mata Pelajaran</th>
                <th className="p-4">Kelas</th>
                <th className="p-4">Lingkup Materi</th>
                <th className="p-4">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Belum ada data asesmen tercatat.
                  </td>
                </tr>
              ) : (
                assessments.map((a, idx) => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-slate-500">{idx + 1}</td>
                    <td className="p-4 font-bold text-slate-900">{a.title}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.type === 'Sumatif' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {a.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{a.subjectId}</td>
                    <td className="p-4 text-emerald-800 font-bold">Kelas {a.classId}</td>
                    <td className="p-4 text-slate-600">{a.scope}</td>
                    <td className="p-4 text-slate-500">{a.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
