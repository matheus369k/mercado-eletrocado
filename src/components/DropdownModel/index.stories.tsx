import type { Meta, StoryObj } from '@storybook/react-vite';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import * as DM from '.';
import { ROUTES_PATHNAMES } from '@/util/const';

const styles: { [key: string]: React.CSSProperties } = {
  model_content: {
    position: 'relative',
    padding: '1rem 0.5rem',
    maxWidth: '29rem',
    width: '100%',
    borderRadius: '8px',
    backgroundColor: 'var(--zinc-300)',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    alignItems: 'center',
  },
  dropdown_content: {
    position: 'relative',
    padding: '0.5rem',
    borderRadius: '8px',
    width: 'fit-content',
    backgroundColor: 'var(--zinc-300)',
    display: 'flex',
    flexDirection: 'column',
  },
};

const stylesButtons: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '2rem',
  padding: '0.25rem 1rem',
  fontSize: '0.875rem',
  color: '#fff',
  borderRadius: '8px',
  backgroundColor: 'var(--zinc-950)',
  textTransform: 'capitalize',
  cursor: 'pointer',
};

const stylesDropdownItem: React.CSSProperties = {
  paddingBlock: '0.5rem',
  cursor: 'pointer',
};

const MetaDropdownModel: Meta<DM.DropdownModelProps> = {
  title: 'Components/DropdownModel',
  component: ({ mode, referenceId }) => {
    const props = {
      referenceId,
      mode,
    };

    const dropdownModelChildren = () => {
      if (mode === 'model') {
        return (
          <>
            <DM.DropdownModelClose
              {...props}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
              }}>
              X
            </DM.DropdownModelClose>
            <div style={{ fontSize: '1rem', textTransform: 'capitalize', fontWeight: 'bold' }}>
              Send Message?
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                gap: '1rem',
              }}>
              <DM.DropdownModelClose {...props} style={{ ...stylesButtons, width: '100%' }}>
                Cancel
              </DM.DropdownModelClose>

              <DM.DropdownModelItem {...props} style={{ ...stylesButtons, width: '100%' }}>
                Send
              </DM.DropdownModelItem>
            </div>
          </>
        );
      }

      return (
        <>
          <DM.DropdownModelItem
            {...props}
            style={{
              ...stylesDropdownItem,
              borderBottom: '1px solid var(--zinc-400)',
            }}>
            Messages
          </DM.DropdownModelItem>

          <DM.DropdownModelItem
            {...props}
            style={{
              ...stylesDropdownItem,
              borderBottom: '1px solid var(--zinc-400)',
            }}>
            Newsletter
          </DM.DropdownModelItem>

          <DM.DropdownModelItem {...props} style={stylesDropdownItem}>
            E-mail
          </DM.DropdownModelItem>
        </>
      );
    };

    return (
      <DM.DropdownModelRoot
        {...props}
        style={{ height: '95dvh', width: '95dvw', overflow: 'hidden' }}>
        <DM.DropdownModelToggle {...props} style={stylesButtons}>
          Open/Close
        </DM.DropdownModelToggle>

        <DM.DropdownModelContent {...props} style={styles[`${mode}_content`]}>
          {dropdownModelChildren()}
        </DM.DropdownModelContent>
      </DM.DropdownModelRoot>
    );
  },
  decorators: (Story) => {
    return (
      <HashRouter>
        <Routes>
          <Route path="*" element={Story()} />
        </Routes>
      </HashRouter>
    );
  },
  argTypes: { mode: { control: 'inline-radio', options: ['model', 'dropdown'] } },
  args: {
    referenceId: 'storyBook',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default MetaDropdownModel;

export const Dropdown: StoryObj<DM.DropdownModelProps> = {
  args: {
    mode: 'dropdown',
  },
};

export const Model: StoryObj<DM.DropdownModelProps> = {
  args: {
    mode: 'model',
  },
};
