<svelte:options
	customElement={{
		tag: "feedbacky-widget",
		props: {
			projectId: {
				reflect: true,
				type: "String",
				attribute: "project-id"
			},
			themeScheme: {
				reflect: true,
				type: "String",
				attribute: "theme-scheme"
			},
			themePrimaryColor: {
				reflect: true,
				type: "String",
				attribute: "theme-primary-color"
			},
			themeBackgroundColor: {
				reflect: true,
				type: "String",
				attribute: "theme-background-color"
			},
			themeTextColor: {
				reflect: true,
				type: "String",
				attribute: "theme-text-color"
			},
			defaultButtonPosition: {
				reflect: true,
				type: "String",
				attribute: "default-button-position"
			},
			defaultButtonEnabled: {
				reflect: true,
				type: "String",
				attribute: "default-button-enabled"
			}
		}
	}}
/>

<script lang="ts">
	import { setContext, onMount } from "svelte";
	import { writable } from "svelte/store";
	import Popover from "./popover.wc.svelte";
	import { stringToBoolean } from "../utils/stringToBoolean";
	import seedToken from "../theme/seed";
	import type { WidgetContext } from "../types";

	export let projectId: string | undefined = undefined;
	export let defaultButtonPosition: "right" | "left" | undefined = undefined;
	export let defaultButtonEnabled: string | undefined = undefined;
	export let themeScheme: "dark" | "light" | undefined = undefined;
	export let themePrimaryColor: string | undefined = undefined;
	export let themeBackgroundColor: string | undefined = undefined;
	export let themeTextColor: string | undefined = undefined;

	$: meta = Object.entries($$restProps)
		.filter(([key]) => key.startsWith("meta-"))
		.reduce((acc, [key, value]) => {
			acc[key.replace("meta-", "")] = value;
			return acc;
		}, {} as Record<string, string>);

	const { colorPrimary, colorBgBase, colorTextBase } = seedToken;

	const widgetContextState = writable<WidgetContext>({
		projectId,
		defaultButton: {
			position: defaultButtonPosition ?? "right",
			enabled: stringToBoolean(defaultButtonEnabled) ?? true
		},
		theme: {
			scheme: themeScheme ?? "light",
			primaryColor: themePrimaryColor ?? colorPrimary,
			backgroundColor: themeBackgroundColor ?? colorBgBase,
			textColor: themeTextColor ?? colorTextBase
		},
		meta
	});

	const widgetContext = setContext("widgetContext", widgetContextState);

	$: widgetContext.set({
		projectId,
		defaultButton: {
			position: defaultButtonPosition ?? "right",
			enabled: stringToBoolean(defaultButtonEnabled) ?? true
		},
		theme: {
			scheme: themeScheme ?? "light",
			primaryColor: themePrimaryColor ?? colorPrimary,
			backgroundColor: themeBackgroundColor ?? colorBgBase,
			textColor: themeTextColor ?? colorTextBase
		},
		meta
	});

	let popoverTriggerButtons = document.querySelectorAll(
		"[data-feedback-button]"
	) as NodeListOf<HTMLButtonElement>;

	onMount(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === "attributes") {
					popoverTriggerButtons = document.querySelectorAll(
						"[data-feedback-button]"
					) as NodeListOf<HTMLButtonElement>;
				}
			});
		});

		popoverTriggerButtons.forEach((popoverTriggerButton) => {
			observer.observe(popoverTriggerButton, {
				attributes: true
			});
		});

		return () => observer.disconnect();
	});

	onMount(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === "childList") {
					popoverTriggerButtons = document.querySelectorAll(
						"[data-feedback-button]"
					) as NodeListOf<HTMLButtonElement>;
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => observer.disconnect();
	});
</script>

{#each popoverTriggerButtons as popoverTriggerButton (popoverTriggerButton)}
	<Popover {popoverTriggerButton} />
{/each}

{#if stringToBoolean(defaultButtonEnabled) ?? true}
	<Popover defaultButtonPosition={defaultButtonPosition ?? "right"} />
{/if}

<style>
	:host,
	:global(*) {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
			"Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
			"Noto Color Emoji";
		box-sizing: border-box;
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
