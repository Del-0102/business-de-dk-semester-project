<template>
  <div>
    <!-- Page hero -->
    <div class="page-hero network-hero">
      <div class="container page-hero-inner">
        <div>
          <span class="page-hero-label">{{ $t('network.label') }}</span>
          <h1>{{ $t('network.title') }}</h1>
          <p v-html="$t('network.intro')"></p>
        </div>
        <div class="hero-stat-card">
          <div><span class="stat-num">{{ members.length }}</span><span class="stat-label">{{ $t('network.stats_members') }}</span></div>
          <div><span class="stat-num">2</span><span class="stat-label">{{ $t('network.stats_countries') }}</span></div>
          <div><span class="stat-num">{{ sectors.filter(s => s !== 'All').length }}</span><span class="stat-label">{{ $t('network.stats_sectors') }}</span></div>
        </div>
      </div>
    </div>
 
    <!-- Filter bar -->
    <div class="container">
      <div class="filter-bar">
        <div class="search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input v-model="search" type="text" :placeholder="$t('network.search_placeholder')" />
        </div>
        <button v-for="f in sectors" :key="f" :class="['pill', activeFilter === f ? 'active' : '']" @click="activeFilter = f">{{ catLabel(f) }}</button>
      </div>
    </div>
 
    <!-- Members -->
    <div class="container" style="padding-top: 0.75rem; padding-bottom: 3rem; overflow: hidden;">
      <div class="members-meta">
        <span>{{ $t('network.showing') }} {{ filtered.length }} {{ $t('network.members') }}</span>
        <span>{{ $t('network.sort_by') }}</span>
      </div>
 
      <div class="members-grid">
        <RouterLink
          v-for="m in filtered"
          :key="m.id"
          :to="`/network/${m.id}`"
          class="member-card card"
        >
          <div class="member-top">
            <div class="member-avatar">
              <img :src="`${base}${m.logo.slice(1)}`" :alt="m.name" class="member-logo" />
            </div>
            <div class="member-info">
              <div class="member-name-row">
                <h3>{{ m.name }}</h3>
                <span :class="['badge-country', m.country === 'DE' ? 'badge-de' : 'badge-dk']">{{ m.country }}</span>
              </div>
              <p class="member-role">{{ localized(m.role) }}</p>
              <p class="member-company">{{ m.company }}</p>
            </div>
          </div>
          <p class="member-bio">{{ localized(m.bio) }}</p>
          <div class="member-bottom">
            <span class="tag">{{ catLabel(m.sector) }}</span>
            <span class="view-profile">{{ $t('common.view_all') }} →</span>
          </div>
        </RouterLink>
      </div>
 
      <p v-if="!filtered.length" class="no-results">{{ $t('network.no_results') }}</p>
    </div>
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { members, sectors } from '../data/members.js'
import { useSeoMeta } from '../composables/useSeoMeta.js'

useSeoMeta('network.meta_title', 'network.meta_desc')
 
const { t, locale } = useI18n()
const base = import.meta.env.BASE_URL
const route = useRoute()
const search = ref(route.query.q || '')
const activeFilter = ref('All')
 
// Maps a raw data value (e.g. "Public Sector") to its translated label.
// The pill click-value stays the raw English so filtering keeps matching the data.
function catLabel(v) {
  return t('categories.' + v.toLowerCase().replace(/[\s-]+/g, '_'))
}

function localized(value) {
  if (typeof value === 'string') return value
  return value?.[locale.value] || value?.en || ''
}
 
const filtered = computed(() => members.filter(m => {
  const matchFilter = activeFilter.value === 'All' || m.sector === activeFilter.value
  const q = search.value.toLowerCase()
  const matchSearch = !q ||
    m.name.toLowerCase().includes(q) ||
    m.company.toLowerCase().includes(q) ||
    catLabel(m.sector).toLowerCase().includes(q) ||
    localized(m.role).toLowerCase().includes(q) ||
    localized(m.bio).toLowerCase().includes(q)
  return matchFilter && matchSearch
}))
</script>
 
<style scoped>
.members-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0 1rem;
  font-size: 0.85rem;
  color: var(--grey-400);
}
 
.members-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  width: 100%;
}

.members-grid > * {
  min-width: 0;
}
 
.member-card {
  display: block;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
 
.member-top {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}
.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-sm);
  background: var(--white);
  border: 1px solid var(--grey-200);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
  overflow: hidden;
}
.member-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.member-info { flex: 1; min-width: 0; }
.member-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.15rem;
}
.member-name-row h3 { font-size: 0.95rem; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.member-role { font-size: 0.8rem; color: var(--grey-400); margin-bottom: 0.1rem; }
.member-company { font-size: 0.82rem; font-weight: 600; color: var(--text); }
 
.member-bio { font-size: 0.83rem; color: var(--text-muted); line-height: 1.6; flex: 1; }
 
.member-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}
.view-profile {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
.member-card:hover .view-profile { color: var(--navy); }
 
.no-results { text-align: center; color: var(--grey-400); padding: 3rem 0; }
 
.network-hero {
  position: relative;
  background-image: url('/images/network.png');
  background-size: cover;
  background-position: center 30%;
}
.network-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13,22,40,0.88) 0%, rgba(13,22,40,0.78) 100%);
  pointer-events: none;
}
.network-hero .page-hero-inner {
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) { .members-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) {
  .members-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    overflow-x: visible;
    flex-wrap: wrap;
  }
  .filter-bar .search-wrap { width: 100%; }
  .filter-bar .search-wrap input { width: 100%; }
}
</style>