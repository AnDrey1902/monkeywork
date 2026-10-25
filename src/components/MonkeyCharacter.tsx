import { useEffect } from "react";
import { useI18n } from "../i18n/config";
import { useTaskStore } from "../stores/useTaskStore";
import { useUIStore } from "../stores/useUIStore";

const MONKEY_EMOJIS = {
  happy: "🐵✨",
  neutral: "🐵",
  sad: "🐵💧",
};

export default function MonkeyCharacter() {
  const { t } = useI18n();
  const tasks = useTaskStore((s) => s.tasks);
  const { mascotMood, setMascotMood } = useUIStore();

  useEffect(() => {
    if (tasks.length === 0) {
      setMascotMood("neutral");
    } else {
      const doneCount = tasks.filter((t) => t.status === "done").length;
      const ratio = doneCount / tasks.length;
      if (ratio >= 0.7) setMascotMood("happy");
      else if (ratio >= 0.3) setMascotMood("neutral");
      else setMascotMood("sad");
    }
  }, [tasks, setMascotMood]);

  return (
    <div className="flex flex-col items-center py-6">
      <div className="text-6xl mb-2 transition-all duration-300 hover:scale-110 cursor-pointer select-none">
        {MONKEY_EMOJIS[mascotMood]}
      </div>
      <p className="text-cartoon-text/70 text-lg">{t(`mascot.${mascotMood}`)}</p>
    </div>
  );
}
