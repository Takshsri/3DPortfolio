import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit2, ArrowLeft, Save, Image, Github, Globe, Code2 } from "lucide-react";
import toast from "react-hot-toast"

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  title: "",
  description: "",
  image: "",
  github: "",
  live: "",
  tech: "", // ✅ added
});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch existing project
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      // Reset and show success like AddProject
      navigate("/projects");
      toast.success("Project updated successfully!")
    } catch (error) {
toast.error("Failed to update project!")
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl animate-pulse w-full max-w-2xl">
          <div className="h-8 bg-white/10 rounded-xl w-64 mb-6" />
          <div className="space-y-4">
            <div className="h-12 bg-white/10 rounded-xl" />
            <div className="h-24 bg-white/10 rounded-xl" />
            <div className="h-10 bg-white/10 rounded-xl" />
            <div className="h-10 bg-white/10 rounded-xl" />
            <div className="h-10 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Floating orbs - IDENTICAL to AddProject */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl animate-ping-slow" />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header - IDENTICAL style to AddProject but Edit theme */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/projects")}
            className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl 
                       hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-xl 
                       hover:shadow-2xl flex items-center gap-2"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Update Project
            </h1>
            <p className="text-slate-400 mt-1">Polish your project showcase</p>
          </div>
        </div>

        {/* Main Card - EXACT same as AddProject */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title - Prominent with Edit icon */}
            <div className="group">
              <label className="block text-slate-300 font-medium mb-3 flex items-center gap-2">
                <Edit2 size={18} className="text-emerald-400" />
                Project Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 
                           focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/20 
                           transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-medium"
                placeholder="e.g. E-Commerce Dashboard with React & Three.js"
                required
              />
            </div>

            {/* Description */}
            <div className="group">
              <label className="block text-slate-300 font-medium mb-3 flex items-center gap-2">
                <Code2 size={18} />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 resize-vertical
                           focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/20 
                           transition-all duration-300 shadow-xl hover:shadow-2xl font-light leading-relaxed"
                placeholder="Update your project story. What new features did you add? What did you learn?"
                required
              />
            </div>
                {/* Tech Stack */}
                <div className="group">
                <label className="block text-slate-300 font-medium mb-3 flex items-center gap-2">
                    <Code2 size={18} className="text-yellow-400" />
                    Tech Stack
                </label>
                <input
                    name="tech"
                    value={formData.tech}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 border border-yellow-500/30 rounded-2xl text-white placeholder-slate-400 
                            focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/20 
                            transition-all duration-300 shadow-xl hover:shadow-2xl"
                    placeholder="React, TypeScript, Tailwind, NestJS"
                />
                </div>
            {/* Image URL */}
            <div className="group">
              <label className="block text-slate-300 font-medium mb-3 flex items-center gap-2">
                <Image size={18} />
                Project Image
              </label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 
                           focus:outline-none focus:border-white/40 focus:ring-4 focus:ring-white/20 
                           transition-all duration-300 shadow-xl hover:shadow-2xl"
                placeholder="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
              />
            </div>

            {/* GitHub & Live - EXACT same grid as AddProject */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-slate-300 font-medium mb-3 flex items-center gap-2">
                  <Github size={18} className="text-purple-400" />
                  GitHub Repository
                </label>
                <input
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/5 border border-purple-500/30 rounded-2xl text-white placeholder-slate-400 
                             focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 
                             transition-all duration-300 shadow-xl hover:shadow-2xl"
                  placeholder="https://github.com/username/project-name"
                />
              </div>

              <div className="group">
                <label className="block text-slate-300 font-medium mb-3 flex items-center gap-2">
                  <Globe size={18} className="text-blue-400" />
                  Live Demo
                </label>
                <input
                  name="live"
                  value={formData.live}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white/5 border border-blue-500/30 rounded-2xl text-white placeholder-slate-400 
                             focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 
                             transition-all duration-300 shadow-xl hover:shadow-2xl"
                  placeholder="https://your-project-name.com"
                />
              </div>
            </div>

            {/* Action Buttons - EXACT same as AddProject */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="group flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 
                           text-white py-5 px-8 rounded-2xl font-semibold text-lg shadow-2xl 
                           hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] active:translate-y-0.5 
                           transition-all duration-300 flex items-center justify-center gap-3
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none 
                           hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700"
              >
                {saving ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Project...
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    Update Project
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 
                           text-slate-300 py-5 px-8 rounded-2xl font-semibold text-lg shadow-xl 
                           hover:bg-white/10 hover:text-white hover:shadow-2xl hover:scale-105 
                           transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Back to Projects
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
