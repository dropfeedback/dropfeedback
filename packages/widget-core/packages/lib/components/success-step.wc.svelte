<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { fade, fly } from "svelte/transition";
	import CheckIcon from "./icons/check.wc.svelte";

	const dispatch = createEventDispatcher<{
		finish: void;
	}>();

	onMount(() => {
		setTimeout(() => {
			dispatch("finish");
		}, 5000);
	});
</script>

<div class="success-wrapper" in:fade>
	<div class="check-icon" in:fly={{ y: 15, duration: 200 }}>
		<CheckIcon />
	</div>
	<p class="text" in:fly={{ y: 15, duration: 200, delay: 100 }}>Your feedback has been received!</p>
	<p class="text" in:fly={{ y: 15, duration: 200, delay: 200 }}>Thank you for help.</p>
</div>

<style>
	.success-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: var(--height);
	}

	.check-icon {
		color: var(--color-success);
	}

	.text {
		margin: 0;
		font-size: 14px;
		line-height: 20px;
		color: var(--color-text);
	}
</style>
