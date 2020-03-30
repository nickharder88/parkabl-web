// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import CompanyModel from '../../../../models/company';
import AddressModel from '../../../../models/address';

type Props = {
  id: string
};

const relationships = [
  {
    key: 'address',
    type: 'hasOne',
    title: 'Addresses',
    model: AddressModel,
    onNavigate: (id: string) => `/app/admin/addresses/${id}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Company"
      model={CompanyModel}
      relationships={relationships}
    />
  );
}

export default Details;
