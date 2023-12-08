<script lang="ts">
	import { getContext, onMount, setContext } from "svelte";
	import { createPopperActions } from "svelte-popperjs";
	import { writable, type Writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import PopperContent from "./popper-content.wc.svelte";
	import CategoryStep from "./category-step.wc.svelte";
	import FormStep from "./form-step.wc.svelte";
	import SuccessStep from "./success-step.wc.svelte";
	import CssVar from "./css-var.wc.svelte";
	import seedToken from "../theme/seed";
	import type { Categories, Steps, GlobalWidgetContext } from "../types";

	export let feedbackTriggerButton: HTMLButtonElement | undefined = undefined;

	const showPopper = writable(false);
	const currentStep = writable<Steps>("category");
	const selectedCategory = writable<Categories>(null);

	const globalWidgetPropsContext = getContext<Writable<GlobalWidgetContext>>("globalWidgetProps");
	const buttonProperties = feedbackTriggerButton?.dataset ?? {};

	const { colorPrimary, colorBgBase, colorTextBase } = seedToken;

	const projectId = buttonProperties.projectId ?? $globalWidgetPropsContext.projectId;
	const position = buttonProperties.position ?? $globalWidgetPropsContext.position ?? "right";
	const theme = {
		scheme: buttonProperties.scheme ?? $globalWidgetPropsContext.theme.scheme ?? "light",
		primaryColor:
			buttonProperties.primaryColor ?? $globalWidgetPropsContext.theme.primaryColor ?? colorPrimary,
		backgroundColor:
			buttonProperties.backgroundColor ??
			$globalWidgetPropsContext.theme.backgroundColor ??
			colorBgBase,
		textColor:
			buttonProperties.textColor ?? $globalWidgetPropsContext.theme.textColor ?? colorTextBase
	};
	const meta = {
		...$globalWidgetPropsContext.meta,
		...Object.entries(buttonProperties)
			.filter(([key]) => key.startsWith("meta"))
			.reduce((acc, [key, value]) => {
				const newKey = key.replace("meta", "").toLocaleLowerCase();
				acc[newKey] = value ?? "";
				return acc;
			}, {} as Record<string, string>)
	};

	setContext("config", {
		currentStep,
		showPopper,
		selectedCategory,
		props: {
			projectId,
			position,
			theme,
			meta
		}
	});

	if (projectId === undefined) {
		console.error("DropFeedback: Missing `projectId`");
	}

	const [popperRef, popperContent, getInstance] = createPopperActions({
		placement: "auto",
		strategy: "fixed"
	});
	const extraOpts = {
		modifiers: [{ name: "offset", options: { offset: [0, 12] } }]
	};

	onMount(() => {
		if (!feedbackTriggerButton) {
			return;
		}

		popperRef(feedbackTriggerButton);

		const togglePopper = () => {
			$showPopper = !$showPopper;
		};
		feedbackTriggerButton.addEventListener("click", togglePopper);

		return () => {
			if (!feedbackTriggerButton) {
				return;
			}

			feedbackTriggerButton.removeEventListener("click", togglePopper);
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
		if (!$showPopper) {
			return;
		}

		if (event.key === "Escape") {
			$showPopper = false;
		}
	};
</script>

<svelte:window on:keydown={escapeListener} />

<CssVar>
	{#if !feedbackTriggerButton}
		<button
			use:popperRef
			on:click={() => {
				$showPopper = !$showPopper;
			}}
			class="trigger-button"
			class:trigger-button-right={position === "right"}
			class:trigger-button-left={position === "left"}
		>
			feedbacky
		</button>
	{/if}

	{#if $showPopper}
		<div
			id="popper"
			class="popper"
			use:popperContent={extraOpts}
			use:updatePopperWhenPositionIsChanged={position}
			transition:fade={{ duration: 100 }}
		>
			{#if projectId === undefined}
				<p>Missing `projectId`</p>
			{:else if $currentStep === "category"}
				<PopperContent>
					<CategoryStep />
				</PopperContent>
			{:else if $currentStep === "form"}
				<PopperContent>
					<FormStep />
				</PopperContent>
			{:else if $currentStep === "success"}
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
