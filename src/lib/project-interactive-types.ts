import type { Localized } from "@/lib/project-showcase-types";

export type InteractiveLabConfig =
  | {
      variant: "pipeline";
      title: Localized;
      subtitle: Localized;
      terminalLines: string[];
      resultTitle: Localized;
    }
  | {
      variant: "pdf";
      title: Localized;
      subtitle: Localized;
      passLabel: Localized;
      failLabel: Localized;
      resultTitle: Localized;
    }
  | {
      variant: "pulse";
      title: Localized;
      subtitle: Localized;
      terminalLines: string[];
      resultTitle: Localized;
    };
