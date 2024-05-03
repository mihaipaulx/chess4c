<script lang="ts">
  import { WebsiteName } from "../../../config"
</script>

<svelte:head>
  <title>{WebsiteName} | Dashboard</title>
  <meta name="description" content="{WebsiteName} | Dashboard" />
</svelte:head>

<div class="grid container mx-auto px-6 place-items-start min-h-[100vh] py-[20vh]">
  <h1 class="text-2xl font-bold mb-1">Dashboard</h1>
  <div class="my-6">
    <h1 class="text-xl font-bold mb-1">Users</h1>
    <div class="stats shadow stats-vertical sm:stats-horizontal sm:w-[420px]">
      <div class="stat place-items-center">
        <div class="stat-title">Downloads</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">↗︎ 546 (2%)</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Users</div>
        <div class="stat-value text-secondary">4,200</div>
        <div class="stat-desc">↗︎ 40 (2%)</div>
      </div>
    </div>
  </div>
  <div class="my-6">
    <h1 class="text-xl font-bold mb-1">Accounts</h1>
    <div class="stats shadow stats-vertical sm:stats-horizontal sm:w-[420px]">
      <div class="stat place-items-center">
        <div class="stat-title">New Registers</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc">↘︎ 90 (14%)</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Churned Accounts</div>
        <div class="stat-value">42</div>
        <div class="stat-desc">↘︎ 6 (12%)</div>
      </div>
    </div>
  </div>
  <div class="my-6">
    <h1 class="text-xl font-bold mb-1">Revenue</h1>
    <div class="stats shadow stats-vertical sm:stats-horizontal sm:w-[420px]">
      <div class="stat place-items-center">
        <div class="stat-title text-success">Revenue</div>
        <div class="stat-value text-success">$4200</div>
        <div class="stat-desc">↗︎ $180 (4%)</div>
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">New Subscribers</div>
        <div class="stat-value">16</div>
        <div class="stat-desc">↘︎ 1 (%7)</div>
      </div>
    </div>
  </div>
</div>