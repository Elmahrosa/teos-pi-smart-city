export type PetitionPayment = {
  identifier: string
  amount: 5
  memo: string
  status: "simulated"
  environment: "testnet-sandbox"
}

/**
 * UI-only sandbox simulation. This deliberately does not call Pi.createPayment,
 * so it cannot charge Pi. Real Pi payments require server approval/completion
 * handlers and a separately reviewed configuration; this demo has neither.
 */
export async function createPetitionPayment(userId: string): Promise<PetitionPayment> {
  if (!userId.trim()) throw new Error("A demo user identifier is required")
  return {
    identifier: `sandbox-demo-${Date.now()}`,
    amount: 5,
    memo: "Sandbox Mode — No real Pi charged",
    status: "simulated",
    environment: "testnet-sandbox",
  }
}
