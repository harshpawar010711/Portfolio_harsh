import aiTab from '@/assets/ai-tab.jpg';
import aiEp6 from '@/assets/ai-ep6.jpg';
import aiGevj from '@/assets/ai-gevj.jpg';
import reelDream916 from '@/assets/reel-dream-916.jpg';
import reelStory916 from '@/assets/reel-story-916.jpg';
import reelMarketing916 from '@/assets/reel-marketing-916.jpg';
import reelSilence916 from '@/assets/reel-silence-916.jpg';
import reelKotak916 from '@/assets/reel-kotak-916.jpg';
import reelVirality916 from '@/assets/reel-virality-916.jpg';
import showreel916 from '@/assets/showreel-916.jpg';
import reelDream from '@/assets/reel-dream.jpg';
import reelVirality from '@/assets/reel-virality.jpg';
import reelStory from '@/assets/reel-story.jpg';
import reelMarketing from '@/assets/reel-marketing.jpg';
import reelSilence from '@/assets/reel-silence.jpg';
import sampleFilm from '@/assets/sample-film.mp4.asset.json';

export const categories = ['All', 'AI Generation', 'Long Form', 'Short Form / Reels', 'Clipping'] as const;
export type Category = typeof categories[number];
export interface Project { id: number; title: string; category: Category; image: string; duration: string; metric: string; url: string; description: string; tools: string[]; client?: { name: string; url: string }; }

export const showreel: Project = { id: 6, title: '2024 | Video Editor Show Reel', category: 'Long Form', image: showreel916, duration: '', metric: 'YouTube showreel', url: 'https://youtu.be/r3r-gAOrdxo', description: 'One pass through recent edits — opening hooks, pacing that holds, and sound and grade working together. The fastest way to see how a raw folder of footage becomes something people stay for.', tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'] };

export const projects: Project[] = [
  { id: 1, title: 'Find your dream job', category: 'Short Form / Reels', image: reelDream916, duration: 'SHORT', metric: 'Career storytelling short', url: 'https://youtube.com/shorts/9dnPIPjoMPA', client: { name: 'Think School', url: 'https://www.youtube.com/@ThinkSchool' }, description: 'A career-advice short engineered for retention: a direct hook in the first three seconds, crisp captions riding the narration, and punch-ins that keep the explanation moving without a wasted frame.', tools: ['Premiere Pro', 'After Effects'] },
  { id: 2, title: 'Virality is not for everyone', category: 'Clipping', image: reelVirality, duration: 'REEL', metric: 'Podcast clip edit', url: 'https://www.instagram.com/reel/DRwHsO4kRB6/', client: { name: 'learn.kkcreate', url: 'https://www.instagram.com/learn.kkcreate/' }, description: 'A podcast moment cut for the feed. The strongest soundbite surfaces first, captions are timed to the delivery, and the story holds on its own — no full episode required.', tools: ['Premiere Pro', 'After Effects'] },
  { id: 3, title: 'Our full story', category: 'Short Form / Reels', image: reelStory916, duration: 'REEL', metric: 'Community event story', url: 'https://www.instagram.com/reel/DRHL92Lj_aj/', client: { name: 'sid.haldar', url: 'https://www.instagram.com/sid.haldar/' }, description: 'A narrative reel that folds an entire journey into one vertical cut — event footage, on-screen typography, and a beat-matched build that lands the payoff right where the loop closes.', tools: ['Premiere Pro', 'After Effects'] },
  { id: 4, title: 'Marketing genius', category: 'Short Form / Reels', image: reelMarketing916, duration: 'SHORT', metric: 'Business explainer short', url: 'https://youtube.com/shorts/NGk85Xwh88k', client: { name: 'Think School Hindi', url: 'https://www.youtube.com/@ThinkSchool_Hindi' }, description: 'A business breakdown compressed into a scroll-stopping short: annotated visuals, kinetic captions, and pacing that turns a case study into something people finish and share.', tools: ['Premiere Pro', 'After Effects'] },
  { id: 5, title: 'When silence becomes the final warning', category: 'Short Form / Reels', image: reelSilence916, duration: 'SHORT', metric: 'Narrative short', url: 'https://youtube.com/shorts/ssMpDIdG0Q8', client: { name: 'Adnan Adeeb', url: 'https://www.youtube.com/@adnanadeebx' }, description: 'A suspense-driven narrative short where the edit does the storytelling — held silences, deliberate sound design, and cuts that release tension exactly when the story needs it.', tools: ['Premiere Pro', 'DaVinci Resolve'] },
  { id: 7, title: 'TAB promo', category: 'AI Generation', image: aiTab, duration: 'AI', metric: 'AI-generated period drama promo', url: 'https://drive.google.com/file/d/1Rhwd379X7nDvG54Z5dQpe0IlAWGpaJjH/view', description: 'A cinematic promo built from AI-generated scenes — candlelit interiors, dramatic character beats and a trailer-style build, cut so the generated footage reads like a real production.', tools: ['AI video generation', 'Premiere Pro', 'After Effects'] },
  { id: 8, title: 'Episode 06', category: 'AI Generation', image: aiEp6, duration: 'AI', metric: 'AI-generated series episode', url: 'https://drive.google.com/file/d/1PbTjdaI5qeU5xjTF30iza24iC1Gc9lx9/view', description: 'An episode from an AI-generated vertical series. Generated shots are sequenced for continuity, paced for retention, and finished with sound design that carries the story between scenes.', tools: ['AI video generation', 'Premiere Pro'] },
  { id: 9, title: 'Night street sequence', category: 'AI Generation', image: aiGevj, duration: 'AI', metric: 'AI-generated cinematic sequence', url: 'https://drive.google.com/file/d/16ByU3z5i57tSJIUv1pzxX6MlYJoPHkrL/view', description: 'A moody night-time sequence made with generative video — street-light atmosphere, deliberate camera moves and a grade that keeps every generated shot feeling like one world.', tools: ['AI video generation', 'DaVinci Resolve'] },
  { id: 10, title: 'Guess The Year | Neology', category: 'Short Form / Reels', image: reelKotak916, duration: 'SHORT', metric: 'Brand campaign short', url: 'https://youtube.com/shorts/ZGZQy6ONPBU', client: { name: 'Kotak Securities', url: 'https://www.youtube.com/@kotakneo' }, description: 'A brand short for Kotak Securities\' Neology series — a "guess the year" quiz format built to make viewers lean in, answer, and stay for the reveal. Crisp motion typography and snappy cuts keep the game moving.', tools: ['Premiere Pro', 'After Effects'] },
  showreel,
];

export interface HubVideo { title: string; type: string; duration: string; url: string; image: string; }
export const hubVideos: HubVideo[] = [
  { title: 'Find your dream job', type: 'YouTube', duration: 'SHORT', url: 'https://youtube.com/shorts/9dnPIPjoMPA', image: reelDream916 },
  { title: 'Virality is not for everyone', type: 'Instagram', duration: 'REEL', url: 'https://www.instagram.com/reel/DRwHsO4kRB6/', image: reelVirality916 },
  { title: 'Our full story', type: 'Instagram', duration: 'REEL', url: 'https://www.instagram.com/reel/DRHL92Lj_aj/', image: reelStory916 },
  { title: 'Marketing genius', type: 'YouTube', duration: 'SHORT', url: 'https://youtube.com/shorts/NGk85Xwh88k', image: reelMarketing916 },
  { title: 'When silence becomes the final warning', type: 'YouTube', duration: 'SHORT', url: 'https://youtube.com/shorts/ssMpDIdG0Q8', image: reelSilence916 },
  { title: 'Guess The Year | Neology', type: 'YouTube', duration: 'SHORT', url: 'https://youtube.com/shorts/ZGZQy6ONPBU', image: reelKotak916 },
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
    if (host === 'instagram.com') { const id = url.pathname.match(/\/(?:reel|reels|p)\/([\w-]+)/)?.[1]; return id ? { type: 'embed', src: `https://www.instagram.com/reel/${id}/embed` } : null; }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') { const id = url.pathname.match(/\d+/)?.[0]; return id ? { type: 'embed', src: `https://player.vimeo.com/video/${id}?autoplay=1` } : null; }
    if (host === 'loom.com') { const id = url.pathname.match(/\/(?:share|embed)\/([\w-]+)/)?.[1]; return id ? { type: 'embed', src: `https://www.loom.com/embed/${id}` } : null; }
    if (host === 'drive.google.com') { const id = url.pathname.match(/\/d\/([\w-]+)/)?.[1] || url.searchParams.get('id'); return id ? { type: 'embed', src: `https://drive.google.com/file/d/${id}/preview` } : null; }
    if (/\.(mp4|webm|ogg|m3u8)$/i.test(url.pathname)) return { type: 'video', src: url.href };
    return null;
  } catch { return null; }
}
