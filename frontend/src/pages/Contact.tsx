import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Phone, Send, User, Mail as MailIcon, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [_submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,  
      [e.target.name]: e.target.value
    });
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {

    const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    setSubmitted(true);
    setStatus("success");

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);

  } catch (error) {
    console.error(error);
    setStatus("error");
  }
};
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-2 pb-12 px-4">
      {/* Background patterns - EXACT Home page theme */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,rgba(168,85,247,0.3)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.3)_2px,transparent_2px)] [background-size:80px_80px]" />

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl mb-8 mx-auto max-w-max">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl">
              <Mail size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight">
                Get In Touch
              </h1>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's talk about it. I'm always open to exciting opportunities.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Phone size={24} className="text-emerald-400" />
                Quick Links
              </h3>
              <div className="space-y-4">
                <a href="mailto:hello@developer.com" className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all duration-300">
                  <MailIcon size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-slate-300 font-medium">ramyamannam7@gmail.com</p>
                    <p className="text-sm text-slate-500">Send me an email</p>
                  </div>
                </a>
                <a href="https://github.com/Takshsri" className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all duration-300">
                  <Github size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                  <div>
                    <p className="text-slate-300 font-medium">@Takshsri</p>
                    <p className="text-sm text-slate-500">Message on GitHub</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/ramya-mannam-bb6703289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:shadow-xl transition-all duration-300">
                  <Linkedin size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-slate-300 font-medium">Ramya Mannam</p>
                    <p className="text-sm text-slate-500">Connect on LinkedIn</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MapPin size={24} className="text-purple-400" />
                Location
              </h3>
              <div>
                <p className="text-slate-300 text-lg mb-2">Podili, Andhra Pradesh</p>
                <p className="text-slate-400">India 🌍</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 sticky top-24">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-white mb-2">Send Message</h3>
                <p className="text-slate-400">Fill out the form and I'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <MailIcon size={16} />
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <MessageCircle size={16} />
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="w-full px-5 py-4 bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 border border-white/20 rounded-2xl resize-vertical focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 shadow-xl hover:shadow-2xl hover:border-white/30"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 mt-4"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {status === "success" && (
                <div className="mt-6 p-6 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl text-center">
                  <p className="text-emerald-300 font-semibold text-lg mb-2">Message sent successfully!</p>
                  <p className="text-emerald-400 text-sm">I'll get back to you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
