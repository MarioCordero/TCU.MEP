const COOKIE_NAME = "chemmaster_progress_v2"

export type ProgressEntry = {
  completed?: 0 | 1
  earned?: number
  total?: number
}

export type ProgressMap = Record<string, ProgressEntry>

type ProgressCookiePayload = {
  version: 2
  progress: ProgressMap
  updatedAt: number
}

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null

  const parts = document.cookie ? document.cookie.split("; ") : []
  const prefix = `${name}=`
  const row = parts.find((p) => p.startsWith(prefix))
  if (!row) return null
  return row.slice(prefix.length)
}

export function readProgressCookie(): ProgressMap {
  const raw = getCookieValue(COOKIE_NAME)
  
  // Try new version first
  if (raw) {
    try {
      const decoded = decodeURIComponent(raw)
      const parsed = JSON.parse(decoded) as ProgressCookiePayload | any

      if ("progress" in parsed && parsed.progress && typeof parsed.progress === "object") {
        return parsed.progress
      }
    } catch {
      // Fall through to legacy migration
    }
  }

  // Try legacy cookie (v1)
  const legacyRaw = getCookieValue("chemmaster_progress_v1")
  if (legacyRaw) {
    try {
      const decoded = decodeURIComponent(legacyRaw)
      const parsed = JSON.parse(decoded) as any

      // Legacy format: { completedTopics: { "g:m:t": true } }
      if ("completedTopics" in parsed && parsed.completedTopics) {
        const migrated: ProgressMap = {}
        Object.keys(parsed.completedTopics).forEach((k) => {
          const normalized = k.split(":").join("-")
          migrated[normalized] = { completed: 1, earned: 1, total: 1 }
        })
        return migrated
      }

      // Legacy v1 format: { version: 1, progress: { "10-2-5": { completed: 1 } } }
      if ("progress" in parsed && parsed.progress && typeof parsed.progress === "object") {
        const migrated: ProgressMap = {}
        Object.entries(parsed.progress).forEach(([key, value]: [string, any]) => {
          migrated[key] = {
            completed: value?.completed,
            earned: value?.completed ? 1 : 0,
            total: 1,
          }
        })
        return migrated
      }
    } catch {
      // Return empty
    }
  }

  return {}
}

export function writeProgressCookie(progress: ProgressMap) {
  if (typeof document === "undefined") return

  const payload: ProgressCookiePayload = {
    version: 2,
    progress,
    updatedAt: Date.now(),
  }

  const value = encodeURIComponent(JSON.stringify(payload))
  const maxAge = 60 * 60 * 24 * 180 // 180 days

  document.cookie = [
    `${COOKIE_NAME}=${value}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "SameSite=Lax",
    location.protocol === "https:" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ")
}