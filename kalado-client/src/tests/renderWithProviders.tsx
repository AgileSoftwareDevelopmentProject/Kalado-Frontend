import React from 'react';
import { render } from '@testing-library/react';

const renderWithProviders = (ui: React.ReactElement, { ...options } = {}) => {
  return render(ui, { ...options });
};

export default renderWithProviders;