// @flow

import React from 'react';

import GenericDetails from '../../../../components/details';
import AdminModel from '../../../../models/admin';

type Props = {
  id: string
};

function Details({ id }: Props) {
  return <GenericDetails id={id} title="Admin" model={AdminModel} />;
}

export default Details;
