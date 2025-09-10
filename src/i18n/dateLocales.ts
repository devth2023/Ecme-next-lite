import type { ILocale } from "dayjs"

export const dateLocales: {
  [key: string]: () => Promise<ILocale>
} = {
  en: () => import("dayjs/locale/en"),
  th: () => import("dayjs/locale/th"),
}
