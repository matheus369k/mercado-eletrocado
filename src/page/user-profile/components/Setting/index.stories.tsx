import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileSettings } from '.';
import { HashRouter, Route, Routes } from 'react-router-dom';

const MetaProfileSetting: Meta<typeof ProfileSettings> = {
  title: 'Pages/UserProfile/Components/Settings',
  component: ProfileSettings,
  tags: ['autodocs'],
  decorators: (Story) => (
    <HashRouter>
      <Routes>
        <Route
          path="*"
          element={<div style={{ position: 'relative', width: '30px' }}>{Story()}</div>}
        />
      </Routes>
    </HashRouter>
  ),
};

export default MetaProfileSetting;

export const Default: StoryObj<typeof ProfileSettings> = {};
export const OpenModal: StoryObj<typeof ProfileSettings> = {
  afterEach: () => {
    document.getElementById('setting')?.setAttribute('data-open', 'true');
  },
};
