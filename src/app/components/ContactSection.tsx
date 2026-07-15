'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import ContactForm from './ContactForm'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="kontakt" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>{t('contact.heading')}</h2>
          <div className={styles.imgWrap}>
            <Image
              src="/images/hero-stripe.webp"
              alt={t('contact.imageAlt')}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.subheading}>{t('contact.subheading')}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
