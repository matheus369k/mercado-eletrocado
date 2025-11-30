import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { ProfileSettings } from '.';
import userEvent from '@testing-library/user-event';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
  useLocation: vi.fn(() => ({ pathname: window.location.toString() })),
}));

describe('setting component', () => {
  const useEvents = userEvent.setup();

  it('should initial as close dropdown settings', () => {
    render(<ProfileSettings />);

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should open dropdown settings when clicked in setting icon', async () => {
    render(<ProfileSettings />);

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    await useEvents.click(screen.getByLabelText(/dropdown setting toggle/i));

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'true');
  });

  it('should close dropdown settings when clicked in setting option', async () => {
    render(<ProfileSettings />);

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    await useEvents.click(screen.getByLabelText(/dropdown setting toggle/i));

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'true');

    await useEvents.click(screen.getAllByLabelText(/dropdown setting item/i)[0]);

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should open/close dropdown settings when clicked two time in setting toggle', async () => {
    render(<ProfileSettings />);

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    await useEvents.click(screen.getByLabelText(/dropdown setting toggle/i));

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'true');

    await useEvents.click(screen.getByLabelText(/dropdown setting toggle/i));

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });
});
