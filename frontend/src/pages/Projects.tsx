import type { Project } from "../types/project"
import { Link } from "react-router-dom"
import ProjectImage from "../assets/project.png"
import { Github, ExternalLink, Trash2, Plus, Edit2, Code2 } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
interface ProjectsProps {
  projects?: Project[]
}

export default function Projects({ projects: propProjects }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [localProjects, setLocalProjects] = useState<Project[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[] | null>(null)

  useEffect(() => {
    if (propProjects && Array.isArray(propProjects) && propProjects.length > 0) {
      setProjects(propProjects)
      setLocalProjects(propProjects)
    } else {
      fetch(`${import.meta.env.VITE_API_URL}/projects`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProjects(data)
            setLocalProjects(data)
          }
        })
        .catch(() => setProjects([]))
    }
  }, [propProjects])

  const handleDelete = (id: number) => {
    const updated = localProjects.filter(p => p.id !== id)
    setLocalProjects(updated)
    setProjects(updated)
    localStorage.setItem("projects", JSON.stringify(updated))
  }

  const navigate = useNavigate()

const handleEdit = (project: Project) => {
  navigate(`/edit-project/${project.id}`)
}

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current?.[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    const image = card.querySelector('.project-image') as HTMLElement
    if (image) {
      image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    }
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current?.[index]
    const image = card?.querySelector('.project-image') as HTMLElement
    if (image) {
      image.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
    }
  }, [])

  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
        <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />
        
        <div className="text-center py-20 bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <p className="text-slate-400 mb-6 text-sm tracking-wide font-medium">
            No projects yet
          </p>
          <Link
            to="/add-project"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-xl border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <Plus size={16} />
            Create First Project
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4">
      {/* Background patterns - EXACT Home page */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header with Add Project Button - EXACT Home page style */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Header Section */}
          <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
              <Code2 size={24} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                Featured Work
              </h1>
              <p className="text-sm text-slate-400 font-mono tracking-wider">
                ({projects.length}) Projects
              </p>
            </div>
          </div>

          {/* Add Project Button - Prominent at top right */}
          <Link
            to="/add-project"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl hover:bg-white/20 hover:border-white/30 hover:-translate-y-1 transition-all duration-300 px-8 whitespace-nowrap"
          >
            <Plus size={20} className="group-hover:scale-110 transition-transform" />
            <span>Add New Project</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, index) => (
            <div
              key={p.id}
              ref={el => {
                if (!cardRefs.current) cardRefs.current = []
                if (cardRefs.current[index] !== el) {
                  cardRefs.current[index] = el
                }
              }}
              className="group relative flex flex-col bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 
                         shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 
                         hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 overflow-hidden h-fit cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Subtle gradient backdrop */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Circular Image */}
              <div className="relative mb-4 flex justify-center">
                <div className="relative h-20 w-20 p-[1px] bg-gradient-to-br from-slate-800/50 to-transparent rounded-full ring-1 ring-white/30 shadow-xl group-hover:shadow-2xl group-hover:ring-blue-400/30 transition-all duration-500">
                  <img
                    src={p.image || ProjectImage}
                    alt={p.title}
                    className="project-image block w-full h-full rounded-full object-cover transition-transform duration-500 will-change-transform"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-h-0 relative z-10">
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1 leading-tight">
                  {p.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {p.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.split(",").slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-white/10 backdrop-blur-sm text-[10px] text-slate-300 uppercase tracking-[0.15em] font-semibold rounded-full border border-white/20 group-hover:bg-white/20 group-hover:text-white transition-all"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                  <div className="flex gap-2">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                      title="View code"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors rounded-xl hover:bg-blue-500/10"
                      title="Live demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(p)
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(p.id)
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
