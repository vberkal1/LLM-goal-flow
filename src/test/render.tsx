import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { AppProviders } from 'app/providers/app-providers';

function Providers({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>;
}

export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: Providers });
}
