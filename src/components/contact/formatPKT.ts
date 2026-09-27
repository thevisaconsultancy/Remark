// Dates on the office copy are always Pakistan time, wherever the visitor is.
const PKT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatPKT(date: Date): string {
  return `${PKT.format(date)} PKT`;
}
