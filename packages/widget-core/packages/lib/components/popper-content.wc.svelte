<script lang="ts">
	import { getContext } from "svelte";
	import CloseIcon from "./icons/close.wc.svelte";
	import type { Writable } from "svelte/store";

	const { showPopper } = getContext<{ showPopper: Writable<boolean> }>("config");
</script>

<div class="container">
	<h1 class="title">What's on your mind?</h1>
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
		font-size: 20px;
		font-weight: 700;
		margin: 0px;
		line-height: 1;
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
