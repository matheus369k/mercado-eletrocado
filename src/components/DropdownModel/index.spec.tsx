import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { describe } from 'vitest';
import {
  DropdownModelRoot,
  DropdownModelToggle,
  DropdownModelContent,
  DropdownModelItem,
  DropdownModelClose,
} from '.';
import { HashRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </HashRouter>
  );
};

describe('dropdown Model component', () => {
  const userEvents = userEvent.setup();

  it('should render with data-open with false', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelRootLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} root`;
    const dropdownModelRoot = screen.getByLabelText(dropdownModelRootLabelText);
    expect(dropdownModelRoot).toHaveAttribute('data-open', 'false');
  });

  it('should switch data-open from false to true when is clicked one time', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelStaticLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} `;
    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'true',
    );
  });

  it('should switch data-open from true to false when is clicked two time', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelStaticLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} `;
    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'true',
    );

    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should switch data-open from true to false when is clicked any item', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelStaticLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} `;
    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'true',
    );

    await userEvents.click(
      screen.getAllByLabelText(dropdownModelStaticLabelText.concat('item'))[0],
    );

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should switch data-open from true to false when is clicked leave of the dropdown model content', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelStaticLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} `;
    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'true',
    );

    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('root')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should switch data-open from true to false when is press ESCAPE key', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelStaticLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} `;
    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'true',
    );

    await userEvents.keyboard('[ESCAPE]');

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should switch data-open from true to false when is clicked in close button', async () => {
    const dropdownModelReferenceId = 'testing';
    const dropdownModelMode = 'dropdown';
    render(
      <DropdownModelRoot referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
        <DropdownModelToggle referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          open/close
        </DropdownModelToggle>
        <DropdownModelContent referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 1
          </DropdownModelItem>
          <DropdownModelItem referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            item 2
          </DropdownModelItem>
          <DropdownModelClose referenceId={dropdownModelReferenceId} mode={dropdownModelMode}>
            close
          </DropdownModelClose>
        </DropdownModelContent>
      </DropdownModelRoot>,
      { wrapper },
    );

    const dropdownModelStaticLabelText = `${dropdownModelMode} ${dropdownModelReferenceId} `;
    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('toggle')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'true',
    );

    await userEvents.click(screen.getByLabelText(dropdownModelStaticLabelText.concat('close')));

    expect(screen.getByLabelText(dropdownModelStaticLabelText.concat('root'))).toHaveAttribute(
      'data-open',
      'false',
    );
  });
});
