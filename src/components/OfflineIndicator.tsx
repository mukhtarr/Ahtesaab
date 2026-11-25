import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="mx-4 mt-2 px-3.5 py-2 rounded-2xl bg-[#B4833E] text-white text-xs font-medium flex items-center gap-2 shadow-sm">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Offline Mode · Built-in Quran, Hadees &amp; Azkaar remain available.</span>
    </div>
  );
}
