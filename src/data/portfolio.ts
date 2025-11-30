export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  client: string;
  tags: string[];
  image: string; // In a real app, this would be a path to an image
  content: string;
}

export const portfolioData: CaseStudy[] = [
  {
    id: "1",
    slug: "fintech-dashboard",
    title: "Nova Financial Dashboard",
    description: "A high-performance real-time analytics dashboard for a Series B Fintech startup. Handles 50k+ websocket events per second.",
    client: "Nova Finance",
    tags: ["SaaS", "React", "D3.js", "WebSockets"],
    image: "/images/fintech-placeholder.jpg",
    content: `
# The Challenge
Nova Finance needed to visualize millions of transaction data points in real-time for their institutional clients. Their existing solution was slow and crashed under load.

# The Solution
We rebuilt their entire frontend architecture using Next.js and a custom WebGL rendering layer.
- **Performance:** Reduced load times by 400%.
- **Scalability:** Handles 50k+ events/sec.
- **UX:** Implemented dark mode and customizable widgets.

# The Result
Client retention increased by 25% within the first quarter of launch.
    `,
  },
  {
    id: "2",
    slug: "luxury-ecommerce",
    title: "Aura - Luxury Fashion",
    description: "A headless e-commerce experience for a high-end fashion brand, featuring 3D product previews and AI sizing.",
    client: "Aura Paris",
    tags: ["E-commerce", "Next.js", "Shopify Plus", "Three.js"],
    image: "/images/fashion-placeholder.jpg",
    content: `
# The Challenge
Aura wanted to break away from the standard Shopify template look. They needed a digital flagship store that felt as premium as their physical boutiques.

# The Solution
We built a headless storefront using Next.js and Shopify Storefront API.
- **3D Experience:** Users can rotate products in 360 degrees.
- **Speed:** Sub-second page transitions.
- **AI Sizing:** Integrated a camera-based sizing tool.

# The Result
Conversion rate doubled compared to their old template site.
    `,
  },
  {
    id: "3",
    slug: "ai-content-generator",
    title: "CopyFlow AI",
    description: "An MVP for an AI copywriting tool. Built and launched in 4 weeks, scaling to 10k users in month one.",
    client: "CopyFlow Inc.",
    tags: ["Startup MVP", "OpenAI API", "Stripe", "Tailwind"],
    image: "/images/ai-placeholder.jpg",
    content: `
# The Challenge
The founders needed to validate their idea fast. They had a waitlist of 5,000 users and needed a working product in under a month.

# The Solution
We used our "Startup Launchpad" stack to ship fast.
- **Backend:** Next.js API Routes + Supabase.
- **AI:** Direct integration with GPT-4.
- **Payments:** Stripe Subscription integration.

# The Result
Successful launch on Product Hunt (#1 Product of the Day) and $10k MRR in the first month.
    `,
  },
];
