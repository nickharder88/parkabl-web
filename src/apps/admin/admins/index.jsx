// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import AdminModel, { type Admin } from '../../../models/admin';

// components
import Table from '../../../components/table';

function List() {
  const [repository] = useState<Repository<Admin, AdminModel>>(
    new Repository<Admin, AdminModel>(AdminModel)
  );

  const [columns] = useState([
    {
      title: 'Name',
      field: 'name',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Email',
      field: 'email',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    }
  ]);

  return (
    <Box>
      <Table
        title="Admins"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/admins/${id}`}
      />
    </Box>
  );
}

export default List;
