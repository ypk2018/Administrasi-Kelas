import React from 'react';
import { AuditLog } from '../types';
import { ShieldAlert } from 'lucide-react';

interface AuditLogViewProps {
  auditLogs: AuditLog[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ auditLogs }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Log Audit & Riwayat Aktivitas Sistem</h2>
        <p className="text-xs text-slate-500">Pencatatan keamanan dan aktivitas pengguna (Login, Create, Update, Delete, Export).</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
            <tr>
              <th className="p-4">Waktu</th>
              <th className="p-4">Username</th>
              <th className="p-4">Role</th>
              <th className="p-4">Modul</th>
              <th className="p-4">Aksi</th>
              <th className="p-4">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-slate-500">{log.timestamp}</td>
                <td className="p-4 font-bold text-slate-900">{log.username}</td>
                <td className="p-4 font-medium">{log.role}</td>
                <td className="p-4 font-medium text-emerald-800">{log.module}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-bold text-[10px]">
                    {log.action}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
