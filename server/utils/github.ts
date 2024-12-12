import { Octokit } from 'octokit'

let _octokit: Octokit

export function useOctokit() {
  if (!_octokit) {
    const config = useRuntimeConfig()

    _octokit = new Octokit({
      auth: config.githubToken,
    })
  }

  return _octokit
}

export interface Contributor {
  login: string
  avatar: string
}

async function enrichContributor(contributor: Contributor): Promise<Contributor> {
  const response = await fetch(contributor.avatar)
  const arrayBuffer = await response.arrayBuffer()
  const binary = String.fromCharCode(...new Uint8Array(arrayBuffer))

  return {
    login: contributor.login,
    avatar: btoa(binary),
  }
}

export const getContributors = defineCachedFunction(async (repo: string) => {
  const api = useOctokit()
  const [owner, name] = repo.split('/')

  if (!owner || !name) {
    return []
  }

  try {
    const contributors = await api.paginate('GET /repos/{owner}/{repo}/contributors', { owner, repo: name })
    const stackPromises = []

    for (const contributor of contributors.splice(0, 100)) {
      stackPromises.push(enrichContributor({
        login: contributor.login || 'unknown',
        avatar: contributor.avatar_url || '',
      }))
    }

    const usersAll = await Promise.allSettled(stackPromises)

    return usersAll
      .filter((c) => c.status === 'fulfilled')
      .map((c) => c.value)
  } catch (e) {
    logger.error(e)
  }

  return []
}, {
  name: 'getContributors',
  getKey: (repo) => repo,
  maxAge: 43200, // 12 hours
})
