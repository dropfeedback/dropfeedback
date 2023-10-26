<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { ConfigContext } from "../types";

	const { currentStep, selectedCategory } = getContext<ConfigContext>("config");

	const finish = () => {
		$selectedCategory = null;
		$currentStep = "category";
	};

	onMount(() => {
		setTimeout(() => {
			finish();
		}, 5000);
	});
</script>

<div class="container">
	<svg
		version="1.1"
		id="Capa_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 50 50"
		xml:space="preserve"
		width="64px"
		height="64px"
		fill="#000000"
		><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		/><g id="SVGRepo_iconCarrier">
			<circle style="fill:#25AE88;" cx="25" cy="25" r="25" />
			<polyline
				style="fill:none;stroke:#FFFFFF;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
				points=" 38,15 22,33 12,25 "
			/>
		</g></svg
	>
	<p class="text">Thanks! We received your feedback.</p>
	<button
		type="button"
		class="button"
		on:click={() => {
			finish();
		}}>Submit more feedback</button
	>
</div>

<style>
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.text {
		font-weight: 600;
	}

	.button {
		background: rgb(237, 242, 247);
		font-size: 14px;
		padding: 4px 12px;
		color: rgb(74, 85, 104);
		border-radius: 16px;
		cursor: pointer;
	}
</style>
