import React from 'react';
import { Rombel } from '../types';
import { BarChart3, CheckCircle2 } from 'lucide-react';

interface MonitoringViewProps {
  rombels: Rombel[];
}

export const MonitoringView: React.FC<MonitoringViewProps> = ({ rombels }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Monitoring Administrasi Kelas</h2>
        <p className="text-xs text-slate-500">Indikator kelengkapan administrasi aplikasi per rombel (100% Lengkap, 75-99% Hampir lengkap, dll).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rombels.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Kelas {r.name}</h3>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Lengkap
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { label: 'Data Peserta Didik', status: '100% Selesai' },
                { label: 'Data Orang Tua / Wali', status: '100% Selesai' },
                { label: 'Presensi Kehadiran', status: 'Aktif' },
                { label: 'Kelengkapan Nilai Mapel', status: 'Lengkap' },
                { label: 'Catatan Wali Kelas', status: 'Diperbarui' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-bold text-emerald-800">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
