import { useEffect, useState } from "react"
import { getGithubStats } from "../services/githubGraphql"
import { 
  Database, 
  Star, 
  GitCommit, 
  Users, 
  UserCheck 
} from "lucide-react"

export default function GithubStats() {
  const [stats, setStats] = useState<any>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)

  useEffect(() => {
    const load = async () => {
      const data = await getGithubStats()
      setStats(data)
    }
    load()
  }, [])

  if (!stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm h-24 rounded-xl animate-pulse border border-white/10" />
        ))}
      </div>
    )
  }

const statsData = [
  { 
    label: "Repositories", 
    value: stats.repos?.toLocaleString() || "0", 
    icon: Database,
    color: "from-indigo-500 to-purple-500"
  },
  { 
    label: "Stars", 
    value: stats.stars?.toLocaleString() || "0", 
    icon: Star,
    color: "from-yellow-400 to-orange-500"
  },

  // 🔥 MAIN (replace commits card)
  { 
    label: "Contributions", 
    value: stats.contributions?.toLocaleString() || "0", 
    icon: GitCommit,
    color: "from-emerald-500 to-green-500"
  },

  // ➕ NEW CARDS
  { 
    label: "Commits", 
    value: stats.commits?.toLocaleString() || "0", 
    icon: GitCommit,
    color: "from-green-400 to-emerald-600"
  },
  { 
    label: "PRs", 
    value: stats.pullRequests?.toLocaleString() || "0", 
    icon: GitCommit,
    color: "from-purple-500 to-pink-500"
  },
  { 
    label: "Issues", 
    value: stats.issues?.toLocaleString() || "0", 
    icon: GitCommit,
    color: "from-red-500 to-orange-500"
  },

  { 
    label: "Followers", 
    value: stats.followers?.toLocaleString() || "0", 
    icon: Users,
    color: "from-blue-500 to-indigo-500"
  },
  { 
    label: "Following", 
    value: stats.following?.toLocaleString() || "0", 
    icon: UserCheck,
    color: "from-pink-500 to-rose-500"
  }
]
  return (
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="group relative bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/10 
                     shadow-xl hover:shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 
                     hover:-translate-y-2 hover:bg-white/10 hover:border-white/20 cursor-default overflow-hidden"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            {/* Animated gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl blur-sm scale-105`} />
            
            {/* Floating orb effect */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full -translate-x-12 translate-y-12 opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" />
            
            {/* Icon */}
            <div className="relative z-10 mb-4 p-3 w-14 h-14 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 mx-auto flex items-center justify-center">
              <Icon size={22} className={`text-white drop-shadow-lg transition-all ${isHovered === index ? 'scale-110' : ''}`} />
            </div>

            {/* Number */}
            <h3 className={`relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black mb-2 mx-auto w-fit bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight transition-all ${isHovered === index ? 'scale-105' : ''}`}>
              {stat.value}
            </h3>

            {/* Label */}
            <p className={`relative z-10 text-xs lg:text-sm font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-all duration-300 ${isHovered === index ? 'drop-shadow-lg' : ''}`}>
              {stat.label}
            </p>

            {/* Hover glow ring */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl scale-110 pointer-events-none`} />
          </div>
        )
      })}
    </div>
  )
}
