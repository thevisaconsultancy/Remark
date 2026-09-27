export type NeedOption = { slug: string; label: string };

export type LeadValues = {
  name: string;
  email: string;
  phone: string;
  needs: string[];
  brief: string;
};

export type LeadField = "name" | "email" | "phone" | "brief";

export type LeadErrors = Partial<Record<"name" | "email" | "brief", string>>;

/** A line of the red office copy. The field with focus lights its line. */
export type RecordRow = "from" | "email" | "phone" | "for" | "brief";

/** The field whose last edit added characters, and how many: those characters land on the copy one by one. */
export type FreshInk = { field: LeadField; count: number };
