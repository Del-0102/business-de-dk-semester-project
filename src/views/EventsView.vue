<template>
  <div>
    <div class="page-hero events-hero">
      <div class="container page-hero-inner">
        <div>
          <span class="page-hero-label">{{ $t('events.label') }}</span>
          <h1>{{ $t('events.title') }}</h1>
          <p>{{ $t('events.intro') }}</p>
        </div>
        <div class="hero-stat-card single">
          <span class="stat-num">{{ events.length }}</span>
          <span class="stat-label">{{ $t('events.stats') }}</span>
        </div>
      </div>
    </div>
 
    <!-- Filters -->
    <div class="container">
      <div class="filter-bar" style="justify-content:space-between;">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
          <button v-for="type in eventTypes" :key="type" :class="['pill', activeType === type ? 'active' : '']" @click="activeType = type">{{ catLabel(type) }}</button>
        </div>
        <select class="sort-select" v-model="sort">
          <option value="latest">{{ $t('events.sort_latest') }}</option>
          <option value="oldest">{{ $t('events.sort_oldest') }}</option>
        </select>
      </div>
    </div>
 
    <!-- Event cards (dark) -->
    <div class="container events-grid-wrap">
      <div class="events-grid">
        <div v-for="ev in filtered" :key="ev.id" class="event-card">
          <div class="event-header">
            <div class="event-date">
              <span class="event-month">{{ localized(ev.monthShort) }}</span>
              <span class="event-day">{{ ev.day }}</span>
            </div>
            <span class="event-type-badge">{{ catLabel(ev.type) }}</span>
          </div>
          <h3 class="event-title">{{ localized(ev.title) }}</h3>
          <p class="event-location">
            <span class="location-dot"></span>
            {{ ev.location }}
          </p>
          <div class="event-footer">
            <RouterLink to="/contact" class="register-link">{{ $t('events.register') }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { events, eventTypes } from '../data/events.js'
import { useSeoMeta } from '../composables/useSeoMeta.js'

useSeoMeta('events.meta_title', 'events.meta_desc')
 
const { t, locale } = useI18n()
const activeType = ref('All')
const sort = ref('latest')
 
// Maps a raw data value (e.g. "Public Sector") to its translated label.
// The pill click-value stays the raw English so filtering keeps matching the data.
function catLabel(v) {
  return t('categories.' + v.toLowerCase().replace(/[\s-]+/g, '_'))
}

function localized(value) {
  if (typeof value === 'string') return value
  return value?.[locale.value] || value?.en || ''
}
 
const filtered = computed(() => {
  let list = activeType.value === 'All' ? [...events] : events.filter(e => e.type === activeType.value)
  return list
})
</script>
 
<style scoped>
.events-grid-wrap { padding-top: 2rem; padding-bottom: 3.5rem; }
.events-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
 
/* Dark event card */
.event-card {
  background: var(--navy);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background var(--transition);
}
.event-card:hover { background: var(--navy-700); }
 
.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.event-date { display: flex; flex-direction: column; }
.event-month {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.45);
  text-transform: uppercase;
}
.event-day {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--white);
  line-height: 1;
  margin-top: 0.1rem;
}
 
.event-type-badge {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.75);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-pill);
}
 
.event-title {
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
}
.event-location {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
}
.location-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.35);
  flex-shrink: 0;
}
 
.event-footer { margin-top: auto; display: flex; justify-content: flex-end; }
.register-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--white);
  text-decoration: none;
  transition: opacity var(--transition);
}
.register-link:hover { opacity: 0.7; }
 
.sort-select {
  padding: 0.4rem 0.8rem;
  border: 1.5px solid var(--grey-200);
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  color: var(--text);
  background: var(--white);
  outline: none;
  cursor: pointer;
}
 
@media (max-width: 640px) {
  .events-grid { grid-template-columns: 1fr; }
  .filter-bar {
    flex-direction: column !important;
    align-items: stretch;
    gap: 0.75rem;
    overflow-x: visible;
    flex-wrap: wrap;
  }
  .filter-bar > div { overflow-x: auto; flex-wrap: nowrap; display: flex; gap: 0.5rem; padding-bottom: 0.25rem; }
  .sort-select { width: 100%; }
}

.events-hero {
  position: relative;
  background-image: url('/images/events-bg.png');
  background-size: cover;
  background-position: center 40%;
}
.events-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13,22,40,0.88) 0%, rgba(13,22,40,0.78) 100%);
  pointer-events: none;
}
.events-hero .page-hero-inner {
  position: relative;
  z-index: 1;
}
</style>