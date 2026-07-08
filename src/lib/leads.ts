export interface LeadData {
  formType: string;
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  format?: string;
  propertyTitle?: string;
  propertyId?: string;
  lang: string;
}

export async function submitLead(data: LeadData): Promise<boolean> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.error("Error submitting lead to API:", err);
    return false;
  }
}
