import { fireEvent, render, waitFor } from '@testing-library/svelte';
import Widget from './index.svelte';
import * as api from '../../api';

describe('Widget', () => {
	const showMock = vi.fn();
	const showModalMock = vi.fn();
	const closeMock = vi.fn();

	beforeAll(() => {
		// https://github.com/jsdom/jsdom/issues/3294
		HTMLDialogElement.prototype.show = showMock;
		HTMLDialogElement.prototype.showModal = showModalMock;
		HTMLDialogElement.prototype.close = closeMock;
	});

	afterEach(() => {
		vi.resetAllMocks();
		vi.restoreAllMocks();
		vi.clearAllMocks();
	});

	it('should open - close dialog', async () => {
		const { getByText } = render(Widget);

		const button = getByText(/feedbacky/i);
		button.click();
		expect(showModalMock).toHaveBeenCalled();

		const closeButton = getByText(/x/i);
		closeButton.click();
		expect(closeMock).toHaveBeenCalled();
	});

	it('should close dialog after submit', async () => {
		const spySendFeedback = vi
			.spyOn(api, 'sendFeedback')
			.mockImplementationOnce(() => Promise.resolve({}));

		const { getByText, getByPlaceholderText } = render(Widget);

		const button = getByText(/feedbacky/i);
		button.click();
		expect(showModalMock).toHaveBeenCalled();

		const input = getByPlaceholderText(/your feedback/i);
		fireEvent.input(input, { target: { value: '12345678910' } });

		const submitButton = getByText(/submit/i);
		submitButton.click();

		await waitFor(() => {
			expect(spySendFeedback).toHaveBeenCalled();
			expect(closeMock).toHaveBeenCalled();
		});
	});

	it('should render errors from API', async () => {
		const spySendFeedback = vi.spyOn(api, 'sendFeedback').mockImplementationOnce(() =>
			Promise.reject({
				message: 'Something went wrong'
			})
		);

		const { getByText, getByPlaceholderText, queryByTitle } = render(Widget);

		const button = getByText(/feedbacky/i);
		button.click();
		expect(showModalMock).toHaveBeenCalled();

		expect(queryByTitle('form-errors')).not.toBeInTheDocument();

		const input = getByPlaceholderText(/your feedback/i);
		fireEvent.input(input, { target: { value: '12345678910' } });

		const submitButton = getByText(/submit/i);
		submitButton.click();

		await waitFor(() => {
			expect(spySendFeedback).toHaveBeenCalled();
			expect(closeMock).not.toHaveBeenCalled();
			expect(queryByTitle('form-errors')).toHaveTextContent(/Something went wrong/i);
		});
	});
});
