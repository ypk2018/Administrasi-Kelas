import React, { useState } from 'react';
import { Student, Rombel, AttendanceRecord } from '../types';
import { CalendarCheck, Save, Calendar } from 'lucide-react';

interface AttendanceViewProps {
  students: Student[];
  rombels: Rombel[];
  attendance: AttendanceRecord[];
  onSaveAttendance: (records: AttendanceRecord[]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  rombels,
  attendance,
  onSaveAttendance
}) => {
  const [selectedClassId, setSelectedClassId] = useState(rombels[0]?.id || 'r1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const classStudents = students.filter((s) => s.classId === selectedClassId);

  // Local state for attendance status map
  const [dailyStatus, setDailyStatus] = useState<Record<string, 'H' | 'S' | 'I' | 'A'>>(() => {
    const initial: Record<string, 'H' | 'S' | 'I' | 'A'> = {};
    students.forEach((s) => {
      const existing = attendance.find((a) => a.studentId === s.id && a.date === selectedDate);
      initial[s.id] = existing ? existing.status : 'H';
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: 'H' | 'S' | 'I' | 'A') => {
    setDailyStatus({ ...dailyStatus, [studentId]: status });
  };

  const handleSave = () => {
    const newRecords: AttendanceRecord[] = classStudents.map((s) => ({
      id: `att_${s.id}_${selectedDate}`,
      studentId: s.id,
      classId: selectedClassId,
      date: selectedDate,
      status: dailyStatus[s.id] || 'H'
    }));
    onSaveAttendance(newRecords);
    alert('Presensi kehadiran berhasil disimpan.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Presensi Kehadiran Siswa</h2>
          <p className="text-xs text-slate-500">Kelola dan rekapitulasi kehadiran harian (Hadir, Sakit, Izin, Tanpa Keterangan).</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Presensi</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700">Pilih Kelas:</label>
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

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-700" />
            Tanggal:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-700"
          />
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
                <th className="p-4 text-center">Hadir (H)</th>
                <th className="p-4 text-center">Sakit (S)</th>
                <th className="p-4 text-center">Izin (I)</th>
                <th className="p-4 text-center">Tanpa Ket. (A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Tidak ada siswa dalam rombel ini.
                  </td>
                </tr>
              ) : (
                classStudents.map((s, idx) => {
                  const currentStatus = dailyStatus[s.id] || 'H';
                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono text-slate-500">{idx + 1}</td>
                      <td className="p-4 font-mono font-medium text-slate-900">{s.nis}</td>
                      <td className="p-4 font-bold text-slate-900">{s.fullName}</td>
                      <td className="p-4 font-medium">{s.gender}</td>
                      <td className="p-4 text-center">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          checked={currentStatus === 'H'}
                          onChange={() => handleStatusChange(s.id, 'H')}
                          className="accent-emerald-700 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          checked={currentStatus === 'S'}
                          onChange={() => handleStatusChange(s.id, 'S')}
                          className="accent-amber-600 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          checked={currentStatus === 'I'}
                          onChange={() => handleStatusChange(s.id, 'I')}
                          className="accent-blue-600 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          checked={currentStatus === 'A'}
                          onChange={() => handleStatusChange(s.id, 'A')}
                          className="accent-red-600 w-4 h-4 cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
