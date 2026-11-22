export type PetitionPayment = {
  identifier: string
  amount: number
  memo: string
  status: "pending" | "approved" | "completed" | "cancelled" | "failed"
}

type PiPaymentCallbacks = {
  onReadyForServerApproval: (paymentId: string) => void
  onReadyForServerCompletion: (paymentId: string, txid: string) => void
  onCancel: (paymentId: string) => void
  onError: (error: Error, payment?: { identifier?: string }) => void
}

declare global {
  interface Window {
    Pi?: {
      init: (options: { version: string; sandbox?: boolean }) => void
      authenticate: (scopes: string[], onIncompletePaymentFound: (payment: unknown) => void) => Promise<{ user: { uid: string; username: string }; accessToken: string }>
      createPayment: (data: { amount: number; memo: string; metadata: Record<string, unknown> }, callbacks: PiPaymentCallbacks) => void
    }
  }
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json().catch(() => ({}))
}

export async function createPetitionPayment(userId: string): Promise<PetitionPayment> {
  if (!userId.trim()) throw new Error("A user identifier is required")

  if (typeof window === "undefined" || !window.Pi?.createPayment) {
    throw new Error("Pi Browser is required to complete this action.")
  }

  return new Promise<PetitionPayment>((resolve, reject) => {
    window.Pi!.createPayment(
      {
        amount: 1,
        memo: "Elmahrosa Smart City - Civic Support",
        metadata: { type: "civic_support", userId, app: "teos-pi-smart-city" },
      },
      {
        onReadyForServerApproval: (paymentId) => {
          postJson("/api/payments/approve", { paymentId }).catch((e) => console.error("approve", e))
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          postJson("/api/payments/complete", { paymentId, txid })
            .then(() => resolve({ identifier: paymentId, amount: 1, memo: "Civic support payment completed", status: "completed" }))
            .catch((e) => reject(e))
        },
        onCancel: (paymentId) => reject(new Error(`Payment cancelled: ${paymentId}`)),
        onError: (error) => reject(error),
      },
    )
  })
}
