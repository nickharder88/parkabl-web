// @flow

import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import validate from 'validate.js';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import loginEmailPassword from '../constraints';

type Credentials = {
  email: string,
  password: string
};

function Login() {
  const [helperText, setHelperText] = useState<$Shape<Credentials>>({});
  const [credentials, setCredentials] = useImmer<Credentials>({
    email: '',
    password: ''
  });

  function handleChange(e) {
    setCredentials((draft) => {
      draft[e.target.name] = e.target.value;
    });
  }

  function handleLogin() {
    const tempHelperText = validate(credentials, loginEmailPassword);
    if (tempHelperText) {
      setHelperText(() => tempHelperText);
      return;
    }

    console.log('logging in');
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight="600px"
    >
      <TextField
        fullWidth
        variant="outlined"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        error={Boolean(helperText && helperText.email)}
        helperText={helperText && helperText.email}
      />
      <TextField
        fullWidth
        type="password"
        variant="outlined"
        name="password"
        value={credentials.password}
        error={Boolean(helperText && helperText.password)}
        helperText={helperText && helperText.password}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
}

export default Login;
