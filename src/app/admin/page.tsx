"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { type ContactSettings, type OfficeData } from "@/lib/contacts-types";
import { RichTextEditor } from "@/components/RichTextEditor";

type LeadStatus = "new" | "in_progress" | "completed" | "declined";

interface Lead {
  id: string;
  formType: string;
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  format?: string;
  propertyTitle?: string;
  propertyId?: string;
  lang?: string;
  timestamp?: string;
  status: LeadStatus;
}

const STATUS_OPTIONS: { value: LeadStatus; label: string; className: string }[] = [
  { value: "new", label: "New", className: "bg-amber-950/40 text-amber-400 border-amber-800/40" },
  { value: "in_progress", label: "In Progress", className: "bg-blue-950/40 text-blue-400 border-blue-800/40" },
  { value: "completed", label: "Completed", className: "bg-emerald-950/40 text-emerald-400 border-emerald-800/40" },
  { value: "declined", label: "Declined", className: "bg-zinc-800/60 text-zinc-400 border-zinc-700" },
];

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const [activeTab, setActiveTab] = useState<"leads" | "contacts" | "pages" | "catalog">("leads");
  const [contactsSettings, setContactsSettings] = useState<ContactSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Custom Pages states
  const [customPages, setCustomPages] = useState<any[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [pagesSaving, setPagesSaving] = useState(false);
  const [editingPage, setEditingPage] = useState<any | null>(null);

  // Custom Properties states
  const [customProperties, setCustomProperties] = useState<any[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [propertiesSaving, setPropertiesSaving] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  // Form translation selector
  const [formLang, setFormLang] = useState<"en" | "ua" | "ru">("en");

  // The real gate is the httpOnly cookie checked server-side. On load we simply
  // attempt to fetch leads: 200 means we already hold a valid session, 401 shows login.
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
        fetchLeads();
      } else if (res.status === 500) {
        setLoginError("Admin auth is not configured. Set ADMIN_PASSWORD in .env.");
      } else {
        setLoginError("Invalid administrative passcode.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch {
      // ignore — cookie will expire regardless
    }
    setIsAuthenticated(false);
    setLeads([]);
  };

  const fetchContactsSettings = async () => {
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) {
          setContactsSettings(data.settings);
        }
      }
    } catch (err) {
      console.error("Error fetching contact settings:", err);
    } finally {
      setSettingsLoading(false);
    }
  };

  const fetchPages = async () => {
    setPagesLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const data = await res.json();
        setCustomPages(data.pages || []);
      }
    } catch (err) {
      console.error("Error fetching pages:", err);
    } finally {
      setPagesLoading(false);
    }
  };

  const fetchProperties = async () => {
    setPropertiesLoading(true);
    try {
      const res = await fetch("/api/admin/properties");
      if (res.ok) {
        const data = await res.json();
        setCustomProperties(data.properties || []);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setPropertiesLoading(false);
    }
  };

  const handleSavePage = async (page: any) => {
    setPagesSaving(true);
    let updatedPages = [...customPages];
    const index = updatedPages.findIndex((p) => p.slug === page.slug);
    if (index >= 0) {
      updatedPages[index] = page;
    } else {
      updatedPages.push(page);
    }

    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: updatedPages }),
      });
      if (res.ok) {
        setCustomPages(updatedPages);
        setEditingPage(null);
      } else {
        alert("Failed to save page. Please check slug uniqueness.");
      }
    } catch (err) {
      console.error("Error saving page:", err);
      alert("Network error saving page.");
    } finally {
      setPagesSaving(false);
    }
  };

  const handleDeletePage = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    setPagesSaving(true);
    const updatedPages = customPages.filter((p) => p.slug !== slug);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: updatedPages }),
      });
      if (res.ok) {
        setCustomPages(updatedPages);
      } else {
        alert("Failed to delete page.");
      }
    } catch (err) {
      console.error("Error deleting page:", err);
    } finally {
      setPagesSaving(false);
    }
  };

  const handleSaveProperty = async (property: any) => {
    setPropertiesSaving(true);
    let updatedProps = [...customProperties];
    const index = updatedProps.findIndex((p) => p.id === property.id);
    if (index >= 0) {
      updatedProps[index] = property;
    } else {
      updatedProps.push(property);
    }

    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ properties: updatedProps }),
      });
      if (res.ok) {
        setCustomProperties(updatedProps);
        setEditingProperty(null);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to save property.");
      }
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Network error saving property.");
    } finally {
      setPropertiesSaving(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    setPropertiesSaving(true);
    const updatedProps = customProperties.filter((p) => p.id !== id);
    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ properties: updatedProps }),
      });
      if (res.ok) {
        setCustomProperties(updatedProps);
      } else {
        alert("Failed to delete property.");
      }
    } catch (err) {
      console.error("Error deleting property:", err);
    } finally {
      setPropertiesSaving(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactsSettings) return;
    setSettingsSaving(true);
    setSettingsMessage(null);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactsSettings),
      });
      if (res.ok) {
        setSettingsMessage({ text: "Contact settings saved successfully!", type: "success" });
      } else {
        const errData = await res.json().catch(() => ({}));
        setSettingsMessage({ text: errData.error || "Failed to save settings.", type: "error" });
      }
    } catch (err) {
      setSettingsMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleAddOffice = () => {
    if (!contactsSettings) return;
    const newOffice: OfficeData = {
      id: "office_" + Date.now(),
      name: { en: "New Office", ua: "Новий офіс", ru: "Новый офис" },
      phone: "+380 00 000 0000",
    };
    setContactsSettings({
      ...contactsSettings,
      offices: [...contactsSettings.offices, newOffice],
    });
  };

  const handleDeleteOffice = (id: string) => {
    if (!contactsSettings) return;
    if (!window.confirm("Are you sure you want to delete this office?")) return;
    setContactsSettings({
      ...contactsSettings,
      offices: contactsSettings.offices.filter((o) => o.id !== id),
    });
  };

  const handleOfficeChange = (index: number, key: string, val: string, lang?: "en" | "ua" | "ru") => {
    if (!contactsSettings) return;
    const updated = [...contactsSettings.offices];
    if (lang && key === "name") {
      updated[index] = {
        ...updated[index],
        name: {
          ...updated[index].name,
          [lang]: val,
        },
      };
    } else if (key === "phone" || key === "id") {
      updated[index] = {
        ...updated[index],
        [key]: val,
      };
    }
    setContactsSettings({
      ...contactsSettings,
      offices: updated,
    });
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setLeads(data.leads || []);
        setSelectedIds([]);
        fetchContactsSettings();
        fetchPages();
        fetchProperties();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    // Optimistic update
    const prev = leads;
    setLeads((cur) => cur.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch (err) {
      console.error("Failed to update status:", err);
      setLeads(prev); // revert on failure
    }
  };

  const handleDeleteSingle = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    const prev = leads;
    setLeads((cur) => cur.filter((l) => l.id !== id));
    setSelectedIds((cur) => cur.filter((i) => i !== id));
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch (err) {
      console.error("Failed to delete lead:", err);
      setLeads(prev);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected leads?`)) return;
    const prev = leads;
    const idsToDelete = [...selectedIds];
    setLeads((cur) => cur.filter((l) => !idsToDelete.includes(l.id)));
    setSelectedIds([]);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: idsToDelete }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch (err) {
      console.error("Failed to bulk delete leads:", err);
      setLeads(prev);
    }
  };

  const handleSaveNotes = async () => {
    if (!editingLead) return;
    const id = editingLead.id;
    const notes = editNotes;
    const prev = leads;
    setLeads((cur) => cur.map((l) => (l.id === id ? { ...l, notes } : l)));
    setEditingLead(null);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updates: { notes } }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch (err) {
      console.error("Failed to save notes:", err);
      setLeads(prev);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;

    // Guard against CSV/formula injection in spreadsheet apps.
    const safe = (v: string) => {
      const s = String(v ?? "");
      return /^[=+\-@]/.test(s) ? `'${s}` : s;
    };

    const headers = ["Timestamp", "Status", "Form Type", "Name", "Phone", "Email", "Interest", "Format", "Property", "Language", "Message", "Notes"];
    const rows = leads.map(l => [
      l.timestamp || "",
      l.status || "new",
      l.formType || "",
      l.name || "",
      l.phone || "",
      l.email || "",
      l.interest || "",
      l.format || "",
      l.propertyTitle ? `${l.propertyTitle} (${l.propertyId || ""})` : "",
      l.lang || "",
      l.message || "",
      (l as unknown as Record<string, string>).notes || "",
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${safe(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `golden_land_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredLeads = leads.filter((l) => {
    const matchesType = filterType === "all" || l.formType === filterType;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (l.name && l.name.toLowerCase().includes(query)) ||
      (l.email && l.email.toLowerCase().includes(query)) ||
      (l.phone && l.phone.toLowerCase().includes(query)) ||
      (l.propertyTitle && l.propertyTitle.toLowerCase().includes(query)) ||
      (l.message && l.message.toLowerCase().includes(query)) ||
      ((l as unknown as Record<string, string>).notes && (l as unknown as Record<string, string>).notes.toLowerCase().includes(query));

    return matchesType && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length && filteredLeads.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map((l) => l.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((cur) =>
      cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]
    );
  };

  // Stats
  const totalLeads = leads.length;
  const meetingCount = leads.filter(l => l.formType === "Meeting Booking").length;
  const brochureCount = leads.filter(l => l.formType === "Brochure Download").length;
  const catalogCount = leads.filter(l => l.formType === "Catalog Request").length;
  const newsletterCount = leads.filter(l => l.formType === "Newsletter Subscription").length;

  // Avoid flashing the login form before the initial session check resolves.
  if (!isAuthenticated && loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-[13px] font-light tracking-[0.1em] text-white/40 uppercase">
        Loading portal…
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">
        <div className="w-full max-w-[420px] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <div className="mb-6 flex flex-col items-center">
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-32 w-auto object-contain mb-2" 
            />
            <h1 className="text-[20px] font-light tracking-[0.05em] uppercase text-white/90">
              Golden Land Portal
            </h1>
            <p className="mt-1.5 text-[10px] font-light uppercase tracking-[0.2em] text-[#D4AF37]">
              Administrative Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">
                Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full border border-white/20 bg-black/40 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-[12px] font-light text-rose-400 bg-rose-950/40 border border-rose-900/40 p-3">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full bg-[#D4AF37] py-3 text-[13px] font-medium tracking-[0.1em] text-[#0a0a0a] uppercase transition-colors hover:bg-white disabled:opacity-40"
            >
              {submitting ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
          
          <div className="mt-8 border-t border-white/10 pt-4 text-center">
            <Link href="/" className="text-[12px] font-light text-white/40 hover:text-white/80 transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white/90 font-sans">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-golden-land.png"
              alt="Golden Land Logo"
              width={38}
              height={38}
              className="object-contain"
            />
            <div>
              <h1 className="text-[16px] font-light tracking-[0.05em] uppercase text-white leading-none">
                Golden Land CRM
              </h1>
              <p className="mt-1 text-[10px] font-light tracking-[0.15em] text-[#D4AF37] uppercase">
                Leads Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${(contactsSettings?.whatsapp || "+380 7777 04177").replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-[#25D366] hover:text-[#25D366] transition-colors text-white/60 hover:bg-[#25D366]/5"
              title="WhatsApp Chat"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                <path d="M20.5 3.5A11 11 0 0 0 3.4 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>
              </svg>
            </a>

            {/* Telegram Link */}
            <a
              href={`https://t.me/${contactsSettings?.telegram || "goldenlandproperty"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-[#0088cc] hover:text-[#0088cc] transition-colors text-white/60 hover:bg-[#0088cc]/5"
              title="Telegram Chat"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                <path d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.2.2 1.4-.7l2.6-12h0c.2-1-.4-1.5-1.1-1.2L3.6 10.4c-1 .4-1 1-.2 1.2l4.2 1.3 9.7-6.1c.4-.3.8-.1.5.2z"/>
              </svg>
            </a>

            <button
              onClick={fetchLeads}
              className="border border-white/10 bg-transparent px-4 py-2 text-[12px] font-light tracking-[0.05em] transition-colors hover:border-[#D4AF37] hover:bg-white/5"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="bg-white/10 px-4 py-2 text-[12px] font-light tracking-[0.05em] transition-colors hover:bg-red-900 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-4 text-[13px] font-medium tracking-[0.1em] uppercase border-b-2 transition-all ${
              activeTab === "leads" ? "border-[#D4AF37] text-white" : "border-transparent text-white/40 hover:text-white/80"
            }`}
          >
            Leads Database
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`pb-4 text-[13px] font-medium tracking-[0.1em] uppercase border-b-2 transition-all ${
              activeTab === "contacts" ? "border-[#D4AF37] text-white" : "border-transparent text-white/40 hover:text-white/80"
            }`}
          >
            Contact Settings
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`pb-4 text-[13px] font-medium tracking-[0.1em] uppercase border-b-2 transition-all ${
              activeTab === "pages" ? "border-[#D4AF37] text-white" : "border-transparent text-white/40 hover:text-white/80"
            }`}
          >
            Custom Pages
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-4 text-[13px] font-medium tracking-[0.1em] uppercase border-b-2 transition-all ${
              activeTab === "catalog" ? "border-[#D4AF37] text-white" : "border-transparent text-white/40 hover:text-white/80"
            }`}
          >
            Catalog Manager
          </button>
        </div>

        {activeTab === "leads" && (
          <>
            {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-light tracking-[0.1em] text-white/50 uppercase">Total Leads</p>
            <p className="mt-2 text-[32px] font-light text-white">{totalLeads}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-light tracking-[0.1em] text-white/50 uppercase">Meetings Booked</p>
            <p className="mt-2 text-[32px] font-light text-[#D4AF37]">{meetingCount}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-light tracking-[0.1em] text-white/50 uppercase">Brochure DLs</p>
            <p className="mt-2 text-[32px] font-light text-white">{brochureCount}</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-5">
            <p className="text-[10px] font-light tracking-[0.1em] text-white/50 uppercase">Catalog Requests</p>
            <p className="mt-2 text-[32px] font-light text-white">{catalogCount}</p>
          </div>
          <div className="col-span-2 border border-white/10 bg-white/5 p-5 sm:col-span-1">
            <p className="text-[10px] font-light tracking-[0.1em] text-white/50 uppercase">Newsletter Subs</p>
            <p className="mt-2 text-[32px] font-light text-white">{newsletterCount}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search by name, email, phone or property..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-white/10 bg-[#121212] px-4 py-2 text-[14px] font-light placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-white/10 bg-[#121212] px-4 py-2 text-[14px] font-light focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="all">All Lead Types</option>
                <option value="Meeting Booking">Meeting Booking</option>
                <option value="Brochure Download">Brochure Download</option>
                <option value="Catalog Request">Catalog Request</option>
                <option value="Newsletter Subscription">Newsletter Subscription</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-950/80 border border-red-800/60 px-4 py-2 text-[12px] font-medium tracking-[0.05em] text-red-300 uppercase transition-colors hover:bg-red-900 hover:text-white"
              >
                Delete Selected ({selectedIds.length})
              </button>
            )}

            <button
              onClick={exportCSV}
              disabled={filteredLeads.length === 0}
              className="bg-[#D4AF37] px-5 py-2 text-[12px] font-medium tracking-[0.05em] text-[#0a0a0a] uppercase transition-colors hover:bg-white disabled:opacity-40"
            >
              Export to CSV
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="mt-6 border border-white/10 bg-[#0a0a0a] overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-[14px] font-light text-white/50">
              Loading lead database...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-20 text-center text-[14px] font-light text-white/50">
              No leads found matching your criteria.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.1em] text-white/60">
                  <th className="px-4 py-4 w-10 text-center">
                    <input
                      type="checkbox"
                      aria-label="Select all leads"
                      checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
                      onChange={toggleSelectAll}
                      className="accent-[#D4AF37] cursor-pointer"
                    />
                  </th>
                  <th className="px-5 py-4 font-medium">Date & Time</th>
                  <th className="px-5 py-4 font-medium">Lead Name</th>
                  <th className="px-5 py-4 font-medium">Contact Details</th>
                  <th className="px-5 py-4 font-medium">Source Form</th>
                  <th className="px-5 py-4 font-medium">Interest & Details</th>
                  <th className="px-5 py-4 font-medium">Broker Notes</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Lang</th>
                  <th className="px-5 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((l, index) => {
                  const leadDate = l.timestamp ? new Date(l.timestamp) : null;
                  const formattedDate = leadDate 
                    ? leadDate.toLocaleString("en-US", { timeZone: "Europe/Kiev", dateStyle: "short", timeStyle: "short" }) + " (Kyiv)"
                    : "N/A";
                  const notes = (l as unknown as Record<string, string>).notes;
                  const isSelected = selectedIds.includes(l.id);

                  return (
                    <tr key={l.id || index} className={`text-[14px] font-light transition-colors ${isSelected ? "bg-amber-950/20" : "hover:bg-white/5"}`}>
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          aria-label={`Select lead ${l.name || l.id}`}
                          checked={isSelected}
                          onChange={() => toggleSelect(l.id)}
                          className="accent-[#D4AF37] cursor-pointer"
                        />
                      </td>
                      <td className="px-5 py-4 text-[12px] text-white/50 whitespace-nowrap">{formattedDate}</td>
                      <td className="px-5 py-4 font-normal text-white">{l.name || <span className="italic text-white/40">Anonymous</span>}</td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          {l.phone && <p className="text-white/80">{l.phone}</p>}
                          {l.email && <p className="text-[12px] text-white/50">{l.email}</p>}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 text-[11px] font-normal rounded-sm ${
                          l.formType === 'Meeting Booking' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/30' :
                          l.formType === 'Brochure Download' ? 'bg-blue-950/40 text-blue-400 border border-blue-800/30' :
                          l.formType === 'Catalog Request' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                          'bg-zinc-900 text-zinc-400 border border-zinc-800'
                        }`}>
                          {l.formType}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white/70 max-w-xs">
                        <div className="space-y-1 text-[13px]">
                          {l.propertyTitle && (
                            <p>
                              <strong className="text-white/90">Property:</strong> {l.propertyTitle} 
                              {l.propertyId && <span className="text-[11px] text-white/40 ml-1">({l.propertyId})</span>}
                            </p>
                          )}
                          {l.interest && (
                            <p><strong className="text-white/90">Interest:</strong> {l.interest}</p>
                          )}
                          {l.format && (
                            <p><strong className="text-white/90">Format:</strong> {l.format}</p>
                          )}
                          {l.message && (
                            <p className="mt-1 italic text-white/50 text-[12px] bg-white/5 p-2 border-l border-[#D4AF37] max-h-20 overflow-y-auto">
                              "{l.message}"
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        {notes ? (
                          <div className="text-[12px] text-amber-300/90 bg-amber-950/30 border border-amber-800/30 p-2 rounded-sm italic">
                            {notes}
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingLead(l);
                              setEditNotes(notes || "");
                            }}
                            className="text-[11px] text-white/40 hover:text-[#D4AF37] underline transition-colors"
                          >
                            + Add note
                          </button>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {(() => {
                          const cur = STATUS_OPTIONS.find((s) => s.value === (l.status || "new")) || STATUS_OPTIONS[0];
                          return (
                            <select
                              value={l.status || "new"}
                              onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                              className={`cursor-pointer appearance-none border px-2.5 py-1 text-[11px] font-medium rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${cur.className}`}
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s.value} value={s.value} className="bg-[#0a0a0a] text-white">
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          );
                        })()}
                      </td>
                      <td className="px-5 py-4 uppercase text-[12px] font-semibold text-white/50">{l.lang || "N/A"}</td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingLead(l);
                              setEditNotes(notes || "");
                            }}
                            title="Edit / Add Note"
                            className="p-1.5 text-white/60 hover:text-[#D4AF37] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteSingle(l.id)}
                            title="Delete Lead"
                            className="p-1.5 text-white/60 hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    )}

    {activeTab === "contacts" && (
      <div className="space-y-8 max-w-[900px] mt-6">
        <div className="border border-white/10 bg-[#0a0a0a] p-6 md:p-8">
          <h2 className="text-[20px] font-light text-[#D4AF37] mb-6 uppercase tracking-wider">
            Global Contact Channels
          </h2>

          {settingsLoading ? (
            <div className="py-8 text-center text-white/40 text-[14px]">Loading settings...</div>
          ) : !contactsSettings ? (
            <div className="py-8 text-center text-red-400 text-[14px]">Failed to load settings. Try reloading.</div>
          ) : (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {settingsMessage && (
                <div className={`p-4 border text-[14px] font-light ${
                  settingsMessage.type === "success" 
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40" 
                    : "bg-rose-950/40 text-rose-400 border-rose-800/40"
                }`}>
                  {settingsMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 mb-2">
                    Main Company WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={contactsSettings.whatsapp}
                    onChange={(e) => setContactsSettings({ ...contactsSettings, whatsapp: e.target.value })}
                    placeholder="e.g. +380 7777 04177"
                    className="w-full border border-white/20 bg-black/40 px-4 py-3 text-[14px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <span className="text-[10px] text-white/40 mt-1 block">
                    Used for the floating widget, footer, and property inquiry buttons.
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 mb-2">
                    Main Telegram Username (without @)
                  </label>
                  <input
                    type="text"
                    value={contactsSettings.telegram}
                    onChange={(e) => setContactsSettings({ ...contactsSettings, telegram: e.target.value })}
                    placeholder="e.g. goldenlandproperty"
                    className="w-full border border-white/20 bg-black/40 px-4 py-3 text-[14px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <span className="text-[10px] text-white/40 mt-1 block">
                    Directs users to https://t.me/username.
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[16px] font-light text-white leading-none">Office Locations</h3>
                    <p className="text-[11px] text-white/40 mt-1">Manage office directory displayed in footer and contacts page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddOffice}
                    className="border border-[#D4AF37] text-[#D4AF37] px-4 py-2 text-[12px] font-medium uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300"
                  >
                    + Add Office
                  </button>
                </div>

                <div className="space-y-6">
                  {contactsSettings.offices.map((office, idx) => (
                    <div key={office.id} className="border border-white/10 bg-black/20 p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-[12px] font-medium uppercase tracking-wider text-[#D4AF37]">
                          Office #{idx + 1} ({office.id})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteOffice(office.id)}
                          className="text-rose-400 hover:text-rose-300 text-[12px] font-light uppercase tracking-wider transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">
                            Unique ID / Slug (lowercase)
                          </label>
                          <input
                            type="text"
                            value={office.id}
                            onChange={(e) => handleOfficeChange(idx, "id", e.target.value.toLowerCase().replace(/\s+/g, ""))}
                            className="w-full border border-white/10 bg-black/60 px-3 py-2 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={office.phone}
                            onChange={(e) => handleOfficeChange(idx, "phone", e.target.value)}
                            className="w-full border border-white/10 bg-black/60 px-3 py-2 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">
                            Office Name (English)
                          </label>
                          <input
                            type="text"
                            value={office.name.en}
                            onChange={(e) => handleOfficeChange(idx, "name", e.target.value, "en")}
                            className="w-full border border-white/10 bg-black/60 px-3 py-2 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">
                            Office Name (Ukrainian)
                          </label>
                          <input
                            type="text"
                            value={office.name.ua}
                            onChange={(e) => handleOfficeChange(idx, "name", e.target.value, "ua")}
                            className="w-full border border-white/10 bg-black/60 px-3 py-2 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">
                            Office Name (Russian)
                          </label>
                          <input
                            type="text"
                            value={office.name.ru}
                            onChange={(e) => handleOfficeChange(idx, "name", e.target.value, "ru")}
                            className="w-full border border-white/10 bg-black/60 px-3 py-2 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-8 border-t border-white/10 pt-6">
                <button
                  type="submit"
                  disabled={settingsSaving}
                  className="bg-[#D4AF37] hover:bg-white text-[#0a0a0a] px-8 py-3.5 text-[13px] font-medium uppercase tracking-wider transition-all duration-300 disabled:opacity-40"
                >
                  {settingsSaving ? "Saving Settings..." : "Save All Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )}

    {activeTab === "pages" && (
      <div className="space-y-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-light text-[#D4AF37] uppercase tracking-wider">
              Custom Pages
            </h2>
            <p className="text-[11px] text-white/40 mt-1">Create dynamic pages that link to header or footer.</p>
          </div>
          <button
            onClick={() => setEditingPage({
              slug: "",
              title: { en: "", ua: "", ru: "" },
              content: { en: "", ua: "", ru: "" },
              showInHeader: false,
              showInFooter: false
            })}
            className="border border-[#D4AF37] text-[#D4AF37] px-5 py-2.5 text-[12px] font-medium uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300"
          >
            + Create New Page
          </button>
        </div>

        <div className="border border-white/10 bg-[#0a0a0a] overflow-hidden">
          {pagesLoading ? (
            <div className="py-12 text-center text-white/40 text-[14px]">Loading pages...</div>
          ) : customPages.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-[14px]">No custom pages found. Click button above to create one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-white border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
                    <th className="px-6 py-4">Page Title (EN)</th>
                    <th className="px-6 py-4">URL Path / Slug</th>
                    <th className="px-6 py-4">Header Menu</th>
                    <th className="px-6 py-4">Footer Menu</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[13px] font-light">
                  {customPages.map((page) => (
                    <tr key={page.slug} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4 font-normal text-white">{page.title.en || "(No Title)"}</td>
                      <td className="px-6 py-4 text-[#D4AF37] font-mono">/{page.slug}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] rounded-xs font-medium uppercase tracking-wider ${page.showInHeader ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40" : "bg-white/5 text-white/30"}`}>
                          {page.showInHeader ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 text-[10px] rounded-xs font-medium uppercase tracking-wider ${page.showInFooter ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40" : "bg-white/5 text-white/30"}`}>
                          {page.showInFooter ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => {
                              setEditingPage(page);
                              setFormLang("en");
                            }}
                            className="text-[12px] uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePage(page.slug)}
                            className="text-[12px] uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )}

    {activeTab === "catalog" && (
      <div className="space-y-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-light text-[#D4AF37] uppercase tracking-wider">
              Catalog Manager
            </h2>
            <p className="text-[11px] text-white/40 mt-1">Manage dynamic properties directory listed in the catalog.</p>
          </div>
          <button
            onClick={() => {
              setEditingProperty({
                id: "prop_" + Date.now(),
                slug: "",
                title: { en: "", ua: "", ru: "" },
                location: { en: "", ua: "", ru: "" },
                city: "kyiv",
                type: "apartments",
                price: 0,
                area: 0,
                bedrooms: 0,
                roi: "",
                gallery: [""],
                video: "",
                status: "ready",
                address: "",
                description: { en: "", ua: "", ru: "" },
                specs: {
                  rooms: "",
                  layout: "",
                  floor: "",
                  renovation: "",
                  newBuild: "",
                  construction: "",
                  heating: "",
                  ceilings: "",
                  yearBuilt: ""
                }
              });
              setFormLang("en");
            }}
            className="border border-[#D4AF37] text-[#D4AF37] px-5 py-2.5 text-[12px] font-medium uppercase tracking-wider hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300"
          >
            + Add New Property
          </button>
        </div>

        <div className="border border-white/10 bg-[#0a0a0a] overflow-hidden">
          {propertiesLoading ? (
            <div className="py-12 text-center text-white/40 text-[14px]">Loading properties...</div>
          ) : customProperties.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-[14px]">No dynamic properties found. Click button above to add one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-white border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">
                    <th className="px-6 py-4">Title (EN)</th>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Area (m²)</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[13px] font-light">
                  {customProperties.map((p) => (
                    <tr key={p.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4 font-normal text-white">{p.title.en || "(No Title)"}</td>
                      <td className="px-6 py-4 uppercase font-semibold text-white/60 text-[11px]">{p.city}</td>
                      <td className="px-6 py-4 uppercase font-semibold text-white/60 text-[11px]">{p.type}</td>
                      <td className="px-6 py-4 text-[#D4AF37]">${p.price?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-white/80">{p.area} m²</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => {
                              setEditingProperty({
                                ...p,
                                specs: p.specs || {
                                  rooms: "",
                                  layout: "",
                                  floor: "",
                                  renovation: "",
                                  newBuild: "",
                                  construction: "",
                                  heating: "",
                                  ceilings: "",
                                  yearBuilt: ""
                                }
                              });
                              setFormLang("en");
                            }}
                            className="text-[12px] uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(p.id)}
                            className="text-[12px] uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Custom Page Editor Modal */}
    {editingPage && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
        <div className="w-full max-w-2xl border border-white/20 bg-[#121212] p-6 text-white shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-[18px] font-light text-[#D4AF37] uppercase tracking-wider">
              {editingPage.slug ? "Edit Custom Page" : "Create New Custom Page"}
            </h3>
            
            {/* Form Language Switcher in Right Corner */}
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 p-1 rounded-sm">
              {(["en", "ua", "ru"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setFormLang(lang)}
                  className={`px-3 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors rounded-xs ${
                    formLang === lang ? "bg-[#D4AF37] text-[#0a0a0a]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-white/50 mb-1">
                  URL Path / Slug (lowercase, no spaces)
                </label>
                <input
                  type="text"
                  required
                  disabled={!!customPages.find((p) => p.slug === editingPage.slug && editingPage.slug !== "")}
                  value={editingPage.slug}
                  onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                  placeholder="e.g. invest-guide"
                  className="w-full border border-white/15 bg-black/45 px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none disabled:opacity-55"
                />
              </div>
              <div className="flex items-end gap-6 pb-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-white/80">
                  <input
                    type="checkbox"
                    checked={editingPage.showInHeader}
                    onChange={(e) => setEditingPage({ ...editingPage, showInHeader: e.target.checked })}
                    className="accent-[#D4AF37] h-4 w-4"
                  />
                  Show in Header Menu
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-white/80">
                  <input
                    type="checkbox"
                    checked={editingPage.showInFooter}
                    onChange={(e) => setEditingPage({ ...editingPage, showInFooter: e.target.checked })}
                    className="accent-[#D4AF37] h-4 w-4"
                  />
                  Show in Footer Menu
                </label>
              </div>
            </div>

            {/* Language Sensitive Fields */}
            <div className="border border-white/5 bg-white/2 p-4 rounded-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#D4AF37]">
                  Translating into: <span className="underline">{formLang.toUpperCase()}</span>
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-white/50 mb-1">
                  Page Title ({formLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={editingPage.title[formLang] || ""}
                  onChange={(e) => setEditingPage({
                    ...editingPage,
                    title: { ...editingPage.title, [formLang]: e.target.value }
                  })}
                  placeholder={`Enter title in ${formLang.toUpperCase()}`}
                  className="w-full border border-white/15 bg-black/40 px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-white/50 mb-1.5">
                  Page Content / Body ({formLang.toUpperCase()})
                </label>
                <RichTextEditor
                  value={editingPage.content[formLang] || ""}
                  onChange={(html) => setEditingPage({
                    ...editingPage,
                    content: { ...editingPage.content, [formLang]: html }
                  })}
                  placeholder={`Write page content in ${formLang.toUpperCase()}... Use heading formatting, lists, links and upload images.`}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setEditingPage(null)}
              className="px-4 py-2 text-[12px] font-light text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={pagesSaving}
              onClick={() => handleSavePage(editingPage)}
              className="bg-[#D4AF37] px-6 py-2.5 text-[12px] font-medium uppercase text-[#0a0a0a] hover:bg-white transition-all disabled:opacity-40"
            >
              {pagesSaving ? "Saving..." : "Save Page"}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Custom Property Editor Modal */}
    {editingProperty && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
        <div className="w-full max-w-4xl border border-white/20 bg-[#121212] p-6 text-white shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-[18px] font-light text-[#D4AF37] uppercase tracking-wider">
              {editingProperty.slug ? "Edit Property" : "Add New Property"}
            </h3>
            
            {/* Form Language Switcher in Right Corner */}
            <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 p-1 rounded-sm">
              {(["en", "ua", "ru"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setFormLang(lang)}
                  className={`px-3 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors rounded-xs ${
                    formLang === lang ? "bg-[#D4AF37] text-[#0a0a0a]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Common Specifications Card */}
            <div className="border border-white/10 bg-black/20 p-5 rounded-xs space-y-4">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-[#D4AF37]">Basic Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">City</label>
                  <select
                    value={editingProperty.city}
                    onChange={(e) => setEditingProperty({ ...editingProperty, city: e.target.value })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="kyiv">Kyiv</option>
                    <option value="lviv">Lviv</option>
                    <option value="odesa">Odesa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Category / Type</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value as any })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="apartments">Apartments</option>
                    <option value="villas">Villas & Houses</option>
                    <option value="hotels">Hotels</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={editingProperty.price || ""}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: Number(e.target.value) })}
                    placeholder="e.g. 550000"
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Area (m²)</label>
                  <input
                    type="number"
                    value={editingProperty.area || ""}
                    onChange={(e) => setEditingProperty({ ...editingProperty, area: Number(e.target.value) })}
                    placeholder="e.g. 120"
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={editingProperty.bedrooms || ""}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: Number(e.target.value) })}
                    placeholder="e.g. 3"
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Expected ROI (%)</label>
                  <input
                    type="text"
                    value={editingProperty.roi || ""}
                    onChange={(e) => setEditingProperty({ ...editingProperty, roi: e.target.value })}
                    placeholder="e.g. 8.5"
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Status Tag</label>
                  <select
                    value={editingProperty.status}
                    onChange={(e) => setEditingProperty({ ...editingProperty, status: e.target.value })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="exclusive">Exclusive</option>
                    <option value="hot">Hot Deal</option>
                    <option value="ready">Ready Move-In</option>
                    <option value="off-plan">Off-Plan</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingProperty.slug}
                    onChange={(e) => setEditingProperty({ ...editingProperty, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                    placeholder="e.g. kiev-pechersk-penthouse"
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Multilingual Information */}
            <div className="border border-white/10 bg-white/2 p-5 rounded-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Translating into: <span className="underline">{formLang.toUpperCase()}</span>
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Title ({formLang.toUpperCase()})</label>
                <input
                  type="text"
                  value={editingProperty.title[formLang] || ""}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    title: { ...editingProperty.title, [formLang]: e.target.value }
                  })}
                  placeholder={`Property Title in ${formLang.toUpperCase()}`}
                  className="w-full border border-white/15 bg-black/40 px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Location ({formLang.toUpperCase()})</label>
                <input
                  type="text"
                  value={editingProperty.location[formLang] || ""}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    location: { ...editingProperty.location, [formLang]: e.target.value }
                  })}
                  placeholder={`Address/Neighborhood in ${formLang.toUpperCase()}`}
                  className="w-full border border-white/15 bg-black/40 px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Description ({formLang.toUpperCase()})</label>
                <textarea
                  rows={4}
                  value={editingProperty.description[formLang] || ""}
                  onChange={(e) => setEditingProperty({
                    ...editingProperty,
                    description: { ...editingProperty.description, [formLang]: e.target.value }
                  })}
                  placeholder={`Full Property Description in ${formLang.toUpperCase()}`}
                  className="w-full border border-white/15 bg-black/40 p-3.5 text-[13px] font-light text-white placeholder:text-white/20 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            {/* Gallery Photos & Video Presentation */}
            <div className="border border-white/10 bg-black/20 p-5 rounded-xs space-y-4">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-[#D4AF37]">Media Gallery</h4>
              
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Video Presentation Link / File Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProperty.video || ""}
                    onChange={(e) => setEditingProperty({ ...editingProperty, video: e.target.value })}
                    placeholder="YouTube URL or direct video MP4 URL (e.g. /videos/tour.mp4)"
                    className="flex-1 border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <label className="bg-white/10 hover:bg-white/20 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white rounded-sm cursor-pointer transition-colors shrink-0 flex items-center justify-center">
                    Upload Video
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const prevVal = editingProperty.video;
                        setEditingProperty({ ...editingProperty, video: "Uploading video..." });
                        try {
                          const formData = new FormData();
                          formData.append("file", file);
                          const res = await fetch("/api/admin/upload", {
                            method: "POST",
                            body: formData,
                          });
                          const data = await res.json();
                          if (data.success) {
                            setEditingProperty({ ...editingProperty, video: data.url });
                          } else {
                            setEditingProperty({ ...editingProperty, video: prevVal });
                            alert("Upload failed: " + (data.error || "Unknown error"));
                          }
                        } catch (err: any) {
                          setEditingProperty({ ...editingProperty, video: prevVal });
                          alert("Upload error: " + err.message);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50">
                    Photos Gallery (Maximum 15 images)
                  </label>
                  <span className="text-[10px] text-white/40">
                    {editingProperty.gallery.length} / 15 Photos
                  </span>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto border border-white/10 p-3 bg-black/40 rounded-sm">
                  {editingProperty.gallery.map((imgUrl: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-white/40 w-6">#{idx + 1}</span>
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...editingProperty.gallery];
                          updated[idx] = e.target.value;
                          setEditingProperty({ ...editingProperty, gallery: updated });
                        }}
                        placeholder="e.g. /images/generated/prop-kyiv-podil-loft-1.webp"
                        className="flex-1 border border-white/10 bg-black px-3 py-1.5 text-[12px] font-mono text-white/95 focus:border-[#D4AF37] focus:outline-none"
                      />
                      <label className="bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white rounded-sm cursor-pointer transition-colors shrink-0">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              const formData = new FormData();
                              formData.append("file", file);
                              const res = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData,
                              });
                              const data = await res.json();
                              if (data.success) {
                                const updated = [...editingProperty.gallery];
                                updated[idx] = data.url;
                                setEditingProperty({ ...editingProperty, gallery: updated });
                              } else {
                                alert("Upload failed: " + (data.error || "Unknown error"));
                              }
                            } catch (err: any) {
                              alert("Upload error: " + err.message);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingProperty.gallery.filter((_: any, i: number) => i !== idx);
                          setEditingProperty({ ...editingProperty, gallery: updated });
                        }}
                        className="text-[11px] uppercase tracking-wider text-rose-400 hover:text-rose-300 px-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {editingProperty.gallery.length === 0 && (
                    <div className="text-[12px] text-white/30 text-center py-4">No images in gallery. Click add below.</div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <button
                    type="button"
                    disabled={editingProperty.gallery.length >= 15}
                    onClick={() => setEditingProperty({
                      ...editingProperty,
                      gallery: [...editingProperty.gallery, ""]
                    })}
                    className="border border-white/20 text-white/80 hover:text-white hover:border-white px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors disabled:opacity-30"
                  >
                    + Add Photo URL
                  </button>
                  {editingProperty.gallery.length >= 15 && (
                    <span className="text-[10px] text-[#D4AF37]">Maximum 15 photos reached</span>
                  )}
                </div>
              </div>
            </div>

            {/* Google Map Address */}
            <div className="border border-white/10 bg-black/20 p-5 rounded-xs space-y-4">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-[#D4AF37]">Physical Address & Google Map</h4>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">
                  Google Map Address Query
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProperty.address || ""}
                    onChange={(e) => setEditingProperty({ ...editingProperty, address: e.target.value })}
                    placeholder="e.g. Lomakivska St, 56/2, Pechersk, Kyiv"
                    className="flex-1 border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  {editingProperty.address && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(editingProperty.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#D4AF37] hover:bg-[#c5a030] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-black rounded-sm transition-colors shrink-0 flex items-center justify-center"
                    >
                      Confirm Address (Test Map)
                    </a>
                  )}
                </div>
                <p className="text-[10px] text-white/40 mt-1">
                  Type a physical address. Click "Confirm Address" to verify how Google Maps resolves it.
                </p>
              </div>
            </div>

            {/* Detailed Specs */}
            <div className="border border-white/10 bg-black/20 p-5 rounded-xs space-y-4">
              <h4 className="text-[12px] font-semibold uppercase tracking-wider text-[#D4AF37]">Technical Specifications</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Rooms (e.g. 4 Rooms)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.rooms || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, rooms: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Layout (e.g. 120 / 72 / 20 m²)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.layout || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, layout: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Floor (e.g. Floor 3 of 5)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.floor || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, floor: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Renovation (e.g. Designer finish)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.renovation || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, renovation: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Building Type (e.g. New building)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.newBuild || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, newBuild: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Construction (e.g. Monolithic)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.construction || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, construction: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Heating (e.g. Autonomous gas)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.heating || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, heating: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Ceiling Height (e.g. 3.0 m)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.ceilings || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, ceilings: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium uppercase tracking-wider text-white/50 mb-1">Year Built (e.g. 2023)</label>
                  <input
                    type="text"
                    value={editingProperty.specs?.yearBuilt || ""}
                    onChange={(e) => setEditingProperty({
                      ...editingProperty,
                      specs: { ...editingProperty.specs, yearBuilt: e.target.value }
                    })}
                    className="w-full border border-white/15 bg-black px-3.5 py-2.5 text-[13px] font-light text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setEditingProperty(null)}
              className="px-4 py-2 text-[12px] font-light text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={propertiesSaving}
              onClick={() => handleSaveProperty(editingProperty)}
              className="bg-[#D4AF37] px-6 py-2.5 text-[12px] font-medium uppercase text-[#0a0a0a] hover:bg-white transition-all disabled:opacity-40"
            >
              {propertiesSaving ? "Saving..." : "Save Property"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>

      {/* Edit / Notes Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md border border-white/20 bg-[#121212] p-6 text-white shadow-xl">
            <h3 className="text-[18px] font-light text-[#D4AF37]">
              Edit Lead Note: {editingLead.name || "Anonymous"}
            </h3>
            <p className="mt-1 text-[12px] text-white/50">
              Form: {editingLead.formType} · Date: {editingLead.timestamp?.slice(0, 10)}
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-[0.1em] text-white/60 mb-1">
                  Internal Broker Notes
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Add notes (e.g. Called client on July 3, interested in 3BR penthouse, budget $500k...)"
                  rows={4}
                  className="w-full border border-white/20 bg-black/40 p-3 text-[13px] font-light text-white placeholder:text-white/30 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 text-[12px] font-light text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="bg-[#D4AF37] px-5 py-2 text-[12px] font-medium uppercase text-[#0a0a0a] hover:bg-white transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
