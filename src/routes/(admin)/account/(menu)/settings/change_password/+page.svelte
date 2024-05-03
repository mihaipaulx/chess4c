<script lang="ts">
  import SettingsModule from "../settings_module.svelte"
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("settings")

  export let data

  let { session } = data
</script>

<svelte:head>
  <title>Change Email</title>
</svelte:head>

<SettingsModule
  title="Change Email"
  editable={true}
  successTitle="Email change initiated"
  successBody="We just sent confirmations to both the old and the new email address to confirm the change. Please click the link in both emails to finalize the change."
  formTarget="/account/api?/updateEmail"
  fields={[
    {
      id: "email",
      label: "Email",
      initialValue: session?.user?.email ?? "",
      placeholder: "Email address",
    },
  ]}
/>
