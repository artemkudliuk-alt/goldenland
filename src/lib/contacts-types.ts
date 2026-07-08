export interface OfficeData {
  id: string;
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  phone: string;
}

export interface ContactSettings {
  whatsapp: string;
  telegram: string;
  offices: OfficeData[];
}

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  whatsapp: "+380 7777 04177",
  telegram: "goldenlandproperty",
  offices: [
    {
      id: "kyiv",
      name: {
        en: "Kyiv - Head Office",
        ua: "Kyiv — головний офіс",
        ru: "Киев — головной офис",
      },
      phone: "+380 75 926 4432",
    },
    {
      id: "sydney",
      name: { en: "Sydney Office", ua: "Сідней", ru: "Сидней" },
      phone: "+61 415 779 783",
    },
    {
      id: "qatar",
      name: { en: "Qatar Connection", ua: "Катар", ru: "Катар" },
      phone: "+97430007788",
    },
    {
      id: "dubai",
      name: { en: "Dubai Office", ua: "Дубай", ru: "Дубай" },
      phone: "+971588841737",
    },
    {
      id: "odesa",
      name: { en: "Odesa Office", ua: "Одеса", ru: "Одесса" },
      phone: "+380 7777 04177",
    },
  ],
};
