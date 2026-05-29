<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Social Media</span>
        <h1>Follow Us</h1>
        <p>Stay connected with Business DE-DK for the latest updates, news, and stories.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="social-cards">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" class="social-card" :style="{ background: s.bg }">
            <div class="social-icon" v-html="s.icon"></div>
            <h2>{{ s.name }}</h2>
            <p>{{ s.desc }}</p>
            <span class="social-cta">{{ s.cta }} ↗</span>
          </a>
        </div>

        <div style="margin-top:3.5rem;">
          <p class="section-label">Latest Interviews</p>
          <h2 style="margin-bottom:1.5rem;">From our YouTube Channel</h2>
          <div class="grid-3">
            <RouterLink to="/interviews" v-for="v in latestVideos" :key="v.id" class="card mini-video">
              <div class="mini-thumb"></div>
              <div class="mini-info">
                <h4>{{ v.title }}</h4>
                <p>{{ v.author }} · {{ v.company }}</p>
              </div>
            </RouterLink>
          </div>
          <div style="text-align:center;margin-top:2rem;">
            <RouterLink to="/interviews" class="btn btn-dark">View All Interviews</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { videos } from '../data/videos.js'
const latestVideos = videos.slice(0, 3)

const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/dedkofficial/',
    bg: 'linear-gradient(135deg,#1877F2,#0d5ec7)',
    desc: 'Join our Facebook community for news and event updates.',
    cta: 'Visit Page',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/business-de-dk',
    bg: 'linear-gradient(135deg,#0A66C2,#064e9a)',
    desc: 'Connect professionally and follow our business insights.',
    cta: 'Follow Us',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@BusinessDEDK',
    bg: 'linear-gradient(135deg,#FF0000,#cc0000)',
    desc: 'Watch our interview series and event recordings.',
    cta: 'Subscribe',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg>'
  }
]
</script>

<style scoped>
.social-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  padding: 2.5rem 1.75rem;
  border-radius: var(--radius-lg);
  text-align: center;
  text-decoration: none;
  transition: transform var(--transition), box-shadow var(--transition);
}
.social-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
.social-icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
}
.social-card h2 { color: white; font-size: 1.4rem; }
.social-card p { color: rgba(255,255,255,0.8); font-size: 0.88rem; }
.social-cta {
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

.mini-video { display: block; text-decoration: none; overflow: hidden; }
.mini-thumb {
  height: 140px;
  background: var(--navy);
}
.mini-info { padding: 1rem; }
.mini-info h4 { font-size: 0.88rem; color: var(--text); margin-bottom: 0.3rem; }
.mini-info p { font-size: 0.78rem; color: var(--grey-400); }

@media (max-width: 768px) { .social-cards { grid-template-columns: 1fr; } }
</style>
