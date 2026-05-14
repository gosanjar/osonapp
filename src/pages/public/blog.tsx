import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import PublicNav from "./nav"
import PublicFooter from "./footer"

const categories = [
  { slug: "all", label: "Barchasi" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "marketing", label: "Marketing" },
  { slug: "guides", label: "Qo'llanmalar" },
]

const posts = [
  {
    slug: "telegram-dukoni-qanday-ochiladi",
    category: "guides",
    categoryLabel: "Qo'llanmalar",
    title:
      "Telegram orqali do'kon qanday ochiladi: bosqichma-bosqich qo'llanma",
    excerpt:
      "Hisob yaratishdan tortib birinchi buyurtma qabul qilishgacha. Texnik bilim kerak emas — faqat 15 daqiqa va telefon.",
    author: "Oson App jamoasi",
    date: "10 may 2026",
    readTime: "8 daqiqa",
    featured: true,
  },
  {
    slug: "tolov-tizimlarini-ulash",
    category: "guides",
    categoryLabel: "Qo'llanmalar",
    title: "Payme, Click va Uzumni do'konga qanday ulash mumkin",
    excerpt:
      "To'lov tizimlarini bir bosish bilan ulang. Texnik bilim talab qilinmaydi. Mijozlar karta orqali to'lashi uchun zarur qadamlar.",
    author: "Oson App jamoasi",
    date: "8 may 2026",
    readTime: "5 daqiqa",
    featured: false,
  },
  {
    slug: "mijozlar-segmentatsiyasi",
    category: "marketing",
    categoryLabel: "Marketing",
    title: "Mijozlarni segmentga bo'ling va ko'proq soting",
    excerpt:
      "Xarid tarixi bo'yicha guruhlar yarating, har bir guruhga alohida taklif yuboring. Konversiya 2 baravardan ko'p oshadi.",
    author: "Oson App jamoasi",
    date: "5 may 2026",
    readTime: "6 daqiqa",
    featured: false,
  },
  {
    slug: "ommaviy-xabar-yuborish",
    category: "marketing",
    categoryLabel: "Marketing",
    title:
      "Ommaviy xabar yuborish: mijozlarni qaytarib keltiradigan matn qanday yoziladi",
    excerpt:
      "Spam emas, foyda. Qaysi vaqtda, qanday matn bilan va qancha tez-tez xabar yuborish kerakligini real holatlar bilan ko'rib chiqamiz.",
    author: "Oson App jamoasi",
    date: "2 may 2026",
    readTime: "7 daqiqa",
    featured: false,
  },
  {
    slug: "katalog-sozlash",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    title: "Katalogni to'g'ri sozlash: tovarlar tezroq sotiladi",
    excerpt:
      "Fotosurat sifati, tavsif matni, variantlar va filtrlar. Buyurtma bermayotgan mijozlar qaysi narsani ko'rib orqaga qaytishini bilib oling.",
    author: "Oson App jamoasi",
    date: "28 aprel 2026",
    readTime: "6 daqiqa",
    featured: false,
  },
  {
    slug: "yetkazib-berish-sozlash",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    title: "Yetkazib berish zonalari va narxlarini qanday sozlash kerak",
    excerpt:
      "Shahar bo'yicha zonalar, minimal buyurtma summasi, bepul yetkazib berish chegarasi. Amaliy misol bilan.",
    author: "Oson App jamoasi",
    date: "25 aprel 2026",
    readTime: "4 daqiqa",
    featured: false,
  },
  {
    slug: "chegirma-kuponlari",
    category: "marketing",
    categoryLabel: "Marketing",
    title:
      "Chegirma kuponlari: yangi mijozlarni jalb qilish va takroriy xaridni oshirish",
    excerpt:
      "Bir martalik, foizli va minimal summali kuponlar. Qaysi vaziyatda qaysi kupon ishlaydi — real misollar.",
    author: "Oson App jamoasi",
    date: "22 aprel 2026",
    readTime: "5 daqiqa",
    featured: false,
  },
]

function PostPlaceholder() {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="h-12 w-12 text-border"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    </div>
  )
}

export default function BlogPage() {
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get("category") || "all"
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  const featured = filtered.find((p) => p.featured) ?? filtered[0]
  const rest = filtered.filter((p) => p !== featured)

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <PublicNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/4 h-100 w-100 rounded-full bg-primary/10 blur-[120]" />
            <div className="absolute top-10 right-1/4 h-75 w-75 rounded-full bg-primary/5 blur-[100]" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              Oson App Blog
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Telegram orqali savdo qilish bo'yicha qo'llanmalar, keyslar va
              foydali maslahatlar
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.slug === "all" ? "/blog" : `/blog?category=${cat.slug}`}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <Link
              to={`/blog/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-muted/30 transition-colors hover:border-primary/40"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 lg:aspect-auto lg:min-h-95">
                  <div className="absolute inset-0">
                    <PostPlaceholder />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {featured.categoryLabel}
                  </span>
                  <h2 className="mb-4 text-2xl leading-tight font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{featured.author}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{featured.date}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Posts grid */}
        {rest.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-muted/30 transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0">
                      <PostPlaceholder />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="mb-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.categoryLabel}
                    </span>
                    <h3 className="mb-2 text-lg leading-snug font-bold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{post.date}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="py-24 text-center text-muted-foreground">
              Bu kategoriyada hozircha maqolalar yo'q.
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-muted/30 p-8 text-center sm:p-12">
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              Dayjestga obuna bo'ling
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base text-muted-foreground">
              Haftada bir marta — Telegram savdosi haqida eng yaxshi
              materiallar. Spamlarsiz.
            </p>
            {subscribed ? (
              <p className="font-medium text-primary">
                Rahmat! Siz obuna bo'ldingiz.
              </p>
            ) : (
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz"
                  className="flex-1 rounded-xl border border-border bg-background px-5 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors outline-none focus:border-primary"
                />
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Obuna bo'lish
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
