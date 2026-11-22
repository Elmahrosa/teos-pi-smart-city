export type PiUser = { uid: string; username: string }
declare global { interface Window { Pi?: { init: (options: { version: string; sandbox: boolean }) => void; authenticate: (scopes: string[], onIncompletePaymentFound: (payment: unknown) => void) => Promise<{ user: PiUser; accessToken: string }> } } }
export async function authenticateUser(): Promise<PiUser | null> { if (typeof window === "undefined" || !window.Pi) return null; try { const result = await window.Pi.authenticate(["username"], () => undefined); return result.user } catch { return null } }
export function isPiBrowserAvailable(): boolean { return typeof window !== "undefined" && !!window.Pi }
