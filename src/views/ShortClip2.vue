<template>
  <div class="short-clip">
    <video controls width="100%">
      <source :src="`${base}videos/short-2.mp4`" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
const base = import.meta.env.BASE_URL
</script>
