<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<dialog id="feedback-form-dialog" {...$$restProps} bind:this={dialog}>
	<button aria-label="Close" class="close" on:click={() => dialog.close()}> X </button>
	<slot />
</dialog>

<style>
	dialog {
		padding-top: 2rem;
		position: relative;
	}

	.close {
		appearance: none;
		background-color: transparent;
		cursor: pointer;
		border: none;
		position: absolute;
		right: 0;
		top: 0;
		padding: 0.5rem;
		user-select: none;
	}
</style>
