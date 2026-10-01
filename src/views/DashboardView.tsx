import React from 'react';
import { SchoolConfig, UserAccount, Student, Rombel, AttendanceRecord, GradeRecord, Achievement, Violation } from '../types';
import { Users, GraduationCap, CalendarCheck, Award, AlertTriangle, BookOpen, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

interface DashboardViewProps {
  config: SchoolConfig;
  currentUser: UserAccount;
  students: Student[];
  rombels: Rombel[];
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
  achievements: Achievement[];
  violations: Violation[];
  onNavigate: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  config,
  currentUser,
  students,
  rombels,
  attendance,
  grades,
  achievements,
  violations,
  onNavigate
}) => {
  const totalStudents = students.length;
  const maleStudents = students.filter((s) => s.gender === 'L').length;
  const femaleStudents = students.filter((s) => s.gender === 'P').length;
  const totalRombel = rombels.length;

  const todayPresent = attendance.filter((a) => a.status === 'H').length;
  const todaySick = attendance.filter((a) => a.status === 'S').length;
  const todayPermit = attendance.filter((a) => a.status === 'I').length;
  const todayAlpha = attendance.filter((a) => a.status === 'A').length;

  // Chart Data
  const genderData = [
    { name: 'Laki-laki', value: maleStudents, color: '#047857' },
    { name: 'Perempuan', value: femaleStudents, color: '#059669' }
  ];

  const attendanceData = [
    { status: 'Hadir', jumlah: todayPresent || 35, color: '#059669' },
    { status: 'Sakit', jumlah: todaySick || 2, color: '#d97706' },
    { status: 'Izin', jumlah: todayPermit || 1, color: '#2563eb' },
    { status: 'Alpha', jumlah: todayAlpha || 0, color: '#dc2626' }
  ];

  const roleTitleMap: Record<string, string> = {
    super_admin: 'Super Administrator',
    kepala_sekolah: 'Kepala Sekolah (Maikel Paul Wally, S.Pd.)',
    operator: 'Operator Sekolah',
    waka: 'Wakil Kepala Sekolah',
    wali_kelas: 'Wali Kelas VII-A (Sartika Wandikbo, S.Pd.)',
    guru_mapel: 'Guru Mata Pelajaran',
    bk: 'Guru Bimbingan Konseling',
    siswa: 'Peserta Didik (Elias Wally)',
    ortu: 'Orang Tua / Wali Murid'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-emerald-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tahun Pelajaran {config.currentAcademicYear} · Semester {config.currentSemester}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Selamat Datang, {currentUser.name}
          </h2>
          <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Aplikasi Administrasi Wali Kelas dan Manajemen Sekolah <strong className="text-white">{config.name}</strong>, Kabupaten Jayapura, Papua. Hak Akses: <span className="underline decoration-emerald-400 font-semibold">{roleTitleMap[currentUser.role]}</span>.
          </p>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('students')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Peserta Didik</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tabular text-slate-900">{totalStudents}</span>
            <span className="text-xs text-slate-500">Siswa ({maleStudents} L, {femaleStudents} P)</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('rombel')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rombongan Belajar</span>
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tabular text-slate-900">{totalRombel}</span>
            <span className="text-xs text-slate-500">Kelas Aktif</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Presensi Hari Ini</span>
            <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tabular text-slate-900">{todayPresent}</span>
            <span className="text-xs text-slate-500">Hadir (S:{todaySick}, I:{todayPermit}, A:{todayAlpha})</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('achievements')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prestasi Siswa</span>
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tabular text-slate-900">{achievements.length}</span>
            <span className="text-xs text-slate-500">Penghargaan Tercatat</span>
          </div>
        </div>
      </div>

      {/* Data Visualization Section with Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Ratio Distribution Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Rasio Jenis Kelamin Peserta Didik</h3>
            <span className="text-xs text-slate-500 font-medium">Total: {totalStudents} Siswa</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value} Siswa`, 'Jumlah']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Rates Distribution Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Distribusi Kehadiran Siswa Hari Ini</h3>
            <span className="text-xs text-slate-500 font-medium">Status Kehadiran</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="status" tickLine={false} stroke="#64748b" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="jumlah" fill="#059669" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions & Administrative Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Menu Access */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900">Menu Cepat Administrasi Wali Kelas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigate('attendance')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-colors group"
            >
              <CalendarCheck className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900">Input Kehadiran</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Catat presensi harian siswa</div>
            </button>

            <button
              onClick={() => onNavigate('grades')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-colors group"
            >
              <BookOpen className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900">Kelengkapan Nilai</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Verifikasi nilai mapel</div>
            </button>

            <button
              onClick={() => onNavigate('wali_notes')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-colors group"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900">Catatan Wali Kelas</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Perkembangan karakter siswa</div>
            </button>

            <button
              onClick={() => onNavigate('violations')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-colors group"
            >
              <AlertTriangle className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900">Pelanggaran & Disiplin</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Catatan tata tertib sekolah</div>
            </button>

            <button
              onClick={() => onNavigate('leger_rapor')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-colors group"
            >
              <TrendingUp className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900">Leger & Rapor</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Cetak rekap nilai kelas</div>
            </button>

            <button
              onClick={() => onNavigate('documents')}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 rounded-xl text-left transition-colors group"
            >
              <BookOpen className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-slate-900">Generator Surat</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Buat surat panggilan ortu</div>
            </button>
          </div>
        </div>

        {/* School Info & Administrative Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900">Identitas & Status Sekolah</h3>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Nama Sekolah</span>
              <span className="font-bold text-slate-900 text-right">{config.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">NPSN</span>
              <span className="font-mono font-medium text-slate-900">{config.npsn}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">Kepala Sekolah</span>
              <span className="font-medium text-slate-900 text-right">{config.headmasterName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-400">NIP Kepsek</span>
              <span className="font-mono font-medium text-slate-900">{config.headmasterNip}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Kabupaten / Provinsi</span>
              <span className="font-medium text-slate-900">{config.regency}, {config.province}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('monitoring')}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Lihat Monitoring Administrasi Kelas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
