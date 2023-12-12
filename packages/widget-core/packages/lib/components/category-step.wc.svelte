<script lang="ts">
	import { getContext, type ComponentType } from "svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import OtherIcon from "./icons/other.wc.svelte";
	import type { Categories, PopoverContext } from "../types";
	import type { Writable } from "svelte/store";

	const popoverContext = getContext<Writable<PopoverContext>>("popoverContext");

	const BUTTONS: { label: string; value: Categories; icon: ComponentType }[] = [
		{
			label: "Issue",
			value: "issue",
			icon: IssueIcon
		},
		{
			label: "Idea",
			value: "idea",
			icon: IdeaIcon
		},
		{
			label: "Other",
			value: "other",
			icon: OtherIcon
		}
	];
</script>

<div class="container">
	{#each BUTTONS as button (button.value)}
		<button
			class="category-button"
			on:click={() => {
				popoverContext.update((state) => ({
					...state,
					currentStep: "form",
					selectedCategory: button.value
				}));
			}}
		>
			<svelte:component this={button.icon} />
			<span>{button.label}</span>
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
		background-color: var(--color-fill-secondary);
	}

	.category-button:focus-visible {
		outline: 4px solid var(--color-primary-border);
		outline-offset: 1px;
		transition: outline-offset 0s, outline 0s;
	}
</style>
