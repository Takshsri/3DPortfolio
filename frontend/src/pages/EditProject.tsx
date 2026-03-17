import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    github: "",
    live: "",
  });

  // fetch existing project
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert("Project updated!");
    navigate("/projects");
  };

  return (
    <div className="p-6">
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="description" value={formData.description} onChange={handleChange} />
        <input name="image" value={formData.image} onChange={handleChange} />
        <input name="github" value={formData.github} onChange={handleChange} />
        <input name="live" value={formData.live} onChange={handleChange} />

        <button className="bg-green-500 text-white p-2">
          Update Project
        </button>
      </form>
    </div>
  );
}