"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "$15—40K",
    brief: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = ["< $5K", "$5—15K", "$15—40K", "$40K+"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#d97134", "#faf8f2", "#10b981"],
    });

    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", budget: "$15—40K", brief: "" });
    }, 4500);
  };

  return (
    <section id="contact" className="relative isolate pt-8 md:pt-14 pb-14 px-3 md:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] bg-[#141210] text-[#faf8f2] ring-1 ring-white/10 px-6 sm:px-10 md:px-14 py-16 md:py-20 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Inquiry Form Card */}
          <div className="lg:col-span-7 bg-[#1c1a17] border border-white/10 rounded-[28px] p-6 sm:p-10 space-y-8 shadow-xl">
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#faf8f2]/60 uppercase tracking-widest border-b border-white/5 pb-4">
              <span>INQUIRY FORM</span>
              <span>AVG. REPLY · 24H</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#faf8f2]/60 block">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#141210] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#faf8f2] placeholder:text-[#faf8f2]/30 focus:outline-none focus:border-[#d97134] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#faf8f2]/60 block">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="hello@yourbrand.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#141210] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#faf8f2] placeholder:text-[#faf8f2]/30 focus:outline-none focus:border-[#d97134] transition-colors"
                  />
                </div>
              </div>

              {/* Budget Range selector pills */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#faf8f2]/60 block">
                  BUDGET RANGE
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {budgetOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setForm({ ...form, budget: option })}
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        form.budget === option
                          ? "bg-[#faf8f2] text-[#141210] font-semibold shadow-md"
                          : "bg-[#141210] text-[#faf8f2]/70 border border-white/10 hover:border-white/25"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Brief */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#faf8f2]/60 block">
                  PROJECT BRIEF
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="A few lines about the product, the audience and the outcomes you'd like to see."
                  value={form.brief}
                  onChange={(e) => setForm({ ...form, brief: e.target.value })}
                  className="w-full bg-[#141210] border border-white/10 rounded-xl p-4 text-sm text-[#faf8f2] placeholder:text-[#faf8f2]/30 focus:outline-none focus:border-[#d97134] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Form Bottom: Direct Email & Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="font-mono text-xs text-[#faf8f2]/50 tracking-wider">
                  OR EMAIL ·{" "}
                  <a
                    href="mailto:mohitinbox07@gmail.com"
                    className="text-[#faf8f2] hover:text-[#d97134] transition-colors underline"
                  >
                    mohitinbox07@gmail.com
                  </a>
                </span>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-[#d97134] text-white font-medium text-sm hover:bg-[#e07b40] active:scale-95 transition-all shadow-lg shadow-[#d97134]/20 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Message Dispatched</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send brief</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Status & Channels Stack */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="bg-[#1c1a17] border border-white/10 rounded-[28px] p-6 sm:p-8 space-y-4 shadow-xl">
              <span className="font-mono text-[10px] sm:text-xs text-[#faf8f2]/60 uppercase tracking-widest block">
                STATUS
              </span>
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-base sm:text-lg font-medium text-[#faf8f2]">
                  Available now <span className="text-[#faf8f2]/60 font-normal">for new projects</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#faf8f2]/65 leading-relaxed font-sans">
                Engagements typically run 4—10 weeks. I take on select projects at a time so each one receives the depth and technical rigor it deserves.
              </p>
            </div>

            {/* Channels Card */}
            <div className="bg-[#1c1a17] border border-white/10 rounded-[28px] p-6 sm:p-8 space-y-4 shadow-xl">
              <span className="font-mono text-[10px] sm:text-xs text-[#faf8f2]/60 uppercase tracking-widest block">
                CHANNELS
              </span>
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 text-[#faf8f2]/80 hover:text-white transition-colors"
                >
                  <span>X / Twitter</span>
                  <span className="flex items-center gap-1 text-[#faf8f2]/50 text-xs">
                    @MOHIT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="https://github.com/mohitsharma-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 text-[#faf8f2]/80 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <span className="flex items-center gap-1 text-[#faf8f2]/50 text-xs">
                    /MOHIT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/mohit-kumar-877713289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 text-[#faf8f2]/80 hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <span className="flex items-center gap-1 text-[#faf8f2]/50 text-xs">
                    /IN/MOHIT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="mailto:mohitinbox07@gmail.com"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 text-[#faf8f2]/80 hover:text-white transition-colors"
                >
                  <span>Email Direct</span>
                  <span className="flex items-center gap-1 text-[#faf8f2]/50 text-xs">
                    /CONTACT <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

