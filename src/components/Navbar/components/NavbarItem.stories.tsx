import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavbarItemLink, NavbarItemRoot, type NavbarItemRootProps } from './NavbarItem';
import { HashRouter, Route, Routes } from 'react-router-dom';

const MetaNavbarItem: Meta<NavbarItemRootProps> = {
  title: 'Components/Navbar/Components',
  component: ({ isCurrentPage, children }) => (
    <NavbarItemRoot isCurrentPage={isCurrentPage}>
      <NavbarItemLink to={'*'} style={{ color: '#000' }}>
        {children}
      </NavbarItemLink>
    </NavbarItemRoot>
  ),
  decorators: (Story) => {
    return (
      <HashRouter>
        <Routes>
          <Route path="*" element={Story()} />
        </Routes>
      </HashRouter>
    );
  },
  parameters: {
    layout: 'centered',
  },
  args: { children: 'Usuario', isCurrentPage: true },
  argTypes: { isCurrentPage: { control: 'boolean' } },
};

export default MetaNavbarItem;

export const Default: StoryObj<NavbarItemRootProps> = {};
