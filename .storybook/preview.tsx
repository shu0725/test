import type { Preview } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';

import ThemeCustomization from '../src/themes';
import i18n from '../src/i18n';
import Lang from '../src/components/lang';
import React from 'react';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
// Global decorator to apply the theming and i18n to all stories
export const decorators = [
  (Story) => (
    <ThemeCustomization>
      <I18nextProvider i18n={i18n}>
        <Lang />
        <Story />
      </I18nextProvider>
    </ThemeCustomization>
  ),
];
export default preview;
