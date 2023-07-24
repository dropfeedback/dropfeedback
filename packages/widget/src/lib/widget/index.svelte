<svelte:options customElement="feedbacky-widget" />

<script lang="ts">
	import type { WidgetProps } from '../../types/widget-props';
	import Dialog from './dialog.svelte';
	import Form from './form.svelte';
	import Trigger from './trigger.svelte';

	let widgetProps: WidgetProps = {
		projectId: $$restProps?.['project-id'],
		meta: $$restProps?.['meta'] ? JSON.parse($$restProps['meta']) : null
	};

	if (!widgetProps?.projectId) {
		console.error('feedbacky: Missing project-id');
	}

	let dialog: HTMLDialogElement;
</script>

{#if widgetProps?.projectId}
	<div class="feedbacky-widget">
		<Trigger on:click={() => dialog.showModal()} />
		<Dialog bind:dialog>
			<Form
				widgetProps={{
					projectId: widgetProps.projectId,
					meta: widgetProps.meta
				}}
				onFinish={() => {
					dialog.close();
				}}
			/>
		</Dialog>
	</div>
{/if}

<style global>
	/* host for shadow-dom  */
	:host,
	:global(.feedbacky-widget) {
		--fw-brand-color: #ed7138;
	}
</style>
