import type { ComponentType } from "react";
import { BrandProduct } from "./BrandProduct";
import { ChatProduct } from "./ChatProduct";
import { CrmProduct } from "./CrmProduct";
import { MarketingProduct } from "./MarketingProduct";
import { ProductionProduct } from "./ProductionProduct";
import { VoiceProduct } from "./VoiceProduct";
import { WebProduct } from "./WebProduct";

/** One coded product visual per service slug. */
export const PRODUCT_VISUALS: Record<string, { Visual: ComponentType<{ label: string }>; label: string }> = {
  "web-development": {
    Visual: WebProduct,
    label:
      "Sample website for Atlas Pathways, a fictional visa advisory, shown on a laptop and a phone: a headline reading Your route abroad, planned properly, a map of routes from Islamabad, and visa types below.",
  },
  "ai-voice-agents": {
    Visual: VoiceProduct,
    label:
      "Sample AI voice agent call for Mehran Motors, a fictional workshop: a phone screen with a live waveform and transcript in which the agent books a Saturday 10:30 service, beside a call-routing card and the call summary the agent writes.",
  },
  chatbots: {
    Visual: ChatProduct,
    label:
      "Sample WhatsApp-style chat for Kohsar Print, a fictional print shop: the bot answers a late-night request for 500 business cards, offers finishes and takes the customer's details, then files a new lead card sent to sales.",
  },
  "crm-erp": {
    Visual: CrmProduct,
    label:
      "Sample CRM dashboard with made-up data in a browser window: a sidebar with Dashboard, Leads, Clients, Cases, Pipeline, CV Assessment, Job Hunting, Finance, Reports, Settings and Team; key figures, a case pipeline by stage, today's tasks and recent leads.",
  },
  "brand-identity": {
    Visual: BrandProduct,
    label:
      "Sample brand board for Dhoop, a fictional coffee roaster: the primary logo, a rising-sun mark, a horizontal lockup, a four-colour palette, a type specimen, and a letterhead with business cards.",
  },
  "digital-marketing": {
    Visual: MarketingProduct,
    label:
      "Sample campaign for Mehran Motors, a fictional workshop: a sponsored social ad, a search ad, and a campaign report with illustrative reach, clicks, leads and cost per lead, plus a rising leads-per-day chart.",
  },
  "creative-production": {
    Visual: ProductionProduct,
    label:
      "Sample brand film edit for Dhoop, a fictional coffee roaster: a letterboxed frame in the viewer, colour wheels, a list of deliverables in several aspect ratios, and a timeline of clips, titles and audio with a moving playhead.",
  },
};
