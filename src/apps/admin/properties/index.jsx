// @flow

import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import PropertyModel, { type Property } from '../../../models/property';
import AddressModel from '../../../models/address';
import LandlordModel from '../../../models/landlord';

// components
import Table from '../../../components/table';
import SelectModel from '../../../components/editComponents/selectModel';

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
        <SelectModel
          model={AddressModel}
          value={props.value}
          onChange={props.onChange}
        />
      )
    },
    {
      title: 'Landlord',
      field: 'landlord',
      model: LandlordModel,
      editComponent: (props) => (
        <SelectModel
          model={LandlordModel}
          value={props.value}
          onChange={props.onChange}
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
