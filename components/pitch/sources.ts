export type Source = {
  id: number;
  short: string;
  full: string;
  url: string;
};

export const SOURCES: Source[] = [
  {
    id: 1,
    short: "DBT, Business Population Estimates 2025",
    full:
      "Department for Business and Trade, Business Population Estimates for the UK and regions 2025. 5.69m private-sector businesses; 99.85% are SMEs; 5.64m have fewer than 50 employees.",
    url: "https://www.gov.uk/government/statistics/business-population-estimates-2025",
  },
  {
    id: 2,
    short: "DSIT, AI Adoption Research",
    full:
      "Department for Science, Innovation and Technology, AI Adoption Research (commissioned from IFF Research and Technopolis). Large firms (250+) at 36% AI adoption; mid-sized at 23%; micro-businesses at 14%; 16% across all UK businesses.",
    url: "https://www.gov.uk/government/publications/ai-adoption-research",
  },
  {
    id: 3,
    short: "DSIT, Technology Adoption Review 2025",
    full:
      "DSIT Technology Adoption Review (2025), led by the Government Chief Scientific Adviser and National Technology Adviser. Estimates a ~1.5% annual UK productivity uplift, worth up to £47bn a year over the next decade, from a full and safe embrace of AI.",
    url: "https://assets.publishing.service.gov.uk/media/6857e0995225e4ed0bf3ceb5/dsit_technology_adoption_review_web.pdf",
  },
  {
    id: 4,
    short: "Anthropic, Claude for Small Business, 13 May 2026",
    full:
      "Anthropic, “Introducing Claude for Small Business” (13 May 2026). 15 packaged agentic workflows; native integrations with QuickBooks, PayPal, HubSpot, Canva, DocuSign, Google Workspace, Microsoft 365. US 10-city free fluency tour begins 14 May 2026 in Chicago. CDFI partners: Accion Opportunity Fund, Community Reinvestment Fund USA, Pacific Community Ventures. Workday Foundation Solopreneurship Accelerator (LISC curriculum).",
    url: "https://www.anthropic.com/news/claude-for-small-business",
  },
  {
    id: 5,
    short: "OECD, Generative AI & the SME Workforce, Nov 2025",
    full:
      "OECD, “Generative AI and the SME Workforce” (November 2025). Survey of over 5,000 SMEs across Austria, Canada, Germany, Ireland, Japan, Korea and the UK; 31% use generative AI.",
    url: "https://www.oecd.org/en/publications/generative-ai-and-the-sme-workforce_2d08b99d-en.html",
  },
  {
    id: 6,
    short: "Microsoft 365 Business Standard (UK)",
    full:
      "Microsoft 365 Business Standard for UK customers, listed at £9.60 per user per month. Used as a comparable SMB software ARPU benchmark for the TAM calculator on slide 4.",
    url: "https://www.microsoft.com/en-gb/microsoft-365/business?ICID=vsbsw_M365Biz_Feature#pricing",
  },
  {
    id: 7,
    short: "Anthropic, Claude Partner Network $100m, 2026",
    full:
      "Anthropic, “Anthropic invests $100 million into the Claude Partner Network” (12 March 2026). Training, technical support and joint market development for partners helping organisations adopt Claude.",
    url: "https://www.anthropic.com/news/claude-partner-network",
  },
  {
    id: 8,
    short: "FSB, UK Small Business Statistics",
    full:
      "Federation of Small Businesses, UK Small Business Statistics. Annual data on the structure of the UK SME population, used for sector breakdowns and partnerships modelling.",
    url: "https://www.fsb.org.uk/uk-small-business-statistics",
  },
  {
    id: 9,
    short: "DCMS, Annual GVA 2023 (provisional)",
    full:
      "Department for Culture, Media and Sport, Economic Estimates: Annual GVA 2023 (provisional), published December 2025. Creative industries contributed £124.0bn in 2023, 5.2% of UK GVA.",
    url: "https://www.gov.uk/government/statistics/dcms-economic-estimates-gva-2023-provisional",
  },
  {
    id: 10,
    short: "DSIT, UK Cyber Security Sectoral Analysis 2025",
    full:
      "DSIT, Cyber Security Sectoral Analysis Report 2025. UK cybersecurity sector revenue at £13.2bn; £7.8bn GVA; 2,091 active firms; investment of £206m in 2024; 11% growth in employment over the prior 12 months.",
    url: "https://assets.publishing.service.gov.uk/media/67cad8b18c1076c796a45c25/Cyber_Security_Sectoral_Analysis_Report_2025.pdf",
  },
  {
    id: 11,
    short: "Lina Ochman LinkedIn profile",
    full:
      "Lina Ochman, US Head of SMB at Anthropic. LinkedIn profile listing prior roles at Recraft, Miro, Segment and Flexport, and education at the University of California, Berkeley.",
    url: "https://www.linkedin.com/in/linaochman/",
  },
  {
    id: 12,
    short: "Gene Marks column, AI Advice From Anthropic's Head Of US Small Business",
    full:
      "Gene Marks column, “AI Advice From Anthropic's Head Of U.S. Small Business” (2026). Establishes Lina Ochman's role at Anthropic, includes a direct quote from her describing Claude for Small Business, and confirms she is leading a tour of American cities alongside the launch.",
    url: "https://www.genemarks.com/columns/ai-advice-from-anthropics-head-of-u-s-small-business/",
  },
];

export const sourceById = (id: number): Source => {
  const s = SOURCES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown source: ${id}`);
  return s;
};
