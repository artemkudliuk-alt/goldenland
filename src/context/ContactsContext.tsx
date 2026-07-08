"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_CONTACT_SETTINGS, type ContactSettings } from "@/lib/contacts-types";

interface ContactsContextType extends ContactSettings {
  loading: boolean;
  refreshContacts: () => Promise<void>;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ContactSettings>(DEFAULT_CONTACT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (error) {
      console.error("Failed to fetch contact settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider value={{ ...settings, loading, refreshContacts: fetchContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    return {
      ...DEFAULT_CONTACT_SETTINGS,
      loading: false,
      refreshContacts: async () => {},
    };
  }
  return context;
}
