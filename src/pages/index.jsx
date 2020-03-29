import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Link from '../components/Link';

export default function Index() {
  // TODO if logged in, go to specific app

  return (
    <Box>
      <Typography>parkabl</Typography>
      <Link to="/login">Login</Link>
    </Box>
  );
}
