import type { Locale as DateFnsLocale } from "date-fns";
import { format, formatDistanceToNow, isPast, isToday, isTomorrow, parseISO } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import type { Locale } from "../i18n/config";

const dateFnsLocales: Record<Locale, DateFnsLocale> = { ru, en: enUS };

function resolveLocale(locale?: Locale): DateFnsLocale {
  return dateFnsLocales[locale ?? "ru"];
}

export function formatDate(isoString: string, locale?: Locale): string {
  return format(parseISO(isoString), "PPP", { locale: resolveLocale(locale) });
}

export function formatTime(isoString: string): string {
  return format(parseISO(isoString), "HH:mm");
}

export function formatRelative(isoString: string, locale?: Locale): string {
  return formatDistanceToNow(parseISO(isoString), {
    addSuffix: true,
    locale: resolveLocale(locale),
  });
}

export function isOverdue(isoString: string): boolean {
  return isPast(parseISO(isoString));
}

export function isDueToday(isoString: string): boolean {
  return isToday(parseISO(isoString));
}

export function isDueTomorrow(isoString: string): boolean {
  return isTomorrow(parseISO(isoString));
}

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function nowISO(): string {
  return new Date().toISOString();
}
