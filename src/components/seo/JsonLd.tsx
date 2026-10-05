import type { PortfolioProject } from "@/data/portfolio-projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nimastudio.site";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nima Afsharfar",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer & Product Builder",
    email: "mailto:ne3mer@gmail.com",
    sameAs: [
      "https://github.com/ne3mer",
      "https://www.linkedin.com/in/nima-afsharfar",
    ],
    knowsAbout: [
      "Full-Stack Development",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Python",
      "Data Pipelines",
      "SaaS Architecture",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NIMA Studio",
    url: SITE_URL,
    description:
      "Selected SaaS products, automation workflows and data systems by Nima Afsharfar.",
    inLanguage: ["en", "fa"],
    author: {
      "@type": "Person",
      name: "Nima Afsharfar",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: PortfolioProject }) {
  const githubLink = project.links.find((l) => l.label === "GitHub")?.href;
  const liveLink = project.links.find(
    (l) => l.label === "Live demo" || l.label === "Website"
  )?.href;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.shortTitle,
    description: project.summary,
    url: `${SITE_URL}/en/work/${project.slug}`,
    dateCreated: project.year,
    author: {
      "@type": "Person",
      name: "Nima Afsharfar",
      url: SITE_URL,
    },
    keywords: project.stack.join(", "),
    genre: project.category,
    ...(githubLink ? { codeRepository: githubLink } : {}),
    ...(liveLink ? { mainEntityOfPage: liveLink } : {}),
    ...(project.image?.src
      ? { image: `${SITE_URL}${project.image.src}` }
      : project.visuals?.[0]?.src
      ? { image: `${SITE_URL}${project.visuals[0].src}` }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
