import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeoMeta(titleKey, descKey) {
  const { t, locale } = useI18n()

  function apply() {
    const title = t(titleKey)
    const desc = t(descKey)

    document.title = title

    setMeta('description', desc)
    setMeta('og:title', title, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', 'Business DE-DK', 'property')

    // hreflang lang attribute on <html>
    document.documentElement.lang = locale.value
  }

  watch(locale, apply, { immediate: true })
}
