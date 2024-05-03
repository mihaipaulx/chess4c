<script lang="ts">
  import { WebsiteName } from "../../../config"
</script>

<svelte:head>
  <title>{WebsiteName} | Incorrect Password</title>
  <meta name="description" content="{WebsiteName} | Incorrect Password" />
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Incorrect Current Password</h1>

<p>
  You attempted to edit your account with an incorrect password, and have
  been logged out.
</p>
<p class="mt-6">
  If you remember your password, <a href="/login/sign_in" class="link">sign in</a
  > and try again.
</p>
<p class="mt-6">
  If you forgot your password, <a href="/login/forgot_password" class="link"
    >reset it</a
  >.
</p>
