<script lang="ts">
	import { getContext, onMount, setContext } from "svelte";
	import { createPopperActions } from "svelte-popperjs";
	import { writable, type Writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import PopoverContent from "./popover-content.wc.svelte";
	import CategoryStep from "./category-step.wc.svelte";
	import FormStep from "./form-step.wc.svelte";
	import SuccessStep from "./success-step.wc.svelte";
	import CssVar from "./css-var.wc.svelte";
	import type { DefaultButtonPosition, PopoverContext, PopoverSide, WidgetContext } from "../types";
	import { stringToBoolean } from "../utils/stringToBoolean";

	export let popoverTriggerButton: HTMLButtonElement | undefined = undefined;
	export let defaultButtonPosition: DefaultButtonPosition | undefined = undefined;

	const widgetContext = getContext<Writable<WidgetContext>>("widgetContext");
	$: buttonProperties = popoverTriggerButton?.dataset ?? {};

	const popoverContextState = writable<PopoverContext>({
		projectId: buttonProperties?.projectId ?? $widgetContext.projectId,
		open:
			stringToBoolean(buttonProperties?.defaultOpen) ?? buttonProperties?.defaultOpen === ""
				? true
				: false,
		side: (buttonProperties?.side as PopoverSide) ?? "auto",
		sideOffset: Number(buttonProperties?.sideOffset ?? 12),
		theme: {
			scheme: (buttonProperties?.themeScheme as "light" | "dark") ?? $widgetContext.theme.scheme,
			primaryColor: buttonProperties?.themePrimaryColor ?? $widgetContext.theme.primaryColor,
			backgroundColor:
				buttonProperties?.themeBackgroundColor ?? $widgetContext.theme.backgroundColor,
			textColor: buttonProperties?.themeTextColor ?? $widgetContext.theme.textColor
		},
		meta: {
			...$widgetContext.meta,
			...Object.entries(buttonProperties ?? {})
				.filter(([key]) => key.startsWith("meta"))
				.reduce((acc, [key, value]) => {
					const newKey = key.replace("meta", "").toLocaleLowerCase();
					acc[newKey] = value ?? "";
					return acc;
				}, {} as Record<string, string>)
		},
		currentStep: "category",
		selectedCategory: null
	});

	const popoverContext = setContext("popoverContext", popoverContextState);

	$: popoverContext.set({
		projectId: buttonProperties.projectId ?? $widgetContext.projectId,
		open:
			stringToBoolean(buttonProperties?.defaultOpen) ?? buttonProperties?.defaultOpen === ""
				? true
				: false,
		side: (buttonProperties.side as PopoverSide) ?? "auto",
		sideOffset: Number(buttonProperties.sideOffset ?? 12),
		theme: {
			scheme: (buttonProperties.themeScheme as "light" | "dark") ?? $widgetContext.theme.scheme,
			primaryColor: buttonProperties.themePrimaryColor ?? $widgetContext.theme.primaryColor,
			backgroundColor:
				buttonProperties.themeBackgroundColor ?? $widgetContext.theme.backgroundColor,
			textColor: buttonProperties.themeTextColor ?? $widgetContext.theme.textColor
		},
		meta: {
			...$widgetContext.meta,
			...Object.entries(buttonProperties)
				.filter(([key]) => key.startsWith("meta"))
				.reduce((acc, [key, value]) => {
					const newKey = key.replace("meta", "").toLocaleLowerCase();
					acc[newKey] = value ?? "";
					return acc;
				}, {} as Record<string, string>)
		},
		currentStep: "category",
		selectedCategory: null
	});

	if ($popoverContext.projectId === undefined) {
		console.error("DropFeedback: Missing `projectId`");
	}

	$: [popperRef, popperContent, getInstance] = createPopperActions({
		placement: (buttonProperties?.side as PopoverSide) ?? "auto",
		strategy: "fixed"
	});

	$: extraOpts = {
		modifiers: [
			{ name: "offset", options: { offset: [0, Number(buttonProperties.sideOffset ?? 12)] } }
		]
	};

	onMount(() => {
		if (!popoverTriggerButton) {
			return;
		}

		popperRef(popoverTriggerButton);

		const togglePopper = () => {
			$popoverContext.open = !$popoverContext.open;
		};

		popoverTriggerButton.addEventListener("click", togglePopper);

		return () => {
			if (!popoverTriggerButton) {
				return;
			}

			popoverTriggerButton.removeEventListener("click", togglePopper);
		};
	});

	async function refreshTooltip() {
		await getInstance()?.update();
	}

	function updatePopperWhenPositionIsChanged(_: HTMLElement, position: string) {
		return {
			update() {
				refreshTooltip();
			}
		};
	}

	const escapeListener = (event: KeyboardEvent) => {
		if (!$popoverContext.open) {
			return;
		}

		if (event.key === "Escape") {
			$popoverContext.open = false;
		}
	};
</script>

<svelte:window on:keydown={escapeListener} />

<CssVar>
	{#if !popoverTriggerButton}
		<button
			use:popperRef
			on:click={() => {
				$popoverContext.open = !$popoverContext.open;
			}}
			class="trigger-button"
			class:trigger-button-right={defaultButtonPosition === "right"}
			class:trigger-button-left={defaultButtonPosition === "left"}
		>
			feedback
		</button>
	{/if}

	{#if stringToBoolean(buttonProperties.permanentOpen) ?? buttonProperties.permanentOpen === "" ? true : false || $popoverContext.open}
		<div
			id="popper"
			class="popper"
			use:popperContent={extraOpts}
			use:updatePopperWhenPositionIsChanged={defaultButtonPosition || $popoverContext.side}
			transition:fade={{ duration: 100 }}
		>
			{#if $popoverContext.projectId === undefined}
				<p>Missing `projectId`</p>
			{:else if $popoverContext.currentStep === "category"}
				<PopoverContent>
					<CategoryStep />
				</PopoverContent>
			{:else if $popoverContext.currentStep === "form"}
				<PopoverContent>
					<FormStep />
				</PopoverContent>
			{:else if $popoverContext.currentStep === "success"}
				<SuccessStep />
			{/if}
			<div class="arrow" data-popper-arrow />
		</div>
	{/if}
</CssVar>

<style>
	.popper {
		display: flex;
		flex-direction: column;
		padding-right: 16px;
		padding-left: 16px;
		box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
			0 9px 28px 8px rgba(0, 0, 0, 0.05);
		background-color: var(--color-bg-container);
		min-width: 320px;
		border-radius: 8px;
		min-height: 200px;
		z-index: 99999;
	}

	.arrow,
	.arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: var(--color-bg-container);
	}

	.arrow {
		text-align: left;
		visibility: hidden;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
	}

	:global(#popper[data-popper-placement^="bottom"] .arrow) {
		top: -4px;
	}
	:global(#popper[data-popper-placement^="top"] .arrow) {
		bottom: -4px;
	}
	:global(#popper[data-popper-placement^="left"] .arrow) {
		right: -4px;
	}
	:global(#popper[data-popper-placement^="right"] .arrow) {
		left: -4px;
	}

	.arrow::before {
		visibility: visible;
		content: "";
		transform: rotate(45deg);
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
