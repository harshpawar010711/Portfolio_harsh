import desert from '@/assets/desert-film.jpg';
import runner from '@/assets/runner-film.jpg';
import abstract from '@/assets/abstract-film.jpg';
import sampleFilm from '@/assets/sample-film.mp4.asset.json';

export const categories = ['All', 'AI Generation', 'Long Form', 'Short Form / Reels', 'Clipping'] as const;
export type Category = typeof categories[number];
export interface Project { id: number; title: string; category: Category; image: string; duration: string; metric: string; url: string; description: string; tools: string[]; }
export const projects: Project[] = [
  { id: 1, title: 'Beyond the ordinary', category: 'Long Form', image: desert, duration: '03:42', metric: 'Cinematic storytelling', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', description: 'A cinematic journey built around space, silence, and discovery. Deliberate pacing, layered ambient sound, and a warm color grade turn a collection of landscapes into a story worth staying for.', tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'] },
  { id: 2, title: 'Built for the next move', category: 'Short Form / Reels', image: runner, duration: '00:30', metric: 'Hook-first brand film', url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', description: 'A kinetic sports concept with a strong opening hook, rhythmic cuts, and tightly synchronized sound design. Every frame is built to carry the momentum into the next.', tools: ['Premiere Pro', 'After Effects'] },
  { id: 3, title: 'A world not yet imagined', category: 'AI Generation', image: abstract, duration: '00:48', metric: 'AI concept piece', url: 'https://www.youtube.com/watch?v=YE7VzlLtp-4', description: 'An exploration of material, movement, and impossible forms. Generative experimentation meets precise compositing and intentional editorial rhythm.', tools: ['Runway', 'Kling', 'After Effects'] },
  { id: 4, title: 'The moments that matter', category: 'Clipping', image: runner, duration: '00:45', metric: 'Precision highlight edit', url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', description: 'A focused highlight edit that extracts the strongest moments, trims the noise, and builds a self-contained narrative with clean captions and natural pacing.', tools: ['Premiere Pro', 'After Effects'] },
  { id: 5, title: 'Somewhere, slowly', category: 'Long Form', image: desert, duration: '05:16', metric: 'Travel documentary', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', description: 'An atmospheric travel concept balancing immersive landscape sequences with human moments, a considered score, and consistent cinematic color.', tools: ['DaVinci Resolve', 'Premiere Pro'] },
  { id: 6, title: 'Form follows feeling', category: 'AI Generation', image: abstract, duration: '00:24', metric: 'Generative motion study', url: 'https://www.youtube.com/watch?v=YE7VzlLtp-4', description: 'A tactile motion study combining generative imagery, sculptural forms, and carefully timed sound to create a distinctive visual identity.', tools: ['Runway', 'After Effects', 'DaVinci Resolve'] },
];
export interface HubVideo { title: string; type: string; duration: string; url: string; }
export const hubVideos: [HubVideo, HubVideo, HubVideo, HubVideo] = [
  { title: 'Big Buck Bunny', type: 'YouTube', duration: '09:56', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
  { title: 'Sintel — cinematic short', type: 'YouTube', duration: '14:48', url: 'https://www.youtube.com/watch?v=eRsGyueVLvQ' },
  { title: 'Tears of Steel', type: 'YouTube', duration: '12:14', url: 'https://www.youtube.com/watch?v=R6MlUcmOul8' },
  { title: 'Beyond the ordinary — motion study', type: 'MP4', duration: '00:08', url: sampleFilm.url },
];
export function resolveVideo(value: string): { type: 'embed' | 'video'; src: string } | null {
  if (value === sampleFilm.url) return { type: 'video', src: sampleFilm.url };
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be' || host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const id = host === 'youtu.be' ? url.pathname.split('/')[1] : url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
      return id && /^[\w-]{11}$/.test(id) ? { type: 'embed', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` } : null;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') { const id = url.pathname.match(/\d+/)?.[0]; return id ? { type: 'embed', src: `https://player.vimeo.com/video/${id}?autoplay=1` } : null; }
    if (host === 'loom.com') { const id = url.pathname.match(/\/(?:share|embed)\/([\w-]+)/)?.[1]; return id ? { type: 'embed', src: `https://www.loom.com/embed/${id}` } : null; }
    if (host === 'drive.google.com') { const id = url.pathname.match(/\/d\/([\w-]+)/)?.[1] || url.searchParams.get('id'); return id ? { type: 'embed', src: `https://drive.google.com/file/d/${id}/preview` } : null; }
    if (/\.(mp4|webm|ogg|m3u8)$/i.test(url.pathname)) return { type: 'video', src: url.href };
    return null;
  } catch { return null; }
}