import { Link, useParams, Navigate } from "react-router-dom"
import PublicNav from "./_public-nav"
import PublicFooter from "./_public-footer"
import { nicheData, BADGE_ICONS } from "./constants"

export default function NichePage() {
  const { niche } = useParams<{ niche: string }>()
  const data = niche ? nicheData[niche] : null

  if (!data) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <PublicNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-20 lg:py-30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/4 hidden h-125 w-125 rounded-full bg-blue-600/15 blur-[120] lg:block" />
            <div className="absolute top-20 right-0 hidden h-100 w-100 rounded-full bg-indigo-600/10 blur-[120] lg:block" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              ✦ {data.badge}
            </span>
            <h1 className="mx-auto mt-4 mb-6 max-w-4xl text-4xl leading-tight font-extrabold tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[56]">
              {data.hero}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {data.desc}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Bepul do'kon yaratish <span>→</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Kartasiz · Kodsiz · 14 kun to'liq kirish
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {data.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-muted/50 p-8 text-center backdrop-blur-sm"
                >
                  <div className="mb-2 text-5xl font-extrabold text-foreground">
                    {s.value}
                  </div>
                  <div className="text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo parade */}
        <section className="border-y border-border bg-muted/30 py-10">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className="mb-6 text-sm font-medium text-muted-foreground">
              Allaqachon Oson App orqali sotmoqda
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 w-24 rounded-lg bg-muted" />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {data.features.map((f, i) => (
          <section
            key={f.badge}
            className={`py-16 lg:py-24 ${i % 2 !== 0 ? "bg-muted/30" : "bg-background"}`}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {f.badge}
                  </span>
                  <h2 className="mb-4 text-3xl leading-tight font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                    {f.title}
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                  <ul className="space-y-3">
                    {f.bullets.map((b) => (
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
                </div>
                {(() => {
                  const Icon = BADGE_ICONS[f.badge] ?? BADGE_ICONS._fallback
                  return (
                    <div className="flex min-h-70 items-center justify-center rounded-2xl border border-border bg-muted p-8 lg:p-12">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
                        <Icon
                          className="h-10 w-10 text-primary-foreground"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </section>
        ))}

        {/* How it works */}
        <section
          className={`py-16 lg:py-24 ${data.features.length % 2 !== 0 ? "bg-muted/30" : "bg-background"}`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <span className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Uchta oddiy qadam
              </span>
              <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[40]">
                Bu qanday ishlaydi?
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
              {data.steps.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
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

        {/* Testimonial */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-2xl border border-border bg-background p-8 text-center lg:p-12">
              <svg
                className="mx-auto mb-6 h-10 w-10 text-border"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="mb-6 text-lg leading-relaxed text-muted-foreground italic lg:text-xl">
                "{data.testimonial.text}"
              </blockquote>
              <div className="font-semibold text-foreground">
                {data.testimonial.author}
              </div>
              <div className="text-sm text-muted-foreground">
                {data.testimonial.role}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-background py-16 lg:py-24">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120]" />
          <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="mb-4 text-3xl leading-tight font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[48]">
              {data.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              {data.ctaDesc}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {data.ctaBtn} <span>→</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Kartasiz · Kodsiz · 14 kun bepul
            </p>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
