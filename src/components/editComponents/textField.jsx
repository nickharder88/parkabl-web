// @flow

import React, { type Node, forwardRef } from 'react';

import MuiTextField from '@material-ui/core/TextField';

type Props = {
  value: string,
  onChange: (value: string) => void
};

function TextField({ value, onChange }: Props): Node {
  return (
    <MuiTextField
      fullWidth
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextField;
