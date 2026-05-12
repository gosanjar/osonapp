import { useState } from "react"
import { Link } from "react-router-dom"
import PublicNav from "./_public-nav"
import PublicFooter from "./_public-footer"

const plans = [
  {
    name: "Start",
    monthly: 199000,
    desc: "Endigina boshlaganlar uchun",
    features: [
      { label: "Mijozlar", value: "500 tagacha" },
      { label: "Mahsulotlar", value: "50 tagacha" },
      { label: "Xodimlar", value: "2 ta" },
      { label: "To'lov tizimlari", value: "Payme, Click, Uzum" },
      { label: "Telegram bot", value: true },
      { label: "Analitika", value: "Asosiy" },
      { label: "API kirish", value: false },
      { label: "Ustuvor qo'llab-quvvatlash", value: false },
    ],
    popular: false,
    cta: "Bepul boshlash",
  },
  {
    name: "Growth",
    monthly: 399000,
    desc: "O'sayotgan do'konlar uchun",
    features: [
      { label: "Mijozlar", value: "25 000 tagacha" },
      { label: "Mahsulotlar", value: "10 000 tagacha" },
      { label: "Xodimlar", value: "10 ta" },
      { label: "To'lov tizimlari", value: "Barcha (6+)" },
      { label: "Telegram bot", value: true },
      { label: "Analitika", value: "Kengaytirilgan" },
      { label: "API kirish", value: true },
      { label: "Ustuvor qo'llab-quvvatlash", value: false },
    ],
    popular: true,
    cta: "Bepul boshlash",
  },
  {
    name: "Plus",
    monthly: 799000,
    desc: "Filiallar va yirik tarmoqlar uchun",
    features: [
      { label: "Mijozlar", value: "Cheksiz" },
      { label: "Mahsulotlar", value: "Cheksiz" },
      { label: "Xodimlar", value: "Cheksiz" },
      { label: "To'lov tizimlari", value: "Barcha (6+)" },
      { label: "Telegram bot", value: true },
      { label: "Analitika", value: "To'liq" },
      { label: "API kirish", value: true },
      { label: "Ustuvor qo'llab-quvvatlash", value: true },
    ],
    popular: false,
    cta: "Bepul boshlash",
  },
]

const comparisonRows = [
  { label: "Mijozlar bazasi", start: "500", growth: "25 000", plus: "Cheksiz" },
  { label: "Mahsulotlar", start: "50", growth: "10 000", plus: "Cheksiz" },
  { label: "Xodim akkauntlari", start: "2", growth: "10", plus: "Cheksiz" },
  { label: "Telegram bot", start: true, growth: true, plus: true },
  { label: "To'lov tizimlari", start: "3", growth: "6+", plus: "6+" },
  { label: "Buyurtmalar tahlili", start: "Asosiy", growth: "Kengaytirilgan", plus: "To'liq" },
  { label: "Segmentatsiya", start: false, growth: true, plus: true },
  { label: "Ommaviy xabar yuborish", start: false, growth: true, plus: true },
  { label: "API kirish", start: false, growth: true, plus: true },
  { label: "Webhook", start: false, growth: true, plus: true },
  { label: "Ustuvor qo'llab-quvvatlash", start: false, growth: false, plus: true },
  { label: "Moslashtirilgan integratsiyalar", start: false, growth: false, plus: true },
]

function fmt(n: number) {
  return n.toLocaleString("uz-UZ")
}

function CheckIcon({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <svg className="mx-auto h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }
  return (
    <svg className="mx-auto h-5 w-5 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [avgOrder, setAvgOrder] = useState(150000)
  const [monthlyOrders, setMonthlyOrders] = useState(80)

  const discount = 0.2
  const price = (monthly: number) =>
    annual ? Math.round(monthly * (1 - discount)) : monthly

  const annualRevenue = avgOrder * monthlyOrders * 12
  const projected = Math.round(annualRevenue * 1.4)
  const extra = projected - annualRevenue

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <PublicNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 h-100 w-150 -translate-x-1/2 rounded-full bg-primary/10 blur-[120]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              14 kun bepul · Kartasiz · Istalgan vaqt bekor qilish
            </span>
            <h1 className="mt-4 mb-4 text-4xl font-extrabold leading-tight tracking-[-0.02em] sm:text-5xl lg:text-[52]">
              Oddiy va shaffof narxlar
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Yashirin to'lovlar yo'q. Har qanday tarifda to'liq funksionallik.
              14 kun davomida bepul sinab ko'ring.
            </p>
          </div>
        </section>

        {/* Billing toggle */}
        <section className="pb-4">
          <div className="mx-auto flex max-w-xs items-center justify-center gap-3 px-4">
            <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
              Oylik
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative h-6 w-11 rounded-full transition-colors ${annual ? "bg-primary" : "bg-muted"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Yillik
            </span>
            {annual && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                −20%
              </span>
            )}
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-6 md:grid-cols-3 lg:gap-8">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`relative flex flex-col rounded-2xl border p-8 ${p.popular ? "border-primary bg-primary/5" : "border-border bg-muted/50"}`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                        🔥 Ko'pchilikning tanlovi
                      </span>
                    </div>
                  )}
                  <h3 className="mb-1 text-xl font-semibold text-foreground">{p.name}</h3>
                  <p className="mb-5 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {fmt(price(p.monthly))}
                    </span>
                    <span className="text-sm text-muted-foreground">so'm/oy</span>
                  </div>
                  {annual && (
                    <p className="mb-5 text-xs text-muted-foreground line-through">
                      {fmt(p.monthly)} so'm/oy
                    </p>
                  )}
                  {!annual && <div className="mb-5" />}
                  <ul className="mb-8 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5 text-sm">
                        {typeof f.value === "boolean" ? (
                          f.value ? (
                            <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="mt-0.5 h-5 w-5 shrink-0 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">{f.label}:</span>{" "}
                          {typeof f.value === "boolean" ? (f.value ? "Ha" : "Yo'q") : f.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${p.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:bg-muted"}`}
                  >
                    {p.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Batafsil taqqoslash
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="py-4 pl-6 pr-4 text-left font-semibold text-foreground">
                      Xususiyat
                    </th>
                    {plans.map((p) => (
                      <th
                        key={p.name}
                        className={`px-4 py-4 text-center font-semibold ${p.popular ? "text-primary" : "text-foreground"}`}
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                    >
                      <td className="py-3.5 pl-6 pr-4 text-muted-foreground">{row.label}</td>
                      {[row.start, row.growth, row.plus].map((val, j) => (
                        <td key={j} className="px-4 py-3.5 text-center text-muted-foreground">
                          {typeof val === "boolean" ? (
                            <CheckIcon ok={val} />
                          ) : (
                            val
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-background">
                    <td className="py-4 pl-6 pr-4" />
                    {plans.map((p) => (
                      <td key={p.name} className="px-4 py-4 text-center">
                        <Link
                          to="/register"
                          className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${p.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border text-foreground hover:bg-muted"}`}
                        >
                          Boshlash
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                ROI Kalkulyator
              </span>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Oson App sizga qancha daromad keltiradi?
              </h2>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8 lg:p-10">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    O'rtacha buyurtma narxi (so'm)
                  </label>
                  <input
                    type="number"
                    value={avgOrder}
                    onChange={(e) => setAvgOrder(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Oylik buyurtmalar soni
                  </label>
                  <input
                    type="number"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-muted/50 p-6 text-center">
                  <div className="mb-1 text-2xl font-bold text-foreground">
                    {fmt(annualRevenue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Joriy yillik daromad</div>
                </div>
                <div className="rounded-2xl border border-primary bg-primary/5 p-6 text-center">
                  <div className="mb-1 text-2xl font-bold text-primary">
                    {fmt(projected)}
                  </div>
                  <div className="text-sm text-muted-foreground">Oson App bilan (+40%)</div>
                </div>
                <div className="rounded-2xl border border-border bg-muted/50 p-6 text-center">
                  <div className="mb-1 text-2xl font-bold text-foreground">
                    +{fmt(extra)}
                  </div>
                  <div className="text-sm text-muted-foreground">Qo'shimcha daromad</div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                * O'rtacha konversiya o'sishi. Natijalar individualdir.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Narxlar haqida savollar
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "14 kunlik sinov davrida cheklovlar bormi?",
                  a: "Yo'q. Tanlov qilgan tarifingizning barcha imkoniyatlaridan to'liq foydalanasiz. Kredit karta ma'lumotlari talab qilinmaydi.",
                },
                {
                  q: "Sinov davri tugagandan keyin nima bo'ladi?",
                  a: "Siz to'lov amalga oshirsangiz — davom etadi. Amalga oshirmasangiz — hisob muzlatiladi, ma'lumotlar 30 kun saqlanadi.",
                },
                {
                  q: "Tarifni o'zgartirish mumkinmi?",
                  a: "Ha, istalgan vaqt. Yuqori tarifga o'tish — darhol kuchga kiradi. Quyi tarifga o'tish — hisob davri tugagach.",
                },
                {
                  q: "Yillik to'lovda chegirma qanday ishlaydi?",
                  a: "Yillik to'lov tanlaganingizda oylik to'lov narxidan 20% chegirma olasiz. Bir yil uchun to'liq to'lov qilinadi.",
                },
                {
                  q: "Komissiya olinadi berikmi?",
                  a: "Yo'q. Buyurtmalar va savdolardan hech qanday komissiya olinmaydi. Faqat oylik tarifni to'laysiz.",
                },
              ].map((f) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-muted/30 py-16 lg:py-24">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120]" />
          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
              14 kun bepul. Keyin qaror qiling.
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Kredit karta shart emas. Istalgan vaqt bekor qilish mumkin.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Bepul boshlash <span>→</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Savollar bormi?{" "}
              <a
                href="https://t.me/osonapp_support"
                target="_blank"
                rel="noopener"
                className="text-primary hover:underline"
              >
                Telegram orqali yozing
              </a>
            </p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
