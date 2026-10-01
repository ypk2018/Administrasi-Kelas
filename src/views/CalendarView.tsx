import React from 'react';
import { AcademicCalendarEvent } from '../types';
import { Calendar } from 'lucide-react';

interface CalendarViewProps {
  events: AcademicCalendarEvent[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Kalender Akademik Sekolah</h2>
        <p className="text-xs text-slate-500">Agenda kegiatan, asesmen, libur, dan rapat SMP Negeri 7 Sentani Tahun Pelajaran 2026/2027.</p>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-xs">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold">{ev.category}</span>
              <span className="text-xs font-mono font-medium text-slate-500">{ev.startDate} s.d. {ev.endDate}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{ev.title}</h3>
            <p className="text-xs text-slate-600">{ev.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
