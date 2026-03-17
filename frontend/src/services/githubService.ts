const USERNAME = "Takshsri"

export const getUser = async () => {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`)
  return res.json()
}

export const getRepos = async () => {
  const res = await fetch(`https://api.github.com/users/${USERNAME}/repos`)
  return res.json()
}

export const getEvents = async () => {
  const res = await fetch(`https://api.github.com/users/${USERNAME}/events`)
  return res.json()
}

export const getRepoCommits = async (repoName: string) => {
  const res = await fetch(
    `https://api.github.com/repos/${USERNAME}/${repoName}/commits?per_page=100`
  )
  return res.json()
}