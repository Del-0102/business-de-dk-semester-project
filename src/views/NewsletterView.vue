<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">{{ localized(copy.label) }}</span>
        <h1>{{ localized(copy.title) }}</h1>
        <p>{{ localized(copy.intro) }}</p>
      </div>
    </div>

    <section class="section">
      <div class="container nl-layout">
        <div class="nl-features">
          <p class="section-label">{{ localized(copy.receiveLabel) }}</p>
          <h2 style="margin-bottom:2rem;" v-html="localized(copy.receiveTitle)"></h2>
          <div class="feature-list">
            <div class="feature-item" v-for="f in features" :key="f.title">
              <div class="feature-badge" v-html="f.icon"></div>
              <div>
                <h4>{{ localized(f.title) }}</h4>
                <p>{{ localized(f.desc) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="nl-form-wrap">
          <form @submit.prevent="subscribe" v-if="!done" class="nl-form">
            <h3 style="margin-bottom:1.5rem;">{{ localized(copy.formTitle) }}</h3>
            <div class="form-group">
              <label>{{ localized(copy.fullName) }}</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>{{ localized(copy.email) }}</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-group">
              <label>{{ localized(copy.preferredLanguage) }}</label>
              <select v-model="form.lang">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="da">Dansk</option>
              </select>
            </div>
            <button type="submit" class="btn btn-dark" style="width:100%">{{ localized(copy.button) }}</button>
            <p class="privacy">
              <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:4px;opacity:0.6"><rect x="1" y="5.5" width="9" height="7" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M3 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              {{ localized(copy.privacy) }}
            </p>
          </form>
          <div v-else class="success-state">
            <div class="success-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="5,15 11,21 23,9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <h3>{{ localized(copy.successTitle) }}</h3>
            <p>{{ localized(copy.successText) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '../composables/useSeoMeta.js'

useSeoMeta('newsletter.meta_title', 'newsletter.meta_desc')
const { locale } = useI18n()

function localized(value) {
  if (typeof value === 'string') return value
  return value?.[locale.value] || value?.en || ''
}

const copy = {
  label: { en: 'Newsletter', de: 'Newsletter', da: 'Nyhedsbrev' },
  title: { en: 'Stay Informed', de: 'Bleiben Sie informiert', da: 'Hold dig opdateret' },
  intro: { en: 'Subscribe to receive the latest news, events and opportunities from the DE-DK border region.', de: 'Abonnieren Sie aktuelle Nachrichten, Events und Chancen aus der deutsch-dänischen Grenzregion.', da: 'Tilmeld dig og modtag de seneste nyheder, events og muligheder fra DE-DK-grænseregionen.' },
  receiveLabel: { en: 'What you\'ll receive', de: 'Was Sie erhalten', da: 'Det får du' },
  receiveTitle: { en: 'Monthly updates<br>directly to your inbox', de: 'Monatliche Updates<br>direkt in Ihr Postfach', da: 'Månedlige opdateringer<br>direkte i din indbakke' },
  formTitle: { en: 'Subscribe', de: 'Abonnieren', da: 'Tilmeld' },
  fullName: { en: 'Full Name', de: 'Vollständiger Name', da: 'Fulde navn' },
  email: { en: 'Email Address', de: 'E-Mail-Adresse', da: 'E-mailadresse' },
  preferredLanguage: { en: 'Preferred Language', de: 'Bevorzugte Sprache', da: 'Foretrukket sprog' },
  button: { en: 'Subscribe', de: 'Abonnieren', da: 'Tilmeld' },
  privacy: { en: 'We respect your privacy. Unsubscribe at any time.', de: 'Wir respektieren Ihre Privatsphäre. Sie können sich jederzeit abmelden.', da: 'Vi respekterer dit privatliv. Du kan til enhver tid afmelde dig.' },
  successTitle: { en: "You're subscribed!", de: 'Sie sind angemeldet!', da: 'Du er tilmeldt!' },
  successText: { en: 'Welcome to the Business DE-DK newsletter.', de: 'Willkommen beim Business DE-DK Newsletter.', da: 'Velkommen til Business DE-DK-nyhedsbrevet.' }
}
const done = ref(false)
const form = reactive({ name: '', email: '', lang: locale.value })

watch(() => form.lang, (code) => {
  locale.value = code
  localStorage.setItem('locale', code)
})

const features = [
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="2" stroke="white" stroke-width="1.5"/><line x1="5" y1="6" x2="13" y2="6" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="5" y1="9" x2="13" y2="9" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="5" y1="12" x2="10" y2="12" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    title: { en: 'Monthly Digest', de: 'Monatlicher Überblick', da: 'Månedlig oversigt' },
    desc: { en: 'Key news and highlights from the DE-DK business region.', de: 'Wichtige Nachrichten und Highlights aus der DE-DK-Wirtschaftsregion.', da: 'Vigtige nyheder og highlights fra DE-DK-erhvervsregionen.' }
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="12" rx="2" stroke="white" stroke-width="1.5"/><line x1="2" y1="8" x2="16" y2="8" stroke="white" stroke-width="1.5"/><line x1="6" y1="2" x2="6" y2="6" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="2" x2="12" y2="6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    title: { en: 'Event Invitations', de: 'Event-Einladungen', da: 'Eventinvitationer' },
    desc: { en: 'First access to upcoming networking events and workshops.', de: 'Früher Zugang zu kommenden Networking-Events und Workshops.', da: 'Første adgang til kommende netværksarrangementer og workshops.' }
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="7" width="14" height="9" rx="1.5" stroke="white" stroke-width="1.5"/><path d="M6 7V5a3 3 0 0 1 6 0v2" stroke="white" stroke-width="1.5" stroke-linecap="round"/><line x1="2" y1="11" x2="16" y2="11" stroke="white" stroke-width="1.5"/></svg>`,
    title: { en: 'Opportunities', de: 'Chancen', da: 'Muligheder' },
    desc: { en: 'Cross-border partnership and tender opportunities.', de: 'Grenzüberschreitende Partnerschafts- und Ausschreibungsmöglichkeiten.', da: 'Grænseoverskridende partnerskabs- og udbudsmuligheder.' }
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><line x1="3" y1="14" x2="15" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/><rect x="4" y="9" width="3" height="5" rx="0.5" fill="white"/><rect x="7.5" y="6" width="3" height="8" rx="0.5" fill="white"/><rect x="11" y="4" width="3" height="10" rx="0.5" fill="white"/></svg>`,
    title: { en: 'Research & Data', de: 'Forschung & Daten', da: 'Forskning & data' },
    desc: { en: 'Reports and insights on the cross-border economy.', de: 'Berichte und Einblicke zur grenzüberschreitenden Wirtschaft.', da: 'Rapporter og indsigter om den grænseoverskridende økonomi.' }
  }
]

function subscribe() { done.value = true }
</script>

<style scoped>
.nl-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.nl-features .section-label { margin-bottom: 0.5rem; }

.feature-list { display: flex; flex-direction: column; gap: 1.5rem; }
.feature-item { display: flex; gap: 1rem; align-items: flex-start; }
.feature-badge {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--navy);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.feature-item h4 { font-size: 0.92rem; font-weight: 600; margin-bottom: 0.2rem; }
.feature-item p { font-size: 0.84rem; color: var(--text-muted); }

.nl-form-wrap {
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  border-top: 4px solid var(--navy);
}
.nl-form { display: flex; flex-direction: column; }
.privacy {
  font-size: 0.78rem;
  color: var(--grey-400);
  text-align: center;
  margin-top: 1rem;
}

.success-state { text-align: center; padding: 2rem 0; }
.success-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--navy); color: var(--white);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.25rem;
}
.success-state h3 { margin-bottom: 0.4rem; }

@media (max-width: 768px) { .nl-layout { grid-template-columns: 1fr; gap: 2rem; } }
</style>
