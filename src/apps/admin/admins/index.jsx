// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import AdminModel, { type Admin } from '../../../models/admin';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';

function List() {
  const [repository] = useState<Repository<Admin, AdminModel>>(
    new Repository<Admin, AdminModel>(AdminModel)
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
