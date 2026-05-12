import {
  LayoutGrid,
  CreditCard,
  Truck,
  BarChart2,
  Tag,
  Users,
  UtensilsCrossed,
  ClipboardList,
  Package,
  Wallet,
  Headphones,
  Search,
  Bell,
  ShieldCheck,
  Gift,
  Heart,
  Leaf,
  Users2,
  ShoppingBag,
  Layers,
  PenLine,
  Star,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const BADGE_ICONS: Record<string, LucideIcon> = {
  Katalog: LayoutGrid,
  "To'lov": CreditCard,
  "Yetkazib berish": Truck,
  Tahlil: BarChart2,
  Marketing: Tag,
  Mijozlar: Users,
  Menyu: UtensilsCrossed,
  Buyurtmalar: ClipboardList,
  Ombor: Package,
  "Bo'lib to'lash": Wallet,
  "Qo'llab-quvvatlash": Headphones,
  Qidiruv: Search,
  Eslatmalar: Bell,
  Xavfsizlik: ShieldCheck,
  "Sovg'alar": Gift,
  Sadoqat: Heart,
  "Oziq-ovqat": Leaf,
  Jamiyat: Users2,
  Vitrina: ShoppingBag,
  Kolleksiyalar: Layers,
  Shaxsiylashtirish: PenLine,
  Bayram: Star,
  _fallback: Zap,
}

type Feature = {
  badge: string
  title: string
  desc: string
  bullets: string[]
}

type NicheData = {
  badge: string
  hero: string
  desc: string
  stats: { value: string; label: string }[]
  features: Feature[]
  steps: { n: string; title: string; desc: string }[]
  testimonial: { text: string; author: string; role: string }
  ctaTitle: string
  ctaDesc: string
  ctaBtn: string
}

export const nicheData: Record<string, NicheData> = {
  clothes: {
    badge: "Kiyim do'konlari uchun",
    hero: "Telegram orqali kiyim soting",
    desc: "Rasmlar, o'lchamlar va narxlar bilan katalog. Onlayn to'lov, yetkazib berish integratsiyasi — do'konni bir necha daqiqada ishga tushiring.",
    stats: [
      { value: "500+", label: "Kiyim do'konlari" },
      { value: "85%", label: "Konversiya o'sishi" },
      { value: "24/7", label: "Buyurtma qabuli" },
    ],
    features: [
      {
        badge: "Katalog",
        title: "Filtrli qulay katalog",
        desc: "Rasmlar, tavsiflar va variatsiyalar bilan tovarlarni qo'shing. Mijozlar o'lcham, rang va narx bo'yicha filtrlashi mumkin.",
        bullets: [
          "Har bir tovar uchun fotogalereya",
          "O'lchamlar jadvali",
          "Filtrlar va qidiruv",
        ],
      },
      {
        badge: "To'lov",
        title: "Komissiyasiz to'lov qabuli",
        desc: "Payme, Click, Uzum yoki boshqa to'lov tizimlarini ulang. Pul to'g'ridan-to'g'ri hisobingizga tushadi.",
        bullets: [
          "6+ to'lov tizimi",
          "Tezkor bildirishnomalar",
          "Avtomatik cheklar",
        ],
      },
      {
        badge: "Yetkazib berish",
        title: "Yetkazib berish integratsiyasi",
        desc: "Yetkazib berish zonalari, narx va shartlarni sozlang. Mijozlar buyurtma berish oldidan yetkazib berish narxini ko'radi.",
        bullets: [
          "Yetkazib berish zonalari",
          "O'zi olib ketish",
          "Narxni hisoblash",
        ],
      },
      {
        badge: "Tahlil",
        title: "Real vaqt savdo tahlili",
        desc: "Buyurtmalar, tushum va mashhur tovarlarni kuzating. Ma'lumotlarga asoslangan qarorlar qabul qiling.",
        bullets: ["Savdo paneli", "Top tovarlar", "Davr bo'yicha hisobotlar"],
      },
      {
        badge: "Marketing",
        title: "Aksiyalar va promokodlar",
        desc: "Chegirmalar, promokodlar va savdolar yarating. Mijozlarni jalb qiling va ushlab qoling.",
        bullets: [
          "Moslashuvchan chegirmalar",
          "Promokodlar",
          "Sadoqat dasturi",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Ro'yxatdan o'ting",
        desc: "Hisob yarating va Telegram-botni 2 daqiqada ulang.",
      },
      {
        n: "2",
        title: "Tovarlarni qo'shing",
        desc: "Rasmlar, o'lchamlar va narxlar bilan kiyim katalogini yuklang.",
      },
      {
        n: "3",
        title: "Buyurtmalarni qabul qiling",
        desc: "Mijozlar Telegram orqali buyurtma beradi, siz bildirishnoma olasiz.",
      },
    ],
    testimonial: {
      text: "Birinchi oyda savdolarimiz 40% ga oshdi. Mijozlarga to'g'ridan-to'g'ri Telegramda buyurtma berish qulay, menga esa hammasini telefondan boshqarish.",
      author: "Malika K.",
      role: "Kiyim do'koni egasi, Toshkent",
    },
    ctaTitle: "Onlayn kiyim sotishga tayyormisiz?",
    ctaDesc:
      "Telegramda bepul kiyim do'konini yarating. Dasturlashsiz, boshlang'ich to'lovsiz.",
    ctaBtn: "Kiyim do'konini yaratish",
  },

  beauty: {
    badge: "Go'zallik biznesi uchun",
    hero: "Telegram orqali kosmetika soting",
    desc: "Batafsil tavsiflar, tarkib va sharhlar bilan chiroyli katalog. Kosmetika, parfyumeriya va parvarish vositalari uchun ideal.",
    stats: [
      { value: "300+", label: "Go'zallik do'konlari" },
      { value: "92%", label: "Takroriy xaridlar" },
      { value: "3x", label: "Savdo o'sishi" },
    ],
    features: [
      {
        badge: "Katalog",
        title: "Go'zallik tovarlari vitrini",
        desc: "Tovarlarni sifatli rasmlar, tarkib va tavsiyalar bilan ko'rsating. Brendlar va kategoriyalar bo'yicha guruhlang.",
        bullets: [
          "Yuqori sifatli rasmlar",
          "Tarkib tavsifi",
          "Brendlar bo'yicha guruhlash",
        ],
      },
      {
        badge: "Mijozlar",
        title: "Doimiy mijozlar bazasi",
        desc: "Xaridorlar bazasini yig'ing, tavsiyalar va takroriy xaridlar haqida eslatmalar yuboring.",
        bullets: [
          "Mijozlar uchun CRM",
          "Xaridlar tarixi",
          "Shaxsiy tavsiyalar",
        ],
      },
      {
        badge: "To'lov",
        title: "Mijozlar uchun qulay to'lov",
        desc: "Payme, Click, Uzum va boshqa usullar. Mijozlar tashqi saytlarga o'tmasdan to'g'ridan-to'g'ri Telegramda to'laydi.",
        bullets: [
          "1 bosish bilan to'lov",
          "To'lovlarni bo'lish",
          "Xavfsiz tranzaksiyalar",
        ],
      },
      {
        badge: "Marketing",
        title: "Go'zallik uchun promo-vositalar",
        desc: "Mavsumiy chegirmalar, to'plam-komplektlar va buyurtmaga sovg'alar. Mijozlarni jalb qilish uchun zarur hamma narsa.",
        bullets: [
          "Buyurtmaga sovg'a",
          "To'plam-komplektlar",
          "Mavsumiy savdolar",
        ],
      },
      {
        badge: "Yetkazib berish",
        title: "Go'zallik buyurtmalarini tez yetkazish",
        desc: "Tovar nozikligini hisobga olgan holda yetkazib berishni sozlang. Mijoz va siz uchun statusni kuzatish.",
        bullets: [
          "Yetkazib berish statusi",
          "SMS-bildirishnomalar",
          "Yetkazib berish vaqtini tanlash",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Do'kon yarating",
        desc: "Ro'yxatdan o'ting va go'zallik do'konini 5 daqiqada sozlang.",
      },
      {
        n: "2",
        title: "Katalogni yuklang",
        desc: "Rasmlar, tavsiflar va narxlar bilan kosmetikani qo'shing.",
      },
      {
        n: "3",
        title: "Sotishni boshlang",
        desc: "Botni mijozlar bilan ulashing va 24/7 buyurtma qabul qiling.",
      },
    ],
    testimonial: {
      text: "Magicstore go'zallik biznesimni onlaynga o'tkazishga yordam berdi. Mijozlar Telegramda buyurtma berishning qulayligidan hayratda!",
      author: "Nigora A.",
      role: "Go'zallik do'koni asoschisi, Samarqand",
    },
    ctaTitle: "Bugun go'zallik do'konini ishga tushiring",
    ctaDesc:
      "Telegramda chiroyli kosmetika do'konini yarating. Bepul boshlash, oddiy sozlash.",
    ctaBtn: "Go'zallik do'konini yaratish",
  },

  food: {
    badge: "Ovqat yetkazib berish uchun",
    hero: "Telegram-bot orqali ovqat yetkazib berish",
    desc: "Raqamli menyu, onlayn buyurtmalar va to'lov. Ovqat yetkazib berishni to'g'ridan-to'g'ri Telegramdan boshqaring.",
    stats: [
      { value: "400+", label: "Restoran va kafelar" },
      { value: "15 daq", label: "O'rtacha buyurtma vaqti" },
      { value: "60%", label: "Agregatorlarda tejash" },
    ],
    features: [
      {
        badge: "Menyu",
        title: "Rasmli raqamli menyu",
        desc: "Kategoriyalar, modifikatorlar va qo'shimchalar bilan menyu yarating. Mijozlar yetkazib berish ilovasidagi kabi buyurtma yig'adi.",
        bullets: [
          "Taom kategoriyalari",
          "Modifikatorlar va qo'shimchalar",
          "Har bir taom rasmi",
        ],
      },
      {
        badge: "Buyurtmalar",
        title: "Buyurtmalarni boshqarish",
        desc: "Real vaqtda buyurtmalarni qabul qiling. Statuslarni o'zgartiring, mijozlarga tayyorlik haqida xabar bering.",
        bullets: [
          "Buyurtma bildirishnomalari",
          "Tayyorlash statuslari",
          "Buyurtmalar tarixi",
        ],
      },
      {
        badge: "Yetkazib berish",
        title: "Yetkazib berish zonalari va narxi",
        desc: "Xaritada yetkazib berish zonalarini, minimal buyurtma summasini va har bir zona uchun narxni sozlang.",
        bullets: [
          "Xaritadagi zonalar",
          "Minimal summa",
          "Summadan bepul yetkazish",
        ],
      },
      {
        badge: "To'lov",
        title: "Buyurtmalarni onlayn to'lash",
        desc: "Mijozlar buyurtmani darhol Telegramda to'laydi. Naqd pulsiz, kechikishlarsiz.",
        bullets: [
          "Onlayn to'lov",
          "Yetkazib berishda to'lov",
          "Avtomatik cheklar",
        ],
      },
      {
        badge: "Tahlil",
        title: "Restoran tahlili",
        desc: "Eng mashhur taomlar, eng ko'p buyurtma soatlari, o'rtacha chek — biznes o'sishi uchun barcha tahlillar.",
        bullets: [
          "Mashhur taomlar",
          "Eng ko'p buyurtma soatlari",
          "O'rtacha chek",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Botni sozlang",
        desc: "Telegram-bot yarating va muassasangiz menyusini yuklang.",
      },
      {
        n: "2",
        title: "Yetkazishni sozlang",
        desc: "Zonalar, narx va yetkazib berish vaqtini ko'rsating.",
      },
      {
        n: "3",
        title: "Buyurtma qabul qiling",
        desc: "Mijozlar buyurtma beradi, siz tayyorlaysiz va yetkazasiz.",
      },
    ],
    testimonial: {
      text: "Agregatorlardan voz kechdik va komissiyalarda 60% tejaydik. Bu bizning shaxsiy yetkazib berish kanalimiz.",
      author: "Timur B.",
      role: "Kafe egasi, Toshkent",
    },
    ctaTitle: "Telegram orqali ovqat yetkazishni boshlang",
    ctaDesc:
      "Agregator komissiyalarisiz o'z yetkazib berish kanalingizni yarating.",
    ctaBtn: "Yetkazishni boshlash",
  },

  electronics: {
    badge: "Elektronika do'konlari uchun",
    hero: "Telegram orqali texnika soting",
    desc: "Batafsil xususiyatlar, tovarlarni solishtirish va qulay qidiruv bilan katalog. Texnika va gadjetlar uchun ideal.",
    stats: [
      { value: "200+", label: "Texnika do'konlari" },
      { value: "45%", label: "O'rtacha chek o'sishi" },
      { value: "10K+", label: "Katalogdagi tovarlar" },
    ],
    features: [
      {
        badge: "Katalog",
        title: "Xususiyatlar bilan katalog",
        desc: "Har bir tovar uchun batafsil spetsifikatsiyalarni qo'shing. Mijozlar Telegramdan chiqmasdan solishtiradi va tanlaydi.",
        bullets: [
          "Texnik xususiyatlar",
          "Tovarlarni solishtirish",
          "Tezkor qidiruv",
        ],
      },
      {
        badge: "Bo'lib to'lash",
        title: "Bo'lib to'lash bilan sotish",
        desc: "Alifpay va boshqa bo'lib to'lash xizmatlari bilan integratsiya. O'rtacha chek va konversiyani oshiring.",
        bullets: [
          "Alifpay bo'lib to'lash",
          "Oylik to'lov hisoblash",
          "Avtomatik tasdiqlash",
        ],
      },
      {
        badge: "Ombor",
        title: "Qoldiqlarni boshqarish",
        desc: "Ombordagi qoldiqlarni real vaqtda kuzating. Mavjud bo'lmagan tovarlar avtomatik yashiriladi.",
        bullets: [
          "Real vaqt qoldiqlari",
          "Tovarlarni avtoyashirish",
          "Exceldan import",
        ],
      },
      {
        badge: "Marketing",
        title: "Texnika reklama qilish",
        desc: "Aksiyalar, savdolar va trade-in dasturi. Texnikani reklama qilish uchun barcha vositalar.",
        bullets: [
          "Flash-savdolar",
          "Kategoriya bo'yicha chegirmalar",
          "To'plam va komplektlar",
        ],
      },
      {
        badge: "Qo'llab-quvvatlash",
        title: "Kafolat va qo'llab-quvvatlash",
        desc: "Kafolat murojatlarini o'sha Telegram-bot orqali boshqaring. Mijozlar botga yozadi — siz masalalarni hal qilasiz.",
        bullets: [
          "Kafolat murojatlari",
          "Ta'mirlash statusi",
          "Tovarlar bo'yicha FAQ",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Do'kon yarating",
        desc: "Ro'yxatdan o'ting va elektronika katalogini sozlang.",
      },
      {
        n: "2",
        title: "Tovarlarni import qiling",
        desc: "Tovarlarni Exceldan yuklang yoki qo'lda qo'shing.",
      },
      {
        n: "3",
        title: "Sotishni boshlang",
        desc: "To'lov va bo'lib to'lashni ulang, savdoni boshlang.",
      },
    ],
    testimonial: {
      text: "Bot orqali bo'lib to'lash o'rtacha chekimizni 45% ga oshirdi. Mijozlar Telegramdan chiqmasdan xarid qilmoqda.",
      author: "Aziz R.",
      role: "Elektronika do'koni direktori, Namangan",
    },
    ctaTitle: "Telegramda elektronika do'konini oching",
    ctaDesc:
      "Xususiyatlar bilan katalog, bo'lib to'lash, yetkazib berish — texnika sotish uchun hammasi.",
    ctaBtn: "Texnika do'konini yaratish",
  },

  pharmacy: {
    badge: "Dorixonalar uchun",
    hero: "Telegram-botda dorixona",
    desc: "Qidiruv, analoglar va ko'rsatmalar bilan dorilar katalogi. Mijozlar onlayn dori buyurtma qiladi, siz yetkazasiz.",
    stats: [
      { value: "100+", label: "Onlayn dorixonalar" },
      { value: "70%", label: "Takroriy buyurtmalar" },
      { value: "5 daq", label: "Rasmiylashtirish vaqti" },
    ],
    features: [
      {
        badge: "Katalog",
        title: "Dorilar katalogi",
        desc: "Nom va kategoriyalar bo'yicha qidiruv bilan qulay katalog. Tarkib, dozalash va qarshi ko'rsatmalar haqida ma'lumot.",
        bullets: [
          "Nom bo'yicha qidiruv",
          "Preparat kategoriyalari",
          "Qo'llash bo'yicha ko'rsatmalar",
        ],
      },
      {
        badge: "Qidiruv",
        title: "Dorilarni aqlli qidiruv",
        desc: "Mijozlar kerakli dorilarni soniyalarda topadi. Analoglar va jeneriklar bo'yicha tavsiyalar.",
        bullets: [
          "Simptomlar bo'yicha qidiruv",
          "Preparat analoglari",
          "Mavjudlikni tekshirish",
        ],
      },
      {
        badge: "Yetkazib berish",
        title: "Dorilarni yetkazib berish",
        desc: "Saqlash shartlariga rioya qilgan holda dorilarni tez yetkazib berish. Buyurtmani real vaqtda kuzatish.",
        bullets: ["Tezkor yetkazib berish", "Saqlash shartlari", "Kuzatish"],
      },
      {
        badge: "Eslatmalar",
        title: "Qabul qilish eslatmalari",
        desc: "Doimiy mijozlarga surunkali preparatlarni takroriy xarid qilish haqida eslatmalar sozlang.",
        bullets: ["Takroriy xaridlar", "Eslatmalar", "Retseptlar tarixi"],
      },
      {
        badge: "Tahlil",
        title: "Dorixona tahlili",
        desc: "Talab yuqori bo'lgan preparatlarni kuzating, qoldiqlarni boshqaring va xaridlarni prognozlang.",
        bullets: [
          "Talab yuqori preparatlar",
          "Qoldiqlarni boshqarish",
          "Xarid prognozi",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Dorixona yarating",
        desc: "Ro'yxatdan o'ting va dorilar katalogini sozlang.",
      },
      {
        n: "2",
        title: "Assortimentni yuklang",
        desc: "Narxlar va tavsiflar bilan dorilarni import qiling.",
      },
      {
        n: "3",
        title: "Mijozlarga xizmat ko'rsating",
        desc: "Buyurtmalarni qabul qiling va dorilarni yetkazib bering.",
      },
    ],
    testimonial: {
      text: "Telegram orqali onlayn dorixona navbatlarni qisqartirdi va mijozlar qamrovini oshirdi. Takroriy buyurtmalar 70% ga o'sdi.",
      author: "Dilnoza M.",
      role: "Dorixona tarmog'i boshqaruvchisi, Buxoro",
    },
    ctaTitle: "Onlayn dorixonani ishga tushiring",
    ctaDesc: "Mijozlaringiz uchun Telegramda qulay dorixona yarating.",
    ctaBtn: "Onlayn dorixona yaratish",
  },

  kids: {
    badge: "Bolalar do'konlari uchun",
    hero: "Telegram orqali bolalar tovarlari",
    desc: "O'yinchoqlar, kiyimlar va bolalar uchun tovarlar katalogi. Yosh bo'yicha qulay tanlash, xavfsiz to'lov va tez yetkazib berish.",
    stats: [
      { value: "150+", label: "Bolalar do'konlari" },
      { value: "88%", label: "Mamnun ota-onalar" },
      { value: "2x", label: "Takroriy xaridlar o'sishi" },
    ],
    features: [
      {
        badge: "Katalog",
        title: "Yoshlar bo'yicha katalog",
        desc: "Tovarlarni yosh guruhlari bo'yicha tashkil qiling. Ota-onalar bolalari uchun mos tovarlarni oson topadi.",
        bullets: ["Yosh bo'yicha filtr", "Tovar kategoriyalari", "Tavsiyalar"],
      },
      {
        badge: "Xavfsizlik",
        title: "Xavfsiz xaridlar",
        desc: "Har bir tovar uchun sertifikatsiya, material tarkibi va yosh cheklovlari haqida ma'lumot.",
        bullets: ["Sifat sertifikatlari", "Material tarkibi", "Yosh belgilari"],
      },
      {
        badge: "Sovg'alar",
        title: "Sovg'a to'plamlari",
        desc: "Turli yoshlar va sabablar uchun tayyor to'plamlar yarating. Tug'ilgan kunga sovg'alar uchun ideal.",
        bullets: [
          "Tayyor to'plamlar",
          "Sovg'a o'rami",
          "Tilaknoma kartochkasi",
        ],
      },
      {
        badge: "Sadoqat",
        title: "Ota-onalar uchun dastur",
        desc: "Jamg'arma chegirmalari, xaridlar uchun bonuslar va doimiy mijozlar uchun maxsus takliflar.",
        bullets: [
          "Jamg'arma bonuslari",
          "Bolalar tug'ilgan kunlari",
          "Eksklyuziv takliflar",
        ],
      },
      {
        badge: "Yetkazib berish",
        title: "Tez va ehtiyotkor yetkazish",
        desc: "Bolalar tovarlarini alohida ehtiyotkorlik bilan yetkazib berish. Yosh ota-onalar uchun qulay vaqtni tanlash.",
        bullets: [
          "Vaqtni tanlash",
          "Ehtiyotkor qadoqlash",
          "Buyurtmani kuzatish",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Do'kon yarating",
        desc: "Ro'yxatdan o'ting va bolalar tovarlari do'konini sozlang.",
      },
      {
        n: "2",
        title: "Tovarlarni qo'shing",
        desc: "Rasmlar, tavsiflar va yosh belgilari bilan katalog yuklang.",
      },
      {
        n: "3",
        title: "Ota-onalarni xursand qiling",
        desc: "Buyurtmalarni qabul qiling va bolalarga quvonch yetkazing.",
      },
    ],
    testimonial: {
      text: "Ota-onalar bot orqali buyurtma berishni yaxshi ko'radi — bu tez va qulay. Sadoqat dasturi takroriy xaridlarni ikki baravar oshirdi.",
      author: "Gulnora X.",
      role: "Bolalar tovarlari do'koni egasi, Farg'ona",
    },
    ctaTitle: "Telegramda bolalar do'konini oching",
    ctaDesc: "Yosh ota-onalar uchun qulay do'kon yarating. Bepul boshlash.",
    ctaBtn: "Bolalar do'konini yaratish",
  },

  sport: {
    badge: "Sport tovarlari uchun",
    hero: "Telegram-bot orqali sport tovarlari",
    desc: "Sport ekipirovkasi, trenajyorlar va oziq-ovqat katalogi. Sport turlari va mashg'ulot maqsadlari bo'yicha qulay tanlash.",
    stats: [
      { value: "120+", label: "Sport do'konlari" },
      { value: "35%", label: "Tushum o'sishi" },
      { value: "5K+", label: "Onlayn sport tovarlari" },
    ],
    features: [
      {
        badge: "Katalog",
        title: "Sport turlari bo'yicha katalog",
        desc: "Tovarlarni sport turlari bo'yicha tashkil qiling: futbol, boks, fitnes, yugurish. Mijozlar kerakli ekipirovkani tez topadi.",
        bullets: [
          "Sport bo'yicha filtrlar",
          "O'lcham jadvallari",
          "Murabbiylar tavsiyalari",
        ],
      },
      {
        badge: "Oziq-ovqat",
        title: "Sport oziq-ovqati",
        desc: "Sport oziq-ovqati uchun alohida kategoriya — tarkib, kaloriya va tavsiyalar haqida ma'lumot.",
        bullets: [
          "Tarkib va kaloriyalar",
          "Muntazam xaridlarga obuna",
          "Ovqatlanish dasturlari",
        ],
      },
      {
        badge: "Bo'lib to'lash",
        title: "Trenajyorlarga bo'lib to'lash",
        desc: "Qimmat jihozlarni bo'lib to'lashda soting. Mijozlar qulayligi uchun Alifpay integratsiyasi.",
        bullets: [
          "12 oygacha bo'lib to'lash",
          "To'lov kalkulyatori",
          "Tez tasdiqlash",
        ],
      },
      {
        badge: "Jamiyat",
        title: "Sportchilar jamoasi",
        desc: "Do'kon atrofida jamiyat yarating. Sharhlar, tavsiyalar va mijozlar uchun motivatsiya.",
        bullets: ["Rasmli sharhlar", "Murabbiylar maslahatlari", "Chellenjlar"],
      },
      {
        badge: "Yetkazib berish",
        title: "Katta tovarlarni yetkazish",
        desc: "Trenajyorlar va katta tovarlar uchun yetkazib berishni sozlang. Turli yetkazib berish turlari uchun alohida tariflar.",
        bullets: [
          "Trenajyorlarni yetkazish",
          "Joyida yig'ish",
          "Kafolat xizmati",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Do'kon yarating",
        desc: "Ro'yxatdan o'ting va sport tovarlari katalogini sozlang.",
      },
      {
        n: "2",
        title: "Tovarlarni qo'shing",
        desc: "Ekipirovka, trenajyorlar va sport oziq-ovqatini yuklang.",
      },
      {
        n: "3",
        title: "Soting",
        desc: "Buyurtmalarni qabul qiling va sport jamoasini rivojlantiring.",
      },
    ],
    testimonial: {
      text: "Telegram-do'kon bizga bitta shahar chegarasidan chiqishga yordam berdi. Endi biz butun O'zbekiston bo'ylab sport tovarlari sotmoqdamiz.",
      author: "Otabek N.",
      role: "Sport do'koni asoschisi, Andijon",
    },
    ctaTitle: "Sport do'konini ishga tushiring",
    ctaDesc:
      "Telegramda sport tovarlari do'konini yarating. Katalog, bo'lib to'lash, yetkazib berish.",
    ctaBtn: "Sport do'konini yaratish",
  },

  accessories: {
    badge: "Aksessuarlar va sovg'alar uchun",
    hero: "Telegramda aksessuarlar va sovg'alar",
    desc: "Zargarlik buyumlari, sumkalar, soatlar va sovg'alar uchun chiroyli vitrina. Tovarlarni luxury-do'kondagi kabi taqdim eting.",
    stats: [
      { value: "180+", label: "Aksessuarlar do'konlari" },
      { value: "95%", label: "Sovg'alar o'z vaqtida yetkazilgan" },
      { value: "4.9", label: "O'rtacha baho" },
    ],
    features: [
      {
        badge: "Vitrina",
        title: "Premium vitrina",
        desc: "Aksessuarlarni eng yaxshi ko'rinishda ko'rsating. Sifatli rasmlar, batafsil tavsiflar va nafis taqdimot.",
        bullets: [
          "Yuqori sifatli rasmlar",
          "Tafsilotlarga zoom",
          "Materiallar tavsifi",
        ],
      },
      {
        badge: "Sovg'alar",
        title: "Sovg'a xizmati",
        desc: "Sovg'a o'rami, tabriknoma va ko'rsatilgan manzilga yetkazib berish. Surprizlar uchun ideal.",
        bullets: [
          "Sovg'a o'rami",
          "Shaxsiy tabriknoma",
          "Surpriz yetkazib berish",
        ],
      },
      {
        badge: "Kolleksiyalar",
        title: "Kolleksiyalar va yangiliklar",
        desc: "Tovarlarni kolleksiyalar, mavsumlar va sabablar bo'yicha guruhlang. Mijozlar ideal aksessuarni oson topadi.",
        bullets: ["Mavsumiy kolleksiyalar", "Yangiliklar", "Bestsellerlar"],
      },
      {
        badge: "Shaxsiylashtirish",
        title: "Tovarlarni shaxsiylashtirish",
        desc: "Gravyura, rang va o'lcham tanlashni taklif eting. Har bir aksessuarni noyob qiling.",
        bullets: ["Gravyura", "Material tanlash", "Individual o'lcham"],
      },
      {
        badge: "Marketing",
        title: "Bayram aksiyalari",
        desc: "Bayramlarga avtomatik aksiyalar: 8 mart, Yangi yil, tug'ilgan kun. Sovg'a mavsumida savdoni oshiring.",
        bullets: [
          "Aksiyalar taqvimi",
          "Bayramga chegirmalar",
          "Email-xabarlar",
        ],
      },
    ],
    steps: [
      {
        n: "1",
        title: "Vitrina yarating",
        desc: "Ro'yxatdan o'ting va premium do'konni sozlang.",
      },
      {
        n: "2",
        title: "Kolleksiyalar qo'shing",
        desc: "Rasmlar va tavsiflar bilan aksessuarlarni yuklang.",
      },
      {
        n: "3",
        title: "Chiroyli soting",
        desc: "Buyurtmalarni qabul qiling va mijozlarga quvonch ulashing.",
      },
    ],
    testimonial: {
      text: "Sovg'a xizmati bizning o'ziga xosligimizga aylandi. Sovg'alarning 95% i o'z vaqtida yetkaziladi va mijozlar qaytib keladi.",
      author: "Kamola S.",
      role: "Aksessuarlar do'koni egasi, Toshkent",
    },
    ctaTitle: "Aksessuarlar do'konini oching",
    ctaDesc:
      "Telegramda nafis do'kon yarating. Sovg'a xizmati, kolleksiyalar, shaxsiylashtirish.",
    ctaBtn: "Aksessuarlar do'konini yaratish",
  },
}
