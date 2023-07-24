import type { Meta, StoryObj } from '@storybook/svelte';

import Widget from './index.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
	title: 'Widget',
	component: Widget,
	argTypes: {}
} satisfies Meta<Widget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};
