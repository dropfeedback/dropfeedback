<script lang="ts">
	import { onMount } from "svelte";
	import { createPopperActions } from "svelte-popperjs";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import PopoverContent from "./popover-content.wc.svelte";
	import CategoryStep from "./category-step.wc.svelte";
	import FormStep from "./form-step.wc.svelte";
	import SuccessStep from "./success-step.wc.svelte";
	import CssVar from "./css-var.wc.svelte";
	import type { Categories, DefaultButtonProps, PopoverSide, Steps, ThemeProps } from "../types";

	export let popoverTriggerButton: HTMLButtonElement | undefined = undefined;
	export let projectId: string | undefined = undefined;
	export let theme: ThemeProps;
	export let defaultButton: DefaultButtonProps;
	export let side: string;
	export let sideOffset: number;
	export let open: boolean;
	export let permanentOpen: boolean;
	export let meta: Record<string, any> = {};

	const currentStep = writable<Steps>("category");
	const selectedCategory = writable<Categories | null>(null);
	$: openState = writable<boolean>(open);

	if (projectId === undefined) {
		console.error("DropFeedback: Missing `projectId`");
	}

	const [popperRef, popperContent, getInstance] = createPopperActions({
		strategy: "fixed"
	});
	$: extraOpts = {
		modifiers: [{ name: "offset", options: { offset: [0, sideOffset] } }],
		placement: side as PopoverSide
	};

	onMount(() => {
		if (!popoverTriggerButton) {
			return;
		}

		popperRef(popoverTriggerButton);

		const togglePopper = () => {
			$openState = !$openState;
		};

		popoverTriggerButton.addEventListener("click", togglePopper);

		return () => {
			if (!popoverTriggerButton) {
				return;
			}

			popoverTriggerButton.removeEventListener("click", togglePopper);
		};
	});

	function updatePopper(_: HTMLElement, params: Record<string, any>) {
		return {
			update() {
				getInstance()?.update();
			}
		};
	}

	const escapeListener = (event: KeyboardEvent) => {
		if (!$openState) {
			return;
		}

		if (event.key === "Escape") {
			$openState = false;
		}
	};
</script>

<svelte:window on:keydown={escapeListener} />

<CssVar {theme}>
	{#if !popoverTriggerButton}
		<button
			use:popperRef
			on:click={() => {
				$openState = !$openState;
			}}
			class="trigger-button"
			class:trigger-button-right={defaultButton.position === "right"}
			class:trigger-button-left={defaultButton.position === "left"}
		>
			feedback
		</button>
	{/if}

	{#if permanentOpen || $openState}
		<div
			id="popper"
			class="popper"
			use:popperContent={extraOpts}
			use:updatePopper={{
				position: defaultButton.position
			}}
			transition:fade={{ duration: 100 }}
		>
			{#if projectId === undefined}
				<p>Missing `projectId`</p>
			{:else if $currentStep === "category"}
				<PopoverContent {openState} {selectedCategory} {currentStep}>
					<CategoryStep {selectedCategory} {currentStep} />
				</PopoverContent>
			{:else if $currentStep === "form"}
				<PopoverContent {openState} {selectedCategory} {currentStep}>
					<FormStep {projectId} {selectedCategory} {currentStep} {meta} />
				</PopoverContent>
			{:else if $currentStep === "success"}
				<SuccessStep {selectedCategory} {currentStep} />
			{/if}
		</div>
	{/if}
</CssVar>

<style>
	.popper {
		display: flex;
		flex-direction: column;
		padding-right: 16px;
		padding-left: 16px;
		box-shadow: var(--shadow-menu);
		background-color: var(--color-bg-container);
		min-width: 320px;
		border-radius: 8px;
		min-height: 200px;
		z-index: 99999;
	}

	.trigger-button {
		top: 50%;
		position: fixed;
		padding: 6px 16px 6px 16px;
		white-space: nowrap;
		z-index: 99999;
		border-radius: 6px 6px 0 0;
		background-color: var(--color-primary);
		color: #fff;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s var(--motion-ease-in-out);
		user-select: none;
		margin-top: -14.25px;
	}

	.trigger-button:hover {
		background-color: var(--color-primary-hover);
	}

	.trigger-button:active {
		background-color: var(--color-primary-active);
	}

	.trigger-button:not([disabled]):focus-visible {
		outline: 4px solid var(--color-primary-border);
		outline-offset: 1px;
		transition: outline-offset 0s, outline 0s;
	}

	.trigger-button-right {
		right: 0px;
		transform: rotate(-90deg) translate(50%, -50%);
		transform-origin: 100% 50%;
	}

	.trigger-button-left {
		left: 0px;
		transform: rotate(90deg) translate(-50%, -50%);
		transform-origin: 0% 50%;
	}
</style>
