<script lang="ts">
	import CloseIcon from "./icons/close.wc.svelte";
	import BackIcon from "./icons/back.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import type { Categories, Steps } from "../types";
	import type { Writable } from "svelte/store";

	export let selectedCategory: Writable<Categories | null>;
	export let currentStep: Writable<Steps>;
	export let openState: Writable<boolean>;
</script>

<div class="container">
	{#if $selectedCategory}
		<button
			aria-label="Back"
			class="back-button"
			on:click={() => {
				$currentStep = "category";
				$selectedCategory = null;
			}}
		>
			<BackIcon />
		</button>
	{/if}

	{#if $selectedCategory === "issue"}
		<div class="title">
			<IssueIcon size={24} />
			<h1 class="text">Report an issue</h1>
		</div>
	{:else if $selectedCategory === "idea"}
		<div class="title">
			<IdeaIcon size={24} />
			<h1 class="text">Share an idea</h1>
		</div>
	{:else if $selectedCategory === "other"}
		<h1 class="text">Tell us anything!</h1>
	{:else}
		<h1 class="text">What's on your mind?</h1>
	{/if}

	<button
		aria-label="Close"
		class="close-button"
		on:click={() => {
			$openState = false;
		}}
	>
		<CloseIcon />
	</button>
</div>
<slot />
<div class="brand">
	Widget by <span class="brand-name">DropFeedback</span>
</div>

<style>
	.container {
		position: relative;
		padding: 15px 16px;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		color: var(--color-text);
	}

	.text {
		font-size: 20px;
		font-weight: 700;
		margin: 0px;
		text-align: center;
		color: var(--color-text);
	}

	.close-button {
		position: absolute;
		top: 14px;
		right: 0px;
		padding: 0px;
		cursor: pointer;
		color: var(--color-text-tertiary);
		width: 24px;
		height: 24px;
		border-radius: var(--border-radius);
		transition: all 0.2s var(--motion-ease-in-out);
	}

	.close-button:hover {
		color: var(--color-text-secondary);
		background-color: var(--color-fill-tertiary);
	}

	.close-button:active {
		background-color: var(--color-fill-secondary);
	}

	.close-button:focus-visible {
		outline: 4px solid var(--color-primary-border);
		outline-offset: 1px;
		transition: outline-offset 0s, outline 0s;
	}

	.back-button {
		position: absolute;
		top: 14px;
		left: 0px;
		padding: 0px;
		cursor: pointer;
		color: var(--color-text-tertiary);
		width: 24px;
		height: 24px;
		border-radius: var(--border-radius);
		transition: all 0.2s var(--motion-ease-in-out);
	}

	.back-button:hover {
		color: var(--color-text-secondary);
		background-color: var(--color-fill-tertiary);
	}

	.back-button:active {
		background-color: var(--color-fill-secondary);
	}

	.back-button:focus-visible {
		outline: 4px solid var(--color-primary-border);
		outline-offset: 1px;
		transition: outline-offset 0s, outline 0s;
	}

	.brand {
		text-align: center;
		padding-top: 4px;
		padding-bottom: 4px;
		font-size: 10px;
		color: var(--color-text-tertiary);
	}

	.brand-name {
		color: var(--color-text-secondary);
	}
</style>
