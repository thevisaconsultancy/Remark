// Fictional sample data for the CRM product shots. Every name, email, case number
// and figure here is invented. None of it comes from the live product.

export type CaseStatus = "Active" | "Refused" | "Closed" | "Approved";

export type SampleCase = {
  no: string;
  client: string;
  assignee: string;
  visa: string;
  office: string;
  stage: string;
  status: CaseStatus;
  overdue?: number;
  fee?: string;
  created: string;
};

export const SAMPLE_CASES: SampleCase[] = [
  { no: "NZ-WRK-0014", client: "Hamza Rauf", assignee: "Mehwish", visa: "New Zealand", office: "HQ", stage: "Enquiry and eligibility check", status: "Active", created: "Sep 24" },
  { no: "AU-STU-0006", client: "Mahnoor Tariq", assignee: "Danish", visa: "Australia", office: "HQ", stage: "Enquiry and course shortlist", status: "Active", created: "Sep 23" },
  { no: "UK-SKW-0009", client: "Bilal Aslam", assignee: "Mehwish", visa: "United Kingdom", office: "City", stage: "Document collection", status: "Active", overdue: 2, created: "Sep 18" },
  { no: "CA-VIS-0011", client: "Zoya Farooq", assignee: "Saad", visa: "Canada", office: "HQ", stage: "Submission", status: "Active", fee: "PKR 185,000", created: "Sep 15" },
  { no: "DE-OPP-0003", client: "Usman Qadir", assignee: "Danish", visa: "Germany", office: "HQ", stage: "Assessment", status: "Closed", created: "Sep 12" },
  { no: "NZ-WRK-0013", client: "Iqra Nadeem", assignee: "Saad", visa: "New Zealand", office: "City", stage: "Document collection", status: "Active", overdue: 5, created: "Sep 09" },
  { no: "CA-VIS-0010", client: "Fahad Mir", assignee: "Mehwish", visa: "Canada", office: "HQ", stage: "Decision", status: "Approved", fee: "PKR 210,000", created: "Aug 30" },
  { no: "AU-STU-0005", client: "Rida Kamal", assignee: "Danish", visa: "Australia", office: "HQ", stage: "Document collection", status: "Refused", created: "Aug 27" },
  { no: "UK-SKW-0008", client: "Taimur Aziz", assignee: "Saad", visa: "United Kingdom", office: "City", stage: "Biometrics", status: "Active", fee: "PKR 160,000", created: "Aug 21" },
  { no: "NZ-WRK-0012", client: "Hina Baig", assignee: "Mehwish", visa: "New Zealand", office: "HQ", stage: "Submission", status: "Active", overdue: 1, created: "Aug 19" },
];

export type SampleLead = {
  name: string;
  campaign: string;
  country: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  owner: string;
  when: string;
};

export const SAMPLE_CAMPAIGNS = [
  { name: "Canada work permit webinar", fills: 64, converted: 11 },
  { name: "Study in Australia, spring intake", fills: 48, converted: 9 },
  { name: "New Zealand skilled roles", fills: 37, converted: 6 },
  { name: "Walk-in enquiry card", fills: 22, converted: 5 },
];

export const SAMPLE_LEADS: SampleLead[] = [
  { name: "Ayesha Khalid", campaign: "Canada work permit webinar", country: "Canada", status: "New", owner: "Saad", when: "12 min ago" },
  { name: "Omer Shafiq", campaign: "New Zealand skilled roles", country: "New Zealand", status: "Contacted", owner: "Mehwish", when: "1 h ago" },
  { name: "Maryam Iqbal", campaign: "Study in Australia, spring intake", country: "Australia", status: "Qualified", owner: "Danish", when: "3 h ago" },
  { name: "Saif Anwar", campaign: "Canada work permit webinar", country: "Canada", status: "Converted", owner: "Saad", when: "Yesterday" },
  { name: "Noor Fatima", campaign: "Walk-in enquiry card", country: "United Kingdom", status: "Contacted", owner: "Mehwish", when: "Yesterday" },
  { name: "Adeel Hassan", campaign: "New Zealand skilled roles", country: "New Zealand", status: "Lost", owner: "Danish", when: "Sep 22" },
];

export const SAMPLE_STAFF = [
  { name: "Areeba", email: "areeba@example.com", role: "Administrator", team: "Operations", reach: "Sees everything, every branch" },
  { name: "Mehwish", email: "mehwish@example.com", role: "Coordinator", team: "Documentation", reach: "Sees the whole branch" },
  { name: "Danish", email: "danish@example.com", role: "Coordinator", team: "Application", reach: "Sees only their own work" },
  { name: "Saad", email: "saad@example.com", role: "Coordinator", team: "Sales", reach: "Sees only their own work" },
  { name: "Kinza", email: "kinza@example.com", role: "Coordinator", team: "Assessment", reach: "Sees the whole branch" },
];
