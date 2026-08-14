// components/AnnouncementBar.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { ANNOUNCEMENTS } from '@/data/Announcements';

const AZADI_DEADLINE = new Date('2026-08-20T00:00:00');
const isBeforeAzadiDeadline = new Date() <= AZADI_DEADLINE;

export default function AnnouncementBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  const activeAnnouncements = ANNOUNCEMENTS.filter((a) => {
    if (a.id === 'azadi-discount') return isBeforeAzadiDeadline;
    return true;
  });

  const tickerText = activeAnnouncements.map((a) => `${a.emoji} ${a.text}`).join('   •   ');

  const barTheme = isBeforeAzadiDeadline
    ? 'bg-gradient-to-r from-green-700 via-green-600 to-emerald-600'
    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600';

  return (
    <div className={`relative w-full overflow-hidden text-white ${barTheme}`}>
      <div className="flex items-center py-2 pl-4 pr-10">
        <div className="flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap animate-[ticker_35s_linear_infinite]">
            <span className="px-4 text-xs font-semibold sm:text-sm">{tickerText}   •   </span>
            <span className="px-4 text-xs font-semibold sm:text-sm" aria-hidden="true">{tickerText}   •   </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Close announcement"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}