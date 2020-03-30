// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import OperatorModel from '../../../../models/operator';
import CompanyModel from '../../../../models/company';

type Props = {
  id: string
};

const relationships = [
  {
    key: 'company',
    type: 'hasOne',
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
      relationships={relationships}
    />
  );
}

export default Details;
