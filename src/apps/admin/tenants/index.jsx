// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import TenantModel, { type Tenant } from '../../../models/tenant';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';

function Tenants() {
  const [repository] = useState<Repository<Tenant, TenantModel>>(
    new Repository<Tenant, TenantModel>(TenantModel)
  );

  const [columns] = useState([
    {
      title: 'Name',
      field: 'name',
      editComponent: TextField
    },
    {
      title: 'Email',
      field: 'email',
      editComponent: TextField
    },
    {
      title: 'Phone',
      field: 'phone',
      editComponent: TextField
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
