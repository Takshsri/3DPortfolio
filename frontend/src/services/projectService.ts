import axios from "axios"
import type { CreateProject, Project } from "../types/project"

const API = `${import.meta.env.VITE_API_URL}/projects`

export const getProjects = async (): Promise<Project[]> => {
  const res = await axios.get(API)
  return res.data
}

export const getProjectById = async (id: number): Promise<Project> => {
  const res = await axios.get(`${API}/${id}`)
  return res.data
}

export const createProject = async (data: CreateProject): Promise<Project> => {
  const res = await axios.post(API, data)
  return res.data
}

export const updateProject = async (
  id: number,
  data: Project
): Promise<Project> => {
  const res = await axios.put(`${API}/${id}`, data)
  return res.data
}

export const patchProject = async (
  id: number,
  data: Partial<Project>
): Promise<Project> => {
  const res = await axios.patch(`${API}/${id}`, data)
  return res.data
}

export const deleteProject = async (id: number) => {
  return axios.delete(`${API}/${id}`)
}