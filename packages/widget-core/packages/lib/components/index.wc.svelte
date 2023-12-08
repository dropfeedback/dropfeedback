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
	import Popper from "./popper.wc.svelte";
	import type { GlobalWidgetContext } from "../types";

	export let projectId: string | undefined = undefined;
	export let position: "right" | "left" | undefined = undefined;
	export let scheme: "dark" | "light" | undefined = undefined;
	export let primaryColor: string | undefined = undefined;
	export let backgroundColor: string | undefined = undefined;
	export let textColor: string | undefined = undefined;

	const meta = Object.entries($$restProps)
		.filter(([key]) => key.startsWith("meta-"))
		.reduce((acc, [key, value]) => {
			acc[key.replace("meta-", "")] = value;
			return acc;
		}, {} as Record<string, string>);

	const globalWidgetProps = writable<GlobalWidgetContext>({
		projectId,
		position,
		meta,
		theme: {
			scheme,
			primaryColor,
			backgroundColor,
			textColor
		}
	});

	const widgetPropsContext = setContext("globalWidgetProps", globalWidgetProps);

	$: widgetPropsContext.set({
		projectId,
		position,
		meta,
		theme: {
			scheme,
			primaryColor,
			backgroundColor,
			textColor
		}
	});

	const feedbackTriggerButtons = document.querySelectorAll(
		"[data-feedback-button]"
	) as NodeListOf<HTMLButtonElement>;
</script>

{#each feedbackTriggerButtons as feedbackTriggerButton}
	<Popper {feedbackTriggerButton} />
{/each}

{#if feedbackTriggerButtons.length === 0}
	<Popper />
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
