import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const Outer = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.15s, width 0.15s, height 0.15s;
  mix-blend-mode: difference;
`;

const Inner = styled.div`
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
`;

export default function CustomCursor() {
  useTranslation();

  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return null;

  return <CursorInner />;
}

function CursorInner() {
  const outerRef = useRef(null);
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    xTo.current = gsap.quickTo(outerRef.current, 'x', { ease: 'power3', duration: 0.4 });
    yTo.current = gsap.quickTo(outerRef.current, 'y', { ease: 'power3', duration: 0.4 });

    gsap.set(outerRef.current, { xPercent: -50, yPercent: -50 });

    const onMove = (e) => {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
      setDot({ x: e.clientX, y: e.clientY });
    };

    const onEnter = () => {
      gsap.to(outerRef.current, { scale: 2, duration: 0.2, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(outerRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const observer = new MutationObserver(() => {
      const updated = document.querySelectorAll('a, button, [role="button"]');
      updated.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Outer ref={outerRef} />
      <Inner style={{ left: dot.x, top: dot.y }} />
    </>
  );
}
