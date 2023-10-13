<svelte:options customElement="feedbacky-widget" />

<script lang="ts">
  import Dialog from "./dialog.wc.svelte";
  import Form from "./form.wc.svelte";
  import Trigger from "./trigger.wc.svelte";
  import type { WidgetProps } from "../types";

  let widgetProps: WidgetProps = {
    projectId: $$restProps?.["project-id"],
    meta: $$restProps?.["meta"] ? JSON.parse($$restProps["meta"]) : null,
  };

  if (!widgetProps?.projectId) {
    console.error("feedbacky: Missing project-id");
  }

  let dialogStep: "form" | "success" = "form";
  let dialog: HTMLDialogElement;
</script>

{#if widgetProps?.projectId}
  <div class="feedbacky-widget">
    <Trigger on:click={() => dialog.showModal()} />
    <Dialog
      bind:dialog
      onClose={() => {
        dialogStep = "form";
      }}
    >
      {#if dialogStep === "form"}
        <Form
          widgetProps={{
            projectId: widgetProps.projectId,
            meta: widgetProps.meta,
          }}
          onFinish={() => {
            dialogStep = "success";
          }}
        />
      {:else}
        <h2 class="success-title">WE HAVE GOT YOUR FEEDBACK</h2>
      {/if}
    </Dialog>
  </div>
{/if}

<style global>
  /* host for shadow-dom  */
  :host,
  :global(.feedbacky-widget) {
    --fw-brand-color: #ed7138;
  }

  .success-title {
    text-align: center;
    color: green;
  }
</style>
