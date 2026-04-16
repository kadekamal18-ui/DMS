'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StarBackground } from '@/components/star-background';
import { Play, Pause, Download, Shield, Eye, Brain, Wifi, ChevronDown } from 'lucide-react';

export function LandingPageContent() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 bg-[#020208]" />

      {/* Star Background or Video */}
      {!showVideo ? (
        <StarBackground />
      ) : (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute min-w-full min-h-full object-cover opacity-50"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        </div>
      )}

      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
              N
            </div>
            <span className="font-bold text-lg tracking-tight">
              Team<span className="text-cyan-400">Nano</span>
            </span>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Gallery', 'Device'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/download"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Get App
          </Link>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 pt-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-[0.2em]">
                AI-Powered Driver Safety
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                SURAKSHA DRIVE AI
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-3 font-light tracking-wide text-gray-500">
                Drive Safe. Stay Alive.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12 font-light">
              The world&apos;s most advanced real-time driver monitoring system.
              Powered by cutting-edge neural networks, Suraksha Drive AI detects fatigue,
              distraction, phone usage, and aggressive driving — all from a single
              smartphone camera.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { icon: Eye, label: 'Eye Tracking', color: 'cyan' },
                { icon: Brain, label: 'Fatigue AI', color: 'blue' },
                { icon: Shield, label: 'Aggression', color: 'purple' },
                { icon: Wifi, label: 'IoT Alerts', color: 'green' },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border border-${color}-500/20 bg-${color}-500/5 backdrop-blur-sm`}
                >
                  <Icon className={`w-4 h-4 text-${color}-400`} />
                  <span className="text-sm font-medium text-gray-300">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/download"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-300"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Now
              </Link>
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 font-medium text-lg transition-all duration-300"
              >
                {showVideo ? (
                  <Pause className="w-5 h-5 text-cyan-400" />
                ) : (
                  <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                )}
                {showVideo ? 'Back to Stars' : 'Watch Cinematic'}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </section>

      {/* ========== GALLERY SECTION ========== */}
      <section id="gallery" className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Suraksha Drive AI uses advanced computer vision to keep drivers safe in real-time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '👁️',
                title: 'Eye & Gaze Tracking',
                desc: 'Monitors blink rate, PERCLOS, and gaze direction to detect drowsiness and inattention with 99.2% accuracy.',
                gradient: 'from-cyan-500/10 to-blue-500/10',
                border: 'border-cyan-500/20',
              },
              {
                icon: '🧠',
                title: 'AI State Classification',
                desc: 'Deep learning models classify driver state as Calm, Fatigued, Sleeping, Distracted, or Aggressive in real-time.',
                gradient: 'from-blue-500/10 to-purple-500/10',
                border: 'border-blue-500/20',
              },
              {
                icon: '📡',
                title: 'IoT & ESP32 Integration',
                desc: 'Instant alerts sent to ESP32 hardware with OLED dashboard, buzzer warnings, and LED indicators for maximum safety.',
                gradient: 'from-purple-500/10 to-pink-500/10',
                border: 'border-purple-500/20',
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-3xl border ${card.border} bg-gradient-to-br ${card.gradient} backdrop-blur-xl hover:scale-[1.03] transition-all duration-500`}
              >
                <div className="text-5xl mb-6">{card.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DEVICE SECTION ========== */}
      <section id="device" className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  ESP32 IoT
                </span>
                <br />
                <span className="text-white">Hardware Alert System</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Our ESP32-powered hardware module connects wirelessly to the Suraksha Drive AI
                backend, displaying live driver metrics on an OLED screen with
                priority-based buzzer alerts and LED warnings.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'OLED Live Dashboard', desc: 'Real-time status of all 7 alert types' },
                  { label: 'Priority Buzzer', desc: 'Critical alerts trigger audible warnings' },
                  { label: 'WiFi Connected', desc: 'Polls server every second for instant response' },
                  { label: '7 Alert Types', desc: 'No Face, Eyes, Phone, Fatigue, Head, Gaze, Aggression' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.label}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              {/* Device mockup */}
              <div className="relative">
                <div className="w-72 h-72 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-2xl shadow-cyan-500/10 flex flex-col items-center justify-center p-8">
                  <div className="w-full h-20 rounded-lg bg-black border border-green-500/30 mb-6 flex items-center justify-center font-mono text-green-400 text-xs">
                    == DRIVER MONITOR ==<br />
                    State: SAFE ✓
                  </div>
                  <div className="flex gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                    <div className="w-4 h-4 rounded-full bg-gray-700" />
                    <div className="w-4 h-4 rounded-full bg-gray-700" />
                  </div>
                  <p className="text-[10px] text-gray-600 mt-4 font-mono">SURAKSHA DRIVE AI ESP32 v1.0</p>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[10px] font-black">
              N
            </div>
            <span className="text-sm text-gray-500">
              © 2026 TeamNano. Built with ❤️ for safer roads.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="https://github.com/ssureshkxmar/Driver-Monitoring" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* ========== FLOATING PLAY BUTTON ========== */}
      <div className="fixed right-8 bottom-8 z-50">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="group relative w-16 h-16 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 flex items-center justify-center transition-all duration-500 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/30"
        >
          {showVideo ? (
            <Pause className="w-6 h-6 text-cyan-400" />
          ) : (
            <Play className="w-6 h-6 text-cyan-400 fill-cyan-400 ml-0.5" />
          )}
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping pointer-events-none" />
        </button>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          <span className="text-xs text-cyan-400 font-semibold">
            {showVideo ? 'Stars' : 'Cinematic'}
          </span>
        </div>
      </div>
    </div>
  );
}
