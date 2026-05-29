<template>
  <div>
    <!-- Hero -->
    <section class="home-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <span class="hero-label anim-1">{{ t('home.hero_label') }}</span>
        <h1 class="anim-2">{{ t('home.hero_title') }}</h1>
        <p class="hero-sub anim-3">{{ t('home.hero_sub') }}</p>

        <div class="hero-search anim-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" :placeholder="t('home.search_placeholder')" @keyup.enter="goSearch" />
        </div>

        <div class="hero-ctas anim-5">
          <RouterLink to="/network" class="btn btn-dark">{{ t('home.cta_network') }}</RouterLink>
          <RouterLink to="/join" class="btn btn-outline-white">{{ t('home.cta_join') }}</RouterLink>
        </div>
      </div>
    </section>

    <!-- What We Offer -->
    <section class="section offer-section">
      <div class="container">
        <p class="section-label offer-label" v-reveal>{{ t('home.offer_label') }}</p>
        <div class="offer-grid">
          <RouterLink to="/interviews" class="offer-card" v-reveal="0">
            <div class="offer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <h3>{{ t('home.offer_interviews_title') }}</h3>
            <p>{{ t('home.offer_interviews_desc') }}</p>
          </RouterLink>

          <RouterLink to="/network" class="offer-card" v-reveal="110">
            <div class="offer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
            </div>
            <h3>{{ t('home.offer_network_title') }}</h3>
            <p>{{ t('home.offer_network_desc') }}</p>
          </RouterLink>

          <RouterLink to="/events" class="offer-card" v-reveal="220">
            <div class="offer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3>{{ t('home.offer_events_title') }}</h3>
            <p>{{ t('home.offer_events_desc') }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Six Focus Areas -->
    <section class="section focus-section">
      <div class="container">
        <p class="section-label" v-reveal>{{ t('home.focus_label') }}</p>
        <h2 v-reveal="60">{{ t('home.focus_title') }}</h2>
        <p class="focus-sub" v-reveal="120">{{ t('home.focus_sub') }}</p>
        <div class="focus-grid">
          <div class="focus-item" v-for="(area, i) in focusAreas" :key="area.num" v-reveal="i * 75">
            <div class="focus-num">{{ area.num }}</div>
            <div>
              <h4>{{ t(area.titleKey) }}</h4>
              <p>{{ t(area.descKey) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section class="section gallery-preview-section">
      <div class="container">
        <p class="section-label" v-reveal>{{ t('home.gallery_label') }}</p>
        <div class="gallery-preview-layout">
          <div class="gallery-preview-text" v-reveal="60">
            <h2>{{ t('home.gallery_title') }}</h2>
            <p class="gallery-preview-sub">{{ t('home.gallery_sub') }}</p>
            <RouterLink to="/gallery" class="btn btn-dark gallery-preview-cta">{{ t('home.gallery_cta') }}</RouterLink>
          </div>
          <div class="gallery-preview-mosaic" v-reveal="160">
            <div class="gp-tall">
              <img src="https://business-region.eu/files/IMG_2316-scaled.jpg" alt="Business networking event" loading="lazy" />
            </div>
            <div class="gp-thumb">
              <img src="https://business-region.eu/files/DSCF1527-scaled.jpg" alt="Business forum" loading="lazy" />
            </div>
            <div class="gp-thumb">
              <img src="https://business-region.eu/files/DSCF2411-scaled.jpg" alt="Workshop session" loading="lazy" />
            </div>
            <div class="gp-thumb">
              <img src="https://business-region.eu/files/Toender-erhvervsraad-foto-35.png" alt="Networking event" loading="lazy" />
            </div>
            <div class="gp-thumb">
              <img src="https://business-region.eu/files/499486693_122233284356231581_4383041403785374662_n.jpg" alt="Community gathering" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <section class="section newsletter-cta">
      <div class="container newsletter-cta-inner">
        <div class="newsletter-text" v-reveal>
          <p class="section-label" style="color:rgba(255,255,255,0.5)">{{ t('home.news_label') }}</p>
          <h2 style="color:var(--white)">{{ t('home.news_title') }}</h2>
          <p style="color:rgba(255,255,255,0.6);margin-top:0.75rem">{{ t('home.news_sub') }}</p>
        </div>
        <form class="newsletter-form" v-reveal="120" @submit.prevent="goNewsletter">
          <input v-model="newsletterEmail" type="email" :placeholder="t('home.news_placeholder')" />
          <button type="submit" class="btn btn-dark">{{ t('home.news_btn') }}</button>
        </form>
      </div>
    </section>

    <!-- Quick Clips from the Field -->
    <section class="section shorts-section">
      <div class="container">
        <p class="section-label" v-reveal>Quick Clips</p>
        <h2 v-reveal="60">Quick Clips from the Field</h2>
        <div class="shorts-grid">
          <div class="short-card" v-for="(clip, i) in clips" :key="i" v-reveal="i * 100">
            <div class="short-frame">
              <video class="short-vid" autoplay muted loop playsinline @error="handleVideoError">
                <source :src="`/videos/${clip.filename}`" type="video/mp4" />
              </video>
              <RouterLink :to="`/${clip.route}`" class="short-overlay">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </RouterLink>
            </div>
            <p class="short-title">{{ clip.title }}</p>
            <p class="short-desc">{{ clip.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const search = ref('')
const newsletterEmail = ref('')

const clips = [
  { filename: 'short1.mp4', route: 'insights', title: 'Business Insights', description: 'Expert perspectives on industry trends' },
  { filename: 'short2.mp4', route: 'interviews', title: 'Success Stories', description: 'Inspiring entrepreneur interviews' },
  { filename: 'short3.mp4', route: 'updates', title: 'Market Updates', description: 'Latest business region developments' },
]

function goSearch() {
  if (search.value.trim()) {
    router.push({ path: '/network', query: { q: search.value } })
  }
}

function goNewsletter() {
  router.push({ path: '/newsletter', query: newsletterEmail.value ? { email: newsletterEmail.value } : {} })
}

function handleVideoError(e) {
  console.error('Video load error:', e)
}
</script>

<style scoped>
/* ── Hero entrance animations ── */
.anim-1, .anim-2, .anim-3, .anim-4, .anim-5 {
    display: flex;
    align-items: center;
    animation: heroFadeUp 0.7s ease both;
}
.anim-1 { animation-delay: 0.05s; }
.anim-2 { animation-delay: 0.18s; }
.anim-3 { animation-delay: 0.32s; }
.anim-4 { animation-delay: 0.46s; }
.anim-5 { animation-delay: 0.60s; }

/* ── Hero ── */
.home-hero {
  background: var(--navy);
  padding: 6rem 0 5.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13,22,40,0.80) 0%, rgba(13,22,40,0.70) 100%);
  z-index: 0;
  pointer-events: none;
}

.hero-content { max-width: 680px; margin: 0 auto; position: relative; z-index: 2; }

.hero-label {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.1rem;
  border: 1px solid rgba(255,255,255,0.12);
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-pill);
}

.home-hero h1 {
  color: var(--white);
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.08;
  margin-bottom: 1.25rem;
}

.hero-sub {
  color: rgba(255,255,255,0.55);
  font-size: 1.05rem;
  margin-bottom: 2rem;
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: var(--radius-pill);
  padding: 0.85rem 1.5rem;
  max-width: 480px;
  margin: 0 auto 2rem;
  color: rgba(255,255,255,0.45);
  transition: border-color 0.25s ease, background 0.25s ease;
}

.hero-search:focus-within {
  border-color: rgba(255,255,255,0.35);
  background: rgba(255,255,255,0.1);
}

.hero-search input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 0.92rem;
  color: var(--white);
}

.hero-search input::placeholder { color: rgba(255,255,255,0.4); }

.hero-ctas {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── Offer Cards ── */
.offer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.offer-card {
  display: block;
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--grey-200);
  border-left: 3px solid var(--navy);
  border-radius: var(--radius-md);
  background: var(--white);
  text-decoration: none;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-left-color 0.3s ease;
}

.offer-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transform: translateY(-4px);
  border-left-color: #2563EB;
}

.offer-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.offer-card:hover .offer-icon { transform: scale(1.1) rotate(-5deg); }
.offer-card h3 { color: var(--text); margin-bottom: 0.5rem; font-size: 1rem; }
.offer-card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }

/* ── Focus Areas ── */
.focus-section { background: var(--grey-50); }

.focus-sub {
  margin-top: 0.75rem;
  margin-bottom: 2.5rem;
  max-width: 560px;
}

.focus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
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

.focus-item:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  transform: translateY(-3px);
}

.focus-num { font-size: 0.78rem; font-weight: 800; color: var(--grey-300); flex-shrink: 0; margin-top: 0.1rem; }
.focus-item:hover .focus-num { color: var(--navy); }
.focus-item h4 { font-size: 0.92rem; margin-bottom: 0.3rem; }
.focus-item p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }

/* ── Gallery Preview ── */
.gallery-preview-section { background: var(--grey-50); }

.gallery-preview-layout {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 3.5rem;
  align-items: center;
  margin-top: 1.5rem;
}

.gallery-preview-text h2 { margin-bottom: 1rem; }
.gallery-preview-sub { font-size: 0.92rem; color: var(--text-muted); line-height: 1.7; max-width: 340px; }
.gallery-preview-cta { margin-top: 1.75rem; display: inline-flex; }

.gallery-preview-mosaic {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  grid-template-rows: 200px 200px;
  gap: 0.5rem;
}

.gp-tall {
  grid-row: 1 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.gp-tall img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; display: block; }
.gp-tall:hover img { transform: scale(1.04); }

.gp-thumb {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.gp-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; display: block; }
.gp-thumb:hover img { transform: scale(1.06); }

/* ── Newsletter CTA ── */
.newsletter-cta { background: var(--navy); }

.newsletter-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.newsletter-text { flex: 1; min-width: 220px; }
.newsletter-form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.newsletter-form input {
  padding: 0.7rem 1.25rem;
  border-radius: var(--radius-pill);
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.07);
  color: var(--white);
  font-size: 0.9rem;
  outline: none;
  width: 240px;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.newsletter-form input::placeholder { color: rgba(255,255,255,0.35); }
.newsletter-form input:focus {
  border-color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.1);
}

.newsletter-form .btn-dark {
  background: var(--white);
  color: var(--navy);
  border-color: var(--white);
}

.newsletter-form .btn-dark:hover { background: var(--grey-100); border-color: var(--grey-100); }

/* ── Shorts Section ── */
.shorts-section { background: var(--white); padding: 3rem 0; }

.shorts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.short-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.short-card:hover {
  transform: translateY(-8px);
}

.short-frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--navy);
  aspect-ratio: 9/16;
  width: 100%;
}

.short-vid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.short-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s ease, background 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.short-card:hover .short-overlay {
  opacity: 1;
  background: rgba(0,0,0,0.5);
}

.short-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.short-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .shorts-grid { 
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .short-title { font-size: 1rem; }
  .short-desc { font-size: 0.85rem; }
}

@media (max-width: 480px) {
  .shorts-grid { 
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
