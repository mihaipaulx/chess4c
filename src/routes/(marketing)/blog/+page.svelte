<script lang="ts">
  import { WebsiteName } from "../../../config"
  import { sortedBlogPosts, blogInfo } from "./posts"
</script>

<svelte:head>
  <title>{WebsiteName} | {blogInfo.name}</title>
  <meta name="description" content="Our blog posts." />
</svelte:head>

<div class="px-6 max-w-lg mx-auto min-h-[100vh] py-[15vh]">
  <div
    class="text-3xl lg:text-5xl font-medium text-primary flex gap-3 items-baseline text-center place-content-center"
  >
    <div
      class="text-center leading-relaxed font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
    >
      {blogInfo.name}
    </div>
    <a href="/blog/rss.xml" target="_blank" rel="noreferrer">
      <img
        class="flex-none w-5 h-5 object-contain"
        src="/images/rss.svg"
        alt="rss feed"
      />
    </a>
  </div>
  <div class="text-lg text-center">A demo blog with sample content.</div>

  {#each sortedBlogPosts as post}
    <a href={post.link}>
      <div class="card my-6 bg-white shadow-xl flex-row overflow-hidden">
        <div class="flex-none w-6 md:w-32 bg-secondary"></div>
        <div class="py-6 px-6">
          <div class="text-xl">{post.title}</div>
          <div class="text-sm text-accent">
            {post.parsedDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div class="text-slate-500">{post.description}</div>
        </div>
      </div>
    </a>
  {/each}
</div>
