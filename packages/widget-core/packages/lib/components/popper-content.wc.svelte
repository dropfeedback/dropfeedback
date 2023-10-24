<script lang="ts">
	import { getContext } from "svelte";
	import CloseIcon from "./icons/close.wc.svelte";
	import BackIcon from "./icons/back.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import type { ConfigContext } from "../types";

	const { showPopper, selectedCategory, currentStep } = getContext<ConfigContext>("config");
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
			$showPopper = false;
		}}
	>
		<CloseIcon />
	</button>
</div>
<slot />
<div class="brand">
	Widget by <span class="brand-name">Arkadaslar1234</span>
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
	}

	.text {
		font-size: 20px;
		font-weight: 700;
		margin: 0px;
		text-align: center;
	}

	.close-button {
		position: absolute;
		top: 14px;
		right: 0px;
		padding: 0px;
		cursor: pointer;
		color: #a0aec0;
		width: 24px;
		height: 24px;
		transition: all 0.1s ease-in-out;
	}

	.close-button:hover {
		color: #718096;
	}

	.back-button {
		position: absolute;
		top: 14px;
		left: 0px;
		padding: 0px;
		cursor: pointer;
		color: #a0aec0;
		width: 24px;
		height: 24px;
		transition: all 0.1s ease-in-out;
	}

	.back-button:hover {
		color: #718096;
	}

	.brand {
		text-align: center;
		padding-top: 8px;
		padding-bottom: 8px;
		font-size: 10px;
		color: #a0aec0;
	}

	.brand-name {
		color: #718096;
	}
</style>
