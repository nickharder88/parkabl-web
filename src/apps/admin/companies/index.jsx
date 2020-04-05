// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import CompanyModel, { type Company } from '../../../models/company';
import AddressModel from '../../../models/address';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';
import SelectModel from '../../../components/editComponents/selectModel';

function List() {
  // pull columns into tenant model attribute. Dynamically generate page

  const [repository] = useState<Repository<Company, CompanyModel>>(
    new Repository<Company, CompanyModel>(CompanyModel)
  );

  const [columns] = useState([
    {
      title: 'Name',
      field: 'name',
      editComponent: TextField
    },
    {
      title: 'Address',
      field: 'address',
      model: AddressModel,
      editComponent: (props) => (
        <SelectModel
          model={AddressModel}
          value={props.value}
          onChange={props.onChange}
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
