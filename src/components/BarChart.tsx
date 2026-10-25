import { useMemo } from "react";
import { useI18n } from "../i18n/config";
import { useTaskStore } from "../stores/useTaskStore";

export default function BarChart() {
  const { t } = useI18n();
  const tasks = useTaskStore((s) => s.tasks);

  const quadrantLabels = useMemo(() => t("stats.quadrantLabels").split(","), [t]);

  const counts = useMemo(() => {
    const configs = [
      {
        key: "urgent-important" as const,
        label: quadrantLabels[0],
        color: "var(--coral)",
        className: "coral",
      },
      {
        key: "not-urgent-important" as const,
        label: quadrantLabels[1],
        color: "var(--blue)",
        className: "blue",
      },
      {
        key: "urgent-not-important" as const,
        label: quadrantLabels[2],
        color: "var(--yellow)",
        className: "yellow",
      },
      {
        key: "not-urgent-not-important" as const,
        label: quadrantLabels[3],
        color: "var(--cyan)",
        className: "cyan",
      },
    ];
    return configs.map((q) => ({
      ...q,
      count: tasks.filter((t) => t.priority === q.key).length,
    }));
  }, [tasks, quadrantLabels]);

  const maxCount = Math.max(...counts.map((c) => c.count), 1);

  return (
    <div className="bar-chart">
      {counts.map((item) => {
        const height = Math.max((item.count / maxCount) * 140, 4);
        return (
          <div key={item.key} className="bar-group">
            <div className={`bar ${item.className}`} style={{ height }} />
            <div className="bar-value">{item.count}</div>
            <div className="bar-label">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}
