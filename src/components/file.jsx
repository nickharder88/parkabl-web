// @flow

import React, { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import firebase from '../firebase';
import Input from '@material-ui/core/Input';

type Props = {
  title: string,
  path: string
};

function File({ title, path }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [triggerCheckUrl, setTriggerCheckUrl] = useState<boolean>(false);
  const [url, setUrl] = useState<?string>();
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    setTriggerCheckUrl(true);
  }, [path]);

  useEffect(() => {
    if (!triggerCheckUrl) {
      return;
    }

    setTriggerCheckUrl(false);

    const storage = firebase.storage();
    storage
      .ref(path)
      .getDownloadURL()
      .then((url: string) => {
        setUrl(url);
        setExists(true);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          setLoading(false);
          setExists(false);
        }
      });
  }, [triggerCheckUrl, path]);

  function handleUpload(e) {
    const storage = firebase.storage();
    const storageRef = storage.ref(path);
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      storageRef.put(file).then((snapshot) => {
        setLoading(false);
        setTriggerCheckUrl(true);
      });
    }
  }

  let content;
  if (loading) {
    content = <Skeleton height={50} width={100} />;
  } else if (exists) {
    content = (
      <Button variant="outlined" href={url} target="_blank">
        Download
      </Button>
    );
  } else {
    content = (
      <Input type="file" onChange={handleUpload}>
        Upload
      </Input>
    );
  }

  return (
    <Paper>
      <Box p={1} display="flex" flexDirection="column">
        <Box pb={1}>
          <Typography>{title}</Typography>
        </Box>
        {content}
      </Box>
    </Paper>
  );
}

export default File;
