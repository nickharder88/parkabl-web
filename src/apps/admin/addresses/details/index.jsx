// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import AddressModel from '../../../../models/address';

type Props = {
  id: string
};

function Details({ id }: Props) {
  return <GenericDetails id={id} title="Address" model={AddressModel} />;
}

export default Details;
