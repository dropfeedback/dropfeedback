<svelte:options customElement="feedbacky-widget" />

<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { createPopperActions } from "svelte-popperjs";
  import PopperContent from "./popper-content.wc.svelte";
  import CategoryStep from "./category-step.wc.svelte";
  import FormStep from "./form-step.wc.svelte";
  import SuccessStep from "./success-step.wc.svelte";
  import type { WidgetProps, Steps } from "../types";

  let widgetProps: WidgetProps = {
    projectId: $$restProps?.["project-id"],
    meta: $$restProps?.["meta"] ? JSON.parse($$restProps["meta"]) : null,
  };
  let showPopper = writable(false);
  let currentStep = writable<Steps>("category");

  setContext("widgetProps", widgetProps);
  setContext("config", {
    currentStep,
    showPopper,
  });

  if (!widgetProps?.projectId) {
    console.error("feedbacky: Missing project-id");
  }

  const [popperRef, popperContent] = createPopperActions({
    placement: "left",
    strategy: "fixed",
  });
  const extraOpts = {
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
  };
</script>

{#if widgetProps?.projectId}
  <button
    use:popperRef
    on:click={() => {
      $showPopper = !$showPopper;
    }}
    class="trigger-button"
  >
    feedbacky
  </button>

  {#if $showPopper}
    <div class="popper" use:popperContent={extraOpts}>
      <PopperContent>
        {#if $currentStep === "category"}
          <CategoryStep />
        {:else if $currentStep === "form"}
          <FormStep />
        {/if}
      </PopperContent>
      {#if $currentStep === "success"}
        <SuccessStep />
      {/if}
      <div class="arrow" data-popper-arrow data-popper-placement="right" />
    </div>
  {/if}
{/if}

<style global>
  /* host for shadow-dom  */
  :host,
  :global(.feedbacky-widget) {
    --fw-brand-color: #ed7138;
    box-sizing: border-box;
  }

  .success-title {
    text-align: center;
    color: green;
  }

  .popper {
    transition: all 0.1s linear;
    animation: slideLeftPopper 0.2s linear;
    padding-right: 16px;
    padding-left: 16px;
    box-shadow: 0 18px 50px -10px rgba(0, 0, 0, 0.2);
    background: white;
    min-width: 300px;
    border-radius: 8px;
  }

  .arrow,
  .arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: white;
  }

  .arrow {
    right: -4px;
    visibility: hidden;
  }

  .arrow::before {
    visibility: visible;
    content: "";
    transform: rotate(45deg);
  }

  .trigger-button {
    right: -2px;
    top: 50%;
    position: fixed;
    transform: rotate(-90deg) translate(50%, -50%);
    transform-origin: 100% 50%;
    padding: 6px 16px 6px 16px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    z-index: 99999;
    border-radius: 8px 8px 0 0;
    background-color: #ed7138;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.1s linear;
    user-select: none;
    animation: slideLeftTrigger 0.2s linear;
  }

  .trigger-button:hover {
    right: 0px;
  }

  @keyframes slideLeftTrigger {
    0% {
      margin-right: -100px;
    }
    100% {
      margin-right: 0;
    }
  }

  @keyframes slideLeftPopper {
    0% {
      margin-right: -800px;
    }
    100% {
      margin-right: 0px;
    }
  }

  /* Reset button */
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
  }

  /* Remove excess padding and border in Firefox 4+ */
  button::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
</style>
