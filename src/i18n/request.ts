import { getRequestConfig } from "next-intl/server"
import { getLocale } from "@/server/actions/locale"

export default getRequestConfig(async () => {
  const locale = await getLocale()

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    // Fallback to English if locale file doesn't exist
    messages = (await import(`../../messages/en.json`)).default
  }

  return {
    locale,
    messages,
  }
})
