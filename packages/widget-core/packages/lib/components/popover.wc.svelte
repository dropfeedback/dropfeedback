<script lang="ts">
	import { onMount } from "svelte";
	import { createPopperActions } from "svelte-popperjs";
	import { fade, slide } from "svelte/transition";
	import CssVar from "./css-var.wc.svelte";
	import CategorySwitcher from "./category-switcher.wc.svelte";
	import SuccessStep from "./success-step.wc.svelte";
	import LoadingIcon from "./icons/loading.wc.svelte";
	import { getWidgetMeta } from "../utils/getWidgetMeta";
	import { clickOutside } from "../utils/clickOutside";
	import { sendFeedback } from "../api";
	import type { Categories, PopoverSide, Steps, ThemeProps } from "../types";

	export let popoverTriggerButton: HTMLButtonElement;
	export let projectId: string | undefined = undefined;
	export let theme: ThemeProps;
	export let side: string;
	export let sideOffset: number;
	export let open: boolean;
	export let permanentOpen: boolean;
	export let meta: Record<string, any> = {};

	let placeholder: string = "Your feedback...";
	let content = "";
	let error = "";
	let loading = false;
	let duration: number;
	let currentStep: Steps = "form";
	let selectedCategory: Categories | null = null;
	let openState: boolean = open;

	if (projectId === undefined) {
		console.error("DropFeedback: Missing `projectId`");
	}

	$: if (selectedCategory === "issue") {
		placeholder = "[Issue]: I noticed that...";
	} else if (selectedCategory === "idea") {
		placeholder = "[Idea]: I would love...";
	} else if (selectedCategory === "other") {
		placeholder = "[Other]: What's on your mind?";
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
			openState = !openState;
		};

		popoverTriggerButton.addEventListener("click", togglePopper);

		return () => popoverTriggerButton.removeEventListener("click", togglePopper);
	});

	const submit = async () => {
		if (!selectedCategory) {
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

		const widgetMeta = getWidgetMeta();

		try {
			await sendFeedback({
				category: selectedCategory,
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
		if (!openState) {
			return;
		}

		if (event.key === "Escape") {
			openState = false;
			event.stopImmediatePropagation();
		}
	};

	const onCategoryChange = (event: CustomEvent<Categories>) => {
		if (selectedCategory === event.detail) {
			selectedCategory = null;
		} else {
			selectedCategory = event.detail;
		}
	};

	const onFinished = () => {
		currentStep = "form";
		selectedCategory = null;
		openState = false;
	};
</script>

<svelte:window on:keydown={escapeListener} />

<CssVar {theme}>
	{#if permanentOpen || openState}
		<div
			id="popper"
			class="popper"
			use:popperContent={extraOpts}
			transition:fade={{ duration: 100 }}
			use:clickOutside
			on:outclick={() => {
				openState = false;
			}}
		>
			{#if currentStep === "form"}
				<div class="container">
					<!-- svelte-ignore a11y-autofocus -->
					<textarea class="textarea" {placeholder} bind:value={content} autofocus />
					{#if error}
						<p
							class="error-message"
							in:slide={{ axis: "y", duration: 200 }}
							out:slide={{ axis: "y", duration: 200 }}
						>
							{error}
						</p>
					{/if}
				</div>
				<div class="footer">
					<CategorySwitcher {selectedCategory} on:change={onCategoryChange} />
					<button class="submit-button" class:loading-button={loading} on:click={submit}>
						{#if loading}
							<LoadingIcon />
						{/if}
						Send
					</button>
				</div>
			{:else if currentStep === "success"}
				<SuccessStep on:finish={onFinished} --height="165px" />
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
		border-color: var(--color-border-active);
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
