<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <RouterLink to="/" class="footer-logo">
          <img src="/logos/white-logo.svg" alt="Business DE-DK — Cross-Border Business Network Denmark Germany" class="footer-logo-img" />
        </RouterLink>
        <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
        <div class="footer-socials">
          <a href="https://www.facebook.com/dedkofficial/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/business-de-dk" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.youtube.com/@BusinessDEDK" target="_blank" rel="noopener" aria-label="YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/></svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4>{{ $t('footer.links') }}</h4>
        <RouterLink to="/network">{{ $t('nav.network') }}</RouterLink>
        <RouterLink to="/interviews">{{ $t('nav.interviews') }}</RouterLink>
        <RouterLink to="/events">{{ $t('nav.events') }}</RouterLink>
        <RouterLink to="/gallery">{{ $t('nav.gallery') }}</RouterLink>
        <RouterLink to="/about">{{ $t('nav.about') }}</RouterLink>
        <RouterLink to="/advisors">{{ $t('nav.advisors') }}</RouterLink>
        <RouterLink to="/join">{{ $t('nav.join') }}</RouterLink>
      </div>

      <div class="footer-col">
        <h4>{{ $t('footer.contact') }}</h4>
        <p>Vestergade 9<br>6270 Tønder, Denmark</p>
        <a href="tel:+4521775916" aria-label="Call Business DE-DK">+45 21 77 59 16</a>
        <a href="mailto:info@business-region.eu" aria-label="Email Business DE-DK">info@business-region.eu</a>
        <RouterLink to="/newsletter">{{ $t('nav.newsletter') }}</RouterLink>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>{{ $t('footer.funded') }}</p>
        <p>© {{ year }} Business DE-DK. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--navy);
  color: rgba(255,255,255,0.55);
  margin-top: auto;
}
.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding: 3.5rem 0 2.5rem;
}

.footer-logo {
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1rem;
  height: 50px;
}
.footer-logo-img {
  height: 100%;
  width: auto;
  max-width: 220px;
}

.footer-tagline { font-size: 0.85rem; line-height: 1.6; max-width: 240px; margin-bottom: 1.25rem; }
.footer-socials { display: flex; gap: 0.6rem; }
.footer-socials a {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.55);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--transition), color var(--transition);
}
.footer-socials a:hover { background: rgba(255,255,255,0.15); color: var(--white); }

.footer-col h4 {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--white);
  margin-bottom: 1rem;
}
.footer-col a,
.footer-col p {
  display: block;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 0.5rem;
  line-height: 1.5;
  transition: color var(--transition);
}
.footer-col a:hover { color: var(--white); }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 1.25rem 0;
}
.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.footer-bottom p { font-size: 0.75rem; color: rgba(255,255,255,0.3); }

@media (max-width: 768px) {
  .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
  .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 600px) {
  .footer-inner { text-align: center; }
  .footer-socials { justify-content: center; }
  .footer-tagline { max-width: 100%; }
  .footer-col ul { list-style: none; padding: 0; }
  .footer-bottom-inner { align-items: center; text-align: center; }
}
</style>
