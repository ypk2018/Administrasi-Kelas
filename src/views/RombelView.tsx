import React from 'react';
import { Rombel, Teacher, Student } from '../types';
import { GraduationCap, Users, UserCheck } from 'lucide-react';

interface RombelViewProps {
  rombels: Rombel[];
  teachers: Teacher[];
  students: Student[];
}

export const RombelView: React.FC<RombelViewProps> = ({ rombels, teachers, students }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Rombongan Belajar & Wali Kelas</h2>
        <p className="text-xs text-slate-500">Daftar rombel dan penugasan wali kelas SMP Negeri 7 Sentani Tahun Pelajaran 2026/2027.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rombels.map((r) => {
          const teacher = teachers.find((t) => t.id === r.teacherId);
          const classStudents = students.filter((s) => s.classId === r.id);
          const maleCount = classStudents.filter((s) => s.gender === 'L').length;
          const femaleCount = classStudents.filter((s) => s.gender === 'P').length;

          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-lg shadow-xs">
                    {r.name}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Kelas {r.name}</h3>
                    <p className="text-xs text-slate-500">Tingkat {r.gradeLevel} · Semester {r.semester}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  {classStudents.length} Siswa
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Wali Kelas: <strong className="text-slate-900">{teacher ? teacher.name : 'Belum Ditentukan'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>Komposisi: <strong className="text-slate-900">{maleCount} Laki-laki, {femaleCount} Perempuan</strong></span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Daftar Anggota Kelas</h4>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {classStudents.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Belum ada siswa dalam rombel ini.</p>
                  ) : (
                    classStudents.map((s, idx) => (
                      <div key={s.id} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 rounded-lg text-xs">
                        <span className="font-medium text-slate-800">{idx + 1}. {s.fullName}</span>
                        <span className="font-mono text-slate-500 text-[10px]">NIS: {s.nis}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
