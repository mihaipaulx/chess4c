<script lang="ts">
  import { WebsiteName } from "../../../../../../config"
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"
  import SettingsModule from "../settings_module.svelte"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("settings")

  export let data
  let { session } = data
</script>

<svelte:head>
  <title>{WebsiteName} | Delete Account</title>
  <meta name="description" content="{WebsiteName} | Delete Account" />
</svelte:head>


<SettingsModule
  title="Delete Account"
  editable={true}
  dangerous={true}
  message="Deleting your account can not be undone. You are currently logged in as '{session
    ?.user?.email}'"
  saveButtonTitle="Delete Account"
  successTitle="Account queued for deletion"
  successBody="Your account will be deleted shortly."
  formTarget="/account/api?/deleteAccount"
  fields={[
    {
      id: "currentPassword",
      label: "Current Password",
      initialValue: "",
      inputType: "password",
    },
  ]}
/>
