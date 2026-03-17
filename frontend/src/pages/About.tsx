import { Github, Linkedin, Mail, Code2, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4">
      {/* Background patterns - EXACT Home page theme */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl mb-8">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Code2 size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                About Me
              </h1>
              <p className="text-sm text-slate-400 font-mono tracking-wider mt-2">01 / STORY</p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 px-4">
              I'm a passionate full-stack developer who turns ideas into beautiful, performant web experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Skills Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Skills & Experience</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Frontend</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" /> React, Next.js, TypeScript
                </li>
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Tailwind CSS, Styled Components
                </li>
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Framer Motion, Three.js
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Code2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Backend & DevOps</h3>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" /> Node.js, Express, Python
                </li>
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" /> PostgreSQL, MongoDB
                </li>
                <li className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" /> Docker, Vercel, AWS
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats & Contact */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">By The Numbers</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <p className="text-slate-400 font-mono">Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  2+
                </div>
                <p className="text-slate-400 font-mono">Years Exp</p>
              </div>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:shadow-2xl transition-all">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Mail size={20} className="text-blue-400" />
                Let's Talk
              </h4>
              <p className="text-slate-400 mb-4">hello@developer.com</p>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all">
                Copy Email
              </button>
            </div>
            
            <div className="flex gap-3 pt-4">
              <a href="https://github.com" className="flex-1 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all flex items-center gap-3">
                <Github size={20} />
                <span className="font-medium">GitHub</span>
              </a>
              <a href="https://linkedin.com" className="flex-1 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all flex items-center gap-3">
                <Linkedin size={20} className="text-blue-400" />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
