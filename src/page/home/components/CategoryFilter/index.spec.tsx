import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { describe } from 'vitest';
import { CategoryFilter } from '.';
import { vi } from 'vitest';
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

describe('category filter component', () => {
  const userEvents = userEvent.setup();

  it('should render filter in mobile mode', () => {
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(300);
    render(<CategoryFilter handleUpdateFilter={vi.fn()} filter="all" />, { wrapper });

    expect(screen.getByLabelText(/dropdown categoryFilters root/)).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should open filter dropdown in mobile mode when is clicked in toggle button', async () => {
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(300);
    render(<CategoryFilter handleUpdateFilter={vi.fn()} filter="all" />, { wrapper });

    await userEvents.click(screen.getByLabelText(/dropdown categoryFilters toggle/));

    expect(screen.getByLabelText(/dropdown categoryFilters root/)).toHaveAttribute(
      'data-open',
      'true',
    );
  });

  it('should update filter in mobile mode when is clicked in filter option', async () => {
    const mockHandleFilter = vi.fn();
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(300);
    render(<CategoryFilter handleUpdateFilter={mockHandleFilter} filter="all" />, { wrapper });

    const dropdownModelItemToggleButton = screen.getByLabelText(/dropdown categoryFilters toggle/);
    await userEvents.click(dropdownModelItemToggleButton);
    const notebookFilterButton = screen.getByRole('button', { name: /Notebook/ });
    await userEvents.click(notebookFilterButton);

    expect(mockHandleFilter).toBeCalledWith('notebook');
  });

  it('should render filter in desktop mode', () => {
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1024);
    render(<CategoryFilter handleUpdateFilter={vi.fn()} filter="all" />, { wrapper });

    expect(screen.queryByLabelText(/dropdown categoryFilters root/)).toBeNull();
  });

  it('should update filter in desktop mode when is clicked in filter option', async () => {
    const mockHandleFilter = vi.fn();
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(1024);
    render(<CategoryFilter handleUpdateFilter={mockHandleFilter} filter="all" />, { wrapper });

    const notebookFilterButton = screen.getByRole('button', { name: /Notebook/ });
    await userEvents.click(notebookFilterButton);

    expect(mockHandleFilter).toBeCalledWith('notebook');
  });
});
