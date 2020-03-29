// @flow

import React, { type ChildrenArray } from 'react';

import Shell from './shell';

type Props = {
  children: ChildrenArray<any>
};

function Layout({ children }: Props) {
  return <Shell>{children}</Shell>;
}

export default Layout;
