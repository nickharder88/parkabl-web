// @flow

import React, { type ChildrenArray } from 'react';

import Shell from './shell';
import { SnackbarProvider } from '../hooks/useSnackbar';

type Props = {
  children: ChildrenArray<any>
};

function Layout({ children }: Props) {
  return (
    <SnackbarProvider>
      <Shell>{children}</Shell>
    </SnackbarProvider>
  );
}

export default Layout;
