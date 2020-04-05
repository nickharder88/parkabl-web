// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import CompanyModel from '../../../../models/company';
import AddressModel from '../../../../models/address';
import OperatorModel from '../../../../models/operator';

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
    key: 'operators',
    field: 'company',
    title: 'Operators',
    model: OperatorModel,
    onNavigate: (id: string) => `/app/admin/operators/${id}`,
    columns: [
      {
        title: 'Name',
        field: 'name'
      },
      {
        title: 'Email',
        field: 'email'
      },
      {
        title: 'Phone',
        field: 'phone'
      }
    ]
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Company"
      model={CompanyModel}
      hasOne={hasOne}
      hasMany={hasMany}
    />
  );
}

export default Details;
