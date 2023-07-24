<svelte:options customElement="feedbacky-widget" />

<script lang="ts">
	import Dialog from './dialog.svelte';
	import Form from './form.svelte';
	import Trigger from './trigger.svelte';

	let dialog: HTMLDialogElement;
</script>

<div class="feedbacky-widget">
	<Trigger on:click={() => dialog.showModal()} />
	<Dialog bind:dialog>
		<Form
			onFinish={() => {
				dialog.close();
			}}
		/>
	</Dialog>
</div>

<style global>
	/* host for shadow-dom  */
	:host,
	:global(.feedbacky-widget) {
		--fw-brand-color: #ed7138;
	}
</style>
