// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import CompanyModel, { type Company } from '../../../models/company';

// components
import Table from '../../../components/table';

function List() {
  // pull columns into tenant model attribute. Dynamically generate page

  const [repository] = useState<Repository<Company, CompanyModel>>(
    new Repository<Company, CompanyModel>(CompanyModel)
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
      title: 'Address',
      field: 'address',
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
        title="Companies"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/companies/${id}`}
      />
    </Box>
  );
}

export default List;
