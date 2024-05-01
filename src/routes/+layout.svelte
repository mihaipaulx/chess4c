<script>
  import "../app.css"
  import { invalidate, invalidateAll } from "$app/navigation"
  import { onMount } from "svelte"
  import { navigating } from "$app/stores"
  import { expoOut } from "svelte/easing"
  import { slide } from "svelte/transition"

  export let data

  let { supabase, session, profile } = data
  $: ({ supabase, session, profile } = data)

  const logoHref = !profile ? "/" : "/dashboard"

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth")
      }

        console.log(event);

      if (event === "SIGNED_OUT" || event === "SIGNED_IN") {
        invalidateAll()
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

{#if $navigating}
  <!-- 
    Loading animation for next page since svelte doesn't show any indicator. 
     - delay 100ms because most page loads are instant, and we don't want to flash 
     - long 12s duration because we don't actually know how long it will take
     - exponential easing so fast loads (>100ms and <1s) still see enough progress,
       while slow networks see it moving for a full 12 seconds
  -->
  <div
    class="fixed w-full top-0 right-0 left-0 h-1 z-50 bg-primary"
    in:slide={{ delay: 100, duration: 12000, axis: "x", easing: expoOut }}
  ></div>
{/if}

<header class="navbar bg-base-100 container mx-auto fixed top-0 left-0 right-0 w-full z-50">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href={logoHref}>Chess4c</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 hidden sm:flex font-bold text-lg">
      {#if !profile}
        <li class="md:mx-2"><a href="/blog">Blog</a></li>
        <li class="md:mx-2"><a href="/pricing">Pricing</a></li>
        <li class="md:mx-4">
          <a
            href="/login"
            class="border border-primary">Get Started</a
          >
        </li>
      {:else}
        <li class="md:mx-2"><a href="/dashboard">Dashboard</a></li>
        <li class="md:mx-2"><a href="/puzzle">Puzzles</a></li>
        <li class="md:mx-2"><a href="/account/settings">Account</a></li>
      {/if}
    </ul>
    <div class="dropdown dropdown-end sm:hidden">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          /></svg
        >
      </label>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold"
      >
        <li class="md:mx-2"><a href="/blog">Blog</a></li>
        <li class="md:mx-2"><a href="/pricing">Pricing</a></li>
        <li class="md:mx-4">
          <a
            href="/account"
            class="border border-primary">Get Started</a
          >
        </li>
      </ul>
    </div>
  </div>
</header>

<div class="">
  <slot />
</div>

<!-- Spacer grows so the footer can be at bottom on short pages -->
<div class="flex-grow"></div>
<div class="">
  <div class="border-t max-w-full mx-auto"></div>
  <footer
    class="footer container mx-auto py-10 px-6 gap-x-48 lg:gap-x-64 xl:gap-x-96 place-content-between text-base"
  >
    <nav>
      <span class="footer-title opacity-80">Explore</span>
      <a class="link link-hover mb-1" href="/">Landing</a>
      <a class="link link-hover my-1" href="/pricing">Pricing</a>
      <a class="link link-hover my-1" href="/blog">Blog</a>
      <a class="link link-hover my-1" href="/contact_us">Contact Us</a>
    </nav>
    <aside class="justify-items-end">
      <span class="footer-title opacity-80">Legal</span>
      <a
        class="link link-hover max-w-[260px]"
        href="/"
      >
        Privacy Policy
      </a>
    </aside>
  </footer>
</div>