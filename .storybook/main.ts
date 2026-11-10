import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../components/**/*.mdx",
    "../components/**/*.stories.@(ts|tsx)",
    "../app/**/*.mdx",
    "../app/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true,
  },
};
export default config;
