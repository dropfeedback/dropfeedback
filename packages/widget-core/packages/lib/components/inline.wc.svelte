<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { fly, slide } from "svelte/transition";
	import { createPopperActions } from "svelte-popperjs";
	import CssVar from "./css-var.wc.svelte";
	import IdeaIcon from "./icons/idea.wc.svelte";
	import IssueIcon from "./icons/issue.wc.svelte";
	import OtherIcon from "./icons/other.wc.svelte";
	import LoadingIcon from "./icons/loading.wc.svelte";
	import CheckIcon from "./icons/check.wc.svelte";
	import { sendFeedback } from "../api";
	import { cssObjectToString } from "../utils/cssObjectToString";
	import type { Categories, InlineSteps, ThemeProps } from "../types";

	export let feedbackInput: HTMLElement;
	export let projectId: string | undefined = undefined;
	export let theme: ThemeProps;
	export let meta: Record<string, any> = {};

	const CLOSED_HEIGHT = 48;
	const OPEN_HEIGHT = 205;
	const CLOSED_WIDTH = 223;
	const OPEN_WIDTH = 340;
	const CATEGORIES: Categories[] = ["issue", "idea", "other"];

	let placeholder: string = "";
	let content = "";
	let error = "";
	let loading = false;
	let duration: number;
	let currentStep: InlineSteps = "form";
	const selectedCategory = writable<Categories | null>(null);
	const openState = writable<boolean>(false);

	if (projectId === undefined) {
		console.error("DropFeedback: Missing `projectId`");
	}

	$: {
		if ($openState) {
			feedbackInput.style.width = `${OPEN_WIDTH}px`;
		} else {
			feedbackInput.style.width = `${CLOSED_WIDTH}px`;
		}
	}

	$: if ($selectedCategory === "issue") {
		placeholder = "I noticed that...";
	} else if ($selectedCategory === "idea") {
		placeholder = "I would love...";
	} else if ($selectedCategory === "other") {
		placeholder = "What's on your mind?";
	}

	const [popperRef, popperContent] = createPopperActions({
		strategy: "fixed",
		placement: "bottom"
	});
	const extraOpts = {
		modifiers: [
			{ name: "offset", options: { offset: [0, -CLOSED_HEIGHT] } },
			{
				name: "flip",
				enabled: false
			},
			{
				name: "computeStyles",
				options: {
					gpuAcceleration: false,
					adaptive: false,
					roundOffsets: false
				}
			}
		]
	};

	onMount(() => {
		feedbackInput.style.height = `${CLOSED_HEIGHT}px`;
		feedbackInput.style.width = `${CLOSED_WIDTH}px`;
		popperRef(feedbackInput);
	});

	$: styles = {
		inlineClosedHeight: `${CLOSED_HEIGHT}px`,
		inlineOpenHeight: `${OPEN_HEIGHT}px`,
		inlineClosedWidth: `${CLOSED_WIDTH}px`,
		inlineOpenWidth: `${OPEN_WIDTH}px`
	};

	$: stringStyles = cssObjectToString(styles);

	const submit = async () => {
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
			openState.set(false);
			event.stopImmediatePropagation();
		}
	};
</script>

<svelte:window on:keydown={escapeListener} />

<div use:popperContent={extraOpts}>
	<CssVar {theme}>
		<div class="container" class:active-container={$openState} style={stringStyles}>
			{#if currentStep === "form"}
				<div class="widget-wrapper">
					<p class="text">Give feedback</p>
					<div class="button-wrapper">
						{#each CATEGORIES as category (category)}
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
								title={category.charAt(0).toUpperCase() + category.slice(1)}
								aria-label={`Select ${category} category`}
							>
								{#if category === "issue"}
									<IssueIcon size={20} />
								{:else if category === "idea"}
									<IdeaIcon size={20} />
								{:else if category === "other"}
									<OtherIcon size={20} />
								{/if}
							</button>
						{/each}
					</div>
				</div>
				{#if $openState}
					<div class="input-wrapper" in:slide={{ axis: "y", duration: 200 }}>
						<!-- svelte-ignore a11y-autofocus -->
						<textarea class="textarea" {placeholder} bind:value={content} autofocus />
					</div>
					<div class="footer" in:slide={{ axis: "y", duration: 200 }}>
						{#if error}
							<p class="error-message" in:fly={{ opacity: 0 }}>
								{error}
							</p>
						{/if}
						<button class="submit-button" class:loading-button={loading} on:click={submit}>
							{#if loading}
								<LoadingIcon />
							{/if}
							Send
						</button>
					</div>
				{/if}
			{:else}
				<div class="success-wrapper">
					<div class="check-icon">
						<CheckIcon />
					</div>
					<p class="text">Your feedback has been received!</p>
					<p class="text">Thank you for help.</p>
				</div>
			{/if}
		</div>
	</CssVar>
</div>

<style>
	.container {
		height: var(--inline-closed-height);
		width: var(--inline-closed-width);
		border-radius: 24px;
		background-color: var(--color-bg-container);
		box-shadow: var(--shadow);
		overflow: hidden;
		transition:
			width 0.2s var(--motion-ease-in-out),
			height 0.2s var(--motion-ease-in-out);
	}

	.active-container {
		width: var(--inline-open-width);
		height: var(--inline-open-height);
		border-radius: 12px;
	}

	.widget-wrapper {
		height: var(--inline-closed-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding-left: 16px;
		padding-right: 8px;
	}

	.text {
		margin: 0;
		font-size: 14px;
		line-height: 20px;
		color: var(--color-text);
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

	.input-wrapper {
		display: flex;
		padding: 0px 8px 8px 8px;
	}

	.textarea {
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		padding: 10px 8px;
		flex: 1;
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
		justify-content: flex-end;
		border-top: 1px solid var(--color-border);
		background-color: var(--color-fill-quaternary);
		padding: 8px;
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

	.success-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: 100%;
	}

	.check-icon {
		color: var(--color-primary);
	}
</style>
