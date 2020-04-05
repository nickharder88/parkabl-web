// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import PropertyModel, { type Property } from '../../../models/property';
import AddressModel from '../../../models/address';
import LandlordModel from '../../../models/landlord';

// components
import Table from '../../../components/table';

function List() {
  const [repository] = useState<Repository<Property, PropertyModel>>(
    new Repository<Property, PropertyModel>(PropertyModel)
  );

  const [columns] = useState([
    {
      title: 'Address',
      field: 'address',
      model: AddressModel,
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Landlord',
      field: 'landlord',
      model: LandlordModel,
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
        title="Properties"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/properties/${id}`}
      />
    </Box>
  );
}

export default List;
