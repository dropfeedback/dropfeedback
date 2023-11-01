<svelte:options
	customElement={{
		tag: "feedbacky-widget",
		props: {
			projectId: {
				reflect: true,
				type: "String",
				attribute: "project-id"
			},
			scheme: {
				reflect: true,
				type: "String",
				attribute: "theme-scheme"
			},
			primaryColor: {
				reflect: true,
				type: "String",
				attribute: "theme-primary-color"
			},
			backgroundColor: {
				reflect: true,
				type: "String",
				attribute: "theme-background-color"
			},
			textColor: {
				reflect: true,
				type: "String",
				attribute: "theme-text-color"
			},
			position: {
				reflect: true,
				type: "String",
				attribute: "position"
			}
		}
	}}
/>

<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import { createPopperActions } from "svelte-popperjs";
	import PopperContent from "./popper-content.wc.svelte";
	import CategoryStep from "./category-step.wc.svelte";
	import FormStep from "./form-step.wc.svelte";
	import SuccessStep from "./success-step.wc.svelte";
	import CssVar from "./css-var.wc.svelte";
	import seedToken from "../theme/seed";
	import type { Steps, Categories, WidgetContext } from "../types";

	const { colorPrimary, colorBgBase, colorTextBase } = seedToken;

	export let projectId: string;
	export let position: "right" | "left" = "right";
	export let scheme: "dark" | "light" = "light";
	export let primaryColor: string = colorPrimary;
	export let backgroundColor: string = colorBgBase;
	export let textColor: string = colorTextBase;

	const widgetProps = writable<WidgetContext>({
		projectId,
		position,
		theme: {
			scheme,
			primaryColor,
			backgroundColor,
			textColor
		}
	});
	const showPopper = writable(false);
	const currentStep = writable<Steps>("category");
	const selectedCategory = writable<Categories>(null);

	const widgetPropsContext = setContext("widgetProps", widgetProps);
	setContext("config", {
		currentStep,
		showPopper,
		selectedCategory
	});

	$: widgetPropsContext.set({
		projectId,
		position,
		theme: {
			scheme,
			primaryColor,
			backgroundColor,
			textColor
		}
	});

	if (projectId === undefined) {
		console.error("feedbacky: Missing projectId");
	}

	const [popperRef, popperContent, getInstance] = createPopperActions({
		placement: position === "right" ? "left" : "right",
		strategy: "fixed"
	});
	const extraOpts = {
		modifiers: [{ name: "offset", options: { offset: [0, 12] } }]
	};

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

{#if projectId !== undefined}
	<CssVar>
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

		<div id="popper" use:popperContent={extraOpts} use:updatePopperWhenPositionIsChanged={position}>
			<div class="popper" class:popper-opened={$showPopper}>
				{#if $currentStep === "category"}
					<PopperContent>
						<CategoryStep />
					</PopperContent>
				{:else if $currentStep === "form"}
					<PopperContent>
						<FormStep />
					</PopperContent>
				{/if}
				{#if $currentStep === "success"}
					<SuccessStep />
				{/if}
				<div class="arrow" data-popper-arrow data-popper-placement={position} />
			</div>
		</div>
	</CssVar>
{/if}

<style>
	:host,
	:global(*) {
		font-family: inherit;
		box-sizing: border-box;
	}

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
	}

	.popper-opened {
		opacity: 1;
	}

	.popper:not(.popper-opened) {
		opacity: 0;
	}

	.arrow,
	.arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: var(--color-bg-container);
	}

	.arrow {
		visibility: hidden;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
	}

	.arrow[data-popper-placement^="right"] {
		right: -4px;
	}

	.arrow[data-popper-placement^="left"] {
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

	/* Reset button */
	:global(button) {
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
	:global(button::-moz-focus-inner) {
		border: 0;
		padding: 0;
	}
</style>
