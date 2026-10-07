"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import { DirectionalLiquidButton } from "./DirectionalLiquidButton";
import { BubbleNavButton } from "./BubbleNavButton";
import { EMAIL, SOCIALS } from "@/data/social";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const drawerSocials = (
  [
    { short: "IG", href: SOCIALS.find((s) => s.label === "Instagram")?.href },
    { short: "X", href: SOCIALS.find((s) => s.label === "X")?.href },
  ] as { short: string; href?: string }[]
).filter((s): s is { short: string; href: string } => Boolean(s.href));

interface HeaderProps {
  /** Register of the page top. "paper" swaps to the ink logo and ink text while the page is unscrolled. */
  tone?: "void" | "paper";
  /** Overrides the label and href of the desktop CTA and the drawer pill. */
  cta?: { label: string; href: string };
}

export function Header({ tone = "void", cta }: HeaderProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Paper tone only applies while the page is unscrolled; the scrolled pill stays void.
  const onPaper = tone === "paper" && !scrolled;

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 20); };
    handleScroll(); // a hash deep link or restored scroll position lands mid-page
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`fixed inset-x-0 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] ${scrolled ? "top-5" : "top-0 py-5 md:py-8"}`}>
        <div 
          className={`mx-auto flex w-full items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] ${
            scrolled 
              ? "max-w-5xl rounded-full border border-white/[0.08] bg-void/70 px-6 py-3.5 backdrop-blur-xl" 
              : "max-w-7xl rounded-none border-transparent bg-transparent px-2 py-0"
          }`}
        >
          
          {/* Left: Logo */}
          <div className="flex flex-1 justify-start">
            <Link href="/" className="flex items-center gap-2 group z-10">
              <img src={onPaper && !menuOpen ? "/rs-logo-ink.png" : "/rs-logo.png"} alt="Remark Studio" className={`w-auto transition-all duration-500 ease-out-expo group-hover:scale-[1.02] ${scrolled ? "h-6 md:h-7" : "h-8 md:h-9"}`} />
            </Link>
          </div>
          
          {/* Center: Navigation */}
          <nav className="hidden md:flex flex-none justify-center items-center gap-1 lg:gap-3">
            {navLinks.map((link) => (
              <BubbleNavButton
                key={link.label}
                href={link.href}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => { 
                  if (link.href.startsWith("#")) { 
                    e.preventDefault(); 
                    handleLinkClick(link.href); 
                  } 
                }}
                className={`px-5 py-2.5 text-[12px] font-normal uppercase tracking-[0.15em] ${onPaper ? "text-ink/85" : "text-fg/85"} hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent font-[family:var(--font-body)] ${scrolled ? "text-[11px] tracking-[0.12em]" : ""}`}
                style={{ fontFamily: 'var(--font-body), sans-serif' }}
              >
                <span className={`relative z-10 block ${scrolled ? "mr-[-0.12em]" : "mr-[-0.15em]"}`}>{link.label}</span>
              </BubbleNavButton>
            ))}
          </nav>
          
          {/* Right: Actions */}
          <div className="flex flex-1 justify-end items-center gap-6 z-10">
            <div className="hidden md:flex items-center gap-4">
              <span className={`hidden lg:block font-normal tracking-[0.18em] ${onPaper ? "text-ink/70" : "text-fg/70"} uppercase select-none whitespace-nowrap transition-all duration-500 font-[family:var(--font-body)] ${scrolled ? "text-[10px] opacity-0 absolute pointer-events-none" : "text-[11px] opacity-100 relative"}`}>Available for projects</span>
              <DirectionalLiquidButton
                href={cta?.href ?? "/contact"}
                fillClassName={onPaper ? "bg-ink" : undefined}
                className={`inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] font-normal uppercase text-fg transition-all ${onPaper ? "border-accent bg-accent" : "border-accent/80 bg-white/[0.02] shadow-[0_0_15px_rgba(0,0,0,0.15)] backdrop-blur-md"} duration-500 hover:border-transparent hover:shadow-2xl active:scale-[0.97] font-[family:var(--font-body)] ${scrolled ? "px-6 py-2 text-[11px] tracking-[0.12em]" : "px-7 py-2.5 text-[12px] tracking-[0.15em]"}`}
                style={{ fontFamily: 'var(--font-body), sans-serif' }}
              >
                <span className={`relative z-10 -translate-y-px transition-colors duration-500 group-hover:text-white ${scrolled ? "mr-[-0.12em]" : "mr-[-0.15em]"}`}>{cta?.label ?? "Connect"}</span>
              </DirectionalLiquidButton>
            </div>

            {/* Mobile Menu Button (Minimalist 2-line design) */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden focus-visible:outline-none rounded-full transition-all duration-300 ${scrolled || menuOpen ? "bg-white/[0.08] border border-white/[0.08]" : "bg-transparent border border-transparent"}`} 
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span aria-hidden="true" className={`block h-[1.5px] ${onPaper && !menuOpen ? "bg-ink" : "bg-fg"} transition-all duration-400 ease-[cubic-bezier(0.2,1,0.3,1)] ${menuOpen ? "w-4 translate-y-[3.25px] rotate-45" : "w-5"}`} />
              <span aria-hidden="true" className={`block h-[1.5px] ${onPaper && !menuOpen ? "bg-ink" : "bg-fg"} transition-all duration-400 ease-[cubic-bezier(0.2,1,0.3,1)] ${menuOpen ? "w-4 -translate-y-[3.25px] -rotate-45" : "w-3 translate-x-1"}`} />
            </button>
          </div>
          
        </div>
      </header>

      {/* Premium Fullscreen Mobile Menu Overlay */}
      <div 
        inert={!menuOpen} 
        aria-hidden={!menuOpen} 
        className={`fixed inset-0 z-40 flex flex-col bg-void/95 backdrop-blur-3xl transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.2,1,0.3,1)] md:hidden overscroll-contain ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Subtle Top-Right Red Glow */}
        <div className="absolute top-0 right-0 h-[60vh] w-[80vw] -translate-y-1/4 translate-x-1/4 bg-[radial-gradient(circle_at_center,var(--color-accent-subtle),transparent_70%)] opacity-40 blur-3xl" />
        
        <nav className="relative flex flex-1 flex-col items-start justify-center gap-6 px-8 pt-16">
          {navLinks.map((link, i) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => { 
                if (link.href.startsWith("#")) { 
                  e.preventDefault(); 
                  handleLinkClick(link.href); 
                } else { 
                  setMenuOpen(false); 
                } 
              }} 
              className="group flex items-center gap-4 text-left focus-visible:outline-none"
              style={{ 
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms", 
                opacity: menuOpen ? 1 : 0, 
                transform: menuOpen ? "translateX(0)" : "translateX(-30px)", 
                transitionProperty: "opacity, transform", 
                transitionDuration: "700ms", 
                transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)" 
              }}
            >
              <span className="text-[11px] font-mono tracking-widest text-accent opacity-70">0{i + 1}</span>
              <span 
                className="font-normal text-[clamp(2.5rem,11vw,4rem)] tracking-tight text-fg transition-colors duration-300 group-hover:text-accent" 
                style={{ fontFamily: 'var(--font-betha), sans-serif' }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </nav>
        
        {/* Menu Footer */}
        <div 
          className="relative flex flex-col gap-8 px-8 pb-10"
          style={{ 
            transitionDelay: menuOpen ? "350ms" : "0ms", 
            opacity: menuOpen ? 1 : 0, 
            transform: menuOpen ? "translateY(0)" : "translateY(20px)", 
            transitionProperty: "opacity, transform", 
            transitionDuration: "700ms", 
            transitionTimingFunction: "cubic-bezier(0.2, 1, 0.3, 1)" 
          }}
        >
          {/* Micro-Contact Row */}
          <div className="flex w-full items-end justify-between border-t border-white/[0.08] pt-8">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold tracking-[0.2em] text-muted uppercase">Connect</span>
              <a href={`mailto:${EMAIL}`} className="text-[13px] font-medium tracking-wide text-fg hover:text-accent transition-colors">{EMAIL}</a>
            </div>
            <div className="flex gap-5 pb-0.5">
              {drawerSocials.map((social) => (
                <a key={social.short} href={social.href} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold tracking-[0.2em] text-fg uppercase hover:text-accent transition-colors">{social.short}</a>
              ))}
            </div>
          </div>
          
          {/* Solid CTA Pill */}
          <a 
            href={cta?.href ?? "/contact"} 
            onClick={() => setMenuOpen(false)} 
            className="flex w-full items-center justify-between rounded-full bg-accent px-8 py-4.5 text-left text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-[transform,background-color] duration-300 active:scale-[0.97]"
          >
            <span>{cta?.label ?? "Start a project"}</span>
            <span className="text-base font-normal leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </>
  );
}
