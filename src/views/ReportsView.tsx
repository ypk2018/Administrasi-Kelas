import React from 'react';
import { SchoolConfig, Student, Rombel } from '../types';
import { FileText, Printer, Download } from 'lucide-react';

interface ReportsViewProps {
  config: SchoolConfig;
  students: Student[];
  rombels: Rombel[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ config, students, rombels }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Laporan Rekapitulasi Administrasi Kelas</h2>
        <p className="text-xs text-slate-500">Unduh dan cetak rekapitulasi data siswa, presensi, pelanggaran, dan prestasi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Rekapitulasi Data Siswa Keseluruhan', desc: 'Daftar lengkap identitas siswa per rombel dan orang tua.', count: `${students.length} Siswa` },
          { title: 'Rekapitulasi Kehadiran Bulanan', desc: 'Akumulasi Hadir, Sakit, Izin, dan Tanpa Keterangan.', count: 'Bulanan' },
          { title: 'Rekapitulasi Prestasi Peserta Didik', desc: 'Daftar penghargaan akademik dan non-akademik.', count: '2 Prestasi' },
          { title: 'Rekapitulasi Pelanggaran & Tata Tertib', desc: 'Catatan kedisiplinan dan pembinaan siswa.', count: '1 Pelanggaran' },
        ].map((rep, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{rep.count}</span>
                <FileText className="w-5 h-5 text-emerald-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
              <p className="text-xs text-slate-500">{rep.desc}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
