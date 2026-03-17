export interface Project {
  id: number
  title: string
  description: string
  tech: string
  github: string
  live: string
  image: string
}

export type CreateProject = Omit<Project, "id">