import React from 'react';
import { Extracurricular, ExtracurricularMember, Student } from '../types';
import { Award, Plus } from 'lucide-react';

interface ExtracurricularViewProps {
  extracurriculars: Extracurricular[];
  members: ExtracurricularMember[];
  students: Student[];
  onAddMember: (member: ExtracurricularMember) => void;
}

export const ExtracurricularView: React.FC<ExtracurricularViewProps> = ({
  extracurriculars,
  members,
  students,
  onAddMember
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kegiatan Ekstrakurikuler</h2>
          <p className="text-xs text-slate-500">Pramuka, PMR, Olahraga, Seni Tari Papua, dan pengembangan bakat siswa.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {extracurriculars.map((ex) => {
          const exMembers = members.filter((m) => m.extracurricularId === ex.id);
          return (
            <div key={ex.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{ex.name}</h3>
                    <p className="text-xs text-slate-500">Pembina: {ex.coach} · {ex.schedule}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  {exMembers.length} Peserta
                </span>
              </div>
              <p className="text-xs text-slate-600">{ex.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
