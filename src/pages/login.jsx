// @flow

import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import validate from 'validate.js';
import { navigate } from 'gatsby';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../firebase';
import { loginEmailPassword } from '../constraints';

type Credentials = {
  email: string,
  password: string
};

function Login() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<$Shape<Credentials>>({});
  const [credentials, setCredentials] = useImmer<Credentials>({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials((draft) => {
      draft[name] = value;
    });
  }

  function handleLogin() {
    const tempHelperText = validate(credentials, loginEmailPassword);
    if (tempHelperText) {
      setHelperText(() => tempHelperText);
      return;
    }

    setDisabled(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        setDisabled(false);
        // TODO handle non admin cases
        navigate('/app/admin/dashboard');
      })
      .catch((err) => {
        setDisabled(false);
        setCredentials((draft) => {
          draft.password = '';
        });
        console.log('error logging in');
      });
  }

  return (
    <Box
      marginTop={16}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box marginBottom={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            error={Boolean(helperText && helperText.email)}
            helperText={helperText && helperText.email}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            error={Boolean(helperText && helperText.password)}
            helperText={helperText && helperText.password}
          />
        </Box>
        <Button variant="contained" disabled={disabled} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
