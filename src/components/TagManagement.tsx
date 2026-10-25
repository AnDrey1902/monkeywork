import { useState } from "react";
import { useConfirm } from "../hooks/useConfirm";
import { useI18n } from "../i18n/config";
import { useTagStore } from "../stores/useTagStore";

export default function TagManagement() {
  const { t } = useI18n();
  const tags = useTagStore((s) => s.tags);
  const loading = useTagStore((s) => s.loading);
  const createTag = useTagStore((s) => s.createTag);
  const deleteTag = useTagStore((s) => s.deleteTag);
  const [newTagName, setNewTagName] = useState("");
  const [confirm, ConfirmDialog] = useConfirm();

  const handleCreate = async () => {
    const name = newTagName.trim();
    if (!name) return;
    const colors = [
      "var(--pink)",
      "var(--orange-primary)",
      "var(--coral)",
      "var(--blue)",
      "var(--yellow)",
      "var(--cyan)",
    ];
    const color = colors[tags.length % colors.length];
    await createTag(name, color);
    setNewTagName("");
  };

  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    const ok = await confirm({
      message: t("tag.deleteConfirm").replace("{name}", name),
      variant: "danger",
    });
    if (ok) await deleteTag(id);
  };

  return (
    <>
      <ConfirmDialog />
      <div className="card">
        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: "var(--space-4)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
          }}
        >
          <svg className="icon icon-20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L3 13V3h10l8.59 8.59a2 2 0 0 1 0 2.82z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="7" r="1.5" fill="currentColor" />
          </svg>
          {t("tag.management")}
        </h3>
        <div className="tag-group" style={{ marginBottom: "var(--space-6)" }}>
          {loading && (
            <span style={{ fontSize: 13, color: "var(--medium-gray)" }}>{t("common.loading")}</span>
          )}
          {!loading && tags.length === 0 && (
            <span style={{ fontSize: 13, color: "var(--medium-gray)" }}>{t("tag.empty")}</span>
          )}
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              aria-label={`${t("common.delete")}: ${tag.name}`}
              className="tag tag-pill tag-accent"
              style={{ background: tag.color, cursor: "pointer", position: "relative" }}
              title={t("common.delete")}
              onClick={(e) => handleDelete(e, tag.id, tag.name)}
            >
              {tag.name}
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 10,
                  opacity: 0.6,
                }}
              >
                ×
              </span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <input
            className="form-input"
            name="newTagName"
            placeholder={t("tag.placeholder")}
            style={{ flex: 1 }}
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCreate();
              }
            }}
          />
          <button type="button" className="btn btn-small" onClick={handleCreate}>
            {t("tag.create")}
          </button>
        </div>
      </div>
    </>
  );
}
