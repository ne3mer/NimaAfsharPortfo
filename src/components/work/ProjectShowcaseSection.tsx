import type { ProjectShowcaseConfig } from "@/lib/project-showcase-types";
import { PipelineShowcase } from "@/components/work/PipelineShowcase";
import { TerminalShowcase } from "@/components/work/TerminalShowcase";

type Props = {
  config: ProjectShowcaseConfig;
  locale: string;
  terminalHint: string;
};

export function ProjectShowcaseSection({ config, locale, terminalHint }: Props) {
  const hasPipeline = Boolean(config.pipeline?.steps?.length);
  const hasTerminal = Boolean(config.terminal?.lines?.length);
  if (!hasPipeline && !hasTerminal) return null;

  return (
    <div className="space-y-14">
      {hasPipeline && config.pipeline ? (
        <PipelineShowcase
          title={config.pipeline.title}
          steps={config.pipeline.steps}
          locale={locale}
        />
      ) : null}
      {hasTerminal && config.terminal ? (
        <TerminalShowcase
          title={config.terminal.title}
          subtitle={config.terminal.subtitle}
          lines={config.terminal.lines}
          locale={locale}
          hint={terminalHint}
        />
      ) : null}
    </div>
  );
}
