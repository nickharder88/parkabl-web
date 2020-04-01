// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import VehicleModel, { type Vehicle } from '../../../models/vehicle';

// components
import Table from '../../../components/table';

function List() {
  const [repository] = useState<Repository<Vehicle, VehicleModel>>(
    new Repository<Vehicle, VehicleModel>(VehicleModel)
  );

  const [columns] = useState([
    {
      title: 'Make',
      field: 'make',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Model',
      field: 'model',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'License',
      field: 'licensePlateNum',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'State',
      field: 'state',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Tenant',
      field: 'tenant',
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
        title="Vehicles"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/vehicles/${id}`}
      />
    </Box>
  );
}

export default List;
