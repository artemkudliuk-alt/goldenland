import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getLeads,
  updateLeadStatus,
  updateLead,
  deleteLead,
  deleteLeads,
  LEAD_STATUSES,
  type LeadStatus,
} from "@/lib/leads-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Error fetching leads for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const id = typeof body?.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
    }

    // If payload contains specific updates object
    if (body.updates && typeof body.updates === "object") {
      const ok = await updateLead(id, body.updates);
      if (!ok) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    }

    // Direct status update
    const status = body?.status as LeadStatus;
    if (status && LEAD_STATUSES.includes(status)) {
      const ok = await updateLeadStatus(id, status);
      if (!ok) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid update payload" }, { status: 400 });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const id = typeof body?.id === "string" ? body.id : "";
    const ids = Array.isArray(body?.ids) ? body.ids : [];

    if (id) {
      const ok = await deleteLead(id);
      if (!ok) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      return NextResponse.json({ success: true });
    }

    if (ids.length > 0) {
      const ok = await deleteLeads(ids);
      if (!ok) return NextResponse.json({ error: "Failed to delete leads" }, { status: 500 });
      return NextResponse.json({ success: true, count: ids.length });
    }

    return NextResponse.json({ error: "Missing id or ids array" }, { status: 400 });
  } catch (error) {
    console.error("Error deleting lead(s):", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
