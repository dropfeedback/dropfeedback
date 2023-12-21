<svelte:options
	customElement={{
		tag: "drop-feedback",
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
			}
		}
	}}
/>

<script lang="ts">
	import { onMount } from "svelte";
	import Popover from "./popover/index.wc.svelte";
	import Inline from "./inline/index.wc.svelte";
	import { stringToBoolean } from "../utils/stringToBoolean";
	import seedToken from "../theme/seed";

	export let projectId: string | undefined = undefined;
	export let themeScheme: "dark" | "light" | undefined = undefined;
	export let themePrimaryColor: string | undefined = undefined;
	export let themeBackgroundColor: string | undefined = undefined;
	export let themeTextColor: string | undefined = undefined;
	$$restProps;

	const { colorPrimary, colorBgBase, colorTextBase } = seedToken;
	const initialMeta = {} as Record<string, string>;

	let popoverTriggerButtons = document.querySelectorAll(
		"[data-feedback-button]"
	) as NodeListOf<HTMLButtonElement>;
	let feedbackInputs = document.querySelectorAll(
		"[data-feedback-input]"
	) as NodeListOf<HTMLTextAreaElement>;

	onMount(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === "attributes" || mutation.type === "childList") {
					popoverTriggerButtons = document.querySelectorAll(
						"[data-feedback-button]"
					) as NodeListOf<HTMLButtonElement>;
				}
			});
		});

		// Observe existing popover trigger buttons
		popoverTriggerButtons.forEach((popoverTriggerButton) => {
			observer.observe(popoverTriggerButton, {
				attributes: true
			});
		});

		// Observe body for new popover trigger buttons
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		return () => observer.disconnect();
	});
</script>

{#each popoverTriggerButtons as popoverTriggerButton (popoverTriggerButton)}
	{@const dataset = popoverTriggerButton?.dataset}
	{@const preferedProjectId = popoverTriggerButton?.dataset?.projectId ?? projectId}
	{@const theme = {
		scheme: dataset?.themeScheme ?? themeScheme ?? "light",
		primaryColor: dataset?.themePrimaryColor ?? themePrimaryColor ?? colorPrimary,
		backgroundColor: dataset?.themeBackgroundColor ?? themeBackgroundColor ?? colorBgBase,
		textColor: dataset?.themeTextColor ?? themeTextColor ?? colorTextBase
	}}
	{@const side = dataset?.side ?? "auto"}
	{@const sideOffset = dataset?.sideOffset === "" ? 12 : Number(dataset?.sideOffset ?? 12)}
	{@const open = stringToBoolean(dataset?.open) ?? dataset?.open === "" ?? false}
	{@const permanentOpen =
		stringToBoolean(dataset?.permanentOpen) ?? dataset?.permanentOpen === "" ? true : false}
	{@const meta = Object.entries(dataset)
		.filter(([key]) => key.startsWith("meta"))
		.reduce((acc, [key, value]) => {
			const keyWithoutMetaPrefix = key.replace("meta", "");
			const newKey = keyWithoutMetaPrefix.charAt(0).toLowerCase() + keyWithoutMetaPrefix.slice(1);
			acc[newKey] = value ?? "";
			return acc;
		}, initialMeta)}
	<Popover
		{popoverTriggerButton}
		projectId={preferedProjectId}
		{theme}
		{side}
		{sideOffset}
		{open}
		{permanentOpen}
		{meta}
	/>
{/each}

{#each feedbackInputs as feedbackInput (feedbackInput)}
	{@const theme = {
		scheme: themeScheme ?? "light",
		primaryColor: themePrimaryColor ?? colorPrimary,
		backgroundColor: themeBackgroundColor ?? colorBgBase,
		textColor: themeTextColor ?? colorTextBase
	}}
	<Inline {projectId} {theme} {feedbackInput} />
{/each}

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
