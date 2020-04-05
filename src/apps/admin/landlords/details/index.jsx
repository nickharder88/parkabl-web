// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import LandlordModel from '../../../../models/landlord';
import AddressModel from '../../../../models/address';
import PropertyModel from '../../../../models/property';

type Props = {
  id: string
};

const hasOne = [
  {
    field: 'address',
    title: 'Addresses',
    model: AddressModel,
    onNavigate: (id: string) => `/app/admin/addresses/${id}`
  }
];

const hasMany = [
  {
    key: 'properties',
    field: 'landlord',
    title: 'Properties',
    model: PropertyModel,
    columns: [
      {
        title: 'Address',
        field: 'address',
        model: AddressModel
      }
    ],
    onNavigate: (id: string) => `/app/admin/properties/${id}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Landlord"
      model={LandlordModel}
      hasOne={hasOne}
      hasMany={hasMany}
    />
  );
}

export default Details;
