<script lang="ts">
  import SettingsModule from "../settings_module.svelte"
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("settings")

  export let data

  let { profile } = data
</script>

<svelte:head>
  <title>Edit Profile</title>
</svelte:head>

<SettingsModule
  editable={true}
  title="Edit Profile"
  successTitle="Saved Profile"
  successBody="Your profile has been saved."
  formTarget="/account/api?/updateProfile"
  fields={[
    {
      id: "fullName",
      label: "Name",
      initialValue: profile?.full_name ?? "",
      placeholder: "Your full name",
      maxlength: 50,
    },
    {
      id: "username",
      label: "Username",
      initialValue: profile?.username ?? "",
      placeholder: "Your username",
      maxlength: 50,
    },
  ]}
/>
