<script lang="ts">
  let isEurope = false
  try {
    isEurope = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.startsWith("Europe/")
  } catch (e) {
    /* continue */
  }
</script>

<div
  class="text-center content-center max-w-lg mx-auto min-h-[100vh] flex items-center place-content-center"
>
  <div class="flex flex-col w-64 lg:w-80">
    <slot />
    <div class="mt-8 {isEurope ? 'block' : 'hidden'}">
      🍪 Logging in uses Cookies 🍪
    </div>
  </div>
</div>
