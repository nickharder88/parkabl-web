// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import LandlordModel, { type Landlord } from '../../../models/landlord';

// components
import Table from '../../../components/table';

function List() {
  // pull columns into tenant model attribute. Dynamically generate page

  const [repository] = useState<Repository<Landlord, LandlordModel>>(
    new Repository<Landlord, LandlordModel>(LandlordModel)
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
        title="Landlords"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/landlords/${id}`}
      />
    </Box>
  );
}

export default List;
