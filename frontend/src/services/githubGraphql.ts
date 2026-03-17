const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export const getGithubStats = async () => {

  const query = `
  query {
    user(login: "Takshsri") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
      }
      repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          stargazerCount
        }
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
  `

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  })

  const json = await res.json()

  const user = json.data.user

  // Calculate total stars
  const totalStars = user.repositories.nodes.reduce(
    (sum: number, repo: any) => sum + repo.stargazerCount,
    0
  )

  return {
    repos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    stars: totalStars,
    commits: user.contributionsCollection.totalCommitContributions,
    pullRequests: user.contributionsCollection.totalPullRequestContributions,
    issues: user.contributionsCollection.totalIssueContributions,
    contributions: user.contributionsCollection.contributionCalendar.totalContributions
  }
}