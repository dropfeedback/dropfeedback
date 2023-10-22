<script lang="ts">
	import { getContext, type ComponentType } from "svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import OtherIcon from "./icons/other.wc.svelte";
	import type { ConfigContext, Categories } from "../types";

	const { currentStep, selectedCategory } = getContext<ConfigContext>("config");

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
				$currentStep = "form";
				$selectedCategory = button.value;
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
		border-radius: 8px;
		background-color: #f7fafc;
		color: #4a5568;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.1s ease-in-out;
		width: 100%;
	}

	.category-button:hover {
		background-color: #edf2f7;
	}
</style>
