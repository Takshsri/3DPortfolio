import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Code2, 
  Mail, 
  Github, 
  Linkedin, 
 
} from "lucide-react";
import { useState, useEffect } from "react";
import {motion,AnimatePresence} from "framer-motion";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: User },
    { to: "/projects", label: "Projects", icon: Code2 },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          scrolled 
            ? "bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
            : "bg-black/80 backdrop-blur-xl"
        }
        px-4 lg:px-8 py-4 lg:py-6
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className={`
              flex items-center gap-3 group cursor-pointer transition-all duration-500
              hover:scale-105 hover:-translate-y-1
            `}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:rotate-3 transition-all p-2">
              <Home size={20} className="text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent drop-shadow-xl">
                Ramya Mannam
              </h1>
              <p className="text-xs text-emerald-400 font-mono tracking-wider hidden lg:block">
                 Developer
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-8">
            <div className="flex items-center gap-1 lg:gap-3">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`
                    group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300
                    ${
                      location.pathname === to
                        ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-2xl shadow-emerald-500/25"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }
                    hover:scale-105 hover:shadow-xl
                  `}
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  <span>{label}</span>
                  {location.pathname === to && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 rounded-xl -z-10 blur"
                      layoutId="activeNav"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-2 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition-all">
              <a href="https://github.com/Takshsri" className="p-2.5 text-slate-300 hover:text-white hover:bg-white/20 rounded-xl transition-all group" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/ramya-mannam-bb6703289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="p-2.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-xl transition-all group" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/10 hover:shadow-xl transition-all group"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 pt-4 border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-3 px-2">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`
                      group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 border border-transparent
                      hover:bg-white/10 hover:border-white/30 hover:shadow-2xl hover:scale-[1.02]
                      ${
                        location.pathname === to
                          ? "bg-gradient-to-r from-emerald-500/80 to-blue-600/80 text-white border-emerald-400/50 shadow-emerald-500/30"
                          : "text-slate-200 hover:text-white"
                      }
                    `}
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{label}</span>
                    {location.pathname === to && (
                      <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    )}
                  </Link>
                ))}
                
                {/* Mobile Social Links */}
                <div className="pt-4 border-t border-white/10 mt-4">
                  <div className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <a href="https://github.com" className="p-3 text-slate-300 hover:text-white hover:bg-white/20 rounded-xl transition-all flex-1 text-center" aria-label="GitHub">
                      <Github size={20} />
                    </a>
                    <a href="https://linkedin.com" className="p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-xl transition-all flex-1 text-center" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
