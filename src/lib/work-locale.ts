import type { Work } from "@prisma/client";

export type WorkCopyFields = Pick<
  Work,
  | "title"
  | "description"
  | "content"
  | "tags"
  | "services"
  | "titleEn"
  | "descriptionEn"
  | "contentEn"
  | "tagsEn"
  | "servicesEn"
>;

/** Primary DB fields are Persian (fa); optional *En fields power `/en` routes. */
export function resolveWorkCopyForLocale(
  work: WorkCopyFields,
  locale: string
): {
  title: string;
  description: string;
  content: string;
  tags: string;
  services: string | null;
} {
  if (locale === "en") {
    return {
      title: work.titleEn?.trim() || work.title,
      description: work.descriptionEn?.trim() || work.description,
      content: work.contentEn?.trim() || work.content,
      tags: work.tagsEn?.trim() || work.tags,
      services: work.servicesEn?.trim() || work.services,
    };
  }
  return {
    title: work.title,
    description: work.description,
    content: work.content,
    tags: work.tags,
    services: work.services,
  };
}
