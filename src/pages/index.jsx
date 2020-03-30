import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Link from '../components/Link';

import firebase from '../firebase';

function Index() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(firebase.auth().currentUser));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(Boolean(firebase.auth().currentUser));
      }
    });
  }, []);

  return (
    <Box
      marginTop="200px"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography variant="h4">parkabl</Typography>
      <Box marginTop={2}>
        {signedIn ? (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/app/admin/dashboard"
          >
            Go To App
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            LOGIN
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Index;
