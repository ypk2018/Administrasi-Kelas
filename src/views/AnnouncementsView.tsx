import React from 'react';
import { Announcement } from '../types';
import { Megaphone, Calendar } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ announcements }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Pengumuman Resmi Sekolah</h2>
        <p className="text-xs text-slate-500">Informasi dan instruksi penting dari Kepala Sekolah dan manajemen.</p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold uppercase">{ann.targetRole}</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {ann.date}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{ann.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold">
              Penulis: {ann.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
