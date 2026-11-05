import type { Locale } from './i18n/config'
import type { ContentTableModel } from '@/app/components/ContentTable'

function pick<T>(locale: Locale, map: Record<Locale, T>): T {
  return map[locale] ?? map.ru
}

export function getJurisdictionsCompareTable(locale: Locale): ContentTableModel {
  return pick(locale, {
    ru: {
      id: 'jurisdictions-compare',
      heading: 'Сравнение стран для Stripe',
      lead: 'Ориентиры, а не гарантии. Срок и банк зависят от ниши, полноты документов и ответа регулятора.',
      columns: ['Параметр', 'Польша', 'Эстония', 'Чехия', 'Кипр', 'UK', 'Гонконг'],
      rowHeaders: true,
      rows: [
        ['Форма компании', 'sp. z o.o.', 'OÜ', 's.r.o.', 'Ltd', 'Ltd', 'Limited'],
        ['Типичный старт*', '2–6 нед.', '2–5 нед.', '2–6 нед.', '3–8 нед.', '2–6 нед.', '3–8 нед.'],
        ['Банк / счёт', 'Локальный или EU fintech', 'Часто fintech / EU', 'Локальный / EU', 'Локальный / международный', 'UK bank / EMI', 'HK bank / международный'],
        ['Когда уместно', 'EU-клиенты, понятный e-com', 'Digital / e-Residency', 'Центр Европы, s.r.o.', 'Холдинг / международные потоки', 'Англоязычный контур', 'Азия / международная торговля'],
        ['На что смотреть', 'KRS, VAT, счет', 'e-Residency, substance', 'Trade license, счет', 'Substance, банк', 'Companies House, банк', 'Банковская проверка'],
      ],
      note: '*Срок — ориентир до готового контура «компания + счёт + заявка в Stripe». Stripe и банк могут увеличить срок или отказать.',
    },
    uk: {
      id: 'jurisdictions-compare',
      heading: 'Порівняння країн для Stripe',
      lead: 'Орієнтири, а не гарантії. Строк і банк залежать від ніші, повноти документів і відповіді регулятора.',
      columns: ['Параметр', 'Польща', 'Естонія', 'Чехія', 'Кіпр', 'UK', 'Гонконг'],
      rowHeaders: true,
      rows: [
        ['Форма компанії', 'sp. z o.o.', 'OÜ', 's.r.o.', 'Ltd', 'Ltd', 'Limited'],
        ['Типовий старт*', '2–6 тиж.', '2–5 тиж.', '2–6 тиж.', '3–8 тиж.', '2–6 тиж.', '3–8 тиж.'],
        ['Банк / рахунок', 'Локальний або EU fintech', 'Часто fintech / EU', 'Локальний / EU', 'Локальний / міжнародний', 'UK bank / EMI', 'HK bank / міжнародний'],
        ['Коли доречно', 'EU-клієнти, зрозумілий e-com', 'Digital / e-Residency', 'Центр Європи, s.r.o.', 'Холдинг / міжнародні потоки', 'Англомовний контур', 'Азія / міжнародна торгівля'],
        ['На що дивитися', 'KRS, VAT, рахунок', 'e-Residency, substance', 'Trade license, рахунок', 'Substance, банк', 'Companies House, банк', 'Банківська перевірка'],
      ],
      note: '*Строк — орієнтир до готового контуру «компанія + рахунок + заявка в Stripe». Stripe і банк можуть збільшити строк або відмовити.',
    },
    en: {
      id: 'jurisdictions-compare',
      heading: 'Country comparison for Stripe',
      lead: 'Guidance, not guarantees. Timeline and banking depend on niche, document quality and reviewer decisions.',
      columns: ['Factor', 'Poland', 'Estonia', 'Czechia', 'Cyprus', 'UK', 'Hong Kong'],
      rowHeaders: true,
      rows: [
        ['Company form', 'sp. z o.o.', 'OÜ', 's.r.o.', 'Ltd', 'Ltd', 'Limited'],
        ['Typical start*', '2–6 wks', '2–5 wks', '2–6 wks', '3–8 wks', '2–6 wks', '3–8 wks'],
        ['Bank / account', 'Local or EU fintech', 'Often fintech / EU', 'Local / EU', 'Local / international', 'UK bank / EMI', 'HK bank / international'],
        ['Best fit', 'EU customers, clear e-com', 'Digital / e-Residency', 'Central EU, s.r.o.', 'Holding / cross-border', 'English-language stack', 'Asia / trade flows'],
        ['Watchouts', 'KRS, VAT, account', 'e-Residency, substance', 'Trade license, account', 'Substance, bank', 'Companies House, bank', 'Banking review'],
      ],
      note: '*Timeline is a guide to a ready “company + account + Stripe application” stack. Stripe or the bank may extend it or refuse.',
    },
  })
}

export function getNichesRiskTable(locale: Locale): ContentTableModel {
  return pick(locale, {
    ru: {
      id: 'niches-risk',
      heading: 'Ниши: как обычно проходит оценка',
      lead: 'Не рейтинг «можно/нельзя», а типовая картина до заявки. Итог всегда зависит от сайта, политики возвратов и доли споров.',
      columns: ['Ниша', 'Типовой риск', 'Что проверяем в первую очередь', 'Частый формат'],
      rowHeaders: false,
      rows: [
        ['SaaS / подписки', 'Средний', 'Пробный период, отмена, dunning', 'Процессинг или свой merchant'],
        ['Онлайн-курсы', 'Средний', 'Доставка доступа, возвраты, оферта', 'Merchant / аренда на пилоте'],
        ['Маркетплейс', 'Высокий', 'Кто продавец, Connect vs обычный аккаунт', 'Connect или юрлицо + банк'],
        ['Цифровые товары', 'Средний+', 'Мгновенная выдача, лицензия, refunds', 'Merchant после скрининга'],
        ['Gaming', 'Высокий', 'In-game покупки, гео, возрастные ограничения', 'Только после оценки модели'],
        ['Forex / high-risk', 'Очень высокий', 'Лицензия, оферта, поток средств', 'Часто отказ; честная оценка'],
      ],
      note: 'Stripe может изменить правила. Мы не обещаем одобрение — сначала сверяем модель, потом формат.',
    },
    uk: {
      id: 'niches-risk',
      heading: 'Ніші: як зазвичай проходить оцінка',
      lead: 'Не рейтинг «можна/не можна», а типова картина до заявки. Підсумок завжди залежить від сайту, політики повернень і частки спорів.',
      columns: ['Ніша', 'Типовий ризик', 'Що перевіряємо насамперед', 'Частий формат'],
      rowHeaders: false,
      rows: [
        ['SaaS / підписки', 'Середній', 'Пробний період, скасування, dunning', 'Процесинг або свій merchant'],
        ['Онлайн-курси', 'Середній', 'Видача доступу, повернення, оферта', 'Merchant / оренда на пілоті'],
        ['Маркетплейс', 'Високий', 'Хто продавець, Connect vs звичайний акаунт', 'Connect або юрособа + банк'],
        ['Цифрові товари', 'Середній+', 'Миттєва видача, ліцензія, refunds', 'Merchant після скринінгу'],
        ['Gaming', 'Високий', 'In-game покупки, гео, вікові обмеження', 'Лише після оцінки моделі'],
        ['Forex / high-risk', 'Дуже високий', 'Ліцензія, оферта, потік коштів', 'Часто відмова; чесна оцінка'],
      ],
      note: 'Stripe може змінити правила. Ми не обіцяємо схвалення — спочатку звіряємо модель, потім формат.',
    },
    en: {
      id: 'niches-risk',
      heading: 'Niches: how screening usually looks',
      lead: 'Not a yes/no ranking — a typical pre-application picture. Outcome still depends on the site, refunds and dispute rate.',
      columns: ['Niche', 'Typical risk', 'What we check first', 'Common format'],
      rowHeaders: false,
      rows: [
        ['SaaS / subscriptions', 'Medium', 'Trial, cancel flow, dunning', 'Processing or own merchant'],
        ['Online courses', 'Medium', 'Access delivery, refunds, terms', 'Merchant / rental for a pilot'],
        ['Marketplace', 'High', 'Who sells, Connect vs standard account', 'Connect or company + bank'],
        ['Digital goods', 'Medium+', 'Instant delivery, license, refunds', 'Merchant after screening'],
        ['Gaming', 'High', 'In-game purchases, geo, age limits', 'Only after model review'],
        ['Forex / high-risk', 'Very high', 'License, offer, money flow', 'Often a refusal; honest review'],
      ],
      note: 'Stripe rules change. We do not promise approval — we match the model first, then the format.',
    },
  })
}

export function getSetupPathTable(locale: Locale): ContentTableModel {
  return pick(locale, {
    ru: {
      id: 'setup-path',
      heading: 'Какой путь выбрать',
      lead: 'Короткая карта решений до консультации. Финальный формат подтверждаем после оценки сайта.',
      columns: ['Ваша ситуация', 'Что обычно рекомендуем', 'Почему', 'Куда смотреть'],
      rowHeaders: false,
      rows: [
        ['Нужен быстрый пилот', 'Аренда аккаунта', 'Меньше ожидания регистрации', { label: 'Аренда Stripe', href: '/services/stripe-account-rent' }],
        ['Нужен свой контур доступов', 'Покупка merchant', 'Контроль и история аккаунта', { label: 'Покупка Stripe', href: '/services/stripe-account-buy' }],
        ['Нужны checkout + routing', 'Процессинг под ключ', 'Стек под оборот и резерв', { label: 'Процессинг', href: '/services/processing-turnkey' }],
        ['Нет компании / счёта', 'Юрлицо + банк', 'База под верификацию Stripe', { label: 'Юрлицо + банк', href: '/services/legal-entity-bank' }],
        ['Бизнес связан с Украиной', 'Решение для Украины', 'Иностранный контур и выплаты', { label: 'Stripe Украина', href: '/solutions/stripe-ukraine' }],
        ['Аккаунт на review / hold', 'Проблемы с аккаунтом', 'Разбор запроса без гарантии снятия', { label: 'Проблемы аккаунта', href: '/solutions/stripe-account-issues' }],
      ],
    },
    uk: {
      id: 'setup-path',
      heading: 'Який шлях обрати',
      lead: 'Коротка карта рішень до консультації. Фінальний формат підтверджуємо після оцінки сайту.',
      columns: ['Ваша ситуація', 'Що зазвичай радимо', 'Чому', 'Куди дивитися'],
      rowHeaders: false,
      rows: [
        ['Потрібен швидкий пілот', 'Оренда акаунта', 'Менше очікування реєстрації', { label: 'Оренда Stripe', href: '/services/stripe-account-rent' }],
        ['Потрібен свій контур доступів', 'Купівля merchant', 'Контроль і історія акаунта', { label: 'Купівля Stripe', href: '/services/stripe-account-buy' }],
        ['Потрібні checkout + routing', 'Процесинг під ключ', 'Стек під обіг і резерв', { label: 'Процесинг', href: '/services/processing-turnkey' }],
        ['Немає компанії / рахунку', 'Юрособа + банк', 'База під верифікацію Stripe', { label: 'Юрособа + банк', href: '/services/legal-entity-bank' }],
        ['Бізнес пов’язаний з Україною', 'Рішення для України', 'Іноземний контур і виплати', { label: 'Stripe Україна', href: '/solutions/stripe-ukraine' }],
        ['Акаунт на review / hold', 'Проблеми з акаунтом', 'Розбір запиту без гарантії зняття', { label: 'Проблеми акаунта', href: '/solutions/stripe-account-issues' }],
      ],
    },
    en: {
      id: 'setup-path',
      heading: 'Which path to choose',
      lead: 'A short decision map before the consultation. The final format is confirmed after site review.',
      columns: ['Your situation', 'What we usually suggest', 'Why', 'Where to go'],
      rowHeaders: false,
      rows: [
        ['Need a fast pilot', 'Account rental', 'Less waiting on company setup', { label: 'Rent Stripe', href: '/services/stripe-account-rent' }],
        ['Need your own access perimeter', 'Buy a merchant', 'Control and account history', { label: 'Buy Stripe', href: '/services/stripe-account-buy' }],
        ['Need checkout + routing', 'Turnkey processing', 'Stack for volume and backup', { label: 'Processing', href: '/services/processing-turnkey' }],
        ['No company / bank account', 'Company + bank', 'Foundation for Stripe verification', { label: 'Entity + bank', href: '/services/legal-entity-bank' }],
        ['Business linked to Ukraine', 'Ukraine solution', 'Foreign stack and payouts', { label: 'Stripe Ukraine', href: '/solutions/stripe-ukraine' }],
        ['Account on review / hold', 'Account issues', 'Request review with no lift guarantee', { label: 'Account issues', href: '/solutions/stripe-account-issues' }],
      ],
    },
  })
}

export function getJurisdictionTimelineTable(locale: Locale): ContentTableModel {
  return pick(locale, {
    ru: {
      id: 'jurisdiction-timeline',
      heading: 'Этапы подключения страны',
      lead: 'Типовой порядок работ. Параллелить шаги можно, но банк и Stripe часто идут строго после юрлица.',
      columns: ['Этап', 'Что делаем', 'Что нужно от вас', 'Ориентир'],
      rowHeaders: false,
      rows: [
        ['1. Оценка', 'Ниша, сайт, гео клиентов', 'Ссылка на сайт, описание продукта', '1–3 дня'],
        ['2. Юрлицо', 'Регистрация / подбор компании', 'Паспорт, адрес, структура владения', '1–4 нед.'],
        ['3. Счёт', 'Банк или EMI под Stripe', 'KYC-пакет, источник средств', '1–4 нед.'],
        ['4. Stripe', 'Заявка и ответы на запросы', 'Оферта, refunds, описание деятельности', 'от нескольких дней'],
        ['5. Запуск', 'Checkout / CRM / выплаты', 'Тестовые платежи, доступы', '1–5 дней'],
      ],
      note: 'Сроки суммируются не всегда линейно. Отказ банка или Stripe сдвигает весь план.',
    },
    uk: {
      id: 'jurisdiction-timeline',
      heading: 'Етапи підключення країни',
      lead: 'Типовий порядок робіт. Кроки можна паралелити, але банк і Stripe часто йдуть строго після юрособи.',
      columns: ['Етап', 'Що робимо', 'Що потрібно від вас', 'Орієнтир'],
      rowHeaders: false,
      rows: [
        ['1. Оцінка', 'Ніша, сайт, гео клієнтів', 'Посилання на сайт, опис продукту', '1–3 дні'],
        ['2. Юрособа', 'Реєстрація / підбір компанії', 'Паспорт, адреса, структура власності', '1–4 тиж.'],
        ['3. Рахунок', 'Банк або EMI під Stripe', 'KYC-пакет, джерело коштів', '1–4 тиж.'],
        ['4. Stripe', 'Заявка і відповіді на запити', 'Оферта, refunds, опис діяльності', 'від кількох днів'],
        ['5. Запуск', 'Checkout / CRM / виплати', 'Тестові платежі, доступи', '1–5 днів'],
      ],
      note: 'Строки не завжди сумуються лінійно. Відмова банку або Stripe зсуває весь план.',
    },
    en: {
      id: 'jurisdiction-timeline',
      heading: 'Country setup stages',
      lead: 'Typical order of work. Steps can overlap, but bank and Stripe often follow the company.',
      columns: ['Stage', 'What we do', 'What we need from you', 'Guide'],
      rowHeaders: false,
      rows: [
        ['1. Review', 'Niche, site, customer geo', 'Site URL, product description', '1–3 days'],
        ['2. Company', 'Register / match entity', 'ID, address, ownership', '1–4 wks'],
        ['3. Account', 'Bank or EMI for Stripe', 'KYC pack, source of funds', '1–4 wks'],
        ['4. Stripe', 'Application and replies', 'Terms, refunds, activity description', 'from a few days'],
        ['5. Launch', 'Checkout / CRM / payouts', 'Test payments, access', '1–5 days'],
      ],
      note: 'Timelines do not always add linearly. A bank or Stripe refusal moves the whole plan.',
    },
  })
}

export function getChecklistTable(locale: Locale): ContentTableModel {
  return pick(locale, {
    ru: {
      id: 'pre-call-checklist',
      heading: 'Чек-лист до консультации',
      lead: 'Подготовьте это заранее — так быстрее поймём формат и риски.',
      columns: ['Пункт', 'Зачем', 'Готово?'],
      rowHeaders: false,
      rows: [
        ['Рабочий сайт / лендинг', 'Stripe смотрит публичное описание', 'Да / в работе'],
        ['Что продаёте и кому', 'MCC и модель споров', 'Кратко в 5–7 предложениях'],
        ['Политика возвратов', 'Снижает риск dispute', 'Ссылка или черновик'],
        ['Гео клиентов', 'Выбор страны и методов оплаты', 'Топ-3 страны'],
        ['Ожидаемый оборот', 'Лимиты и routing', 'Месячный ориентир'],
        ['Есть ли компания/счёт', 'Аренда vs юрлицо + банк', 'Да / нет / в другой стране'],
      ],
    },
    uk: {
      id: 'pre-call-checklist',
      heading: 'Чек-лист до консультації',
      lead: 'Підготуйте це заздалегідь — так швидше зрозуміємо формат і ризики.',
      columns: ['Пункт', 'Навіщо', 'Готово?'],
      rowHeaders: false,
      rows: [
        ['Робочий сайт / лендинг', 'Stripe дивиться публічний опис', 'Так / в роботі'],
        ['Що продаєте і кому', 'MCC і модель спорів', 'Коротко в 5–7 реченнях'],
        ['Політика повернень', 'Знижує ризик dispute', 'Посилання або чернетка'],
        ['Гео клієнтів', 'Вибір країни і методів оплати', 'Топ-3 країни'],
        ['Очікуваний обіг', 'Ліміти і routing', 'Місячний орієнтир'],
        ['Чи є компанія/рахунок', 'Оренда vs юрособа + банк', 'Так / ні / в іншій країні'],
      ],
    },
    en: {
      id: 'pre-call-checklist',
      heading: 'Pre-call checklist',
      lead: 'Prepare this first — we can match format and risks faster.',
      columns: ['Item', 'Why it matters', 'Ready?'],
      rowHeaders: false,
      rows: [
        ['Live site / landing', 'Stripe reviews the public offer', 'Yes / in progress'],
        ['What you sell and to whom', 'MCC and dispute model', '5–7 sentence summary'],
        ['Refund policy', 'Lowers dispute risk', 'Link or draft'],
        ['Customer geo', 'Country and payment methods', 'Top 3 countries'],
        ['Expected volume', 'Limits and routing', 'Monthly range'],
        ['Company / bank account', 'Rental vs company + bank', 'Yes / no / another country'],
      ],
    },
  })
}

export function getHubTables(hub: 'jurisdictions' | 'niches' | 'solutions' | 'services', locale: Locale): ContentTableModel[] {
  if (hub === 'jurisdictions') return [getJurisdictionsCompareTable(locale), getJurisdictionTimelineTable(locale), getChecklistTable(locale)]
  if (hub === 'niches') return [getNichesRiskTable(locale), getChecklistTable(locale)]
  if (hub === 'solutions') return [getSetupPathTable(locale), getChecklistTable(locale)]
  return [getSetupPathTable(locale), getChecklistTable(locale)]
}

export function getLandingGuideTables(
  group: 'jurisdictions' | 'niches' | 'solutions',
  locale: Locale,
): ContentTableModel[] {
  if (group === 'jurisdictions') return [getJurisdictionTimelineTable(locale), getJurisdictionsCompareTable(locale)]
  if (group === 'niches') return [getNichesRiskTable(locale)]
  return [getSetupPathTable(locale)]
}
