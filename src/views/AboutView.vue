<template>
  <div>
    <!-- Hero -->
    <div class="page-hero about-hero">
      <div class="container" style="position:relative;z-index:1">
        <span class="page-hero-label">{{ $t('about.label') }}</span>
        <h1>{{ $t('about.hero_title') }}<br>{{ $t('about.hero_title_cont') }}</h1>
        <p style="max-width:540px;margin-top:1rem">{{ $t('about.hero_desc') }}</p>
      </div>
    </div>

    <!-- Mission + Stats -->
    <section class="section">
      <div class="container mission-layout">
        <div class="mission-text" v-reveal>
          <p class="section-label">{{ $t('about.mission_title') }}</p>
          <h2>{{ $t('about.mission_main') }}</h2>
          <p style="margin-top:1.25rem">{{ $t('about.mission_text_1') }}</p>
          <p style="margin-top:0.9rem">{{ $t('about.mission_text_2') }}</p>
        </div>
        <div class="stats-card" ref="statsCardRef" v-reveal="120">
          <div class="stat-item" v-for="s in statsDisplay" :key="s.label">
            <span class="stat-big">{{ s.value }}<span class="stat-suffix">{{ s.suffix }}</span></span>
            <span class="stat-sub">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section class="section" style="background:var(--grey-50)">
      <div class="container">
        <p class="section-label" v-reveal>{{ $t('about.what_we_do') }}</p>
        <h2 style="margin-bottom:2.5rem" v-reveal="60">{{ $t('about.focus_title') }}</h2>
        <div class="focus-grid">
          <div class="focus-item" v-for="(area, i) in focusAreas" :key="area.titleKey" v-reveal="i * 70">
            <div class="focus-num">{{ area.num }}</div>
            <div>
              <h4>{{ $t(area.titleKey) }}</h4>
              <p>{{ $t(area.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision -->
    <section class="section">
      <div class="container vision-layout">
        <div class="vision-text" v-reveal>
          <p class="section-label">{{ $t('about.vision_title') }}</p>
          <h2>{{ $t('about.vision_title') }}</h2>
          <p style="margin-top:1.25rem;line-height:1.8">{{ $t('about.vision_text') }}</p>
          <RouterLink to="/join" class="btn btn-dark" style="margin-top:2rem">{{ $t('nav.join') }}</RouterLink>
        </div>
        <div class="vision-card" v-reveal="120">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
          <p style="color:var(--white);font-size:1.05rem;line-height:1.75;margin-top:1.25rem;font-style:italic">"{{ $t('about.vision_quote') }}"</p>
          <span style="display:block;margin-top:1.25rem;font-size:0.78rem;color:rgba(255,255,255,0.4);letter-spacing:0.08em;text-transform:uppercase">{{ $t('about.vision_title') }}</span>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section" style="background:var(--grey-50)">
      <div class="container">
        <p class="section-label" v-reveal>{{ $t('about.team_title') }}</p>
        <h2 style="margin-bottom:2.5rem" v-reveal="60">{{ $t('about.team_title') }}</h2>
        <div class="team-grid">
          <RouterLink to="/advisors" class="team-card" v-for="(member, i) in team" :key="member.name" v-reveal="i * 90">
            <div class="team-avatar">
              <img :src="member.photo" :alt="member.name" class="team-avatar-img" />
            </div>
            <h4>{{ member.name }}</h4>
            <p class="team-role">{{ getTeamRole(member) }}</p>
            <p class="team-org">{{ member.org }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Partners / Sponsors -->
    <section class="section sponsors-section">
      <div class="container">
        <p class="section-label" v-reveal>Our Partners</p>
        <h2 style="margin-bottom:2.5rem" v-reveal="60">Network Partners &amp; Sponsors</h2>
        <div class="sponsors-grid">
          <div class="sponsor-card" v-for="(s, i) in sponsors" :key="s.name" v-reveal="i * 60">
            <img :src="s.logo" :alt="s.name" class="sponsor-logo" />
          </div>
        </div>
      </div>
    </section>

    <!-- Support / Open contribution -->
    <section class="section support-section">
      <div class="container">
        <p class="section-label" v-reveal>{{ $t('support.label') }}</p>
        <h2 v-reveal="60">{{ $t('support.title') }}</h2>
        <p class="support-intro" v-reveal="120">{{ $t('support.intro') }}</p>

        <div class="support-layout" v-reveal="180">
          <div class="support-form-wrap">
            <form v-if="!supportDone" @submit.prevent="submitSupport">
              <p class="amount-label">{{ $t('support.amount_label') }}</p>
              <div class="amount-pills">
                <button type="button"
                        v-for="a in presetAmounts" :key="a"
                        :class="['amount-pill', !support.custom && support.amount === a ? 'active' : '']"
                        @click="pickAmount(a)">{{ a }} €</button>
                <button type="button"
                        :class="['amount-pill', support.custom ? 'active' : '']"
                        @click="pickCustom">{{ $t('support.amount_custom') }}</button>
              </div>
              <input v-if="support.custom"
                     v-model.number="support.customAmount"
                     type="number" min="1" inputmode="numeric"
                     class="custom-input"
                     :placeholder="$t('support.amount_custom_placeholder')" />

              <div class="form-group" style="margin-top:1.25rem">
                <label>{{ $t('support.name_label') }}</label>
                <input v-model="support.name" type="text" />
              </div>
              <div class="form-group">
                <label>{{ $t('support.email_label') }}</label>
                <input v-model="support.email" type="email" />
              </div>

              <button type="submit" class="btn btn-dark support-submit" :disabled="chosenAmount <= 0">
                {{ $t('support.submit') }} →
              </button>
              <p class="support-privacy">{{ $t('support.privacy') }}</p>
            </form>

            <div v-else class="support-success">
              <div class="success-icon">✓</div>
              <h3>{{ $t('support.success_title') }}</h3>
              <p>{{ $t('support.success_text') }}</p>
            </div>
          </div>

          <aside class="support-impact">
            <h4>{{ $t('support.impact_title') }}</h4>
            <ul>
              <li>{{ $t('support.impact_1') }}</li>
              <li>{{ $t('support.impact_2') }}</li>
              <li>{{ $t('support.impact_3') }}</li>
              <li>{{ $t('support.impact_4') }}</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <!-- Funding -->
    <section class="section">
      <div class="container funding-row">
        <div v-reveal>
          <p class="section-label">{{ $t('about.funding_partners_title') }}</p>
          <h2>{{ $t('about.funding_title') }}</h2>
          <p style="margin-top:1rem;max-width:500px">{{ $t('about.funding_text') }}</p>
        </div>
        <div class="funding-badges" v-reveal="120">
          <div class="funding-badge"><span class="funding-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span><p>{{ $t('about.funding_eu') }}</p></div>
          <div class="funding-badge"><span class="funding-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span><p>{{ $t('about.funding_interreg') }}</p></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, locale } = useI18n()

const statsCardRef = ref(null)

const team = [
  { name: 'Dustin Chwalek',         role: 'Kommunikationsleiter',            roleEn: 'Communications Manager',              roleDa: 'Kommunikationsleder',            org: 'Business DE-DK', photo: '/logos/team/dustin-chwalek.png' },
  { name: 'Lewis C. Bardt',         role: 'Projektleiter',                   roleEn: 'Project Manager',                     roleDa: 'Projektleder',                   org: 'Business DE-DK', photo: '/logos/team/lewis-bardt.png' },
  { name: 'Peter Engel-Andreasen',  role: 'Direktor',                        roleEn: 'Director',                            roleDa: 'Direktør',                       org: 'Business DE-DK', photo: '/logos/team/peter-engel-andreasen.png' },
  { name: 'Ida Mahler Hoeg',        role: 'Koordinatorin Verwaltung/Finanzen', roleEn: 'Administration & Finance Coordinator', roleDa: 'Koordinator for administration', org: 'Business DE-DK', photo: '/logos/team/ida-mahler-hoeg.png' },
]

function getTeamRole(member) {
  if (locale.value === 'en') return member.roleEn
  if (locale.value === 'da') return member.roleDa
  return member.role
}

const sponsors = [
  { name: 'Tønder Kommune',                              logo: '/logos/sponsors/tonder-kommune.png' },
  { name: 'Business Kolding',                            logo: '/logos/sponsors/business-kolding.png' },
  { name: 'Wirtschaftsförderung Kreis Rendsburg-Eckernförde', logo: '/logos/sponsors/wirtschaftsforderung-rde.png' },
  { name: 'WVE – Gemeinsam Stark',                       logo: '/logos/sponsors/wve.png' },
  { name: 'Business Esbjerg',                            logo: '/logos/sponsors/business-esbjerg.png' },
  { name: 'Hochschule Flensburg',                        logo: '/logos/sponsors/hochschule-flensburg.png' },
  { name: 'Wirtschaftsförderung Nordfriesland',          logo: '/logos/sponsors/wirtschaftsforderung-nordfriesland.png' },
  { name: 'Tønder Erhvervsråd',                          logo: '/logos/sponsors/tonder-erhvervsraad.png' },
  { name: 'Jackelädt-Zentrum',                           logo: '/logos/sponsors/jackelaet-zentrum.png' },
]

const focusAreas = [
  { num: '01', titleKey: 'about.focus_1_title', descKey: 'about.focus_1_desc' },
  { num: '02', titleKey: 'about.focus_2_title', descKey: 'about.focus_2_desc' },
  { num: '03', titleKey: 'about.focus_3_title', descKey: 'about.focus_3_desc' },
  { num: '04', titleKey: 'about.focus_4_title', descKey: 'about.focus_4_desc' },
  { num: '05', titleKey: 'about.focus_5_title', descKey: 'about.focus_5_desc' },
  { num: '06', titleKey: 'about.focus_6_title', descKey: 'about.focus_6_desc' },
]

const statsData = computed(() => [
  { target: 3,   suffix: '',  label: t('about.stats_countries') },
  { target: 240, suffix: '+', label: t('about.stats_members') },
  { target: 18,  suffix: '',  label: t('about.stats_sectors') },
  { target: 10,  suffix: '+', label: t('about.stats_years') },
])

const statsDisplay = ref(statsData.value.map(s => ({ ...s, value: 0 })))

function animateCounters() {
  const duration = 1600
  const start = performance.now()
  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    statsDisplay.value = statsData.value.map((s, i) => ({
      ...s,
      value: Math.round(s.target * ease),
    }))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Support / open contribution form
const presetAmounts = [25, 50, 100, 250]
const supportDone = ref(false)
const support = reactive({
  amount: 50,       // pre-select a sensible default so the submit button isn't disabled on first paint
  custom: false,
  customAmount: '',
  name: '',
  email: '',
})
const chosenAmount = computed(() =>
  support.custom ? (Number(support.customAmount) || 0) : (support.amount || 0)
)
function pickAmount(a) {
  support.amount = a
  support.custom = false
  support.customAmount = ''
}
function pickCustom() {
  support.custom = true
  support.amount = null
}
function submitSupport() {
  if (chosenAmount.value <= 0) return
  // Frontend mock — wire to a payment provider (Stripe/PayPal/bank transfer) later.
  supportDone.value = true
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (statsCardRef.value) observer.observe(statsCardRef.value)
})
</script>

<style scoped>
.mission-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: start;
}
.mission-text h2 { margin-top: 0.5rem; }
.mission-text p { color: var(--text-muted); line-height: 1.8; }

.stats-card {
  background: var(--navy);
  border-radius: var(--radius-lg);
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem 2.5rem;
  flex-shrink: 0;
  align-self: start;
  min-width: 280px;
}
.stat-big {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--white);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.stat-suffix { font-size: 1.4rem; }
.stat-sub { display: block; font-size: 0.78rem; color: rgba(255,255,255,0.45); margin-top: 0.35rem; }

.focus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.focus-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.focus-item:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-3px); }
.focus-num {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--grey-300);
  flex-shrink: 0;
  margin-top: 0.1rem;
  transition: color 0.25s ease;
}
.focus-item:hover .focus-num { color: var(--navy); }
.focus-item h4 { font-size: 0.92rem; margin-bottom: 0.3rem; }
.focus-item p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }

.funding-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}
.funding-badges { display: flex; gap: 1.25rem; }
.funding-badge {
  background: var(--grey-50);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  text-align: center;
  min-width: 130px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.funding-badge:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
.funding-icon { display: flex; align-items: center; justify-content: center; color: var(--navy); }
.funding-badge p { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.5rem; line-height: 1.5; }

/* Vision */
.vision-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
.vision-text h2 { margin-top: 0.5rem; }
.vision-text p { color: var(--text-muted); }
.vision-card {
  background: var(--navy);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
}
.vision-card svg { color: rgba(255,255,255,0.3); }

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.team-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}
.team-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); transform: translateY(-3px); }
.team-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1.25rem;
  border: 3px solid var(--grey-200);
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.team-card:hover .team-avatar { transform: scale(1.05); border-color: var(--navy); }
.team-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  transform: scale(1.18);
}
.team-card h4 { font-size: 1rem; margin-bottom: 0.25rem; }
.team-role { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem; }
.team-org { font-size: 0.78rem; color: var(--grey-400); margin-top: 0.1rem; }

/* ── Sponsors ── */
.sponsors-section { background: var(--white); }
.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.sponsor-card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 1.5rem 2rem;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}
.sponsor-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  transform: translateY(-3px);
  border-color: var(--grey-300);
}
.sponsor-logo {
  max-width: 100%;
  max-height: 60px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(20%);
  transition: filter 0.3s ease;
}
.sponsor-card:hover .sponsor-logo { filter: grayscale(0%); }

@media (max-width: 900px) {
  .mission-layout { grid-template-columns: 1fr; }
  .focus-grid { grid-template-columns: repeat(2, 1fr); }
  .vision-layout { grid-template-columns: 1fr; gap: 2rem; }
  .team-grid { grid-template-columns: repeat(2, 1fr); }

  .sponsors-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .focus-grid { grid-template-columns: 1fr; }
  .stats-card { min-width: unset; }
  .team-grid { grid-template-columns: 1fr; }
  .sponsors-grid { grid-template-columns: 1fr; }
}

/* Support / Open contribution */
.support-intro {
  color: var(--text-muted);
  max-width: 640px;
  line-height: 1.7;
  margin-top: 0.75rem;
  margin-bottom: 2.5rem;
}
.support-layout {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 3rem;
  align-items: start;
}
.support-form-wrap {
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 2rem;
  border-top: 4px solid var(--navy);
}
.amount-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.6rem;
}
.amount-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.amount-pill {
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--grey-200);
  background: var(--white);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  font-variant-numeric: tabular-nums;
  transition: all var(--transition);
}
.amount-pill:hover { border-color: var(--navy); }
.amount-pill.active {
  background: var(--navy);
  border-color: var(--navy);
  color: var(--white);
}
.custom-input {
  margin-top: 0.6rem;
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--grey-200);
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  outline: none;
  transition: border-color var(--transition);
}
.custom-input:focus { border-color: var(--navy); }
.support-submit {
  width: 100%;
  margin-top: 1.25rem;
  justify-content: center;
}
.support-submit:disabled {
  background: var(--grey-200);
  border-color: var(--grey-200);
  color: var(--grey-400);
  cursor: not-allowed;
}
.support-privacy {
  font-size: 0.78rem;
  color: var(--grey-400);
  text-align: center;
  margin-top: 0.85rem;
  line-height: 1.5;
}

.support-impact {
  background: var(--grey-50);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem;
}
.support-impact h4 {
  font-size: 0.92rem;
  margin-bottom: 1rem;
}
.support-impact ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.support-impact li {
  font-size: 0.88rem;
  color: var(--text-muted);
  padding-left: 1.4rem;
  position: relative;
  line-height: 1.5;
}
.support-impact li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--navy);
  font-weight: 700;
}

.support-success {
  text-align: center;
  padding: 1.5rem 0;
}
.support-success .success-icon {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}
.support-success h3 { margin-bottom: 0.4rem; }
.support-success p {
  color: var(--text-muted);
  max-width: 360px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .support-layout { grid-template-columns: 1fr; gap: 1.5rem; }
}

.about-hero {
  position: relative;
  background-image: url('/images/about-us.png');
  background-size: cover;
  background-position: center 30%;
}
.about-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13,22,40,0.88) 0%, rgba(13,22,40,0.78) 100%);
  pointer-events: none;
}
</style>