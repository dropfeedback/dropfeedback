<script lang="ts">
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
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

<div class="success-wrapper">
	<div class="check-icon">
		<CheckIcon />
	</div>
	<p class="text">Your feedback has been received!</p>
	<p class="text">Thank you for help.</p>
</div>

<style>
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
