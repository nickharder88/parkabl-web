// @flow

import React, {
  useRef,
  useState,
  createContext,
  type ChildrenArray,
  useContext
} from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const SnackbarContext = createContext({
  createSnackbar: (message: string, severity: string): void => undefined
});

export type Message = {
  key: number,
  value: string,
  severity: 'error' | 'info' | 'success' | 'warning'
};

type Props = {
  children: ChildrenArray<any>
};

export function SnackbarProvider({ children }: Props) {
  const queueRef = useRef<Array<Message>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<?Message>();

  function processQueue() {
    if (queueRef.current.length > 0) {
      setMessage(queueRef.current.shift());
      setOpen(true);
    }
  }

  function createSnackbar(message, severity) {
    queueRef.current.push({
      value: message,
      severity,
      key: new Date().getTime()
    });

    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  function handleExited() {
    processQueue();
  }

  return (
    <>
      <SnackbarContext.Provider value={{ createSnackbar }}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar
        key={message ? message.key : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        onExit={handleExited}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={message ? message.severity : undefined}
          onClose={handleClose}
        >
          {message ? message.value : ''}
        </Alert>
      </Snackbar>
    </>
  );
}

function useSnackbar() {
  const { createSnackbar } = useContext(SnackbarContext);

  function createSuccess(message: string) {
    createSnackbar(message, 'success');
  }

  function createError(message: string) {
    createSnackbar(message, 'error');
  }

  function createWarning(message: string) {
    createSnackbar(message, 'warning');
  }

  function createInfo(message: string) {
    createSnackbar(message, 'info');
  }

  return { createSuccess, createError, createWarning, createInfo };
}

export default useSnackbar;
