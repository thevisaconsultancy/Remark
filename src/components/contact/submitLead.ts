export type LeadDraft = { name: string; email: string; phone?: string; needs: string[]; brief: string };

// The one place a lead leaves the page. It keeps the old ContactForm behaviour exactly:
// the form switches to its sent state and nothing is transmitted.
// Contract: resolve once the lead is safely delivered; throw if it was not. The counter
// only tears off the sheet on resolve, and on a throw keeps every value and says so.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the stub keeps the final signature
export async function submitLead(_lead: LeadDraft): Promise<void> {
  // TODO(remark): nothing is sent yet, exactly like the old ContactForm. Wire this to email, a CRM or WhatsApp before launch.
}
