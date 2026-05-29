export const vReveal = {
  mounted(el, binding) {
    const delay = binding.value ?? 0
    el.style.transitionDelay = `${delay}ms`
    el.classList.add('reveal')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
  }
}
