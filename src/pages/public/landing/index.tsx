import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import PublicNav from "../nav"
import PublicFooter from "../footer"
import { Button } from "@/shared/ui/button"

const TABS = [
  {
    id: "catalog",
    label: "Katalog",
    title: "Filtrli qulay katalog",
    desc: "Rasmlar, tavsiflar va variantlar bilan tovarlarni qo'shing. Mijozlar o'lcham, rang va narx bo'yicha filtrlashi mumkin.",
    bullets: [
      "Har bir tovar uchun fotogalereya",
      "O'lchamlar jadvali",
      "Filtrlar va qidiruv",
    ],
    color: "from-blue-500/20 to-violet-500/20",
  },
  {
    id: "ai",
    label: "AI-bot",
    title: "24/7 ishlaydigan AI savdo assistenti",
    desc: "Sun'iy intellekt mijozlarga tovarlar haqida javob beradi, buyurtmani qabul qiladi va savol-javoblarni avtomatik hal qiladi.",
    bullets: [
      "Savollarni avtomatik javoblash",
      "Mahsulot tavsiyalari",
      "Buyurtmani tasdiqlash",
    ],
    color: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "payments",
    label: "To'lovlar",
    title: "Komissiyasiz to'lov qabuli",
    desc: "Payme, Click, Uzum yoki boshqa to'lov tizimlarini ulang. Pul to'g'ridan-to'g'ri hisobingizga tushadi.",
    bullets: [
      "6+ to'lov tizimi",
      "Tezkor bildirishnomalar",
      "Avtomatik cheklar",
    ],
    color: "from-orange-500/20 to-rose-500/20",
  },
  {
    id: "telegram",
    label: "Telegram",
    title: "Telegram-bot orqali do'kon",
    desc: "Maxsus ilova yoki sayt shart emas. Mijozlaringiz allaqachon Telegramda — ular o'sha yerda xarid qiladi.",
    bullets: [
      "Mini App yoki bot orqali",
      "Havolani ulashish mumkin",
      "iOS va Android",
    ],
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    id: "crm",
    label: "CRM",
    title: "Mijozlar bazasi va segmentatsiya",
    desc: "Har bir xaridor tarixi, aloqa ma'lumotlari va xarid statistikasini ko'ring. Guruhlarga ajratib xabar yuboring.",
    bullets: ["Xarid tarixi", "Segmentlar va teglar", "Ommaviy xabar yuborish"],
    color: "from-violet-500/20 to-fuchsia-500/20",
  },
  {
    id: "analytics",
    label: "Analitika",
    title: "Real vaqt savdo tahlili",
    desc: "Buyurtmalar, tushum va mashhur tovarlarni kuzating. Ma'lumotlarga asoslangan qarorlar qabul qiling.",
    bullets: ["Savdo paneli", "Top tovarlar", "Davr bo'yicha hisobotlar"],
    color: "from-amber-500/20 to-yellow-500/20",
  },
]

const FEATURE_CARDS = [
  {
    icon: "🛍️",
    title: "Katalog",
    desc: "Cheksiz tovarlar, filtrlar va rasmlar galereya",
  },
  {
    icon: "💳",
    title: "To'lov qabuli",
    desc: "Payme, Click, Uzum — komissiyasiz",
  },
  {
    icon: "🤖",
    title: "AI-assistant",
    desc: "Savolga javob beradi, buyurtma qabul qiladi",
  },
  {
    icon: "📊",
    title: "Analitika",
    desc: "Qaysi tovar sotilayotganini real vaqtda ko'ring",
  },
  {
    icon: "🚚",
    title: "Yetkazib berish",
    desc: "Zonalar, narx va minimal summa sozlamalari",
  },
  {
    icon: "🎁",
    title: "Aktsiyalar",
    desc: "Kuponlar, chegirmalar va sovg'alar tizimi",
  },
]

const STEPS = [
  {
    n: "1",
    title: "Ro'yxatdan o'ting",
    desc: "Hisob yarating va Telegram-botni 2 daqiqada ulang. Texnik bilim kerak emas.",
  },
  {
    n: "2",
    title: "Do'konni sozlang",
    desc: "Mahsulotlarni yuklaysiz, narxlarni belgilaysiz. Katalog 15 daqiqada tayyor.",
  },
  {
    n: "3",
    title: "Buyurtmalarni qabul qiling",
    desc: "Mijozlar Telegram orqali buyurtma beradi, siz darhol bildirishnoma olasiz.",
  },
]

const TESTIMONIALS = [
  {
    text: "Birinchi oyda savdolarimiz 40% ga oshdi. Mijozlarga to'g'ridan-to'g'ri Telegramda buyurtma berish qulay.",
    author: "Malika K.",
    role: "Kiyim do'koni egasi, Toshkent",
  },
  {
    text: "Do'konni ochish atigi 20 daqiqa davom etdi. Endi Instagramdagi DM'larni boshqarishning keragi yo'q.",
    author: "Jasur T.",
    role: "Elektronika do'koni, Samarqand",
  },
  {
    text: "CRM orqali mijozlarni segmentlarga ajratib, aktsiya xabarlar yuboramiz. Konversiya ikki barobar oshdi.",
    author: "Nilufar R.",
    role: "Kosmetika do'koni, Toshkent",
  },
  {
    text: "Avval Excel da buyurtmalarni tutib edim. Endi hamma narsa avtomatik — vaqtim 3 barobar tejaldi.",
    author: "Sherzod M.",
    role: "Oziq-ovqat do'koni, Farg'ona",
  },
]

const PLANS = [
  {
    name: "Start",
    monthly: 199000,
    desc: "Endigina boshlaganlar uchun",
    features: [
      "500 tagacha mijoz",
      "50 tagacha mahsulot",
      "2 ta xodim",
      "Payme, Click, Uzum",
    ],
    popular: false,
  },
  {
    name: "Growth",
    monthly: 399000,
    desc: "O'sayotgan do'konlar uchun",
    features: [
      "25 000 tagacha mijoz",
      "10 000 tagacha mahsulot",
      "10 ta xodim",
      "Barcha to'lov usullari",
      "Kengaytirilgan analitika",
    ],
    popular: true,
  },
  {
    name: "Plus",
    monthly: 799000,
    desc: "Filiallar va yirik tarmoqlar uchun",
    features: [
      "Cheksiz mijozlar",
      "Cheksiz mahsulotlar",
      "Cheksiz xodimlar",
      "Barcha modullar",
      "Ustuvor qo'llab-quvvatlash",
    ],
    popular: false,
  },
]

const COMPARE_ROWS = [
  {
    label: "Sozlash vaqti",
    oson: "15 daqiqa",
    direct: "Doimiy",
    site: "1–4 hafta",
  },
  {
    label: "Texnik bilim",
    oson: "Shart emas",
    direct: "Shart emas",
    site: "Zarur",
  },
  {
    label: "Buyurtma tizimi",
    oson: "✓ Avtomatik",
    direct: "✗ Qo'lda",
    site: "✓ Bor",
  },
  {
    label: "To'lov qabuli",
    oson: "✓ Komissiyasiz",
    direct: "✗ Yo'q",
    site: "✓ Bor",
  },
  {
    label: "Mijozlar bazasi (CRM)",
    oson: "✓ Bor",
    direct: "✗ Yo'q",
    site: "~ Ba'zan",
  },
  {
    label: "Analitika",
    oson: "✓ Real vaqt",
    direct: "✗ Yo'q",
    site: "~ Cheklangan",
  },
  {
    label: "Narx",
    oson: "199 000 so'm/oy",
    direct: "Bepul",
    site: "1 000 000+ so'm",
  },
]

const LOGOS = [
  "Korzinka",
  "Uzum",
  "Texnomart",
  "Hamkorbank",
  "Makro",
  "Ucell",
  "Humans",
  "Beeline",
]

const FAQ = [
  {
    q: "Men texnik mutaxassis emasman. Uddalaymanmi?",
    a: "Ha. Agar telefondan foydalana olsangiz — Oson App'dan foydalana olasiz. Do'konni sozlash 15 daqiqa vaqt oladi.",
  },
  {
    q: "Mahsulotlarim soni kam bo'lsa-chi?",
    a: "Ayni o'zi. Do'kon kichik ekan, hozir tizimga o'tsangiz, o'sish boshlanganda mijozlarni yo'qotmaysiz.",
  },
  {
    q: "Sayt kerakmi?",
    a: "Yo'q. Hammasi Telegram bot orqali ishlaydi. Mijoz havolani ochadi — do'konni ko'radi.",
  },
  {
    q: "To'lov tizimlari qanday ulanadi?",
    a: "Payme, Click, Uzum va boshqalar bir bosish bilan ulanadi. Texnik bilim talab qilinmaydi.",
  },
  {
    q: "Sinov muddati bormi?",
    a: "Ha, har bir tarif uchun 14 kunlik to'liq kirish bepul. Karta ma'lumotlari talab qilinmaydi.",
  },
]

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const count = useCountUp(value, 1600, started)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-muted/50 p-8 text-center"
    >
      <div className="mb-2 text-5xl font-extrabold text-foreground tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [annual, setAnnual] = useState(false)

  const price = (monthly: number) =>
    annual
      ? Math.round(monthly * 0.8).toLocaleString("uz-UZ")
      : monthly.toLocaleString("uz-UZ")

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <PublicNav />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden py-20 lg:py-30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/4 h-125 w-125 rounded-full bg-primary/15 blur-[140]" />
            <div className="absolute top-20 right-1/4 h-100 w-100 rounded-full bg-primary/8 blur-[120]" />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
                ✦ O'zbekistondagi 500+ do'kon endi buyurtma yo'qotmaydi
              </span>
              <h1 className="mt-4 mb-6 text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[60]">
                Chatlardagi xaosni{" "}
                <span className="text-primary">tizimga aylantiring.</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Katalog, to'lov qabuli, CRM va AI-assistant — hammasi Telegram
                ichida. Birinchi buyurtma — bugun.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Bepul boshlash <span>→</span>
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Narxlarni ko'rish
                </Link>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Kartasiz · Kodsiz · 14 kun to'liq kirish
              </p>
            </div>

            {/* Browser mockup */}
            <div className="relative mx-auto mt-16 max-w-4xl">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mx-auto flex h-7 w-64 items-center justify-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground">
                    app.osonapp.uz/dashboard
                  </div>
                </div>
                {/* Dashboard preview */}
                <div className="grid grid-cols-4 gap-4 bg-background/50 p-6">
                  {[
                    { label: "Buyurtmalar", value: "128", trend: "+12%" },
                    { label: "Tushum", value: "4.2M", trend: "+28%" },
                    { label: "Mijozlar", value: "893", trend: "+5%" },
                    { label: "Top tovar", value: "Hoodie", trend: "×34" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-xl border border-border bg-background p-4"
                    >
                      <div className="mb-1 text-xs text-muted-foreground">
                        {card.label}
                      </div>
                      <div className="text-xl font-bold text-foreground">
                        {card.value}
                      </div>
                      <div className="mt-1 text-xs font-medium text-emerald-500">
                        {card.trend}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 bg-background/50 px-6 pb-6">
                  <div className="col-span-2 flex h-32 items-end gap-1 rounded-xl border border-border bg-background p-4">
                    {[40, 65, 50, 80, 70, 90, 75, 95, 85, 100, 88, 96].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-primary/40"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                  <div className="space-y-2 rounded-xl border border-border bg-background p-4">
                    {["Hoodie", "T-shirt", "Jinsi"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-muted-foreground">{item}</span>
                        <span className="font-medium text-foreground">—</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="hero-float absolute top-1/4 -left-4 hidden rounded-xl border border-border bg-background px-4 py-3 shadow-lg lg:block">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <span className="text-lg">🤖</span> AI buyurtma qabul qildi
                </div>
              </div>
              <div
                className="hero-float absolute -right-4 bottom-1/4 hidden rounded-xl border border-border bg-background px-4 py-3 shadow-lg lg:block"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <span className="text-lg">💳</span> To'lov tasdiqlandi
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <section className="overflow-hidden border-y border-border bg-muted/30 py-8">
          <div className="mx-auto mb-4 max-w-6xl px-4 text-center">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Allaqachon Oson App orqali sotmoqda
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div
                  key={i}
                  className="mx-8 flex h-10 w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-semibold text-muted-foreground"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              <StatCard value={500} suffix="+" label="Do'kon tizimga o'tdi" />
              <StatCard value={50000} suffix="+" label="Oy sayin buyurtma" />
              <StatCard value={6} suffix="+" label="To'lov tizimlari" />
              <StatCard value={24} suffix="/7" label="Buyurtma qabuli" />
            </div>
          </div>
        </section>

        {/* ── Feature tabs ── */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Imkoniyatlar
              </span>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[40]">
                Savdo qilish uchun zarur hamma narsa
              </h2>
            </div>
            {/* Tab strip */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {TABS.map((tab, i) => (
                <Button
                  key={tab.id}
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveTab(i)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    activeTab === i
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
            {/* Tab content */}
            {TABS.map((tab, i) =>
              i !== activeTab ? null : (
                <div
                  key={tab.id}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div>
                    <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {tab.label}
                    </span>
                    <h3 className="mb-4 text-2xl leading-snug font-bold text-foreground sm:text-3xl">
                      {tab.title}
                    </h3>
                    <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                      {tab.desc}
                    </p>
                    <ul className="space-y-3">
                      {tab.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/register"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Bepul boshlash →
                    </Link>
                  </div>
                  <div
                    className={`flex min-h-80 items-center justify-center rounded-2xl border border-border bg-linear-to-br ${tab.color} p-10`}
                  >
                    <div className="w-full max-w-xs rounded-xl border border-border bg-background/80 p-6 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">
                          {tab.label}
                        </span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          Aktiv
                        </span>
                      </div>
                      {tab.bullets.map((b) => (
                        <div
                          key={b}
                          className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* ── Feature cards grid ── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border bg-muted/50 p-6 transition-colors hover:border-primary/30"
                >
                  <div className="mb-4 text-4xl">{card.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Uchta oddiy qadam
              </span>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[40]">
                15 daqiqada do'koningiz tayyor
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {STEPS.map((s) => (
                <div key={s.n} className="relative text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-primary-foreground shadow-lg">
                    {s.n}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Do'kon egalari nima deydi?
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.author}
                  className="flex flex-col rounded-2xl border border-border bg-muted/30 p-6"
                >
                  <div className="mb-4 flex-1">
                    <svg
                      className="mb-3 h-6 w-6 text-primary/40"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      {t.text}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-sm font-semibold text-foreground">
                      {t.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[40]">
                Narxlar — savollarsiz
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Har bir tarifda 14 kun bepul. Kartasiz.
              </p>
              {/* Toggle */}
              <div className="inline-flex items-center gap-3 rounded-full border border-border bg-background p-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setAnnual(false)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${!annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Oylik
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setAnnual(true)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Yillik{" "}
                  <span className="ml-1 text-xs font-semibold text-emerald-500">
                    −20%
                  </span>
                </Button>
              </div>
            </div>
            <div className="grid items-start gap-6 md:grid-cols-3 lg:gap-8">
              {PLANS.map((p) => (
                <div
                  key={p.name}
                  className={`relative flex flex-col rounded-2xl border bg-background p-8 ${p.popular ? "border-primary shadow-lg" : "border-border"}`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                        Ko'pchilikning tanlovi
                      </span>
                    </div>
                  )}
                  <h3 className="mb-1 text-xl font-semibold text-foreground">
                    {p.name}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {price(p.monthly)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      so'm/oy
                    </span>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${p.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:bg-muted"}`}
                  >
                    Boshlash →
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/pricing"
                className="text-sm font-medium text-primary hover:underline"
              >
                Batafsil narxlar va taqqoslash →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Nima uchun Oson App?
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left font-semibold text-foreground">
                      Xususiyat
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-primary">
                      Oson App
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                      Direktda sotasiz
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-muted-foreground">
                      Sayt qilasiz
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-primary">
                        {row.oson}
                      </td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {row.direct}
                      </td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {row.site}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl">
              Tez-tez so'raladigan savollar
            </h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-border bg-background"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-foreground">
                    <span>{f.q}</span>
                    <svg
                      className="ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-background py-20 lg:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[140]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[50]">
              Siz o'ylaguningizcha, mijozingiz raqibingizdan sotib olib bo'ldi.
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Vaqtni boy bermang. 15 daqiqada do'koningizni tizimga soling.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-12 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Do'konni bepul ishga tushirish <span>→</span>
            </Link>
            <p className="mt-5 text-sm text-muted-foreground">
              Kartasiz · Kodsiz · 14 kun bepul
            </p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
