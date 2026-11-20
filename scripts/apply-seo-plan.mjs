/**
 * Applies 01-plan-zamin-tegiv.md + 02-kontent-storinok.md into site data.
 * Run: node scripts/apply-seo-plan.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const MD = fs.readFileSync(path.join(ROOT, '02-kontent-storinok.md'), 'utf8')
const DISCLAIMER = {
  ru: 'Данные актуальны на ноябрь 2026. Материал носит информационный характер и не является юридической, налоговой или финансовой консультацией. Решение о верификации, лимитах и проверках всегда принимает Stripe. WayOfProcessing не аффилирован со Stripe, Inc. Юрлицо: MSM FINANCIAL CONSULTANCY LIMITED, Companies House № 04820256.',
  en: 'Data as of November 2026. This material is informational and is not legal, tax or financial advice. Stripe alone decides on verification, limits and reviews. WayOfProcessing is not affiliated with Stripe, Inc. Legal entity: MSM FINANCIAL CONSULTANCY LIMITED, Companies House no. 04820256.',
  uk: 'Дані актуальні на листопад 2026. Матеріал має інформаційний характер і не є юридичною, податковою чи фінансовою консультацією. Рішення про верифікацію, ліміти і перевірки завжди приймає Stripe. WayOfProcessing не афілійований зі Stripe, Inc. Юрособа: MSM FINANCIAL CONSULTANCY LIMITED, Companies House № 04820256.',
}

const PAGE_MAP = [
  { marker: 'СТОРІНКА 1', slug: null, hub: 'jurisdictions' },
  { marker: 'СТОРІНКА 2', slug: 'poland' },
  { marker: 'СТОРІНКА 3', slug: 'estonia' },
  { marker: 'СТОРІНКА 4', slug: 'united-kingdom' },
  { marker: 'СТОРІНКА 5', slug: 'saas' },
  { marker: 'СТОРІНКА 6', slug: 'online-courses' },
  { marker: 'СТОРІНКА 7', slug: 'marketplace' },
  { marker: 'СТОРІНКА 8', slug: 'gaming' },
  { marker: 'СТОРІНКА 9', slug: 'high-risk' },
]

const META = {
  hubs: {
    jurisdictions: {
      ru: {
        title: 'Stripe по странам: сравнение юрисдикций | WayOfProcessing',
        description:
          'Сравнение Польши, Эстонии, Чехии, Кипра, Великобритании и Гонконга: налог, срок регистрации, расходы, особенности банка. Данные на ноябрь 2026.',
        h1: 'Stripe по странам: сравнение юрисдикций для компании',
      },
      en: {
        title: 'Stripe by Country: Compare Jurisdictions | WayOfProcessing',
        description:
          'Poland, Estonia, Czechia, Cyprus, the UK and Hong Kong compared: tax, registration time, costs and banking. Data as of November 2026.',
        h1: 'Stripe by country: jurisdictions compared',
      },
      uk: {
        title: 'Stripe за країнами: порівняння юрисдикцій | WayOfProcessing',
        description:
          'Порівняння Польщі, Естонії, Чехії, Кіпру, Великої Британії та Гонконгу: податок, строк реєстрації, витрати, банк. Дані на листопад 2026.',
        h1: 'Stripe за країнами: порівняння юрисдикцій для компанії',
      },
    },
  },
  landings: {
    poland: {
      ru: {
        title: 'Stripe в Польше: компания sp. z o.o. | WayOfProcessing',
        description:
          'Как открыть sp. z o.o. для приёма платежей через Stripe: капитал 5 000 PLN, регистрация через S24, налог 19% или 9%. Данные 2026 года.',
        h1: 'Stripe в Польше: регистрация компании и подключение платежей',
      },
      en: {
        title: 'Stripe in Poland: sp. z o.o. Company | WayOfProcessing',
        description:
          'How to set up a sp. z o.o. to accept payments with Stripe: PLN 5,000 capital, S24 registration, 19% or 9% tax. 2026 data.',
        h1: 'Stripe in Poland: company registration and payment setup',
      },
      uk: {
        title: 'Stripe у Польщі: компанія sp. z o.o. | WayOfProcessing',
        description:
          'Як відкрити sp. z o.o. для прийому платежів через Stripe: капітал 5 000 PLN, реєстрація через S24, податок 19% або 9%. Дані 2026 року.',
        h1: 'Stripe у Польщі: реєстрація компанії та підключення платежів',
      },
    },
    estonia: {
      ru: {
        title: 'Stripe в Эстонии: компания OÜ | WayOfProcessing',
        description:
          'OÜ через e-Residency для приёма платежей Stripe: сроки, госпошлина 265 €, налог только при распределении прибыли. Данные 2026 года.',
        h1: 'Stripe в Эстонии: компания OÜ и e-Residency для приёма платежей',
      },
      en: {
        title: 'Stripe in Estonia: OÜ Company | WayOfProcessing',
        description:
          'An OÜ via e-Residency to accept Stripe payments: timing, €265 state fee, tax only on distributed profit. 2026 data.',
        h1: 'Stripe in Estonia: OÜ company and e-Residency for payments',
      },
      uk: {
        title: 'Stripe в Естонії: компанія OÜ | WayOfProcessing',
        description:
          'OÜ через e-Residency для прийому платежів Stripe: строки, держмито 265 €, податок лише при розподілі прибутку. Дані 2026 року.',
        h1: 'Stripe в Естонії: компанія OÜ та e-Residency для прийому платежів',
      },
    },
    'united-kingdom': {
      ru: {
        title: 'Stripe в Великобритании: компания Ltd | WayOfProcessing',
        description:
          'Ltd для приёма платежей через Stripe: регистрация до 24 часов, сбор 100 £, налог 19% и 25%. Данные 2026 года.',
        h1: 'Stripe в Великобритании: регистрация Ltd и подключение платежей',
      },
      en: {
        title: 'Stripe in the UK: Ltd Company | WayOfProcessing',
        description:
          'A Ltd for Stripe payments: registration within 24 hours, £100 fee, 19% and 25% tax. 2026 data.',
        h1: 'Stripe in the UK: Ltd registration and payment setup',
      },
      uk: {
        title: 'Stripe у Великій Британії: компанія Ltd | WayOfProcessing',
        description:
          'Ltd для прийому платежів через Stripe: реєстрація до 24 годин, збір 100 £, податок 19% і 25%. Дані 2026 року.',
        h1: 'Stripe у Великій Британії: реєстрація Ltd і підключення платежів',
      },
    },
    saas: {
      ru: {
        title: 'Stripe для SaaS и подписок | WayOfProcessing',
        description:
          'Рекуррентные платежи Stripe для SaaS: пробные периоды, 3D Secure, счета и НДС, споры по списаниям.',
        h1: 'Stripe для SaaS и подписок: как настроить рекуррентные платежи',
      },
      en: {
        title: 'Stripe for SaaS and Subscriptions | WayOfProcessing',
        description:
          'Recurring Stripe payments for SaaS: free trials, 3D Secure, invoices and VAT, disputes over charges.',
        h1: 'Stripe for SaaS and subscriptions: setting up recurring payments',
      },
      uk: {
        title: 'Stripe для SaaS і підписок | WayOfProcessing',
        description:
          'Рекурентні платежі Stripe для SaaS: пробні періоди, 3D Secure, рахунки і ПДВ, спори за списаннями.',
        h1: 'Stripe для SaaS і підписок: як налаштувати рекурентні платежі',
      },
    },
    'online-courses': {
      ru: {
        title: 'Stripe для курсов и цифровых товаров | WayOfProcessing',
        description:
          'Оплата курсов, шаблонов и цифровых продуктов через Stripe: условия возврата, рассрочка, НДС и защита от споров.',
        h1: 'Stripe для онлайн-курсов и цифровых товаров',
      },
      en: {
        title: 'Stripe for Courses and Digital Products | WayOfProcessing',
        description:
          'Taking payments for courses, templates and digital products with Stripe: refund terms, instalments, VAT and dispute prevention.',
        h1: 'Stripe for online courses and digital products',
      },
      uk: {
        title: 'Stripe для курсів і цифрових товарів | WayOfProcessing',
        description:
          'Оплата курсів, шаблонів і цифрових продуктів через Stripe: умови повернення, розстрочка, ПДВ і захист від спорів.',
        h1: 'Stripe для онлайн-курсів і цифрових товарів',
      },
    },
    marketplace: {
      ru: {
        title: 'Stripe для маркетплейса и Connect | WayOfProcessing',
        description:
          'Платежи на маркетплейсе через Stripe: чем Connect отличается от обычного аккаунта, проверка продавцов, риски платформы.',
        h1: 'Stripe для маркетплейса: Connect или обычный аккаунт',
      },
      en: {
        title: 'Stripe for Marketplaces and Connect | WayOfProcessing',
        description:
          'Marketplace payments with Stripe: how Connect differs from a standard account, seller verification and platform risks.',
        h1: 'Stripe for marketplaces: Connect or a standard account',
      },
      uk: {
        title: 'Stripe для маркетплейсу і Connect | WayOfProcessing',
        description:
          'Платежі на маркетплейсі через Stripe: чим Connect відрізняється від звичайного акаунта, перевірка продавців, ризики платформи.',
        h1: 'Stripe для маркетплейсу: Connect чи звичайний акаунт',
      },
    },
    gaming: {
      ru: {
        title: 'Stripe для gaming: что проверяют | WayOfProcessing',
        description:
          'Что Stripe проверяет у игровых проектов: внутриигровые покупки, подписки, доля споров и граница с азартными играми.',
        h1: 'Stripe для gaming: что проверяют и какие есть ограничения',
      },
      en: {
        title: 'Stripe for Gaming: What Gets Reviewed | WayOfProcessing',
        description:
          'What Stripe reviews for game projects: in-game purchases, subscriptions, dispute rates and the line with gambling.',
        h1: 'Stripe for gaming: what is reviewed and what is restricted',
      },
      uk: {
        title: 'Stripe для gaming: що перевіряють | WayOfProcessing',
        description:
          'Що Stripe перевіряє в ігрових проєктах: внутрішньоігрові покупки, підписки, частка спорів і межа з азартними іграми.',
        h1: 'Stripe для gaming: що перевіряють і які є обмеження',
      },
    },
    'high-risk': {
      ru: {
        title: 'Ниши, которые Stripe ограничивает | WayOfProcessing',
        description:
          'Какие бизнесы Stripe запрещает или проверяет дополнительно: финансовые услуги, табак и вейпы, БАДы, крипто. Как оценить нишу заранее.',
        h1: 'High-risk и Stripe: какие ниши ограничены и как это проверить',
      },
      en: {
        title: 'Businesses Stripe Restricts | WayOfProcessing',
        description:
          'Which businesses Stripe prohibits or reviews further: financial services, tobacco and vapes, supplements, crypto. How to assess your niche first.',
        h1: 'High-risk and Stripe: which niches are restricted and how to check',
      },
      uk: {
        title: 'Ніші, які Stripe обмежує | WayOfProcessing',
        description:
          'Які бізнеси Stripe забороняє або перевіряє додатково: фінансові послуги, тютюн і вейпи, БАДи, крипто. Як оцінити нішу заздалегідь.',
        h1: 'High-risk і Stripe: які ніші обмежені і як це перевірити',
      },
    },
    'stripe-ukraine': {
      ru: {
        title: 'Stripe для Украины: как принимать оплату | WayOfProcessing',
        description:
          'Прямое подключение Stripe в Украине недоступно. Какие варианты есть: иностранная компания, банк, первые шаги.',
      },
      en: {
        title: 'Stripe for Ukraine: How to Accept Payments | WayOfProcessing',
        description:
          'Direct Stripe setup in Ukraine is not available. Your options: a foreign company, a bank, first steps.',
      },
      uk: {
        title: 'Stripe для України: як приймати оплату | WayOfProcessing',
        description:
          'Пряме підключення Stripe в Україні недоступне. Які варіанти є: іноземна компанія, банк, перші кроки.',
      },
    },
    'stripe-account-issues': {
      ru: {
        title: 'Блокировка аккаунта Stripe: что делать | WayOfProcessing',
        description:
          'Блокировка, hold, review и KYC в Stripe: что сделать в первые 48 часов и какие документы собрать. Снятие ограничений не гарантируем.',
      },
      en: {
        title: 'Stripe Account Blocked: What to Do | WayOfProcessing',
        description:
          'Blocks, holds, reviews and KYC at Stripe: what to do in the first 48 hours and which documents to collect. Restrictions are not guaranteed to lift.',
      },
      uk: {
        title: 'Блокування акаунта Stripe: що робити | WayOfProcessing',
        description:
          'Блокування, hold, review і KYC у Stripe: що зробити в перші 48 годин і які документи зібрати. Зняття обмежень не гарантуємо.',
      },
    },
  },
}

const SERVICE_META = {
  'stripe-account-buy': {
    ru: {
      title: 'Готовый merchant-аккаунт Stripe | WayOfProcessing',
      description:
        'Передача merchant-аккаунта Stripe под вашу нишу: документы, настройка MCC, выплаты и сопровождение. Проверки и лимиты остаются за Stripe, гарантий нет.',
      h1: 'Merchant-аккаунт Stripe под вашу нишу',
      lead: 'Передача merchant-аккаунта имеет смысл, когда оборот уже понятен и нужен свой контроль над платёжной системой. Проверки и лимиты остаются на стороне Stripe.',
      card: {
        title: 'Merchant-аккаунт Stripe',
        desc: 'Merchant-аккаунт под вашу нишу: документы, MCC, выплаты и сопровождение. Без гарантий одобрения платформы.',
      },
      offer: {
        badge: 'Merchant-аккаунт под нишу',
        highlight: 'от 3 дней',
        sub: 'Документы, MCC и сопровождение под вашу нишу',
      },
    },
    en: {
      title: 'Ready-Made Stripe Merchant Account | WayOfProcessing',
      description:
        'Transfer of a Stripe merchant account for your niche: documents, MCC setup, payouts and support. Reviews and limits stay with Stripe, no guarantees.',
      h1: 'Stripe merchant account for your niche',
      lead: 'A merchant account transfer makes sense when volume is clear and you need your own control. Reviews and limits stay with Stripe.',
      card: {
        title: 'Stripe merchant account',
        desc: 'A merchant account for your niche: documents, MCC, payouts and support. No platform approval guarantees.',
      },
      offer: {
        badge: 'Merchant account for your niche',
        highlight: 'from 3 days',
        sub: 'Documents, MCC and support for your niche',
      },
    },
    uk: {
      title: 'Готовий merchant-акаунт Stripe | WayOfProcessing',
      description:
        'Передача merchant-акаунта Stripe під вашу нішу: документи, налаштування MCC, виплати і супровід. Перевірки та ліміти залишаються за Stripe, гарантій немає.',
      h1: 'Merchant-акаунт Stripe під вашу нішу',
      lead: 'Передача merchant-акаунта має сенс, коли оборот уже зрозумілий і потрібен власний контроль. Перевірки та ліміти залишаються на боці Stripe.',
      card: {
        title: 'Merchant-акаунт Stripe',
        desc: 'Merchant-акаунт під вашу нішу: документи, MCC, виплати і супровід. Без гарантій схвалення платформи.',
      },
      offer: {
        badge: 'Merchant-акаунт під нішу',
        highlight: 'від 3 днів',
        sub: 'Документи, MCC і супровід під вашу нішу',
      },
    },
  },
  'stripe-account-rent': {
    ru: {
      title: 'Merchant-аккаунт Stripe для быстрого старта | WayOfProcessing',
      description:
        'Merchant-аккаунт Stripe для теста воронки и быстрого запуска: CRM, routing, схема выплат. Решение о проверках принимает Stripe.',
      h1: 'Stripe для пилота и быстрого старта',
      lead: 'Быстрый старт приёма платежей для теста воронки: CRM, routing и схема выплат. Решение о проверках принимает Stripe.',
      card: {
        title: 'Stripe для быстрого старта',
        desc: 'Merchant-аккаунт для пилота: CRM, routing и выплаты. Без обещаний обойти правила Stripe.',
      },
      offer: {
        badge: 'Процессинг от 1.5%',
        highlight: 'от 1.5%',
        sub: 'Пилот с CRM и routing — от 3 дней',
      },
    },
    en: {
      title: 'Stripe Merchant Account for a Quick Start | WayOfProcessing',
      description:
        'A Stripe merchant account for testing a funnel and a fast launch: CRM, routing, payout setup. Stripe decides on reviews.',
      h1: 'Stripe for a pilot and a quick start',
      lead: 'A fast start for testing a funnel: CRM, routing and payout setup. Stripe decides on reviews.',
      card: {
        title: 'Stripe for a quick start',
        desc: 'A merchant account for a pilot: CRM, routing and payouts. No promise to bypass Stripe rules.',
      },
      offer: {
        badge: 'Processing from 1.5%',
        highlight: 'from 1.5%',
        sub: 'Pilot with CRM and routing — from 3 days',
      },
    },
    uk: {
      title: 'Merchant-акаунт Stripe для швидкого старту | WayOfProcessing',
      description:
        'Merchant-акаунт Stripe для тесту воронки і швидкого запуску: CRM, routing, схема виплат. Рішення про перевірки приймає Stripe.',
      h1: 'Stripe для пілоту і швидкого старту',
      lead: 'Швидкий старт прийому платежів для тесту воронки: CRM, routing і схема виплат. Рішення про перевірки приймає Stripe.',
      card: {
        title: 'Stripe для швидкого старту',
        desc: 'Merchant-акаунт для пілоту: CRM, routing і виплати. Без обіцянок обійти правила Stripe.',
      },
      offer: {
        badge: 'Процесинг від 1.5%',
        highlight: 'від 1.5%',
        sub: 'Пілот з CRM і routing — від 3 днів',
      },
    },
  },
  'processing-turnkey': {
    ru: {
      title: 'Процессинг Stripe под ключ | WayOfProcessing',
      description:
        'Процессинг Stripe под ключ: checkout, API, routing, CRM. Комиссия от 1.5%, точную ставку называем после оценки ниши.',
      h1: 'Процессинг Stripe под ключ',
    },
    en: {
      title: 'Turnkey Stripe Processing | WayOfProcessing',
      description:
        'Turnkey Stripe processing: checkout, API, routing, CRM. Fees from 1.5%, exact rate after a niche review.',
      h1: 'Turnkey Stripe processing',
    },
    uk: {
      title: 'Процесинг Stripe під ключ | WayOfProcessing',
      description:
        'Процесинг Stripe під ключ: checkout, API, routing, CRM. Комісія від 1.5%, точну ставку називаємо після оцінки ніші.',
      h1: 'Процесинг Stripe під ключ',
    },
  },
  'legal-entity-bank': {
    ru: {
      title: 'Юрлицо и банк для Stripe | WayOfProcessing',
      description:
        'Регистрация компании, счёт в банке и заявка в Stripe: Польша, Эстония, Чехия, Кипр, Великобритания, Гонконг. Одобрение решает Stripe.',
      h1: 'Юрлицо, банк и заявка в Stripe',
    },
    en: {
      title: 'Company and Bank for Stripe | WayOfProcessing',
      description:
        'Company registration, bank account and Stripe application: Poland, Estonia, Czechia, Cyprus, UK, Hong Kong. Stripe decides on approval.',
      h1: 'Company, bank and Stripe application',
    },
    uk: {
      title: 'Юрособа і банк для Stripe | WayOfProcessing',
      description:
        'Реєстрація компанії, рахунок у банку і заявка в Stripe: Польща, Естонія, Чехія, Кіпр, Велика Британія, Гонконг. Схвалення вирішує Stripe.',
      h1: 'Юрособа, банк і заявка в Stripe',
    },
  },
}

function stripMdLinks(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

function parseTable(lines) {
  const rows = lines
    .filter((l) => l.trim().startsWith('|'))
    .map((l) =>
      l
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => stripMdLinks(c.trim())),
    )
    .filter((cells) => !cells.every((c) => /^[-: ]+$/.test(c)))
  if (rows.length < 2) return []
  const headers = rows[0]
  return rows.slice(1).map((cells) =>
    headers.map((h, i) => `${h}: ${cells[i] ?? ''}`).join(' · '),
  )
}

function parseLocaleBlock(block) {
  const lines = block.split('\n')
  let h1 = ''
  let i = 0
  while (i < lines.length && !lines[i].startsWith('### ')) i++
  if (i < lines.length) {
    h1 = lines[i].replace(/^###\s+/, '').trim()
    i++
  }
  while (i < lines.length && !lines[i].trim()) i++

  const leadParts = []
  while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#')) {
    leadParts.push(stripMdLinks(lines[i].trim()))
    i++
  }
  const lead = leadParts.join(' ')
  const intro = lead ? [lead] : []

  const sections = []
  const faq = []
  const facts = []
  let current = null
  let inFaq = false
  let faqQ = null
  let faqA = []
  let tableBuf = []

  const flushTable = () => {
    if (!tableBuf.length) return
    const rows = parseTable(tableBuf)
    tableBuf = []
    if (!rows.length) return
    if (current && /коротко|glance|at a glance|сравнен|compared|когда что|when to use|что нужно настроить|what to configure|что проверяют|what is usually|основные категори|main categor/i.test(current.title)) {
      if (/коротко|glance|at a glance/i.test(current.title)) {
        for (const row of rows) {
          const [label, ...rest] = row.split(' · ')
          const value = rest.join(' · ').replace(/^[^:]+:\s*/, '')
          const lab = label.includes(':') ? label.split(':').slice(1).join(':').trim() : label
          // Better: row is "Параметр: Форма · Значение: sp. z o.o."
          const parts = Object.fromEntries(
            row.split(' · ').map((p) => {
              const idx = p.indexOf(':')
              return idx === -1 ? [p, ''] : [p.slice(0, idx).trim(), p.slice(idx + 1).trim()]
            }),
          )
          const keys = Object.keys(parts)
          if (keys.length >= 2) {
            facts.push({ label: parts[keys[0]] || keys[0], value: parts[keys[1]] || '' })
          }
        }
      }
      current.paragraphs.push(...rows.map((r) => `- ${r}`))
    } else if (current) {
      current.paragraphs.push(...rows.map((r) => `- ${r}`))
    }
  }

  const flushFaq = () => {
    if (faqQ && faqA.length) {
      faq.push({ question: faqQ, answer: stripMdLinks(faqA.join(' ')) })
    }
    faqQ = null
    faqA = []
  }

  const flushSection = () => {
    flushTable()
    if (current && current.paragraphs.length) sections.push(current)
    current = null
  }

  for (; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith('#### ')) {
      flushFaq()
      flushSection()
      const title = trimmed.replace(/^####\s+/, '').trim()
      if (/частые вопросы|faq/i.test(title)) {
        inFaq = true
        continue
      }
      inFaq = false
      if (/источник|sources|внутренн|internal links/i.test(title)) {
        current = null
        continue
      }
      current = { title, paragraphs: [] }
      continue
    }

    if (trimmed.startsWith('**Источники:**') || trimmed.startsWith('**Sources:**')) {
      flushFaq()
      flushSection()
      inFaq = false
      const links = trimmed
        .replace(/^\*\*(Источники|Sources):\*\*\s*/, '')
        .split('·')
        .map((s) => stripMdLinks(s.trim()))
        .filter(Boolean)
      if (links.length) {
        sections.push({
          title: trimmed.startsWith('**Sources') ? 'Sources' : 'Источники',
          paragraphs: links.map((l) => `- ${l}`),
        })
      }
      continue
    }

    if (trimmed.startsWith('**Внутренние ссылки:**') || trimmed.startsWith('**Internal links:**')) {
      continue
    }

    if (inFaq) {
      if (/^\*\*.+\?\*\*$/.test(trimmed) || /^\*\*.+\?\*\*\s*$/.test(trimmed)) {
        flushFaq()
        faqQ = trimmed.replace(/^\*\*|\*\*$/g, '').trim()
        continue
      }
      if (faqQ && trimmed) faqA.push(trimmed)
      continue
    }

    if (!current) continue

    if (trimmed.startsWith('|')) {
      tableBuf.push(trimmed)
      continue
    }
    if (tableBuf.length) flushTable()

    if (!trimmed) continue
    if (/^---+$/.test(trimmed)) continue

    if (/^\d+\.\s+/.test(trimmed) || trimmed.startsWith('- ')) {
      current.paragraphs.push(stripMdLinks(trimmed))
    } else {
      current.paragraphs.push(stripMdLinks(trimmed))
    }
  }
  flushFaq()
  flushSection()

  sections.push({
    title: lead.includes('Data as of') || lead.includes('Data as') ? 'Disclaimer' : 'Актуальность и дисклеймер',
    paragraphs: [],
  })
  // placeholder — filled later per locale

  return { h1, lead, intro, sections: sections.filter((s) => s.paragraphs.length || s.title), faq, facts }
}

function splitPages(md) {
  const parts = md.split(/\n(?=# СТОРІНКА )/)
  const map = {}
  for (const part of parts) {
    const m = part.match(/^# СТОРІНКА (\d+)/)
    if (!m) continue
    map[m[1]] = part
  }
  return map
}

function extractLang(pageMd, lang) {
  const re = lang === 'ru' ? /\n## RU\n([\s\S]*?)(?=\n## EN\n|$)/ : /\n## EN\n([\s\S]*?)(?=\n---\n|# СТОРІНКА |$)/
  const m = pageMd.match(re)
  return m ? m[1] : ''
}

function toView(parsed, meta, locale, ctas) {
  const sections = parsed.sections
    .filter((s) => !/актуальность|disclaimer/i.test(s.title) || s.paragraphs.length)
    .map((s) => ({ ...s }))
  sections.push({
    title: locale === 'en' ? 'Currency of data and disclaimer' : locale === 'uk' ? 'Актуальність і дисклеймер' : 'Актуальность и дисклеймер',
    paragraphs: [DISCLAIMER[locale] || DISCLAIMER.ru],
  })

  return {
    meta: {
      title: meta.title || parsed.h1,
      description: meta.description || parsed.lead.slice(0, 155),
      keywords: [],
    },
    h1: meta.h1 || parsed.h1,
    lead: parsed.lead,
    intro: parsed.intro.length ? parsed.intro : [parsed.lead],
    sections,
    faq: parsed.faq,
    ctas,
    ...(parsed.facts.length ? { facts: parsed.facts } : {}),
  }
}

function defaultCtas(locale, group) {
  if (group === 'jurisdictions') {
    return locale === 'en'
      ? [
          { label: 'Company and bank for Stripe', path: '/services/legal-entity-bank' },
          { label: 'All jurisdictions', path: '/jurisdictions' },
        ]
      : locale === 'uk'
        ? [
            { label: 'Юрособа і банк для Stripe', path: '/services/legal-entity-bank' },
            { label: 'Усі юрисдикції', path: '/jurisdictions' },
          ]
        : [
            { label: 'Юрлицо и банк для Stripe', path: '/services/legal-entity-bank' },
            { label: 'Все юрисдикции', path: '/jurisdictions' },
          ]
  }
  return locale === 'en'
    ? [
        { label: 'Turnkey Stripe processing', path: '/services/processing-turnkey' },
        { label: 'All niches', path: '/niches' },
      ]
    : locale === 'uk'
      ? [
          { label: 'Процесинг Stripe під ключ', path: '/services/processing-turnkey' },
          { label: 'Усі ніші', path: '/niches' },
        ]
      : [
          { label: 'Процессинг Stripe под ключ', path: '/services/processing-turnkey' },
          { label: 'Все ниши', path: '/niches' },
        ]
}

// --- Apply landings content ---
const pages = splitPages(MD)
const landingsPath = path.join(ROOT, 'src/data/landings.json')
const landingsData = JSON.parse(fs.readFileSync(landingsPath, 'utf8'))

for (const item of PAGE_MAP) {
  const n = item.marker.replace('СТОРІНКА ', '')
  const pageMd = pages[n]
  if (!pageMd) {
    console.warn('missing page', n)
    continue
  }

  const ruParsed = parseLocaleBlock(extractLang(pageMd, 'ru'))
  const enParsed = parseLocaleBlock(extractLang(pageMd, 'en'))
  // UK: reuse RU structure with meta uk; keep RU body as fallback then light-copy lead/h1 from meta
  const ukParsed = JSON.parse(JSON.stringify(ruParsed))

  if (item.hub === 'jurisdictions') {
    for (const loc of ['ru', 'en', 'uk']) {
      const parsed = loc === 'en' ? enParsed : loc === 'uk' ? ukParsed : ruParsed
      const meta = META.hubs.jurisdictions[loc]
      const prev = landingsData.hubs.jurisdictions[loc]
      landingsData.hubs.jurisdictions[loc] = {
        ...toView(parsed, meta, loc, prev?.ctas || defaultCtas(loc, 'jurisdictions')),
      }
    }
    console.log('updated hub jurisdictions')
    continue
  }

  const landing = landingsData.landings.find((l) => l.slug === item.slug)
  if (!landing) {
    console.warn('landing not found', item.slug)
    continue
  }
  const metaSet = META.landings[item.slug]
  for (const loc of ['ru', 'en', 'uk']) {
    const parsed = loc === 'en' ? enParsed : loc === 'uk' ? ukParsed : ruParsed
    const meta = metaSet[loc]
    landingsData.landings[landingsData.landings.indexOf(landing)][loc] = toView(
      parsed,
      meta,
      loc,
      landing[loc]?.ctas || defaultCtas(loc, landing.group),
    )
  }
  // patch uk h1/meta from META while body stays RU-based (ukParsed)
  landing.uk.meta = { ...landing.uk.meta, ...{ title: metaSet.uk.title, description: metaSet.uk.description, keywords: [] } }
  landing.uk.h1 = metaSet.uk.h1
  console.log('updated', item.slug)
}

// Meta-only for solutions
for (const slug of ['stripe-ukraine', 'stripe-account-issues']) {
  const landing = landingsData.landings.find((l) => l.slug === slug)
  if (!landing) continue
  for (const loc of ['ru', 'en', 'uk']) {
    const m = META.landings[slug][loc]
    landing[loc].meta.title = m.title
    landing[loc].meta.description = m.description
    landing[loc].meta.keywords = []
  }
  console.log('meta', slug)
}

// Clear keywords on all landings + hubs
function clearKeywords(view) {
  if (view?.meta) view.meta.keywords = []
}
for (const hub of Object.values(landingsData.hubs)) {
  for (const loc of Object.values(hub)) clearKeywords(loc)
}
for (const landing of landingsData.landings) {
  for (const loc of ['ru', 'uk', 'en']) clearKeywords(landing[loc])
}

fs.writeFileSync(landingsPath, JSON.stringify(landingsData, null, 2) + '\n')
console.log('landings.json written')

// --- Services meta ---
const servicesPath = path.join(ROOT, 'src/data/services.json')
const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf8'))

function softenTriggerCopy(text) {
  if (typeof text !== 'string') return text
  return text
    .replace(/прогретый аккаунт/gi, 'аккаунт под нишу')
    .replace(/прогретые аккаунты/gi, 'аккаунты под нишу')
    .replace(/Прогретый аккаунт/g, 'Аккаунт под нишу')
    .replace(/аккаунт с историей и оборотом/gi, 'merchant-аккаунт с пакетом документов')
    .replace(/аккаунты с историей транзакций/gi, 'аккаунты, настроенные под нишу')
    .replace(/с историей транзакций/gi, 'под нишу, сайт и MCC')
    .replace(/верифицированный merchant/gi, 'merchant-аккаунт под нишу')
    .replace(/Верифицированный merchant/g, 'Merchant-аккаунт под нишу')
    .replace(/купите аккаунт Stripe/gi, 'оформите merchant-аккаунт Stripe')
    .replace(/купить аккаунт Stripe/gi, 'оформить merchant-аккаунт Stripe')
    .replace(/Купить аккаунт Stripe/g, 'Merchant-аккаунт Stripe')
    .replace(/Buy a Stripe account/gi, 'Get a Stripe merchant account')
    .replace(/buy a Stripe account/gi, 'get a Stripe merchant account')
    .replace(/Warmed-up|warmed-up|aged account/gi, 'account configured for your niche')
    .replace(/Account with history and turnover/gi, 'Merchant account with a document package')
    .replace(/Verified merchant/gi, 'Merchant account for your niche')
}

function walkSoft(obj) {
  if (Array.isArray(obj)) return obj.map(walkSoft)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) out[k] = walkSoft(v)
    return out
  }
  return softenTriggerCopy(obj)
}

for (const svc of servicesData.services) {
  const patch = SERVICE_META[svc.slug]
  for (const loc of ['ru', 'uk', 'en']) {
    if (!svc[loc]) continue
    svc[loc].meta.keywords = []
    if (patch?.[loc]) {
      Object.assign(svc[loc].meta, {
        title: patch[loc].title,
        description: patch[loc].description,
        keywords: [],
      })
      if (patch[loc].h1) svc[loc].h1 = patch[loc].h1
      if (patch[loc].lead) svc[loc].lead = patch[loc].lead
      if (patch[loc].card) svc[loc].card = { ...svc[loc].card, ...patch[loc].card }
      if (patch[loc].offer) svc[loc].offer = { ...svc[loc].offer, ...patch[loc].offer }
    }
    // Soften trigger phrases in body
    svc[loc].intro = (svc[loc].intro || []).map(softenTriggerCopy)
    svc[loc].sections = (svc[loc].sections || []).map((s) => ({
      title: softenTriggerCopy(s.title),
      paragraphs: s.paragraphs.map(softenTriggerCopy),
    }))
    svc[loc].benefits = (svc[loc].benefits || []).map((b) => ({
      title: softenTriggerCopy(b.title),
      description: softenTriggerCopy(b.description),
    }))
    svc[loc].faq = (svc[loc].faq || []).map((f) => ({
      question: softenTriggerCopy(f.question),
      answer: softenTriggerCopy(f.answer),
    }))
  }
  console.log('service', svc.slug)
}

fs.writeFileSync(servicesPath, JSON.stringify(servicesData, null, 2) + '\n')
console.log('services.json written')
console.log('done')
