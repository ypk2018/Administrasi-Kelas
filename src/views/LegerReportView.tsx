import React, { useState } from 'react';
import { SchoolConfig, Rombel, Student, Subject, GradeRecord } from '../types';
import { Printer, Award } from 'lucide-react';

interface LegerReportViewProps {
  config: SchoolConfig;
  rombels: Rombel[];
  students: Student[];
  subjects: Subject[];
  grades: GradeRecord[];
}

export const LegerReportView: React.FC<LegerReportViewProps> = ({
  config,
  rombels,
  students,
  subjects,
  grades
}) => {
  const [selectedClassId, setSelectedClassId] = useState(rombels[0]?.id || 'r1');
  const classStudents = students.filter((s) => s.classId === selectedClassId);
  const currentRombel = rombels.find((r) => r.id === selectedClassId);

  // Calculate average and rank for each student in the class
  const studentStats = classStudents.map((s) => {
    const studentGrades = grades.filter((g) => g.studentId === s.id);
    const avg = studentGrades.length > 0 
      ? Number((studentGrades.reduce((acc, g) => acc + g.knowledgeScore, 0) / studentGrades.length).toFixed(1))
      : 80.0;
    return { student: s, studentGrades, avg };
  });

  // Sort by average descending to determine rank
  const sortedStats = [...studentStats].sort((a, b) => b.avg - a.avg);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Leger Nilai & Peringkat Kelas</h2>
          <p className="text-xs text-slate-500">Rekapitulasi nilai seluruh mata pelajaran dan perangkingan otomatis per kelas.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Leger / PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between no-print">
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

      {/* Printable Leger Document */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Kop Surat dengan Dual Logo (Kiri & Kanan) */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          {config.logoUrl ? (
            <img src={config.logoUrl} alt="Logo Kiri" className="w-16 h-16 object-contain shrink-0" />
          ) : (
            <div className="w-16 h-16" />
          )}
          <div className="text-center flex-1 space-y-0.5 px-2">
            <h3 className="text-xs font-bold uppercase tracking-wider">PEMERINTAH KABUPATEN JAYAPURA</h3>
            <h3 className="text-xs font-bold uppercase tracking-wider">DINAS PENDIDIKAN</h3>
            <h1 className="text-base font-extrabold uppercase tracking-tight">{config.name}</h1>
            <p className="text-[11px] text-slate-600">{config.address} · Email: {config.email}</p>
          </div>
          {config.rightLogoUrl ? (
            <img src={config.rightLogoUrl} alt="Logo Kanan" className="w-16 h-16 object-contain shrink-0" />
          ) : (
            <div className="w-16 h-16" />
          )}
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-sm font-bold uppercase">LEGER REKAPITULASI NILAI & PERINGKAT KELAS</h2>
          <p className="text-xs text-slate-600">
            Kelas: {currentRombel?.name} · Tahun Pelajaran: {config.currentAcademicYear} · Semester: {config.currentSemester}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-900">
                <th className="border border-slate-300 p-2 text-center w-10">Rank</th>
                <th className="border border-slate-300 p-2 w-20">NIS</th>
                <th className="border border-slate-300 p-2 w-48">Nama Peserta Didik</th>
                <th className="border border-slate-300 p-2 text-center w-10">L/P</th>
                {subjects.map((sub) => (
                  <th key={sub.id} className="border border-slate-300 p-2 text-center w-16">{sub.code}</th>
                ))}
                <th className="border border-slate-300 p-2 text-center w-16">Rata-rata</th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((item, rankIndex) => {
                const s = item.student;
                const rank = rankIndex + 1;
                return (
                  <tr key={s.id} className={`hover:bg-slate-50 ${rank === 1 ? 'bg-emerald-50/50 font-semibold' : ''}`}>
                    <td className="border border-slate-300 p-2 text-center font-bold text-emerald-800">
                      {rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : rank}
                    </td>
                    <td className="border border-slate-300 p-2 font-mono">{s.nis}</td>
                    <td className="border border-slate-300 p-2 font-bold">{s.fullName}</td>
                    <td className="border border-slate-300 p-2 text-center">{s.gender}</td>
                    {subjects.map((sub) => {
                      const grade = item.studentGrades.find((g) => g.subjectId === sub.id);
                      return (
                        <td key={sub.id} className="border border-slate-300 p-2 text-center font-mono">
                          {grade ? grade.knowledgeScore : '82'}
                        </td>
                      );
                    })}
                    <td className="border border-slate-300 p-2 text-center font-mono font-bold text-emerald-800">{item.avg}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tanda Tangan */}
        <div className="pt-8 flex justify-between text-xs">
          <div className="space-y-16 text-center">
            <p>Mengetahui,<br />Kepala {config.name}</p>
            <div>
              <p className="font-bold underline">{config.headmasterName}</p>
              <p className="font-mono">NIP. {config.headmasterNip}</p>
            </div>
          </div>
          <div className="space-y-16 text-center">
            <p>{config.signatureCity}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />Wali Kelas {currentRombel?.name}</p>
            <div>
              <p className="font-bold underline">Sartika Wandikbo, S.Pd.</p>
              <p className="font-mono">NIP. 198205142008012001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
