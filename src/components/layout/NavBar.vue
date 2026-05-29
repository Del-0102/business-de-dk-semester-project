<template>
  <header class="navbar" :class="{ scrolled }">
    <div v-if="menuOpen" class="nav-overlay" @click="closeMenu"></div>
    <div class="container navbar-inner">

      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <img src="/logos/logo-dark.png" alt="Business Region" class="logo-img" />
      </RouterLink>

      <!-- Centered nav links -->
      <nav class="nav-links" :class="{ open: menuOpen }">
        <RouterLink to="/" exact-active-class="active" @click="closeMenu">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/network" active-class="active" @click="closeMenu">{{ t('nav.network') }}</RouterLink>
        <RouterLink to="/interviews" active-class="active" @click="closeMenu">{{ t('nav.interviews') }}</RouterLink>
        <RouterLink to="/events" active-class="active" @click="closeMenu">{{ t('nav.events') }}</RouterLink>
        <RouterLink to="/about" active-class="active" @click="closeMenu">{{ t('nav.about') }}</RouterLink>
      </nav>

      <!-- Right: language + hamburger -->
      <div class="nav-right">
        <div class="lang-menu" ref="langMenuRef">
          <button class="lang-btn" @click="langOpen = !langOpen">
            {{ currentLang }}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <div v-if="langOpen" class="lang-dropdown">
            <button v-for="l in langs" :key="l.code" :class="{ active: locale === l.code }" @click="setLang(l.code)">
              {{ l.label }}
            </button>
          </div>
        </div>
        <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const menuOpen = ref(false)
const langOpen = ref(false)
const langMenuRef = ref(null)
const scrolled = ref(false)

const langs = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'da', label: 'Dansk' }
]

const currentLang = computed(() => locale.value.toUpperCase())

function setLang(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  langOpen.value = false
}

function closeMenu() { menuOpen.value = false }

function onClickOutside(e) {
  if (langMenuRef.value && !langMenuRef.value.contains(e.target)) {
    langOpen.value = false
  }
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--white);
  border-bottom: 1px solid var(--grey-200);
  height: 66px;
  transition: height 0.25s ease, box-shadow 0.25s ease;
}
.navbar.scrolled {
  height: 60px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
.navbar-inner {
  display: flex;
  align-items: center;
  height: 100%;
}

/* Logo */
.logo {
  flex: 0 0 auto;
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 100%;
  transition: opacity 0.2s ease;
}
.logo:hover { opacity: 0.8; }
.logo-img {
  height: 56px;
  width: auto;
  max-width: 240px;
}

/* Nav links — truly centered */
.nav-links {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}
.nav-links a {
  position: relative;
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--grey-600);
  transition: color var(--transition);
  white-space: nowrap;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: var(--navy);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform var(--transition);
}
.nav-links a:hover { color: var(--text); }
.nav-links a.active {
  color: var(--text);
  font-weight: 700;
}
.nav-links a.active::after { transform: scaleX(1); }

/* Right */
.nav-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Language menu */
.lang-menu { position: relative; }
.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  border: 1.5px solid var(--grey-200);
  border-radius: var(--radius-pill);
  background: var(--white);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: border-color var(--transition);
}
.lang-btn:hover { border-color: var(--grey-400); }
.lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  overflow: hidden;
  min-width: 110px;
  z-index: 10;
}
.lang-dropdown button {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  text-align: left;
  background: none;
  border: none;
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition);
}
.lang-dropdown button:hover { background: var(--grey-50); color: var(--text); }
.lang-dropdown button.active { color: var(--navy); font-weight: 700; background: var(--grey-100); }

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  padding: 0.4rem;
}
.hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }

/* Mobile overlay backdrop */
.nav-overlay {
  display: none;
  position: fixed;
  inset: 60px 0 0 0;
  background: rgba(0,0,0,0.35);
  z-index: 99;
}

@media (max-width: 768px) {
  .nav-overlay { display: block; }
  .hamburger { display: flex; }
  .nav-links {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--white);
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 1.5rem 1.5rem;
    border-top: 1px solid var(--grey-200);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    z-index: 100;
  }
  .nav-links.open { display: flex; }
  .nav-links a { padding: 0.75rem 0; border-bottom: 1px solid var(--grey-100); }
  .nav-links a::after { display: none; }
}
</style>
