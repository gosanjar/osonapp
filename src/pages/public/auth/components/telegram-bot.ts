const BOT_USERNAME =
  (import.meta.env.VITE_TELEGRAM_BOT_USERNAME as string) || "osonapp_bot"

export const BOT_URL = `https://t.me/${BOT_USERNAME}`

export function getBotLabel(): string {
  return `@${BOT_USERNAME} ga o'tish`
}

export function openBot(url: string = BOT_URL) {
  const tab = window.open(url, "_blank")
  if (tab) setTimeout(() => tab.close(), 10_000)
}

export function getDeepLink(startParam: string): string {
  return `https://t.me/${BOT_USERNAME}?start=${startParam}`
}
