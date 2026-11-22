export type PetitionPayment = { identifier: string; amount: 5; memo: string; status: "simulated"; environment: "testnet-sandbox" }

export async function createPetitionPayment(userId: string): Promise<PetitionPayment> {
  if (!userId.trim()) throw new Error("A demo user identifier is required")
  return { identifier: `sandbox-demo-${Date.now()}`, amount: 5, memo: "Elmahrosa petition fee (testnet sandbox simulation)", status: "simulated", environment: "testnet-sandbox" }
}
