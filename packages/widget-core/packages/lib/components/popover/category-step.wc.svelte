<script lang="ts">
	import type { Writable } from "svelte/store";
	import IdeaIcon from "../icons/idea.wc.svelte";
	import IssueIcon from "../icons/issue.wc.svelte";
	import OtherIcon from "../icons/other.wc.svelte";
	import type { Categories, Steps } from "../../types";

	const CATEGORIES: Categories[] = ["idea", "issue", "other"];

	export let selectedCategory: Writable<Categories | null>;
	export let currentStep: Writable<Steps>;
</script>

<div class="container">
	{#each CATEGORIES as category (category)}
		{@const label = category.charAt(0) + category.slice(1)}
		<button
			class="category-button"
			title={label}
			aria-label={`Select ${label} category`}
			on:click={() => {
				$currentStep = "form";
				$selectedCategory = category;
			}}
		>
			{#if category === "idea"}
				<IdeaIcon />
			{:else if category === "issue"}
				<IssueIcon />
			{:else if category === "other"}
				<OtherIcon />
			{/if}
			<span>{label}</span>
		</button>
	{/each}
</div>

<style>
	.container {
		flex: 1;
		display: flex;
		gap: 8px;
	}

	.category-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border-radius: 8px;
		background-color: var(--color-fill-tertiary);
		color: var(--color-text);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s var(--motion-ease-in-out);
		width: 100%;
	}

	.category-button:hover {
		color: var(--color-primary);
		background-color: var(--color-primary-bg);
	}

	.category-button:focus-visible {
		outline: 4px solid var(--color-primary-border);
		outline-offset: 1px;
		transition:
			outline-offset 0s,
			outline 0s;
	}
</style>
