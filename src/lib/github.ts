import { featuredRepos, githubUser } from "@/data/github";

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  url: string;
  homepage: string | null;
}

interface ApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  html_url: string;
  homepage: string | null;
  private: boolean;
}

/**
 * Fetches the featured repositories on the server at build time, refreshed
 * daily with the page. An optional GITHUB_TOKEN (server-only, never prefixed
 * NEXT_PUBLIC_) raises the rate limit. Any failure drops that repository
 * silently, so a GitHub outage can never break the page.
 */
export async function getFeaturedRepos(): Promise<Repo[]> {
  if (featuredRepos.length === 0) return [];

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const results = await Promise.all(
    featuredRepos.map(async (name): Promise<Repo | null> => {
      try {
        const res = await fetch(`https://api.github.com/repos/${githubUser}/${encodeURIComponent(name)}`, {
          headers,
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return null;
        const r = (await res.json()) as ApiRepo;
        if (r.private) return null;
        return {
          name: r.name,
          description: r.description,
          language: r.language,
          topics: r.topics ?? [],
          url: r.html_url,
          homepage: r.homepage || null,
        };
      } catch {
        return null;
      }
    }),
  );
  return results.filter((r): r is Repo => r !== null);
}
