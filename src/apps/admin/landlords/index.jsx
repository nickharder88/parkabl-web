// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import LandlordModel, { type Landlord } from '../../../models/landlord';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';
import SelectModel from '../../../components/editComponents/selectModel';
import AddressModel from '../../../models/address';

function List() {
  // pull columns into tenant model attribute. Dynamically generate page

  const [repository] = useState<Repository<Landlord, LandlordModel>>(
    new Repository<Landlord, LandlordModel>(LandlordModel)
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
        title="Landlords"
        repository={repository}
        columns={columns}
        onNavigate={(id: string) => `/app/admin/landlords/${id}`}
      />
    </Box>
  );
}

export default List;
