import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ThemeProvider } from "~/providers/theme-provider";
import ThemeToggle from "./theme-toggle";

const meta = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Switches between light, dark and system themes via `next-themes`. The active palette comes from `/theme.css`, generated at runtime from `config/usaexpress/theme.json` — see HOW_TO_CHANGE_THEMES_DYNAMICALLY.md.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
