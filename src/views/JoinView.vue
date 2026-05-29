<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Membership</span>
        <h1>Become a Member</h1>
        <p>Join a growing cross-border business network for professionals and experts in the DE-DK region.</p>
      </div>
    </div>

    <section class="section">
      <div class="container join-layout">
        <div class="benefits-col">
          <p class="section-label">Member Benefits</p>
          <h2 style="margin-bottom:1.5rem;">Why join Business DE-DK?</h2>
          <ul class="benefits-list">
            <li v-for="n in 6" :key="n">
              <span class="check-dot"></span>
              <span>{{ benefits[n - 1] }}</span>
            </li>
          </ul>
          <blockquote class="member-quote">
            <p>"Business DE-DK has opened doors we didn't know existed — direct connections with German partners who share our vision."</p>
            <cite>— Member, Sønderborg, Denmark</cite>
          </blockquote>
        </div>

        <div class="form-col">
          <h2 style="margin-bottom:1.5rem;font-size:1.3rem;">Apply for Membership</h2>
          <form @submit.prevent="submit" v-if="!done">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Company / Organisation</label>
              <input v-model="form.company" type="text" required />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input v-model="form.phone" type="tel" />
            </div>
            <div class="form-group">
              <label>Country</label>
              <select v-model="form.country" required>
                <option value="">Select country</option>
                <option value="DK">Denmark</option>
                <option value="DE">Germany</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Sector / Industry</label>
              <input v-model="form.sector" type="text" required />
            </div>
            <div class="form-group">
              <label>Cross-border interests</label>
              <textarea v-model="form.message"></textarea>
            </div>
            <button type="submit" class="btn btn-dark" style="width:100%">Submit Application</button>
          </form>
          <div v-else class="success-state">
            <div class="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>We will be in touch shortly.</p>
            <RouterLink to="/" class="btn btn-dark" style="margin-top:1.25rem;display:inline-flex;">Back to Home</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const done = ref(false)
const form = reactive({ name: '', company: '', email: '', phone: '', country: '', sector: '', message: '' })
const benefits = [
  'Access to the member network database',
  'Invitations to exclusive networking events',
  'Featured in our media channel',
  'Cross-border business matchmaking',
  'Access to research and market insights',
  'Newsletter and opportunity updates'
]
function submit() { done.value = true }
</script>

<style scoped>
.join-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 5rem;
  align-items: start;
}
.benefits-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2rem;
}
.benefits-list li { display: flex; gap: 0.75rem; align-items: flex-start; font-size: 0.92rem; color: var(--text-muted); }
.check-dot {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--navy);
  flex-shrink: 0;
  margin-top: 0.1rem;
  display: flex; align-items: center; justify-content: center;
  color: var(--white);
}
.check-dot::after { content: '✓'; font-size: 0.65rem; font-weight: 700; }

.member-quote {
  border-left: 3px solid var(--navy);
  padding: 1rem 1.25rem;
  background: var(--grey-50);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}
.member-quote p { font-style: italic; color: var(--text-muted); line-height: 1.7; margin-bottom: 0.5rem; }
.member-quote cite { font-size: 0.82rem; color: var(--grey-400); font-style: normal; font-weight: 600; }

.success-state { text-align: center; padding: 2rem 0; }
.success-icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: var(--navy); color: var(--white);
  font-size: 1.5rem; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
}
.success-state h3 { margin-bottom: 0.5rem; }

@media (max-width: 768px) { .join-layout { grid-template-columns: 1fr; gap: 2rem; } }
</style>
