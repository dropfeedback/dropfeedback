<script lang="ts">
	import { getContext } from "svelte";
	import LoadingIcon from "./icons/loading.wc.svelte";
	import { sendFeedback } from "../api";
	import type { ConfigContext, WidgetProps } from "../types";

	const { currentStep, selectedCategory } = getContext<ConfigContext>("config");
	const { meta, projectId } = getContext<WidgetProps>("widgetProps");

	let placeholder: string = "What's on your mind?";
	let content = "";
	let error = "";
	let loading = false;

	$: if ($selectedCategory === "issue") {
		placeholder = "I noticed that...";
	} else if ($selectedCategory === "idea") {
		placeholder = "I would love...";
	} else if ($selectedCategory === "other") {
		placeholder = "What's on your mind?";
	}

	const submit = async () => {
		error = "";
		loading = true;

		try {
			await sendFeedback({
				// category: $selectedCategory,
				content,
				meta: meta || {},
				projectId
			});

			$currentStep = "success";
			content = "";
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = "Something went wrong";
			}
		} finally {
			loading = false;
		}
	};

	$: disabled = content.trim() === "" || loading;
</script>

<div class="container">
	<!-- svelte-ignore a11y-autofocus -->
	<textarea class="textarea" {placeholder} bind:value={content} autofocus />
	<button class="submit-button" class:loading-button={loading} {disabled} on:click={submit}>
		{#if loading}
			<svelte:component this={LoadingIcon} />
		{:else}
			Send feedback
		{/if}
	</button>
</div>

<style>
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.textarea {
		border: 2px solid rgb(226, 232, 240);
		border-radius: 8px;
		padding: 8px;
		flex: 1;
		font-family: inherit;
		font-weight: 500;
		word-break: break-word;
		font-size: 14px;
		color: rgb(45, 55, 72);
		resize: none;
	}

	.submit-button {
		width: 100%;
		background-color: rgb(0, 93, 255);
		border-radius: 7px;
		color: rgb(255, 255, 255);
		padding-top: 8px;
		padding-bottom: 8px;
		font-family: inherit;
		transition: all 0.3s ease;
		overflow: hidden;
		font-weight: 500;
		cursor: pointer;
		position: relative;
		opacity: 1;
		font-weight: 600;
		font-size: 0.875rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.submit-button[disabled] {
		background-color: rgb(237, 242, 247);
		color: rgb(160, 174, 192);
	}

	.loading-button {
		background-color: rgb(237, 242, 247);
		color: rgb(160, 174, 192);
	}
</style>
