import React, { useState } from 'react';
import { SchoolConfig, Student } from '../types';
import { FileText, Printer } from 'lucide-react';

interface DocumentsViewProps {
  config: SchoolConfig;
  students: Student[];
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ config, students }) => {
  const [docType, setDocType] = useState<'panggilan' | 'keterangan' | 'pernyataan'>('panggilan');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const student = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Generator Surat & Dokumen Sekolah</h2>
          <p className="text-xs text-slate-500">Buat surat panggilan orang tua, surat keterangan siswa, dan berita acara secara instan dengan format rapi.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Dokumen</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 no-print">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700">Jenis Surat:</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-700"
          >
            <option value="panggilan">Surat Panggilan Orang Tua / Wali</option>
            <option value="keterangan">Surat Keterangan Siswa Aktif</option>
            <option value="pernyataan">Surat Pernyataan Siswa</option>
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700">Nama Siswa:</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-700"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.fullName} (Kelas {s.classId})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Printable Document Preview */}
      <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8 max-w-3xl mx-auto">
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

        {docType === 'panggilan' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-1">
                <div className="grid grid-cols-[70px_10px_1fr]">
                  <span>Nomor</span><span>:</span><span>421.3 / _____ / SMPN 7 / 2026</span>
                </div>
                <div className="grid grid-cols-[70px_10px_1fr]">
                  <span>Lampiran</span><span>:</span><span>-</span>
                </div>
                <div className="grid grid-cols-[70px_10px_1fr]">
                  <span>Perihal</span><span>:</span><span><strong>Undangan / Panggilan Orang Tua Siswa</strong></span>
                </div>
              </div>
              <p>{config.signatureCity}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="pt-2">
              <p>Kepada Yth.<br />Bapak/Ibu Orang Tua / Wali dari:<br /><strong>{student?.fullName}</strong> (Kelas {student?.classId})<br />di Tempat</p>
            </div>

            <div className="space-y-3 pt-2">
              <p>Dengan hormat,</p>
              <p>Sehubungan dengan perkembangan pembinaan dan kegiatan belajar peserta didik di sekolah, kami mengharapkan kehadiran Bapak/Ibu Orang Tua/Wali murid pada:</p>
              
              <div className="pl-4 space-y-1.5">
                <div className="grid grid-cols-[110px_10px_1fr]">
                  <span>Hari / Tanggal</span><span>:</span><span>Jumat, 2 Oktober 2026</span>
                </div>
                <div className="grid grid-cols-[110px_10px_1fr]">
                  <span>Pukul</span><span>:</span><span>09.00 WIT s.d. selesai</span>
                </div>
                <div className="grid grid-cols-[110px_10px_1fr]">
                  <span>Tempat</span><span>:</span><span>Ruang Guru {config.name}</span>
                </div>
                <div className="grid grid-cols-[110px_10px_1fr]">
                  <span>Keperluan</span><span>:</span><span>Koordinasi dan pembinaan kemajuan belajar siswa</span>
                </div>
              </div>

              <p>Mengingat pentingnya hal tersebut, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya.</p>
              <p>Demikian undangan ini kami sampaikan, atas perhatian dan kerjasama Bapak/Ibu kami ucapkan terima kasih.</p>
            </div>

            <div className="pt-8 flex justify-end text-center">
              <div className="space-y-16">
                <p>Kepala {config.name}<br />Wali Kelas</p>
                <div>
                  <p className="font-bold underline">Sartika Wandikbo, S.Pd.</p>
                  <p className="font-mono">NIP. 198205142008012001</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {docType === 'keterangan' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="text-center space-y-1">
              <h2 className="text-sm font-bold uppercase underline">SURAT KETERANGAN SISWA AKTIF</h2>
              <p className="font-mono">Nomor: 421.3 / _____ / SMPN 7 / 2026</p>
            </div>

            <div className="space-y-3 pt-4">
              <p>Yang bertanda tangan di bawah ini Kepala {config.name}, Kabupaten Jayapura, Provinsi Papua, menerangkan bahwa:</p>
              
              <div className="pl-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="grid grid-cols-[130px_10px_1fr]">
                  <span>Nama Lengkap</span><span>:</span><strong className="text-slate-900">{student?.fullName}</strong>
                </div>
                <div className="grid grid-cols-[130px_10px_1fr]">
                  <span>NIS / NISN</span><span>:</span><strong className="font-mono">{student?.nis} / {student?.nisn}</strong>
                </div>
                <div className="grid grid-cols-[130px_10px_1fr]">
                  <span>Tempat, Tgl Lahir</span><span>:</span><span>{student?.birthPlace}, {student?.birthDate}</span>
                </div>
                <div className="grid grid-cols-[130px_10px_1fr]">
                  <span>Kelas</span><span>:</span><span>{student?.classId}</span>
                </div>
                <div className="grid grid-cols-[130px_10px_1fr]">
                  <span>Alamat</span><span>:</span><span>{student?.address}, {student?.village}, Sentani</span>
                </div>
              </div>

              <p>Adalah benar-benar peserta didik yang aktif belajar pada {config.name} Tahun Pelajaran {config.currentAcademicYear}.</p>
              <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
            </div>

            <div className="pt-12 flex justify-between text-center">
              <div className="space-y-16">
                <p>Mengetahui,<br />Kepala {config.name}</p>
                <div>
                  <p className="font-bold underline">{config.headmasterName}</p>
                  <p className="font-mono">NIP. {config.headmasterNip}</p>
                </div>
              </div>
              <div className="space-y-16 text-center">
                <p>{config.signatureCity}, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />Wali Kelas</p>
                <div>
                  <p className="font-bold underline">Sartika Wandikbo, S.Pd.</p>
                  <p className="font-mono">NIP. 198205142008012001</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {docType === 'pernyataan' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="text-center space-y-1">
              <h2 className="text-sm font-bold uppercase underline">SURAT PERNYATAAN PESERTA DIDIK</h2>
            </div>
            <p className="text-slate-600">Surat pernyataan komitmen disiplin dan tata tertib sekolah bagi peserta didik {config.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
};
