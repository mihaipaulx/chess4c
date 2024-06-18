<script lang="ts">
  import { WebsiteName } from "./../../../config"
  import PricingModule from "./pricing_module.svelte"
</script>

<svelte:head>
  <title>{WebsiteName} | Pricing</title>
  <meta name="description" content="{WebsiteName} | Pricing" />
</svelte:head>

<div class="min-h-[100vh] py-[15vh] px-4">
  <div>
    <h1 class="text-3xl font-bold text-center">Pricing plans</h1>
    <h2 class="text-xl text-center text-slate-500 mt-1 pb-3">
      Choose the package that suits you
    </h2>

    <div class="w-full my-8">
      <PricingModule callToAction="Get Started" highlightedPlanId="full" />
    </div>
  </div>
</div>
