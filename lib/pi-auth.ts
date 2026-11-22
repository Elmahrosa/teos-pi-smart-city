export type PiUser = { uid: string; username: string }

export async function authenticateUser(): Promise<PiUser | null> {
  if (typeof window === "undefined" || !window.Pi) return null
  try {
    const result = await window.Pi.authenticate(["username", "payments"], () => undefined)
    return result.user
  } catch {
    return null
  }
}

export function isPiBrowserAvailable(): boolean {
  return typeof window !== "undefined" && !!window.Pi
}
