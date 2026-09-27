// Single source of truth for social + contact links.
// TODO(remark): confirm/replace these profile URLs with the real accounts —
// these are best-guess handles, not verified. This is the ONLY file to edit.
export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/remarkstudio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/remarkstudio" },
  { label: "X", href: "https://x.com/remarkstudio" },
  { label: "Facebook", href: "https://facebook.com/remarkstudio" },
  { label: "YouTube", href: "https://youtube.com/@remarkstudio" },
] as const;

export const EMAIL = "hello@remarkstudio.co";
export const PHONE_PRIMARY = { display: "+92 326 8450001", href: "tel:+923268450001" };
export const PHONE_SECONDARY = { display: "+92 326 8450002", href: "tel:+923268450002" };

export const ADDRESS = {
  lines: ["Office #104, Mezzanine Floor", "Embassy Gardens, Sector C1", "Bahria Enclave, Islamabad"],
  full: "Office #104, Mezzanine Floor, Embassy Gardens, Sector C1, Bahria Enclave, Islamabad",
} as const;

export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS.full);

// TODO(remark): add the verified WhatsApp Business number, e.g.
// { display: "+92 3xx xxxxxxx", href: "https://wa.me/923xxxxxxxxx" }. Pages render WhatsApp only when this is set.
export const WHATSAPP: { display: string; href: string } | null = null;
