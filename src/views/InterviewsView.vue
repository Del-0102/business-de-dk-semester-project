<template>
  <div>
    <div class="page-hero interviews-hero">
      <div class="container page-hero-inner">
        <div>
          <span class="page-hero-label">{{ $t('interviews.label') }}</span>
          <h1>{{ $t('interviews.title') }}</h1>
          <p>{{ $t('interviews.intro') }}</p>
        </div>
        <div class="hero-stat-card single">
          <span class="stat-num">{{ videos.length }}</span>
          <span class="stat-label">{{ $t('interviews.videos') }}</span>
        </div>
      </div>
    </div>
 
    <!-- Shorts -->
    <section class="shorts-section">
      <div class="container">
        <div class="shorts-header">
          <div>
            <span class="shorts-eyebrow">{{ $t('interviews.shorts_label') }}</span>
            <h2 class="shorts-heading">{{ $t('interviews.shorts_title') }}</h2>
          </div>
          <p class="shorts-sub">Business Region · {{ new Date().getFullYear() }}</p>
        </div>

        <div class="shorts-row">
          <div v-for="n in 3" :key="n" class="short-card" @click="activeShort = n">
            <div class="short-num">0{{ n }}</div>
            <div class="short-frame">
              <video class="short-vid" muted playsinline preload="metadata" @loadedmetadata="e => e.target.currentTime = 0.1">
                <source :src="`${base}videos/short-${n}.mp4`" type="video/mp4" />
              </video>
              <div class="short-overlay">
                <div class="short-play-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span class="short-cta">{{ $t('interviews.shorts_watch') }}</span>
              </div>
            </div>
            <div class="short-footer">
              <span class="short-label">Short 0{{ n }}</span>
              <span class="short-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shorts modal -->
    <Transition name="fade">
      <div v-if="activeShort" class="modal-overlay" @click.self="activeShort = null">
        <div class="shorts-modal-box">
          <button class="modal-close" @click="activeShort = null">✕</button>
          <video :key="activeShort" class="shorts-modal-vid" controls playsinline>
            <source :src="`${base}videos/short-${activeShort}.mp4`" type="video/mp4" />
          </video>
        </div>
      </div>
    </Transition>
 
    <!-- Filters -->
    <div class="container">
      <div class="filter-bar" style="justify-content: space-between;">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
          <button v-for="topic in topics" :key="topic" :class="['pill', activeTopic === topic ? 'active' : '']" @click="activeTopic = topic">{{ catLabel(topic) }}</button>
        </div>
        <select class="sort-select" v-model="sort">
          <option value="latest">{{ $t('interviews.sort_latest') }}</option>
          <option value="oldest">{{ $t('interviews.sort_oldest') }}</option>
        </select>
      </div>
    </div>
 
    <!-- Video grid (2-column) -->
    <div class="container" style="padding-top:2rem;padding-bottom:1.5rem;">
      <div class="video-grid">
        <div v-for="v in filtered" :key="v.id" class="video-card card" @click="openVideo(v)">
          <div class="video-thumb">
            <img :src="v.thumbnail" :alt="localized(v.title)" loading="lazy" />
            <div class="thumb-overlay">
              <div class="play-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <span class="video-duration" v-if="v.duration">{{ v.duration }}</span>
          </div>
          <div class="video-meta">
            <span class="video-topic">{{ catLabel(v.topic) }}</span>
            <h3>{{ localized(v.title) }}</h3>
            <div class="video-footer">
              <span class="video-author">{{ v.author }}</span>
              <span class="watch-link">{{ $t('interviews.watch') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Explore more -->
      <div class="explore-wrap">
        <a href="https://www.youtube.com/@Business-region/videos" target="_blank" rel="noopener" class="explore-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg>
          {{ $t('interviews.explore_more') }}
        </a>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="fade">
      <div v-if="activeVideo" class="modal-overlay" @click.self="activeVideo = null">
        <div class="modal-box">
          <button class="modal-close" @click="activeVideo = null">✕</button>
          <div class="modal-embed">
            <!-- Local video file -->
            <video v-if="activeVideo.videoFile" controls style="width: 100%; height: 100%;">
              <source :src="activeVideo.videoFile" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <!-- YouTube video -->
            <iframe v-else :src="`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1${activeVideo.startAt ? '&start=' + activeVideo.startAt : ''}`"
              frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="modal-info">
            <h3>{{ localized(activeVideo.title) }}</h3>
            <p>{{ activeVideo.author }} · {{ activeVideo.company }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
 
<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { videos, videoTopics } from '../data/videos.js'
import { useSeoMeta } from '../composables/useSeoMeta.js'

useSeoMeta('interviews.meta_title', 'interviews.meta_desc')
 
const { t, locale } = useI18n()
const base = import.meta.env.BASE_URL
const activeTopic = ref('All')
const sort = ref('latest')
const activeVideo = ref(null)
const activeShort = ref(null)
 
const topics = videoTopics
 
// Maps a raw data value (e.g. "Cross-border") to its translated label.
// The pill click-value stays the raw English so filtering keeps matching the data.
function catLabel(v) {
  return t('categories.' + v.toLowerCase().replace(/[\s-]+/g, '_'))
}

function localized(value) {
  if (typeof value === 'string') return value
  return value?.[locale.value] || value?.en || ''
}
 
const filtered = computed(() => {
  let list = activeTopic.value === 'All' ? [...videos] : videos.filter(v => v.topic === activeTopic.value)
  if (sort.value === 'oldest') list = list.reverse()
  return list
})
 
function openVideo(v) { activeVideo.value = v }
</script>
 
<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;
}
 
.video-card { cursor: pointer; overflow: hidden; }
.video-thumb {
  position: relative;
  aspect-ratio: 16/9;
  background: var(--navy);
  overflow: hidden;
}
.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.video-card:hover .video-thumb img { transform: scale(1.04); }
.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}
.video-card:hover .thumb-overlay { background: rgba(0,0,0,0.4); }
.play-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: 1.5px solid rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: background 0.3s ease, transform 0.3s ease;
}
.video-card:hover .play-circle { background: rgba(255,255,255,0.35); transform: scale(1.1); }
 
.video-duration {
  position: absolute;
  bottom: 0.6rem;
  left: 0.75rem;
  background: rgba(0,0,0,0.6);
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}
 
.video-meta { padding: 1rem 1.25rem 1.25rem; }
.video-topic {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--grey-400);
  margin-bottom: 0.4rem;
}
.video-meta h3 { font-size: 0.95rem; color: var(--text); margin-bottom: 0.6rem; line-height: 1.45; }
.video-footer { display: flex; justify-content: space-between; align-items: center; }
.video-author { font-size: 0.82rem; color: var(--grey-400); }
.watch-link { font-size: 0.82rem; font-weight: 600; color: var(--text); white-space: nowrap; }
.video-card:hover .watch-link { color: var(--navy); }
 
/* Sort dropdown */
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
 
/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-box {
  background: var(--navy);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 900px;
  overflow: hidden;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255,255,255,0.1);
  color: var(--white);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 1;
}
.modal-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.modal-embed iframe {
  width: 100%;
  height: 100%;
}
.modal-embed video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.modal-info { padding: 1rem 1.5rem 1.25rem; }
.modal-info h3 { color: var(--white); font-size: 0.95rem; margin-bottom: 0.25rem; }
.modal-info p { color: rgba(255,255,255,0.45); font-size: 0.82rem; }
 
/* ── Professional Shorts Grid ── */
.shorts-section {
  background: var(--navy);
  padding: 4rem 0 4.5rem;
}
.shorts-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.25rem;
  gap: 1rem;
}
.shorts-eyebrow {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.38);
  margin-bottom: 0.45rem;
}
.shorts-heading {
  color: var(--white);
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
}
.shorts-sub {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.3);
  white-space: nowrap;
  padding-bottom: 0.2rem;
}

/* Three-card row */
.shorts-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.short-card {
  position: relative;
  cursor: pointer;
  border-radius: 18px;
  overflow: hidden;
  background: #0a1422;
  border: 1px solid rgba(255,255,255,0.07);
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}
.short-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255,255,255,0.18);
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
}

/* Number badge */
.short-num {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  z-index: 2;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.55);
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
  padding: 0.22rem 0.6rem;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.12);
}

/* Video frame */
.short-frame {
  position: relative;
  aspect-ratio: 9/16;
  overflow: hidden;
}
.short-vid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.short-card:hover .short-vid { transform: scale(1.03); }

/* Hover overlay */
.short-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  transition: background 0.3s ease;
}
.short-card:hover .short-overlay { background: rgba(13,22,40,0.52); }

.short-play-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.short-cta {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--white);
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
}
.short-card:hover .short-play-circle {
  opacity: 1;
  transform: scale(1);
}
.short-card:hover .short-cta {
  opacity: 1;
  transform: none;
}

/* Card footer strip */
.short-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.1rem;
  border-top: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
}
.short-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.04em;
}
.short-arrow {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.25);
  transition: color 0.25s ease, transform 0.25s ease;
  display: inline-block;
}
.short-card:hover .short-arrow {
  color: rgba(255,255,255,0.75);
  transform: translateX(3px);
}

/* Shorts modal */
.shorts-modal-box {
  position: relative;
  width: 100%;
  max-width: 380px;
}
.shorts-modal-vid {
  width: 100%;
  aspect-ratio: 9/16;
  border-radius: var(--radius-lg);
  display: block;
  background: #000;
}

@media (max-width: 768px) {
  .shorts-row { grid-template-columns: repeat(2, 1fr); }
  .shorts-header { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .shorts-sub { display: none; }
}
@media (max-width: 480px) {
  .shorts-row { grid-template-columns: 1fr; max-width: 280px; margin: 0 auto; }
}
@media (max-width: 680px) { .video-grid { grid-template-columns: 1fr; } }

.explore-wrap {
  display: flex;
  justify-content: center;
  padding: 2.5rem 0 3rem;
}
.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 2rem;
  background: var(--navy);
  color: #fff;
  font-weight: 700;
  font-size: 0.92rem;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.explore-btn:hover { opacity: 0.88; transform: translateY(-2px); }

.interviews-hero {
  position: relative;
  background-image: url('/images/interviews.png');
  background-size: cover;
  background-position: center 30%;
}
.interviews-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(13,22,40,0.88) 0%, rgba(13,22,40,0.78) 100%);
  pointer-events: none;
}
.interviews-hero .page-hero-inner {
  position: relative;
  z-index: 1;
}
</style>