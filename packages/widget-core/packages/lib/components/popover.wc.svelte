<script lang="ts">
	import { onMount } from "svelte";
	import { createPopperActions } from "svelte-popperjs";
	import { writable } from "svelte/store";
	import { fade, fly } from "svelte/transition";
	import CssVar from "./css-var.wc.svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import OtherIcon from "./icons/other.wc.svelte";
	import LoadingIcon from "./icons/loading.wc.svelte";
	import { sendFeedback } from "../api";
	import type { Categories, PopoverSide, Steps, ThemeProps } from "../types";

	const CATEGORIES: Categories[] = ["issue", "idea", "other"];

	export let popoverTriggerButton: HTMLButtonElement;
	export let projectId: string | undefined = undefined;
	export let theme: ThemeProps;
	export let side: string;
	export let sideOffset: number;
	export let open: boolean;
	export let permanentOpen: boolean;
	export let meta: Record<string, any> = {};

	let placeholder: string = "What's on your mind?";
	let content = "";
	let error = "";
	let loading = false;
	let duration: number;
	let currentStep: Steps = "form";
	const selectedCategory = writable<Categories | null>(null);
	$: openState = writable<boolean>(open);

	if (projectId === undefined) {
		console.error("DropFeedback: Missing `projectId`");
	}

	$: if ($selectedCategory === "issue") {
		placeholder = "I noticed that...";
	} else if ($selectedCategory === "idea") {
		placeholder = "I would love...";
	} else if ($selectedCategory === "other") {
		placeholder = "What's on your mind?";
	}

	const [popperRef, popperContent] = createPopperActions({
		strategy: "fixed"
	});
	$: extraOpts = {
		modifiers: [{ name: "offset", options: { offset: [0, sideOffset] } }],
		placement: side as PopoverSide
	};

	onMount(() => {
		popperRef(popoverTriggerButton);

		const togglePopper = () => {
			$openState = !$openState;
		};

		popoverTriggerButton.addEventListener("click", togglePopper);

		return () => popoverTriggerButton.removeEventListener("click", togglePopper);
	});

	const submit = async () => {
		if (!$selectedCategory) {
			error = "Please select a category";
			return;
		}
		if (content.trim() === "") {
			error = "Please enter your feedback";
			return;
		}

		error = "";
		loading = true;
		duration = Date.now();
		let widgetMeta = {};

		const widget = document.querySelector("drop-feedback");
		if (widget) {
			widgetMeta = widget.getAttributeNames().reduce(
				(acc, name) => {
					if (name.startsWith("meta-")) {
						const newKey = name
							.replace("meta-", "")
							.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
						acc[newKey] = widget.getAttribute(name);
					}

					return acc;
				},
				{} as Record<string, any>
			);
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

			currentStep = "success";
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

	const escapeListener = (event: KeyboardEvent) => {
		if (!$openState) {
			return;
		}

		if (event.key === "Escape") {
			$openState = false;
			event.stopImmediatePropagation();
		}
	};
</script>

<svelte:window on:keydown={escapeListener} />

<CssVar {theme}>
	{#if permanentOpen || $openState}
		<div
			id="popper"
			class="popper"
			use:popperContent={extraOpts}
			transition:fade={{ duration: 100 }}
		>
			{#if projectId === undefined}
				<p>Missing `projectId`</p>
			{:else if currentStep === "form"}
				<div class="container">
					<!-- svelte-ignore a11y-autofocus -->
					<textarea class="textarea" {placeholder} bind:value={content} autofocus />
					{#if error}
						<p class="error-message" in:fly={{ opacity: 0 }}>
							{error}
						</p>
					{/if}
				</div>
				<div class="footer">
					<div class="button-wrapper">
						{#each CATEGORIES as category (category)}
							{@const label = category.charAt(0) + category.slice(1)}
							<button
								class="category-button"
								class:active-category-button={$selectedCategory === category}
								on:click={() => {
									if ($selectedCategory === category) {
										selectedCategory.set(null);
										openState.set(false);
									} else {
										selectedCategory.set(category);
										openState.set(true);
									}
								}}
								title={label}
								aria-label={`Select ${category} category`}
							>
								{#if category === "issue"}
									<IssueIcon size={16} />
								{:else if category === "idea"}
									<IdeaIcon size={16} />
								{:else if category === "other"}
									<OtherIcon size={16} />
								{/if}
							</button>
						{/each}
					</div>
					<button class="submit-button" class:loading-button={loading} on:click={submit}>
						{#if loading}
							<LoadingIcon />
						{/if}
						Send
					</button>
				</div>
			{:else if currentStep === "success"}
				<!-- <SuccessStep {selectedCategory} {currentStep} /> -->
			{/if}
		</div>
	{/if}
</CssVar>

<style>
	.popper {
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow-menu);
		background-color: var(--color-bg-container);
		width: 340px;
		overflow: hidden;
		border-radius: 12px;
		z-index: 99999 !important;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 8px;
	}

	.textarea {
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		padding: 10px 8px;
		font-weight: 500;
		font-size: 14px;
		color: var(--color-text);
		background-color: var(--color-bg-container);
		transition: all 0.2s;
		resize: none;
		outline: none;
		height: 100px;
	}

	.textarea:active,
	.textarea:focus {
		box-shadow: 0 0 0 0.5px var(--color-border);
	}

	.textarea::placeholder {
		color: var(--color-text-quaternary);
	}

	.footer {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid var(--color-border);
		background-color: var(--color-fill-quaternary);
		padding: 8px;
	}

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

	.submit-button {
		background-color: var(--color-primary);
		border-radius: var(--border-radius);
		border: 1px solid transparent;
		color: #fff;
		padding-left: 8px;
		padding-right: 8px;
		height: 32px;
		font-family: inherit;
		transition: all 0.2s var(--motion-ease-in-out);
		overflow: hidden;
		cursor: pointer;
		font-weight: 600;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		gap: 4px;
	}

	.submit-button:active {
		background-color: var(--color-primary-active);
	}

	.loading-button {
		border-color: var(--color-border);
		background-color: var(--color-fill-secondary);
		color: var(--color-text-tertiary);
	}

	.error-message {
		color: var(--color-error);
		font-size: 12px;
		line-height: 16px;
		margin: 0;
		width: 100%;
	}
</style>
