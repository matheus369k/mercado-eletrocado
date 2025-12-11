import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertSettingsActionContentModel, AlertSettingsActionContentModelProps } from '.';
import { DropdownModelRoot } from '@/components';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { fn } from 'storybook/test';
import { HashRouter, Route, Routes } from 'react-router-dom';

const props = {
  email: faker.internet.email(),
  referenceId: 'storyBook',
  handleClick: fn(),
};

const MetaAlertSettingContentModel: Meta<AlertSettingsActionContentModelProps> = {
  title: 'Pages/UserProfile/Components/AlertSettingsActionContentModel',
  component: AlertSettingsActionContentModel,
  tags: ['autodocs'],
  decorators: (Story) => (
    <HashRouter>
      <Routes>
        <Route
          path="*"
          element={
            <DropdownModelRoot mode="model" referenceId="storyBook">
              {Story()}
            </DropdownModelRoot>
          }
        />
      </Routes>
    </HashRouter>
  ),
  afterEach: () => {
    document.getElementById('storyBook')?.setAttribute('data-open', 'true');
  },
  argTypes: { message: { control: 'select', options: ['logout', 'delete'] } },
};

export default MetaAlertSettingContentModel;

export const LogoutAccount: StoryObj<AlertSettingsActionContentModelProps> = {
  args: { ...props, message: 'logout' },
};
export const DeleteAccount: StoryObj<AlertSettingsActionContentModelProps> = {
  args: { ...props, message: 'delete' },
};
