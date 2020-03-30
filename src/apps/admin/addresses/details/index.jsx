// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import AddressModel from '../../../../models/address';

type Props = {
  id: string
};

const relationships = [];

function Details({ id }: Props) {
  console.log(id);

  return (
    <GenericDetails
      id={id}
      title="Address"
      model={AddressModel}
      relationships={relationships}
    />
  );
}

export default Details;
