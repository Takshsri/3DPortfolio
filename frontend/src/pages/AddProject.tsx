import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

export default function AddProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    live: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      throw new Error("Failed to create project");
    }

    navigate("/projects");

  } catch (error) {
    console.error("Error creating project:", error);
  }
};
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4">
      {/* Background patterns - EXACT Home page */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />

      <div className="max-w-2xl mx-auto">
        {/* Back Navigation */}
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 mb-12 p-3 bg-white/5 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:shadow-xl"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Projects</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-white/20 mb-6">
              <Plus size={28} />
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                New Project
              </h1>
            </div>
            <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
              Share your latest creation with the world
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Project Title</label>
              <input
                name="title"
                placeholder="e.g. E-commerce Dashboard"
                className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Description</label>
              <textarea
                name="description"
                placeholder="Tell us about your project..."
                rows={4}
                className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl resize-vertical focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Technologies</label>
              <input
                name="tech"
                placeholder="React, Node.js, Tailwind, etc."
                className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                value={form.tech}
                onChange={handleChange}
              />
            </div>

            {/* Links Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">GitHub</label>
                <input
                  name="github"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                  value={form.github}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Live Demo</label>
                <input
                  name="live"
                  type="url"
                  placeholder="https://your-project.com"
                  className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                  value={form.live}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Project Image</label>
              <input
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-pink-400 focus:ring-4 focus:ring-pink-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                value={form.image}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:from-purple-700 hover:via-blue-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 mt-4"
            >
              <span className="flex items-center justify-center gap-3">
                <Plus size={20} />
                Create Project
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
