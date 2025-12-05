import { initialize, mswLoader } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import '../src/styles/index.css';

initialize();

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    darkMode: { dark: { ...themes.dark }, light: { ...themes.normal }, current: 'dark' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
