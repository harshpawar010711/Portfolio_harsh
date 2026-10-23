import { useEffect, useRef } from 'react';

const HOT = 'a, button, input, select, textarea, summary, label, [role="button"], [role="link"]';
const BIG = '.project-card, .reel-button, .contact-arrow, .hub-entry, .more-work, .booking-cta, .hero-film';

export function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;
    let on = false;

    const paint = () => {
      x += (targetX - x) * 0.3;
      y += (targetY - y) * 0.3;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(paint);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!on) { on = true; node.dataset["on"] = 'true'; x = targetX; y = targetY; }
      const element = event.target as HTMLElement | null;
      node.dataset["hot"] = element?.closest(BIG) ? 'lg' : element?.closest(HOT) ? 'hot' : 'idle';
    };

    const press = () => { node.dataset["down"] = 'true'; };
    const release = () => { node.dataset["down"] = 'false'; };
    const leave = () => { node.dataset["on"] = 'false'; node.dataset["hot"] = 'idle'; node.dataset["down"] = 'false'; };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    window.addEventListener('pointercancel', release, { passive: true });
    window.addEventListener('blur', release);
    document.documentElement.addEventListener('pointerleave', leave);
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('blur', release);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div ref={ref} className="cursor-halo" data-on="false" data-hot="idle" data-down="false" aria-hidden="true"><span /></div>;
}
