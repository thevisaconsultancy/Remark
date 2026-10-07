"use client";

import { useRef, useEffect } from "react";
import { GrainOverlay } from "./SvgPatterns";
import { DirectionalLiquidButton } from "./DirectionalLiquidButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const target = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const animate = () => {
      if (isVisible) {
        current.current.x += (target.current.x - current.current.x) * 0.18;
        current.current.y += (target.current.y - current.current.y) * 0.18;
        
        if (overlayRef.current) {
          overlayRef.current.style.setProperty('--x', `${current.current.x}px`);
          overlayRef.current.style.setProperty('--y', `${current.current.y}px`);
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };
  
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    current.current.x = e.clientX - rect.left;
    current.current.y = e.clientY - rect.top;
    target.current.x = current.current.x;
    target.current.y = current.current.y;
    
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
    }
  };

  // Base and Overlay Layouts
  const renderContent = (isOverlay = false) => (
    <div aria-hidden={isOverlay} className="flex flex-col md:grid md:grid-cols-[auto_1fr] md:items-center gap-6 md:gap-x-10 md:gap-y-2 py-6 -my-6">
      
      {/* Top Row / Word 1: "Creative" */}
      <span 
        className={`order-1 md:order-none md:col-start-1 md:row-start-1 block animate-fade-in-up text-[clamp(2.5rem,10vw,8rem)] font-normal leading-[0.8] tracking-normal ${isOverlay ? "text-accent brightness-120 drop-shadow-[0_0_2px_var(--color-accent)]" : "text-fg"}`} 
        style={{ fontFamily: 'var(--font-betha), sans-serif', animationDelay: "0.1s" }}
      >
        Creative
      </span>
      
      {/* Bottom Row / Word 2: "Intelligence" */}
      <span 
        className={`order-2 md:order-none md:col-start-1 md:col-span-2 md:row-start-2 block animate-fade-in-up text-[clamp(2.5rem,10vw,8rem)] font-normal leading-[0.8] tracking-normal ml-2 md:ml-32 lg:ml-40 ${isOverlay ? "text-accent brightness-110 drop-shadow-[0_0_2px_var(--color-accent)]" : "text-fg"}`} 
        style={{ fontFamily: 'var(--font-betha), sans-serif', animationDelay: "0.25s" }}
      >
        Intelligence
      </span>

      {/* Button: Side on Desktop, Bottom on Mobile */}
      <div 
        className={`order-3 md:order-none md:col-start-2 md:row-start-1 md:justify-self-end mt-4 md:mt-0 animate-fade-in-up md:-translate-y-8 lg:-translate-y-10 ${isOverlay ? "invisible" : ""}`} 
        style={{ animationDelay: "0.4s" }}
      >
        <DirectionalLiquidButton
          href="#contact"
          className="inline-flex shrink-0 items-center gap-4 md:gap-5 rounded-full border-[1.5px] border-accent/80 bg-white/[0.02] px-7 py-3 md:px-9 md:py-[1.125rem] text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-fg shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-500 hover:border-transparent hover:shadow-2xl active:scale-[0.97]"
          style={{ fontFamily: 'var(--font-body), sans-serif' }}
        >
          <span className="relative z-10 -translate-y-px transition-colors duration-500 group-hover:text-white">Start a project</span>
          <span className="relative z-10 -translate-y-px text-accent transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
            →
          </span>
        </DirectionalLiquidButton>
      </div>

    </div>
  );

  return (
    <section className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden bg-void text-left">
      <img
        src="/Image Quality Improvement 2K Jul 06.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[60%_50%]"
        fetchPriority="high"
      />
      <GrainOverlay className="opacity-[0.5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-transparent md:from-void/50" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-32 md:px-8 md:pb-32 lg:pb-40">
        
        {/* Screen Reader Only Heading */}
        <h1 className="sr-only">Remark Studio: web development, AI agents and CRM systems, Islamabad</h1>
        
        {/* Container for Hover Interaction */}
        <div 
          ref={containerRef}
          className="relative py-6 -my-6 md:-translate-y-8 lg:-translate-y-16"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 1) Base Layout (White Text) */}
          {renderContent(false)}

          {/* 2) Masked Overlay Layout (Bright Red Text) */}
          <div 
            ref={overlayRef}
            className="hidden md:block absolute inset-0 py-6 z-20 pointer-events-none select-none opacity-0 transition-opacity duration-300"
            style={{
              // Hard edges to fix blurriness
              WebkitMaskImage: 'radial-gradient(circle 90px at var(--x, 50%) var(--y, 50%), black 100%, transparent 100%)',
              maskImage: 'radial-gradient(circle 90px at var(--x, 50%) var(--y, 50%), black 100%, transparent 100%)',
            }}
          >
            {renderContent(true)}
          </div>
        </div>
        
      </div>

      <div className="hidden sm:flex absolute inset-x-0 top-20 z-20 mx-auto w-full max-w-7xl justify-end px-6 md:top-24 lg:top-28 md:px-8">
        <div className="max-w-xs text-right animate-fade-in-up md:max-w-sm" style={{ animationDelay: "0.45s" }}>
          <p className="text-base leading-relaxed text-muted text-pretty md:text-lg">
            Merging high-end design with advanced AI and digital engineering.
          </p>
        </div>
      </div>
    </section>
  );
}
