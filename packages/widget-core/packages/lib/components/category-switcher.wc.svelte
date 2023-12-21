<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import OtherIcon from "./icons/other.wc.svelte";
	import type { Categories } from "../types";

	export let selectedCategory: Categories | null;

	const CATEGORIES: Categories[] = ["issue", "idea", "other"];

	const dispatch = createEventDispatcher<{
		change: Categories;
	}>();

	const handleClick = (category: Categories) => {
		dispatch("change", category);
	};
</script>

<div class="button-wrapper">
	{#each CATEGORIES as category (category)}
		{@const label = category.charAt(0).toUpperCase() + category.slice(1)}
		<button
			class="category-button"
			class:active-category-button={selectedCategory === category}
			on:click={() => handleClick(category)}
			title={label}
			aria-label={`Select ${category} category`}
		>
			{#if category === "issue"}
				<IssueIcon />
			{:else if category === "idea"}
				<IdeaIcon />
			{:else if category === "other"}
				<OtherIcon />
			{/if}
		</button>
	{/each}
</div>

<style>
	.button-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1px;
	}

	.category-button {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		transition: all 0.2s var(--motion-ease-in-out);
		color: var(--color-text-secondary);
	}

	.category-button:hover {
		color: var(--color-primary);
		background-color: var(--color-primary-bg);
	}

	.active-category-button {
		background-color: var(--color-primary-bg);
		color: var(--color-primary);
	}
</style>
