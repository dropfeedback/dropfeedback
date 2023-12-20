<script lang="ts">
	import type { Writable } from "svelte/store";
	import LoadingIcon from "../icons/loading.wc.svelte";
	import { sendFeedback } from "../../api";
	import type { Categories, Steps } from "../../types";

	export let selectedCategory: Writable<Categories | null>;
	export let currentStep: Writable<Steps>;
	export let projectId: string;
	export let meta: Record<string, any>;

	let placeholder: string = "What's on your mind?";
	let content = "";
	let error = "";
	let loading = false;
	let duration: number;

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
		duration = Date.now();
		let widgetMeta = {};

		const widget = document.querySelector("drop-feedback");
		if (widget) {
			widgetMeta = widget.getAttributeNames().reduce((acc, name) => {
				if (name.startsWith("meta-")) {
					const newKey = name.replace("meta-", "").replace(/-([a-z])/g, (g) => g[1].toUpperCase());
					acc[newKey] = widget.getAttribute(name);
				}

				return acc;
			}, {} as Record<string, any>);
		}

		try {
			await sendFeedback({
				category: $selectedCategory ?? "other",
				content,
				projectId: projectId!,
				meta: {
					...widgetMeta,
					...meta
				}
			});

			const requestDuration = Date.now() - duration;
			if (requestDuration < 1000) {
				await new Promise((resolve) => setTimeout(resolve, 1000 - requestDuration));
			}

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
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		padding: 4px 8px;
		flex: 1;
		font-weight: 500;
		font-size: 14px;
		color: var(--color-text);
		background-color: var(--color-bg-container);
		transition: all 0.2s;
		resize: none;
		outline: none;
	}

	.textarea:active,
	.textarea:focus {
		box-shadow: 0 0 0 0.5px var(--color-border);
	}

	.textarea::placeholder {
		color: var(--color-text-quaternary);
	}

	.submit-button {
		width: 100%;
		background-color: var(--color-primary);
		border-radius: var(--border-radius);
		border: 1px solid transparent;
		color: #fff;
		padding-top: 8px;
		padding-bottom: 8px;
		font-family: inherit;
		transition: all 0.2s var(--motion-ease-in-out);
		overflow: hidden;
		cursor: pointer;
		font-weight: 600;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.submit-button:active {
		background-color: var(--color-primary-active);
	}

	.submit-button[disabled] {
		cursor: default;
		border-color: var(--color-border);
		background-color: var(--color-fill-tertiary);
		color: var(--color-text-quaternary);
	}

	.submit-button:not([disabled]):focus-visible {
		outline: 4px solid var(--color-primary-border);
		outline-offset: 1px;
		transition: outline-offset 0s, outline 0s;
	}

	.loading-button {
		border-color: var(--color-border);
		background-color: var(--color-fill-tertiary);
		color: var(--color-text-quaternary);
	}
</style>
