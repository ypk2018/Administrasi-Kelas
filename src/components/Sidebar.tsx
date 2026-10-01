import React from 'react';
import {
  LayoutDashboard,
  Database,
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  Award,
  AlertTriangle,
  HeartHandshake,
  FileText,
  MessageSquare,
  ArrowLeftRight,
  TrendingUp,
  Printer,
  BarChart3,
  Settings,
  Calendar,
  Megaphone,
  BookMarked,
  ShieldAlert,
  Menu,
  X
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'master'
  | 'students'
  | 'rombel'
  | 'attendance'
  | 'grades'
  | 'assessment'
  | 'extracurricular'
  | 'achievements'
  | 'violations'
  | 'counseling'
  | 'wali_notes'
  | 'parent_comm'
  | 'mutasi'
  | 'promotion'
  | 'leger_rapor'
  | 'reports'
  | 'documents'
  | 'monitoring'
  | 'calendar'
  | 'announcements'
  | 'documentation'
  | 'audit_logs'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.FC<{ className?: string }>;
  category: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Utama' },
  { id: 'monitoring', label: 'Monitoring Kelas', icon: BarChart3, category: 'Utama' },
  { id: 'students', label: 'Data Peserta Didik', icon: Users, category: 'Akademik' },
  { id: 'rombel', label: 'Rombel & Wali Kelas', icon: GraduationCap, category: 'Akademik' },
  { id: 'attendance', label: 'Presensi Kehadiran', icon: CalendarCheck, category: 'Akademik' },
  { id: 'grades', label: 'Kelengkapan Nilai', icon: BookOpen, category: 'Akademik' },
  { id: 'assessment', label: 'Asesmen Formatif/Sumatif', icon: ClipboardList, category: 'Akademik' },
  { id: 'extracurricular', label: 'Ekstrakurikuler', icon: Award, category: 'Kesiswaan' },
  { id: 'achievements', label: 'Prestasi Siswa', icon: TrendingUp, category: 'Kesiswaan' },
  { id: 'violations', label: 'Pelanggaran & Disiplin', icon: AlertTriangle, category: 'Kesiswaan' },
  { id: 'counseling', label: 'Bimbingan & Konseling', icon: HeartHandshake, category: 'Kesiswaan' },
  { id: 'wali_notes', label: 'Catatan Wali Kelas', icon: FileText, category: 'Wali Kelas' },
  { id: 'parent_comm', label: 'Komunikasi Orang Tua', icon: MessageSquare, category: 'Wali Kelas' },
  { id: 'mutasi', label: 'Mutasi & Kelulusan', icon: ArrowLeftRight, category: 'Wali Kelas' },
  { id: 'promotion', label: 'Kenaikan Kelas', icon: TrendingUp, category: 'Wali Kelas' },
  { id: 'leger_rapor', label: 'Rapor & Leger', icon: Printer, category: 'Pelaporan' },
  { id: 'reports', label: 'Laporan Rekapitulasi', icon: FileText, category: 'Pelaporan' },
  { id: 'documents', label: 'Generator Surat', icon: FileText, category: 'Pelaporan' },
  { id: 'calendar', label: 'Kalender Akademik', icon: Calendar, category: 'Sekolah' },
  { id: 'announcements', label: 'Pengumuman', icon: Megaphone, category: 'Sekolah' },
  { id: 'master', label: 'Data Master', icon: Database, category: 'Sistem' },
  { id: 'audit_logs', label: 'Log Audit & Aktivitas', icon: ShieldAlert, category: 'Sistem' },
  { id: 'documentation', label: 'Panduan & Tutorial', icon: BookMarked, category: 'Sistem' },
  { id: 'settings', label: 'Pengaturan Sekolah', icon: Settings, category: 'Sistem' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const categories = ['Utama', 'Akademik', 'Kesiswaan', 'Wali Kelas', 'Pelaporan', 'Sekolah', 'Sistem'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {categories.map((cat) => {
            const itemsInCat = navItems.filter((i) => i.category === cat);
            if (itemsInCat.length === 0) return null;
            return (
              <div key={cat} className="space-y-1">
                <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {cat}
                </p>
                <div className="space-y-0.5 mt-1">
                  {itemsInCat.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-emerald-800 text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
          <p className="text-[11px] font-bold text-slate-700">SMP NEGERI 7 SENTANI</p>
          <p className="text-[10px] text-slate-500">Kabupaten Jayapura, Papua</p>
        </div>
      </aside>
    </>
  );
};
