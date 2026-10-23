import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Play, Film, Sparkles, Scissors, Link as LinkIcon, Copy, Check, Mail, Instagram, Linkedin, CircleCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VideoPlayer } from '@/components/portfolio/video-player';
import { CursorHalo } from '@/components/portfolio/cursor-halo';
import { projects, categories, hubVideos, showreel, resolveVideo, type Project, type Category } from '@/lib/portfolio';
import desert from '@/assets/desert-film.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Harsh Pawar — Video Editor & Visual Specialist' },
    { name: 'description', content: 'Cinematic storytelling, high-retention edits, and next-generation AI video. Explore the selected work and creative pipeline of Harsh Pawar.' },
    { property: 'og:title', content: 'Harsh Pawar — Video Editor & Visual Specialist' },
    { property: 'og:description', content: 'Every frame has a purpose. Selected cinematic, short-form, and AI-generated work by Harsh Pawar.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

function Stat({ value, suffix, children }: { value: number; suffix: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return; }
      const start = performance.now();
      const tick = (now: number) => { const progress = Math.min((now - start) / 1100, 1); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <div className="stat" ref={ref}><strong>{count}<span>{suffix}</span></strong><p>{children}</p></div>;
}

function Portfolio() {
  const [filter, setFilter] = useState<Category>('All');
  const [moreOpen, setMoreOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const openReel = () => setSelected(showreel);
  const shownProjects = useMemo(() => {
    const list = projects.filter(project => filter === 'All' || project.category === filter);
    if (filter !== 'All') return list;
    const seen = new Map<Category, number>();
    return list.filter(project => { const count = (seen.get(project.category) ?? 0) + 1; seen.set(project.category, count); return count <= 1; });
  }, [filter]);
  const extraProjects = useMemo(() => projects.filter(project => (filter === 'All' || project.category === filter) && !shownProjects.includes(project)), [filter, shownProjects]);
  const visibleProjects = moreOpen ? [...shownProjects, ...extraProjects] : shownProjects;
  const [activeVideo, setActiveVideo] = useState({ ...hubVideos[0]! });
  const [playing, setPlaying] = useState(false);
  const [videoInput, setVideoInput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = 'harshpawargk@gmail.com';
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setCopyError(false); if (copyTimer.current) clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2400); }
    catch { setCopyError(true); }
  };
  const loadLink = (event: React.FormEvent) => {
    event.preventDefault();
    if (!resolveVideo(videoInput)) { setError('Enter a valid YouTube, Instagram, Vimeo, Loom, Google Drive, or direct video link.'); return; }
    setActiveVideo({ title: 'Your linked video', type: 'Direct link', duration: '', url: videoInput.trim(), image: '' }); setPlaying(true); setError('');
  };
  return <>
    <CursorHalo />
    <header className="navbar"><div className="container-width nav-inner">
      <a href="#top" className="brand" aria-label="Harsh Pawar home"><span className="monogram">h.</span>Harsh Pawar<span className="text-muted-foreground">®</span></a>
      <nav className="nav-links" aria-label="Main navigation"><a href="#work">Selected work</a><a href="#watch">Direct video hub</a><a href="#pipeline">About & pipeline</a><a href="#contact">Contact</a></nav>
      <div className="nav-actions"><span className="availability"><i />Available for work</span><Button asChild size="sm"><a href="#contact">Get in touch<ArrowUpRight /></a></Button></div>
    </div></header>
    <main id="top">
      <section className="hero container-width">
        <div className="hero-top"><span className="eyebrow"><i />Independent editor. Intentional storyteller.</span><span className="hero-edition">PORTFOLIO / 2026</span></div>
        <h1 className="hero-heading">Video Editor &<br /><span className="highlight">Visual Specialist.</span></h1>
        <div className="hero-summary"><p>Crafting high-retention short-form content, cinematic long-form cuts, precision clipping, and next-gen AI video pipelines.</p><div className="hero-actions"><Button asChild size="lg"><a href="#work">Explore work<ArrowDown /></a></Button><Button variant="outline" size="lg" onClick={openReel}><Play size={13} />Quick watch reel</Button></div></div>
        <div className="hero-film"><img src={desert} width={1920} height={1024} alt="A lone traveler crossing sunlit desert dunes beneath rugged mountains" fetchPriority="high" /><div className="film-top"><span className="film-label">THE SHOWREEL</span><span className="film-label">2026</span></div><div className="film-bottom"><div><p>A FEW FRAMES. A WORLD OF POSSIBILITIES.</p><h2>Every frame has a purpose.</h2></div><div className="flex items-center"><span className="film-code">PLAY REEL ↗</span><Button className="reel-button ml-4" aria-label="Play showreel" onClick={openReel}><Play fill="currentColor" /></Button></div></div></div>
        <div className="stats"><Stat value={10} suffix="M+">Views generated<br />and counting</Stat><Stat value={150} suffix="+">Projects delivered<br />with intention</Stat><Stat value={100} suffix="%">Focus on retention<br />from the first frame</Stat></div>
      </section>
      <section id="work" className="section container-width">
        <div className="section-heading"><div><span className="eyebrow"><i />01 / The portfolio</span><h2>Selected work<span className="text-muted-foreground">.</span></h2></div><p>Different formats. One obsession.<br />Making content impossible to skip.</p></div>
        <div className="filters" aria-label="Project category filters">{categories.filter(category => category === 'All' || projects.some(p => p.category === category)).map(category => <Button key={category} variant="ghost" className={`filter ${filter === category ? 'filter-active' : 'bg-secondary text-muted-foreground'}`} aria-pressed={filter === category} onClick={() => { setFilter(category); setMoreOpen(false); }}>{category}{category === 'All' && <span className="opacity-50 ml-1">09</span>}</Button>)}</div>
        <div className="project-grid">{visibleProjects.map(project => <Button key={project.id} variant="ghost" className="project-card" onClick={() => setSelected(project)} aria-label={`View project: ${project.title}`}><div className="project-thumbnail portrait"><img src={project.image} loading="lazy" width={1536} height={864} alt={project.title} /><div className="project-play"><span><Play fill="currentColor" /></span></div><span className="duration">{project.duration}</span></div><div className="project-info"><h3><span className="project-title">{project.title}</span><ArrowUpRight /></h3><div className="project-meta"><span className={`category-tag ${project.category === 'AI Generation' ? 'ai' : project.category === 'Short Form / Reels' ? 'short' : ''}`}>{project.category === 'Short Form / Reels' ? 'Short Form' : project.category}</span>{project.client && <span className="client-tag">{project.client.name}</span>}<span>{project.metric}</span></div></div></Button>)}</div>
        {extraProjects.length > 0 && <button type="button" className="more-work" aria-expanded={moreOpen} onClick={() => setMoreOpen(open => !open)}><span className="more-work-label">{moreOpen ? 'Show less' : 'More work'}</span><span className="more-work-count">{moreOpen ? 'Collapse' : `${extraProjects.length} more project${extraProjects.length === 1 ? '' : 's'}`}</span><ChevronDown className="more-work-chevron" size={14} /></button>}
        <p className="project-note"><CircleCheck size={12} />Selected client work · Streams from YouTube & Instagram</p>
      </section>
      <div className="clients-band"><div className="container-width"><span className="clients-label">Also edited for</span><div className="clients-chips"><a href="https://www.instagram.com/the_bihar_.story/reels/" target="_blank" rel="noreferrer">The Bihar Story</a><a href="https://www.instagram.com/the_uttar_pradesh_story/" target="_blank" rel="noreferrer">The Uttar Pradesh Story</a><a href="https://www.instagram.com/foaidindia.in/reels/" target="_blank" rel="noreferrer">FOAID</a></div></div></div>
      <section id="watch" className="section hub-section"><div className="container-width">
        <div className="section-heading"><div><span className="eyebrow"><i />02 / Press play</span><h2>Less clicking. More watching.</h2></div><p>A direct line to the moving image.<br />A few favorites, all in one place.</p></div>
        <div className="hub-layout"><div className="hub-vertical">{playing ? <VideoPlayer key={activeVideo.url} url={activeVideo.url} title={activeVideo.title} /> : <div className="player-poster"><img src={desert} alt="Desert landscape video poster" loading="lazy" width={1920} height={1024} /><div><Button className="reel-button" aria-label="Play selected video" onClick={() => setPlaying(true)}><Play fill="currentColor" /></Button><p>{activeVideo.title}</p></div></div>}<div className="player-caption"><strong>{activeVideo.title}</strong><span>{activeVideo.type} · REEL</span></div><form onSubmit={loadLink} className="link-input-form"><LinkIcon /><input type="url" aria-label="Paste a video link" placeholder="Paste a YouTube, Vimeo, Loom, Drive or MP4 link…" value={videoInput} onChange={event => { setVideoInput(event.target.value); setError(''); }} required /><Button size="sm" type="submit">Load video<ArrowRight /></Button></form>{error && <p role="alert" className="link-error">{error}</p>}</div>
        <div className="hub-list"><div className="hub-list-heading">THE DIRECT VIDEO HUB<span>05 REELS</span></div>{hubVideos.map((video, index) => <Button key={video.url} className={`hub-entry ${activeVideo.url === video.url ? 'active' : ''}`} variant="ghost" aria-pressed={activeVideo.url === video.url} onClick={() => { setActiveVideo(video); setPlaying(true); setError(''); }}><img className="hub-thumb" src={video.image} alt={video.title} loading="lazy" width={720} height={1280} /><span className="hub-number">0{index + 1}</span><span className="hub-entry-copy"><strong>{video.title}</strong><small>{video.type} · {video.duration}</small></span>{activeVideo.url === video.url && playing ? <span className="flex gap-0.5" aria-label="Now playing"><span className="h-3 w-0.5 bg-foreground" /><span className="h-4 w-0.5 bg-foreground" /><span className="h-2 w-0.5 bg-foreground" /></span> : <Play size={14} />}</Button>)}</div></div>
      </div></section>
      <section id="pipeline" className="section container-width"><div className="section-heading"><div><span className="eyebrow"><i />03 / Behind the frames</span><h2>Creative instinct. Technical precision.</h2></div><p>I connect story, sound, and emerging tools<br />to turn raw ideas into finished impact.</p></div>
        <div className="toolkit-grid">{[{ title: 'The post-production toolkit', icon: Film, tone: '', text: 'From the first assembly to the final grade. A complete post-production workflow, built around the story.', tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'] }, { title: 'The next-gen AI pipeline', icon: Sparkles, tone: 'lime', text: 'Human-led creativity. AI-powered possibilities. Generative video and compositing that go beyond the expected.', tags: ['Runway', 'Kling AI', 'Generative video', 'AI compositing'] }, { title: 'The retention-first mindset', icon: Scissors, tone: 'amber', text: 'Hooks that stop the scroll. Pacing that holds attention. Every cut is a decision to keep your audience watching.', tags: ['Hook architecture', 'Dynamic typography', 'Sound design', 'Pacing'] }].map((tool, index) => <article className="toolkit-card" key={tool.title}><div className="toolkit-top"><div className={`toolkit-icon ${tool.tone}`}><tool.icon size={21} strokeWidth={1.5} /></div><span>0{index + 1}</span></div><h3>{tool.title}</h3><p>{tool.text}</p><div className="toolkit-tags">{tool.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        <div className="pipeline"><span><b>01</b>Understand the story</span><ArrowRight size={14} /><span><b>02</b>Find the rhythm</span><ArrowRight size={14} /><span><b>03</b>Craft every detail</span><ArrowRight size={14} /><span><b>04</b>Deliver the impact</span></div>
      </section>
    </main>
    <footer id="contact" className="contact-section"><div className="container-width"><div className="contact-top"><div><span className="eyebrow"><i />04 / Make something that moves</span><h2>Let’s build high-impact<br />edits together.</h2></div><a className="contact-arrow" href={`mailto:${email}`} aria-label="Open mail app"><ArrowUpRight strokeWidth={1.3} /></a></div><div className="contact-booking"><div className="booking-head"><div><span className="booking-label">BOOK A CALL</span><h3>Prefer to talk it through?</h3><p>Pick a slot that suits you — a short call to scope your edit, timeline, and budget.</p></div><span className="booking-badge"><i />Live scheduling · Calendly</span></div><div className="booking-cta-row"><a className="booking-cta" href="https://calendly.com/harshpawargk" target="_blank" rel="noreferrer">Book a 30-min call<ArrowUpRight size={14} /></a><span className="booking-hint">Opens Calendly in a new tab</span></div></div><div className="contact-bottom"><div><div className="email-card"><a href={`mailto:${email}`}><Mail size={14} className="inline mr-2" />{email}</a><Button variant="ghost" size="sm" onClick={copyEmail}>{copied ? <Check /> : <Copy />}{copied ? 'Copied!' : 'Copy email'}</Button></div><span className="sr-only" role="status">{copied ? 'Email copied to clipboard' : ''}</span>{copyError && <p role="alert" className="link-error">Copy unavailable. Select the email above or open your mail app.</p>}</div><div className="socials"><a href="https://www.instagram.com/harshpawar_0711/" target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram"><Instagram /></a><a href="https://www.linkedin.com/in/harsh-pawar-1a5661222/" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><Linkedin /></a><a href="https://www.upwork.com/freelancers/~0155a697a4fae6160f?mp_source=share" target="_blank" rel="noreferrer" title="Upwork" aria-label="Upwork"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/></svg></a></div></div><div className="footer-line"><span>© 2026 Harsh Pawar. All frames reserved.</span><span>Made with intention. Edited with obsession.</span><a href="#top" className="text-foreground flex items-center gap-1">Back to top<ArrowUpRight size={11} /></a></div></div></footer>
    <Sheet open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><SheetContent className="detail-sheet">{selected && <><span className="eyebrow"><i />{selected.id === 6 ? 'Showreel' : `Selected project / 0${selected.id}`}</span><SheetTitle className="detail-title">{selected.title}</SheetTitle><div className="project-meta mb-6"><span className={`category-tag ${selected.id === 6 ? '' : 'ai'}`}>{selected.category}</span><span>{selected.id === 6 ? 'YouTube · Showreel' : `${selected.duration} · CLIENT REEL`}</span></div><div className={selected.url.includes('/shorts/') || selected.url.includes('/reel') ? 'player-vertical' : ''}><VideoPlayer key={selected.title} url={selected.url} title={selected.title} /></div><SheetDescription className="detail-description">{selected.description}</SheetDescription><div className="detail-section"><h3>Tools of the trade</h3><div className="toolkit-tags">{selected.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>{selected.client && <div className="detail-section"><h3>Edited for</h3><a className="client-link" href={selected.client.url} target="_blank" rel="noreferrer">{selected.client.name}<ArrowUpRight size={12} /></a></div>}<div className="detail-section"><h3>Role & deliverables</h3><div className="deliverables">{['Pacing & storytelling', 'Sound design', 'Color grading', 'Hook architecture'].map(role => <span key={role}><Check size={13} />{role}</span>)}</div></div><div className="detail-section"><h3>The editing challenge</h3><p className="text-xs text-muted-foreground leading-7">Finding the balance between visual impact and narrative clarity. Building a compelling opening, maintaining momentum through every cut, and bringing sound and color together into one cohesive experience.</p></div><p className="project-note">{selected.id === 0 ? 'Live showreel · Player streams from YouTube.' : 'Player streams from YouTube, Instagram or Google Drive.'}</p><Button asChild className="mt-7 w-full"><a href={`mailto:${email}`}>Let’s create something like this<ArrowUpRight /></a></Button></>}</SheetContent></Sheet>
  </>;
}
