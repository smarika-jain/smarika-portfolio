export type ToolCategory = {
  label: string;
  tools: string[];
};

export const toolStack: ToolCategory[] = [
  { label: "AUTOMATION", tools: ["n8n"] },
  { label: "AI", tools: ["Claude", "OpenAI", "Perplexity"] },
  { label: "DATA & SCRAPING", tools: ["Apify", "BrightData", "PhantomBuster"] },
  {
    label: "LEAD DATA",
    tools: ["Clay", "Apollo", "Sales Navigator", "Anymail Finder"],
  },
  { label: "OUTREACH", tools: ["Instantly", "HeyReach"] },
  { label: "OPS", tools: ["Airtable", "Notion", "Google Workspace"] },
];
