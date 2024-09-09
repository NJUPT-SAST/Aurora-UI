import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Badge, type BadgeProps } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
    type: {
      options: ['info', 'success', 'warning', 'error', 'ghost'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps: BadgeProps = {
  size: 'medium',
  type: 'info',
  content: '你好 世界👋',
  clickCopy: false,
};

export const DefaultBadge: Story = {
  args: {
    ...defaultProps,
  },
};

export const ExampleBadge: Story = {
  args: {
    ...defaultProps,
    type: 'error',
    content: 'hello',
  },
};
