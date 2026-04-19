/** Localized copy for project showcase blocks (aligned with site locales). */
export type Localized = { en: string; fa: string };

export type ShowcaseIcon =
  | "globe"
  | "braces"
  | "database"
  | "timer"
  | "cpu"
  | "puzzle"
  | "gamepad"
  | "workflow";

export type PipelineStep = {
  title: Localized;
  body: Localized;
  icon: ShowcaseIcon;
};

export type ProjectShowcaseConfig = {
  /** Horizontal flow: e.g. scrape → normalize → persist → schedule */
  pipeline?: {
    title: Localized;
    steps: PipelineStep[];
  };
  /** Fake terminal / log output (LTR); good for backends & CLIs */
  terminal?: {
    title: Localized;
    subtitle?: Localized;
    lines: string[];
  };
};
