import type { Project } from "../types/project"
import { Link } from "react-router-dom"
import ProjectImage from "../assets/project.png"
import { Github, ExternalLink, Trash2, Plus, Edit2, Code2 } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4 relative overflow-hidden"
      >
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
        <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-20 bg-white/5 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-2xl shadow-2xl max-w-2xl mx-auto"
        >
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-slate-400 mb-6 text-sm tracking-wide font-medium">
            No projects yet
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/add-project" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-xl border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <Plus size={16} /> Create First Project
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4 relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Animated Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <motion.div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg" whileHover={{ rotate: 5 }}>
              <Code2 size={24} />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-2xl leading-tight">
                Featured Work
              </h1>
              <p className="text-sm text-slate-400 font-mono tracking-wider">({projects.length}) Projects</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/add-project" className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
              <Plus size={20} className="group-hover:scale-110 transition-transform" />
              <span>Add New Project</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* PERFECT GRID - CSS Masonry + No Fixed Heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [grid-auto-rows:1fr]">
          <AnimatePresence>
            {projects.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, delay: index * 0.1 }
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                ref={el => {
                  if (!cardRefs.current) cardRefs.current = []
                  if (cardRefs.current[index] !== el) cardRefs.current[index] = el
                }}
                className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 
                           shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-500 
                           hover:bg-white/10 hover:border-white/20 overflow-hidden cursor-pointer h-auto flex flex-col"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Animated gradient backdrop */}
                <motion.div 
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl opacity-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Fixed-size image container */}
                <div className="relative mb-6 flex justify-center h-24 w-24 mx-auto flex-shrink-0">
                  <div className="relative h-full w-full p-[2px] bg-gradient-to-br from-slate-800/60 to-transparent rounded-2xl ring-2 ring-white/20 shadow-2xl group-hover:shadow-emerald-500/20 group-hover:ring-emerald-400/30 transition-all duration-500">
                    <motion.img
                      src={p.image || ProjectImage}
                      alt={p.title}
                      className="project-image block w-full h-full rounded-2xl object-cover"
                      initial={{ rotateX: 20, rotateY: -20 }}
                      whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Content - PERFECT FLEX LAYOUT */}
                <div className="flex-1 flex flex-col justify-between relative z-10 space-y-4 min-h-0">
                  {/* Title */}
                  <motion.div className="px-1">
                    <motion.h3 
                      className="text-lg font-black text-white leading-tight line-clamp-1"
                      whileHover={{ color: "#60a5fa" }}
                    >
                      {p.title}
                    </motion.h3>
                  </motion.div>

                  {/* Description - Controlled height */}
                  <motion.div className="px-1 flex-1 min-h-0">
                    <motion.p 
                      className="text-sm text-slate-300 leading-relaxed line-clamp-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      {p.description}
                    </motion.p>
                  </motion.div>

                  {/* Tech Stack - CONTROLLED HEIGHT */}
                  <div className="px-1 flex flex-wrap gap-2 max-h-[50px] overflow-hidden flex-shrink-0">
                    {p.tech.split(",").slice(0, 4).map((t, i) => (
                      <motion.span
                        key={t}
                        className="px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 text-white backdrop-blur-sm hover:scale-110 transition-all"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ y: -2 }}
                      >
                        {t.trim()}
                      </motion.span>
                    ))}
                  </div>

                  {/* Footer - Always at bottom */}
                  <div className="pt-4 border-t border-white/10 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <motion.a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-all"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github size={18} />
                        </motion.a>
                        <motion.a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 text-blue-400 hover:text-blue-200 rounded-xl hover:bg-blue-500/10 transition-all"
                          whileHover={{ scale: 1.2, rotate: -180 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>

                      <div className="flex gap-1">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(p)
                          }}
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all"
                          whileHover={{ scale: 1.3, rotate: 180 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit2 size={16} />
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(p.id)
                          }}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/20 rounded-xl transition-all"
                          whileHover={{ scale: 1.3, rotate: -180 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
