// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import VehicleModel, { type Vehicle } from '../../../models/vehicle';
import TenantModel from '../../../models/tenant';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';
import SelectModel from '../../../components/editComponents/selectModel';

function List() {
  const [repository] = useState<Repository<Vehicle, VehicleModel>>(
    new Repository<Vehicle, VehicleModel>(VehicleModel)
  );

  const [columns] = useState([
    {
      title: 'Make',
      field: 'make',
      editComponent: TextField
    },
    {
      title: 'Model',
      field: 'model',
      editComponent: TextField
    },
    {
      title: 'License',
      field: 'licensePlateNum',
      editComponent: TextField
    },
    {
      title: 'State',
      field: 'state',
      editComponent: TextField
    },
    {
      title: 'Tenant',
      field: 'tenant',
      model: TenantModel,
      editComponent: (props) => (
        <SelectModel
          model={TenantModel}
          value={props.value}
          onChange={props.onChange}
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
