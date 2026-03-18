const COOKIE_NAME = "chemmaster_progress_v1"

export type ProgressMap = Record<string, Record<string, number>>

type ProgressCookiePayload = {
  version: 1
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
  if (!raw) return {}

  try {
    const decoded = decodeURIComponent(raw)
    const parsed = JSON.parse(decoded) as ProgressCookiePayload | { completedTopics?: Record<string, true> }

    // Current format
    if ("progress" in parsed && parsed.progress && typeof parsed.progress === "object") {
      return parsed.progress
    }

    // Legacy migration format: { completedTopics: { "g:m:t": true } }
    if ("completedTopics" in parsed && parsed.completedTopics) {
      const migrated: ProgressMap = {}
      Object.keys(parsed.completedTopics).forEach((k) => {
        const normalized = k.split(":").join("-")
        migrated[normalized] = { completed: 1 }
      })
      return migrated
    }

    return {}
  } catch {
    return {}
  }
}

export function writeProgressCookie(progress: ProgressMap) {
  if (typeof document === "undefined") return

  const payload: ProgressCookiePayload = {
    version: 1,
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