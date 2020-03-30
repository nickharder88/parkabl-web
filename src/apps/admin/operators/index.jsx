// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import OperatorModel, { type Operator } from '../../../models/operator';

// components
import Table from '../../../components/table';

function List() {
  const [repository] = useState<Repository<Operator, OperatorModel>>(
    new Repository<Operator, OperatorModel>(OperatorModel)
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
    },
    {
      title: 'Phone',
      field: 'phone',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Company',
      field: 'company',
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
        title="Operators"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/operators/${id}`}
      />
    </Box>
  );
}

export default List;
