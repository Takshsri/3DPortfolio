import { useEffect, useState } from "react"
import { getGithubStats } from "../services/githubGraphql"
import { 
  Database, 
  Star, 
  GitCommit, 
  Users, 
  UserCheck,
  GitPullRequest, 
  AlertCircle 
} from "lucide-react"
import CountUp from "react-countup"

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
    { 
      label: "Contributions", 
      value: stats.contributions?.toLocaleString() || "0", 
      icon: GitCommit,
      color: "from-emerald-500 to-green-500"
    },
    { 
      label: "Commits", 
      value: stats.commits?.toLocaleString() || "0", 
      icon: GitCommit,
      color: "from-green-400 to-emerald-600"
    },
    { 
      label: "PRs", 
      value: stats.pullRequests?.toLocaleString() || "0", 
      icon: GitPullRequest,
      color: "from-purple-500 to-pink-500"
    },
    { 
      label: "Issues", 
      value: stats.issues?.toLocaleString() || "0", 
      icon: AlertCircle,
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
            className="group relative p-[1px] rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(at_top_left,_#6366f1,_#a855f7,_#ec4899,_#6366f1)] opacity-0 group-hover:opacity-100 transition duration-700 animate-spin-slow" />

            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/10 
                            shadow-xl hover:shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] 
                            transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-white/20">

              {/* Icon */}
              <div className="relative z-10 mb-4 p-3 w-14 h-14 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-lg flex items-center justify-center">
                <Icon size={22} className={`text-white ${isHovered === index ? 'scale-110' : ''}`} />
              </div>

              {/* Number */}
              <h3 className={`text-3xl font-black text-center text-white animate-glow`}>
                <CountUp 
                  end={Number(stat.value.replace(/,/g, ""))}
                  duration={2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h3>

              {/* Label */}
              <p className="text-xs text-center text-slate-400 mt-2 uppercase tracking-wider">
                {stat.label}
              </p>

              {/* Glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color}/20 opacity-0 group-hover:opacity-100 blur-xl`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}