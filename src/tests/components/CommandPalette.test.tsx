import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { CommandPalette } from '@/components/CommandPalette';

describe('CommandPalette', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    const { container } = renderWithRouter(<CommandPalette />);
    expect(container).toBeInTheDocument();
  });
});
