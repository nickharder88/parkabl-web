// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import OperatorModel, { type Operator } from '../../../models/operator';
import CompanyModel from '../../../models/company';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';
import SelectModel from '../../../components/editComponents/selectModel';

function List() {
  const [repository] = useState<Repository<Operator, OperatorModel>>(
    new Repository<Operator, OperatorModel>(OperatorModel)
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
    },
    {
      title: 'Company',
      field: 'company',
      model: CompanyModel,
      editComponent: (props) => (
        <SelectModel
          model={CompanyModel}
          value={props.value}
          onChange={props.onChange}
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
