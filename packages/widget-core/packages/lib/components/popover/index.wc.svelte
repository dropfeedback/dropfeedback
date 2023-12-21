<script lang="ts">
	import { onMount } from "svelte";
	import { createPopperActions } from "svelte-popperjs";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import Layout from "./layout.wc.svelte";
	import CategoryStep from "./category-step.wc.svelte";
	import FormStep from "./form-step.wc.svelte";
	import SuccessStep from "../success-step.wc.svelte";
	import CssVar from "../css-var.wc.svelte";
	import type { Categories, PopoverSide, Steps, ThemeProps } from "../../types";

	export let popoverTriggerButton: HTMLButtonElement;
	export let projectId: string | undefined = undefined;
	export let theme: ThemeProps;
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
		popperRef(popoverTriggerButton);

		const togglePopper = () => {
			$openState = !$openState;
		};

		popoverTriggerButton.addEventListener("click", togglePopper);

		return () => popoverTriggerButton.removeEventListener("click", togglePopper);
	});

	const escapeListener = (event: KeyboardEvent) => {
		if (!$openState) {
			return;
		}

		if (event.key === "Escape") {
			$openState = false;
			event.stopImmediatePropagation();
		}
	};
</script>

<svelte:window on:keydown={escapeListener} />

<CssVar {theme}>
	{#if permanentOpen || $openState}
		<div
			id="popper"
			class="popper"
			use:popperContent={extraOpts}
			transition:fade={{ duration: 100 }}
		>
			{#if projectId === undefined}
				<p>Missing `projectId`</p>
			{:else if $currentStep === "category"}
				<Layout {openState} {selectedCategory} {currentStep}>
					<CategoryStep {selectedCategory} {currentStep} />
				</Layout>
			{:else if $currentStep === "form"}
				<Layout {openState} {selectedCategory} {currentStep}>
					<FormStep {projectId} {selectedCategory} {currentStep} {meta} />
				</Layout>
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
</style>
