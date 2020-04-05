// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import OperatorModel from '../../../../models/operator';
import CompanyModel from '../../../../models/company';

type Props = {
  id: string
};

const hasOne = [
  {
    field: 'company',
    title: 'Company',
    model: CompanyModel,
    onNavigate: (id: string) => `/app/admin/companies/${id}`
  }
];

function Details({ id }: Props) {
  return (
    <GenericDetails
      id={id}
      title="Operator"
      model={OperatorModel}
      hasOne={hasOne}
    />
  );
}

export default Details;
