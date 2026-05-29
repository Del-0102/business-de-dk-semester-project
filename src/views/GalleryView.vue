<template>
  <div>
    <div class="page-hero gallery-hero">
      <div class="container page-hero-inner">
        <span class="page-hero-label">{{ $t('gallery.label') }}</span>
        <h1>{{ $t('gallery.title') }}</h1>
        <p>{{ $t('gallery.sub') }}</p>
      </div>
    </div>

    <!-- Photo Grid -->
    <section class="section">
      <div class="container">
        <div class="gallery-grid">
          <div
            v-for="(item, i) in gallery"
            :key="i"
            class="gallery-item"
            :class="{ large: item.large }"
            v-reveal="i * 55"
            @click="lightbox = item"
          >
            <img :src="item.src" :alt="item.caption" loading="lazy" class="gallery-img" />
            <div class="gallery-overlay">
              <span class="gallery-caption-text">{{ item.caption }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Member Testimonials -->
    <section class="section testimonials-section">
      <div class="container">
        <p class="section-label" v-reveal>{{ $t('gallery.testimonials_label') }}</p>
        <h2 v-reveal="60">{{ $t('gallery.testimonials_title') }}</h2>
        <div class="testimonials-grid">
          <div v-for="(item, i) in testimonials" :key="i" class="testimonial-card card" v-reveal="i * 90">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="quote-icon"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            <p class="testimonial-quote">{{ item.quote }}</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">{{ item.initials }}</div>
              <div class="testimonial-info">
                <strong>{{ item.name }}</strong>
                <span>{{ item.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Share Your Experience -->
    <section class="section share-section">
      <div class="container share-inner">
        <div class="share-text" v-reveal>
          <p class="section-label" style="color:rgba(255,255,255,0.45)">{{ $t('gallery.share_label') }}</p>
          <h2 style="color:var(--white)">{{ $t('gallery.share_title') }}</h2>
          <p class="share-sub">{{ $t('gallery.share_sub') }}</p>
        </div>
        <form v-if="!shareSubmitted" class="share-form" v-reveal="130" @submit.prevent="submitShare">
          <div class="share-row">
            <input v-model="shareForm.name" type="text" :placeholder="$t('gallery.share_name')" required />
            <input v-model="shareForm.company" type="text" :placeholder="$t('gallery.share_company')" />
          </div>
          <textarea v-model="shareForm.message" :placeholder="$t('gallery.share_message')" rows="4" required></textarea>
          <button type="submit" class="share-btn">{{ $t('gallery.share_submit') }}</button>
        </form>
        <div v-else class="share-success" v-reveal>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          <p>{{ $t('gallery.share_success') }}</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="lightbox" class="lightbox-overlay" @click.self="lightbox = null">
        <div class="lightbox-box">
          <button class="lightbox-close" @click="lightbox = null">✕</button>
          <img :src="lightbox.src" :alt="lightbox.caption" class="lightbox-img" />
          <p class="lightbox-caption-text">{{ lightbox.caption }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

useI18n()
const lightbox = ref(null)
const shareSubmitted = ref(false)
const shareForm = ref({ name: '', company: '', message: '' })

function submitShare() {
  shareSubmitted.value = true
}

const gallery = [
  { src: 'https://business-region.eu/files/IMG_2316-scaled.jpg', caption: 'Cross-border networking event, Tønder 2025', large: true },
  { src: 'https://business-region.eu/files/DSCF1527-scaled.jpg', caption: 'Business forum, Southern Jutland' },
  { src: 'https://business-region.eu/files/DSCF2411-scaled.jpg', caption: 'Workshop session, Flensburg' },
  { src: 'https://business-region.eu/files/oender-erhvervsraad-foto-1.png', caption: 'Tønder Erhvervsråd annual meeting' },
  { src: 'https://business-region.eu/files/Toender-erhvervsraad-foto-35.png', caption: 'Tønder Business Council', large: true },
  { src: 'https://business-region.eu/files/499486693_122233284356231581_4383041403785374662_n.jpg', caption: 'Networking breakfast, Sønderjylland' },
  { src: 'https://business-region.eu/files/dhfdhd.jpg', caption: 'DE-DK Partnership forum' },
]

const testimonials = [
  {
    quote: 'The cross-border networking events have been invaluable for our expansion into the Danish market. We found two key partners in just one evening.',
    name: 'Karen Schmidt',
    role: 'HR Director · Norddeutsche GmbH',
    initials: 'KS',
  },
  {
    quote: 'Through Business DE-DK, we connected with German distributors that perfectly matched our logistics needs. The matchmaking truly works.',
    name: 'Thomas Bundgaard',
    role: 'CEO · Sønderborg Export A/S',
    initials: 'TB',
  },
  {
    quote: 'The forums bring together exactly the right people. In three sessions, we initiated five new cross-border collaborations that are still running today.',
    name: 'Petra Hoffmann',
    role: 'Partnership Manager · IHK Schleswig-Holstein',
    initials: 'PH',
  },
]
</script>

<style scoped>
/* Gallery grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 230px;
  gap: 0.75rem;
}
.gallery-item {
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.gallery-item.large { grid-column: span 2; }
.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}
.gallery-item:hover .gallery-img { transform: scale(1.05); }
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13,22,40,0.78) 0%, transparent 55%);
  display: flex;
  align-items: flex-end;
  padding: 0.9rem 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.gallery-item:hover .gallery-overlay { opacity: 1; }
.gallery-caption-text {
  color: rgba(255,255,255,0.9);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Testimonials */
.testimonials-section { background: var(--grey-50); }
.testimonials-section h2 { margin-top: 0.5rem; margin-bottom: 0; }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 2rem;
}
.testimonial-card {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.quote-icon { color: var(--grey-300); flex-shrink: 0; }
.testimonial-quote {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.75;
  flex: 1;
  font-style: italic;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}
.testimonial-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--navy);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}
.testimonial-info strong { display: block; font-size: 0.88rem; color: var(--text); line-height: 1.3; }
.testimonial-info span { font-size: 0.78rem; color: var(--text-muted); }

/* Share section */
.share-section { background: var(--navy); }
.share-inner {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}
.share-sub { color: rgba(255,255,255,0.5); font-size: 0.88rem; line-height: 1.75; margin-top: 0.75rem; }
.share-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.share-row { display: flex; gap: 0.75rem; }
.share-row input { flex: 1; }
.share-form input,
.share-form textarea {
  width: 100%;
  padding: 0.72rem 1rem;
  border: 1.5px solid rgba(255,255,255,0.14);
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.06);
  color: var(--white);
  font-size: 0.88rem;
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.25s ease, background 0.25s ease;
  box-sizing: border-box;
}
.share-form input::placeholder,
.share-form textarea::placeholder { color: rgba(255,255,255,0.33); }
.share-form input:focus,
.share-form textarea:focus {
  border-color: rgba(255,255,255,0.38);
  background: rgba(255,255,255,0.1);
}
.share-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.72rem 1.75rem;
  background: var(--white);
  color: var(--navy);
  border: none;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s ease, transform 0.2s ease;
}
.share-btn:hover { background: var(--grey-100); transform: translateY(-2px); }
.share-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 2rem;
  text-align: center;
}
.share-success p { color: rgba(255,255,255,0.65); font-size: 0.95rem; line-height: 1.6; }

/* Gallery hero */
.gallery-hero {
  position: relative;
  background-image: url('https://business-region.eu/files/IMG_2316-scaled.jpg');
  background-size: cover;
  background-position: center 35%;
}
.gallery-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13,22,40,0.90) 0%, rgba(13,22,40,0.80) 100%);
  pointer-events: none;
}
.gallery-hero .page-hero-inner { position: relative; z-index: 1; }

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.lightbox-box {
  position: relative;
  max-width: 920px;
  width: 100%;
}
.lightbox-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.lightbox-close:hover { opacity: 1; transform: scale(1.15); }
.lightbox-img {
  width: 100%;
  max-height: 76vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  display: block;
}
.lightbox-caption-text {
  color: rgba(255,255,255,0.55);
  font-size: 0.85rem;
  text-align: center;
  margin-top: 0.75rem;
}

/* Fade transition */
.fade-enter-active { transition: opacity 0.25s ease; }
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Responsive */
@media (max-width: 900px) {
  .testimonials-grid { grid-template-columns: 1fr; }
  .share-inner { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-item.large { grid-column: span 2; }
}
@media (max-width: 540px) {
  .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
  .gallery-item.large { grid-column: span 1; }
  .share-row { flex-direction: column; }
}
</style>
