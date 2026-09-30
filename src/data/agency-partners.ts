export type AgencyPartner = {
  name: string;
  logo: string;
  addressLines: string[];
  email?: string;
  website: string;
};

export const AGENCY_PARTNERS: AgencyPartner[] = [
  {
    name: "RareDigital",
    logo: "/logos/partner-raredigital.png",
    addressLines: [
      "Office No. 1703, Street No. 2,",
      "Kabir Nagar, Tibba Road,",
      "Ludhiana, Punjab",
    ],
    email: "agency@raredigital.in",
    website: "https://raredigital.in",
  },
  {
    name: "Rage Theory",
    logo: "/logos/partner-ragetheory.jpg",
    addressLines: ["293, Lane-2, Westend Marg,", "Saket, New Delhi, India - 110030"],
    website: "https://www.ragetheory.com",
  },
];
