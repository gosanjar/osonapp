const MONTHS: Record<number, Record<string, string>> = {
  1:  { uz: "Yanvar",   ru: "Январь"  },
  2:  { uz: "Fevral",   ru: "Февраль" },
  3:  { uz: "Mart",     ru: "Март"    },
  4:  { uz: "Aprel",    ru: "Апрель"  },
  5:  { uz: "May",      ru: "Май"     },
  6:  { uz: "Iyun",     ru: "Июнь"   },
  7:  { uz: "Iyul",     ru: "Июль"   },
  8:  { uz: "Avgust",   ru: "Август"  },
  9:  { uz: "Sentabr",  ru: "Сентябрь"},
  10: { uz: "Oktabr",   ru: "Октябрь" },
  11: { uz: "Noyabr",   ru: "Ноябрь"  },
  12: { uz: "Dekabr",   ru: "Декабрь" },
}

const SHORT_MONTHS: Record<number, Record<string, string>> = {
  1:  { uz: "Yan", ru: "Янв" },
  2:  { uz: "Fev", ru: "Фев" },
  3:  { uz: "Mar", ru: "Мар" },
  4:  { uz: "Apr", ru: "Апр" },
  5:  { uz: "May", ru: "Май" },
  6:  { uz: "Iyn", ru: "Июн" },
  7:  { uz: "Iyl", ru: "Июл" },
  8:  { uz: "Avg", ru: "Авг" },
  9:  { uz: "Sen", ru: "Сен" },
  10: { uz: "Okt", ru: "Окт" },
  11: { uz: "Noy", ru: "Ноя" },
  12: { uz: "Dek", ru: "Дек" },
}

function getLang(): string {
  return localStorage.getItem("lang") === "ru" ? "ru" : "uz"
}

Number.prototype.pack = function () {
  return (this as number) < 10 ? `0${this}` : this.toString()
}

Date.prototype.display = function (withTime = false) {
  const lang = getLang()
  const month = SHORT_MONTHS[this.getMonth() + 1][lang]
  const date = `${this.getDate()} ${month} ${this.getFullYear()}`
  const time = `${this.getHours().toString().padStart(2, "0")}:${this.getMinutes().toString().padStart(2, "0")}`
  return withTime ? `${date}, ${time}` : date
}

Date.prototype.MonthYear = function () {
  const lang = getLang()
  return `${MONTHS[this.getMonth() + 1][lang]}, ${this.getFullYear()}`
}

Date.prototype.DM = function () {
  const lang = getLang()
  return `${this.getDate()} ${MONTHS[this.getMonth() + 1][lang]?.toLowerCase()}`
}

Date.prototype.YM_HYPHEN = function () {
  return `${this.getFullYear()}-${this.getMonth() + 1}`
}

Date.prototype.YMD = function () {
  return `${this.getFullYear()}-${(this.getMonth() + 1).pack()}-${this.getDate().pack()}`
}

Date.prototype.DMY = function () {
  return `${this.getDate().pack()}/${(this.getMonth() + 1).pack()}/${this.getFullYear()}`
}

Date.prototype.DMY_DOT = function () {
  return `${this.getDate().pack()}.${(this.getMonth() + 1).pack()}.${this.getFullYear()}`
}

Date.prototype.YMDHIS = function () {
  return `${this.YMD()} ${this.HIS()}`
}

Date.prototype.DMY_DOT_HI = function () {
  return `${this.DMY_DOT()} ${this.HI()}`
}

Date.prototype.HIS = function () {
  return `${this.getHours().pack()}:${this.getMinutes().pack()}:${this.getSeconds().pack()}`
}

Date.prototype.HI = function () {
  return `${this.getHours().pack()}:${this.getMinutes().pack()}`
}
