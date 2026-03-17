import { useEffect, useState } from "react"
import { getProjects } from "../services/projectService"
import type { Project } from "../types/project"
import Projects from "./Projects"
import { ArrowUpRight, Code2, Github, Linkedin, Mail, ChevronDown, Code } from "lucide-react"
import GithubStats from "../components/GithubStats"
import ProfileImage from "../assets/profile.jpeg"

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showMoreBio, setShowMoreBio] = useState(false)
const LeetCodeIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M13.483 0a1.5 1.5 0 0 1 1.06.44l7.017 7.017a1.5 1.5 0 0 1 0 2.121l-7.017 7.017a1.5 1.5 0 0 1-2.121-2.121L17.94 9l-5.518-5.518A1.5 1.5 0 0 1 13.483 0z"/>
    <path d="M8.5 4.5a1.5 1.5 0 0 1 0 3H3a1.5 1.5 0 0 1 0-3h5.5zm0 6a1.5 1.5 0 0 1 0 3H3a1.5 1.5 0 0 1 0-3h5.5zm0 6a1.5 1.5 0 0 1 0 3H3a1.5 1.5 0 0 1 0-3h5.5z"/>
  </svg>
)
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  return (
    <main className="min-h-screen bg-slate-900 text-white selection:bg-blue-500/30 overflow-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20" />
      <div className="fixed inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.25)_1px,transparent_1px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.25)_1px,transparent_1px)] [background-size:100px_100px]" />
      
      {/* Floating particles */}
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0s]" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:1s]" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:2s]" />
        <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.5s]" />
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative flex flex-col items-center justify-center min-h-[95vh] px-4 sm:px-8 lg:px-12 py-16 max-w-7xl mx-auto">
        {/* Profile Image - Enhanced */}
        <div className="relative mb-8 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 group cursor-pointer hover:scale-105 transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 via-pink-500/30 to-blue-500/40 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur opacity-60 group-hover:opacity-80 transition-all" />
          <img 
            src={ProfileImage} 
            alt="Ramya Mannam"
            className="w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl ring-8 ring-purple-500/40 group-hover:ring-blue-500/50 transition-all duration-700 hover:scale-110 hover:shadow-3xl"
          />
          {/* Live indicator */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 border-4 border-slate-900 rounded-full shadow-lg animate-ping" />
        </div>

        {/* Name - Enhanced Typography */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight mb-6 text-white drop-shadow-2xl text-center leading-[0.85] bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text">
          Hi, I'm{' '}
          <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text drop-shadow-2xl animate-gradient-x">
            Ramya Mannam
          </span>
        </h1>

        {/* Tagline - Responsive */}
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-2xl mx-auto text-center mb-10 px-2 leading-relaxed font-medium">
          Full-stack developer building{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-black">
            scalable web applications
          </span>
          {' '}and SaaS products
        </div>

        {/* Extended Bio - Collapsible */}
        <div className="max-w-4xl mx-auto mb-12 px-4">
          <p className={`text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto text-center leading-relaxed transition-all duration-500 ${
            showMoreBio ? 'max-h-96 opacity-100' : 'max-h-20 overflow-hidden opacity-80'
          }`}>
            Building scalable web applications and SaaS products with{' '}
            <span className="font-semibold text-white">React</span>,{' '}
            <span className="font-semibold text-white">TypeScript</span>, and{' '}
            <span className="font-semibold text-white">NestJS</span>.
            <span className={showMoreBio ? '' : 'hidden'}>
              {' '}Strong foundation in Data Structures & Algorithms (C++), solved <span className="font-bold text-emerald-400">190+ LeetCode problems</span>, experienced in modern backend architectures. 
              Creator of projects like Eventz and RenewMate. Passionate about Machine Learning and RAG systems.
            </span>
          </p>
          <button
            onClick={() => setShowMoreBio(!showMoreBio)}
            className="group mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-slate-300 hover:text-white hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-xl"
          >
            {showMoreBio ? 'Show Less' : 'Show More'}
            <ChevronDown size={16} className={`transition-transform ${showMoreBio ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="flex flex-col lg:flex-row gap-4 items-center mb-8">
          <a 
            href="#projects" 
            className="group px-8 py-4 lg:px-12 lg:py-5 bg-white/10 backdrop-blur-xl text-white font-bold text-lg lg:text-xl rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl hover:bg-white/20 hover:border-white/30 hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 min-w-[200px] justify-center"
          >
            View My Work{' '}
            <ArrowUpRight size={20} className="group-hover:translate-x-2 transition-all duration-300" />
          </a>
          
          <div className="flex gap-3 p-3 lg:p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all">
            <a href="https://github.com/Takshsri" className="p-3 text-slate-300 hover:text-white hover:bg-white/20 rounded-xl transition-all group" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ramya-mannam-bb6703289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-xl transition-all group" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:ramyamannam7@gmail.com" className="p-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 rounded-xl transition-all group" aria-label="Email">
              <Mail size={20} />
            </a>
            <a 
                href="https://leetcode.com/u/mannamramya/" 
                target="_blank"
                rel="noreferrer"
                className="p-3 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 rounded-xl transition-all group"
                aria-label="LeetCode"
              >
                <LeetCodeIcon size={20} />
              </a>
          </div>
        </div>
      {/* Projects Section - Enhanced */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 lg:py-32 pb-32 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-16 lg:mb-24 p-6 lg:p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="p-4 lg:p-5 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-2xl shadow-2xl">
              <Code2 size={28} className="drop-shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-xl leading-tight">
                Featured Work
              </h2>
              <p className="text-lg lg:text-xl text-slate-400 font-mono tracking-wider mt-1">Crafting Digital Excellence</p>
            </div>
          </div>
          
          <a
            href="/projects"
            className="group self-start lg:self-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:from-emerald-700 hover:to-blue-700 transition-all duration-500 flex items-center gap-3 whitespace-nowrap"
          >
            View All Projects
            <ArrowUpRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-56 lg:h-72 bg-white/5 backdrop-blur-sm animate-pulse rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all" />
              ))}
            </div>
          ) : (
            <Projects projects={projects} />
          )}
        </div>
      </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-500/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-slate-400 to-transparent rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* NEW: LeetCode Stats Section - FIXED */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-20 lg:py-32 relative">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl">
            Algorithm Mastery
          </h2>
          <div className="w-28 h-1 mx-auto bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-lg" />
          <p className="text-xl text-slate-300 mt-4 max-w-2xl mx-auto">
            Solved <span className="font-black text-3xl text-emerald-400">190+</span> LeetCode problems
          </p>
        </div>

        <div className="bg-white/3 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 xl:p-16 border border-white/15 shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-blue-500/10" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 justify-center">
            {/* LeetCode Stats Card */}
            <div className="flex-1 max-w-md text-center">
              <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl border border-emerald-400/30 backdrop-blur-sm mb-6">
                <Code className="w-16 h-16 mx-auto text-emerald-400 mb-4 shadow-2xl" />
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent drop-shadow-xl">
                    190+
                  </div>
                  <p className="text-sm text-emerald-200 font-mono tracking-wider uppercase">Problems Solved</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">Easy</div>
                  <div className="text-sm text-slate-400 font-mono">~80</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">Medium</div>
                  <div className="text-sm text-slate-400 font-mono">~100</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">Hard</div>
                  <div className="text-sm text-slate-400 font-mono">~10</div>
                </div>
              </div>
              <a
                href="https://leetcode.com/u/mannamramya/" 
                target="_blank"
                rel="noreferrer"
                className="mt-8 block w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View LeetCode Profile
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* VS Code Style Terminal (Placeholder) */}
            <div className="flex-1 max-w-lg lg:max-w-md">
              <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="font-mono text-sm text-green-400 leading-relaxed space-y-1">
                  <div>$ leetcode stats</div>
                  <div className="text-emerald-300">┌──────────────</div>
                  <div>│ Solved: <span className="text-white font-bold">190</span> problems</div>
                  <div>│ Rank: <span className="text-yellow-400 font-bold">Top 15%</span></div>
                  <div>│ Streak: <span className="text-orange-400 font-bold">45 days</span></div>
                  <div>└──────────────</div>
                  <div className="text-slate-400 mt-4 text-xs">user@ramyamannam:~$</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Activity - Enhanced */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-20 lg:py-32 relative">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Developer Activity
          </h2>
          <div className="w-28 h-1 mx-auto bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 rounded-full shadow-lg" />
        </div>

        <div className="bg-white/3 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 xl:p-16 border border-white/15 shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
          <div className="relative z-10">
            <GithubStats />
          </div>
        </div>
      </section>

    </main>
  )
}
