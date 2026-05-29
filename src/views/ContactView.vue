<template>
  <div>
    <div class="page-hero">
      <div class="container">
        <span class="page-hero-label">Contact</span>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Reach out with questions, ideas, or partnership opportunities.</p>
      </div>
    </div>

    <section class="section">
      <div class="container contact-layout">
        <!-- Info -->
        <aside class="contact-info">
          <div class="info-block">
            <span class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
            <div>
              <h4>Address</h4>
              <p>Vestergade 9<br>6270 Tønder, Denmark</p>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
            <div>
              <h4>Phone</h4>
              <a href="tel:+4521775916">+45 21 77 59 16</a>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
            <div>
              <h4>Email</h4>
              <a href="mailto:info@business-region.eu">info@business-region.eu</a>
            </div>
          </div>
          <div class="info-block">
            <span class="info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <div>
              <h4>Office Hours</h4>
              <p>Mon – Thu: 8:30 – 15:00</p>
              <p>Friday: 8:30 – 13:00</p>
              <p class="note">Visits by appointment only</p>
            </div>
          </div>
        </aside>

        <!-- Form -->
        <div class="contact-form-col">
          <h2 style="margin-bottom:1.5rem;font-size:1.3rem;">Send a Message</h2>
          <form @submit.prevent="submitForm" v-if="!sent">
            <div class="form-group">
              <label>Your Name</label>
              <input v-model="form.name" type="text" required />
            </div>
            <div class="form-group">
              <label>Your Email</label>
              <input v-model="form.email" type="email" required />
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input v-model="form.subject" type="text" required />
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-dark" style="width:100%">Send Message</button>
          </form>
          <div v-else class="success-msg">
            <div class="success-icon">✓</div>
            <p>Your message has been sent. We'll get back to you soon!</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const sent = ref(false)
const form = reactive({ name: '', email: '', subject: '', message: '' })
function submitForm() { sent.value = true }
</script>

<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 4rem;
  align-items: start;
}
.contact-info { display: flex; flex-direction: column; gap: 1.25rem; }
.info-block {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--white);
  border: 1px solid var(--grey-200);
  border-radius: var(--radius-md);
}
.info-icon { flex-shrink: 0; display: flex; align-items: center; color: var(--navy); }
.info-block h4 { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--grey-400); margin-bottom: 0.3rem; }
.info-block p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }
.info-block a { font-size: 0.88rem; color: var(--navy); }
.info-block a:hover { text-decoration: underline; }
.note { font-size: 0.78rem !important; color: var(--grey-400) !important; margin-top: 0.25rem; }

.success-msg { text-align: center; padding: 3rem 0; }
.success-icon {
  width: 60px; height: 60px; border-radius: 50%;
  background: var(--navy); color: var(--white);
  font-size: 1.5rem; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
}
.success-msg p { font-size: 0.95rem; }

@media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; gap: 2rem; } }
@media (max-width: 640px) {
  .contact-info { gap: 0.75rem; }
  .info-block { padding: 1rem; }
}
</style>
