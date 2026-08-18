import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import SpiceClubStrip from '../SpiceClubStrip';

// Mock matchMedia for Framer Motion if it relies on it (common issue)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('SpiceClubStrip', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders successfully', () => {
    render(<SpiceClubStrip />);
    expect(screen.getByText('Join the Spice Club')).toBeInTheDocument();
  });

  it('shows error message when submitting empty email', async () => {
    const user = userEvent.setup();
    render(<SpiceClubStrip />);

    const joinButton = screen.getByRole('button', { name: /Join Free/i });
    await user.click(joinButton);

    expect(screen.getByText('Please enter a valid email address to join.')).toBeInTheDocument();
  });

  it('shows error message when submitting invalid email', async () => {
    const user = userEvent.setup();
    render(<SpiceClubStrip />);

    const emailInput = screen.getByRole('textbox', { name: /Email address/i });
    await user.type(emailInput, 'invalid-email');

    const joinButton = screen.getByRole('button', { name: /Join Free/i });
    await user.click(joinButton);

    expect(screen.getByText('Please enter a valid email address to join.')).toBeInTheDocument();
  });

  it('clears error status when typing after an error', async () => {
    const user = userEvent.setup();
    render(<SpiceClubStrip />);

    // Trigger error
    const joinButton = screen.getByRole('button', { name: /Join Free/i });
    await user.click(joinButton);
    expect(screen.getByText('Please enter a valid email address to join.')).toBeInTheDocument();

    // Type in input
    const emailInput = screen.getByRole('textbox', { name: /Email address/i });
    await user.type(emailInput, 'a');

    // Error should be gone
    expect(screen.queryByText('Please enter a valid email address to join.')).not.toBeInTheDocument();
  });

  it('displays success message on valid email submission', async () => {
    const user = userEvent.setup();
    render(<SpiceClubStrip />);

    const emailInput = screen.getByRole('textbox', { name: /Email address/i });
    await user.type(emailInput, 'test@example.com');

    const joinButton = screen.getByRole('button', { name: /Join Free/i });
    await user.click(joinButton);

    expect(screen.getByText(/You.re in! 🔥/)).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /Email address/i })).not.toBeInTheDocument();
  });
});
