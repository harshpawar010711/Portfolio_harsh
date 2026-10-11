import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { resolveVideo } from '@/lib/portfolio';

export function VideoPlayer({ url, title, autoplay = true }: { url: string; title: string; autoplay?: boolean }) {
  const source = resolveVideo(url);
  const [failed, setFailed] = useState(false);
  if (!source) return <div className="player-error">This video link isn’t supported.</div>;
  return <div className="video-player">
    {source.type === 'video' ? <video key={source.src} src={source.src} controls autoPlay={autoplay} playsInline onError={() => setFailed(true)} aria-label={title} /> : <iframe key={source.src} src={autoplay ? source.src : source.src.replace('autoplay=1', 'autoplay=0')} title={title} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}
    {failed && <div className="player-error"><AlertCircle size={20} />Video unavailable. Try another link.</div>}
  </div>;
}