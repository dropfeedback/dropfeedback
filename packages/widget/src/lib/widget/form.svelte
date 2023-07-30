<script lang="ts">
	import type { IFeedbackForm } from '../../types';
	import { writable } from 'svelte/store';
	import { sendFeedback } from '../../api';
	import type { WidgetProps } from '../../types/widget-props';

	export let widgetProps: {
		projectId: NonNullable<WidgetProps['projectId']>;
		meta: WidgetProps['meta'];
	};

	export let onFinish: (data: IFeedbackForm) => void;

	const formValues = writable<IFeedbackForm>({
		content: ''
	});
	let errors = '';
	let loading = false;

	const handleOnSubmit = async () => {
		errors = '';
		loading = true;

		try {
			await sendFeedback({
				content: $formValues.content,
				projectId: widgetProps.projectId,
				meta: widgetProps?.meta || null
			});
			onFinish($formValues);
			formValues.set({
				content: ''
			});
		} catch (error: any) {
			errors = error.message;
		} finally {
			loading = false;
		}
	};
</script>

<form method="dialog" on:submit|preventDefault={handleOnSubmit}>
	<h2>Send your feedback</h2>

	<textarea
		bind:value={$formValues.content}
		autofocus
		disabled={loading}
		aria-label="Feedback"
		name="feedback"
		placeholder="Please enter your feedback."
		required
		maxLength={500}
		rows={4}
	/>

	<button type="submit" disabled={loading} class="submit" class:loading>
		<span class="uppercase">Submit</span>
	</button>

	{#if errors}
		<p title="form-errors">
			{errors}
		</p>
	{/if}
</form>

<style>
	.submit {
		width: 100%;
		background-color: var(--fw-brand-color);
		color: white;
	}

	.submit.loading {
		cursor: wait;
		opacity: 0.5;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	h2 {
		padding: 0;
		margin: 0;
		text-align: center;
		text-transform: uppercase;
	}

	textarea {
		padding: 4px;
		resize: none;
		border: 1px solid #d1d5db;
	}

	p {
		padding: 0;
		margin: 0;
		color: #ef4444;
		font-size: 0.75rem;
	}
</style>
