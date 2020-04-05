// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import TenantModel, { type Tenant } from '../../../models/tenant';

// components
import Table from '../../../components/table';

function Tenants() {
  const [repository] = useState<Repository<Tenant, TenantModel>>(
    new Repository<Tenant, TenantModel>(TenantModel)
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
    }
  ]);

  return (
    <Box>
      <Table
        title="Tenants"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/tenants/${id}`}
      />
    </Box>
  );
}

export default Tenants;
