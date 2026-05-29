<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">{{ $t('advisors.label') }}</span>
        <h1>{{ $t('advisors.title') }}</h1>
        <p>{{ $t('advisors.sub') }}</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid-3">
          <div class="card advisor-card" v-for="a in advisors" :key="a.name">
            <div class="advisor-avatar">
              <img :src="`${base}${a.photo.slice(1)}`" :alt="a.name" class="advisor-avatar-img" />
            </div>
            <div class="advisor-body">
              <h3>{{ a.name }}</h3>
              <p class="advisor-title">{{ getTitle(a) }}</p>
              <p class="advisor-org">{{ a.org }}</p>
              <div class="advisor-contact">
                <p><strong>{{ $t('common.phone') }}:</strong> <a :href="`tel:${a.phone}`">{{ a.phone }}</a></p>
                <p><strong>{{ $t('common.email') }}:</strong> <a :href="`mailto:${a.email}`">{{ a.email }}</a></p>
              </div>
              <p class="advisor-bio">{{ getLocalized(a.bio) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { advisors } from '../data/advisors.js'
import { useSeoMeta } from '../composables/useSeoMeta.js'

useSeoMeta('advisors.meta_title', 'advisors.meta_desc')
const { t, locale } = useI18n()
const base = import.meta.env.BASE_URL

function getTitle(advisor) {
  const key = `${locale.value}` 
  if (key === 'en') return advisor.titleEn
  if (key === 'de') return advisor.title
  if (key === 'da') return advisor.titleDa
  return advisor.title
}

function getLocalized(value) {
  if (typeof value === 'object') {
    return value[locale.value] || value.en || ''
  }
  return value
}
</script>

<style scoped>
.advisor-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 0; }
.advisor-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--grey-200);
  margin-bottom: 1rem;
  flex-shrink: 0;
}
.advisor-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  transform: scale(1.18);
}
.advisor-body h3 { font-size: 0.98rem; margin-bottom: 0.15rem; }
.advisor-title { font-size: 0.82rem; color: var(--grey-400); }
.advisor-org { font-size: 0.82rem; font-weight: 600; color: var(--text); }
.advisor-contact {
  font-size: 0.8rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--grey-200);
}
.advisor-contact p {
  margin: 0.35rem 0;
  line-height: 1.4;
}
.advisor-contact a {
  color: var(--navy);
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.advisor-contact a:hover { opacity: 0.7; }
.advisor-bio { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin-top: 0.75rem; }
</style>
