<template>
  <div v-if="member">

    <!-- Hero -->
    <div class="profile-hero">
      <div class="container profile-hero-inner">
        <!-- Left column -->
        <div class="profile-hero-left">
          <RouterLink to="/network" class="back-link">{{ $t('stakeholder.back_link') }}</RouterLink>
          <div class="profile-meta-top">
            <span :class="['badge-country', member.country === 'DE' ? 'badge-de' : 'badge-dk']">
              {{ member.country === 'DE' ? $t('stakeholder.country_de') : $t('stakeholder.country_dk') }}
            </span>
            <span class="profile-sector-tag">{{ catLabel(member.sector) }}</span>
          </div>
          <h1 class="profile-name">{{ member.name }}</h1>
          <p class="profile-role">{{ localized(member.role) }}</p>
          <p class="profile-company">{{ member.company }}</p>
        </div>

        <!-- Right column: large logo -->
        <div class="profile-hero-right">
          <div class="profile-logo-circle">
            <img :src="member.logo" :alt="member.name" class="profile-logo-img" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <section class="profile-body">
      <div class="container profile-layout">

        <!-- About -->
        <div class="profile-about">
          <h2 class="profile-section-heading">{{ $t('stakeholder.about') }}</h2>
          <p class="profile-bio">{{ localized(member.bio) }}</p>
          <span class="tag profile-tag">{{ catLabel(member.sector) }}</span>
        </div>

        <!-- Sidebar -->
        <aside class="profile-sidebar">
          <div class="profile-info-card">
            <div class="info-row">
              <span class="info-label">{{ $t('stakeholder.sector') }}</span>
              <span class="info-value">{{ catLabel(member.sector) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ $t('stakeholder.country') }}</span>
              <span class="info-value">
                {{ member.country === 'DE' ? $t('stakeholder.country_de') : $t('stakeholder.country_dk') }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">{{ $t('stakeholder.company') }}</span>
              <span class="info-value">{{ member.company }}</span>
            </div>
            <RouterLink to="/contact" class="btn btn-dark contact-btn">
              {{ $t('stakeholder.contact_btn') }}
            </RouterLink>
          </div>
        </aside>
      </div>

      <!-- Share bar -->
      <div class="container">
        <div class="share-bar">
          <span class="share-label">{{ $t('stakeholder.share') }}</span>
          <div class="share-icons">
            <a class="share-icon" :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`" target="_blank" rel="noopener" aria-label="Share on Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a class="share-icon" :href="`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`" target="_blank" rel="noopener" aria-label="Share on LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a class="share-icon" :href="`mailto:?subject=${member.name}&body=${pageUrl}`" aria-label="Share via email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Not found -->
  <div v-else class="section">
    <div class="container not-found">
      <h2>{{ $t('stakeholder.not_found') }}</h2>
      <RouterLink to="/network" class="btn btn-dark" style="margin-top:1.5rem;display:inline-flex">
        {{ $t('stakeholder.back_link') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { members } from '../data/members.js'

const { t, locale } = useI18n()
const route = useRoute()
const member = computed(() => members.find(m => m.id === Number(route.params.id)))
const pageUrl = computed(() => encodeURIComponent(window.location.href))

function localized(value) {
  if (typeof value === 'string') return value
  return value?.[locale.value] || value?.en || ''
}

function catLabel(v) {
  return t('categories.' + v.toLowerCase().replace(/[\s-]+/g, '_'))
}
</script>

<style scoped>
/* ── Hero ── */
.profile-hero {
  background: var(--navy);
  padding: 2.5rem 0 3rem;
  color: var(--white);
}

.profile-hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.profile-hero-left {
  flex: 1;
  min-width: 0;
}

.back-link {
  display: inline-block;
  color: rgba(255,255,255,0.45);
  font-size: 0.82rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  transition: color var(--transition);
  letter-spacing: 0.01em;
}
.back-link:hover { color: var(--white); }

.profile-meta-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}

.profile-sector-tag {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

.profile-name {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--white);
  line-height: 1.15;
  margin-bottom: 0.5rem;
}

.profile-role {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 0.25rem;
}

.profile-company {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
}

/* ── Large circular logo ── */
.profile-hero-right {
  flex-shrink: 0;
}

.profile-logo-circle {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
  overflow: hidden;
}

.profile-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ── Body ── */
.profile-body {
  padding-bottom: 3rem;
}

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  align-items: start;
  padding-top: 3rem;
  padding-bottom: 2rem;
}

.profile-section-heading {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.85rem;
}

.profile-bio {
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 0.96rem;
  margin-bottom: 1.25rem;
}

.profile-tag {
  display: inline-block;
}

/* ── Sidebar info card ── */
.profile-info-card {
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--grey-100);
}
.info-row:last-of-type { border-bottom: none; }

.info-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--grey-400);
}

.info-value {
  font-size: 0.9rem;
  color: var(--text);
  font-weight: 500;
}

.contact-btn {
  width: 100%;
  justify-content: center;
  margin-top: 1.25rem;
}

/* ── Share bar ── */
.share-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--grey-200);
  margin-top: 0.5rem;
}

.share-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.share-icons {
  display: flex;
  gap: 0.5rem;
}

.share-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid var(--grey-200);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all var(--transition);
}
.share-icon:hover {
  border-color: var(--navy);
  color: var(--navy);
  background: var(--grey-50);
}

/* ── Not found ── */
.not-found {
  text-align: center;
  padding: 4rem 0;
}

/* ── Responsive ── */
@media (max-width: 800px) {
  .profile-hero-inner {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 1.5rem;
  }
  .profile-logo-circle {
    width: 100px;
    height: 100px;
    align-self: flex-end;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
  .profile-hero { position: relative; }
  .profile-layout { grid-template-columns: 1fr; }
  .profile-sidebar { order: -1; }
}

@media (max-width: 600px) {
  .profile-logo-circle { width: 80px; height: 80px; padding: 0.75rem; }
}
</style>
