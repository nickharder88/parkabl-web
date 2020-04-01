// @flow

import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import ngeohash from 'ngeohash';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

// data
import Repository from '../../../repositories/repository';
import AddressModel, { type Address } from '../../../models/address';

// components
import Table from '../../../components/table';

Geocode.setApiKey(process.env.GCLOUD_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();

function List() {
  // prettier-ignore
  const [repository, setRepository] = useState<?Repository<Address, AddressModel>>();

  useEffect(() => {
    setRepository(
      new Repository<Address, AddressModel>(AddressModel, {
        hooks: {
          onWrite: async (data: Address): Promise<Address> => {
            // convert address to coordinates
            const responseGeocode = await new Promise((resolve, reject) => {
              Geocode.fromAddress(data).then(
                (response) => {
                  resolve(response);
                },
                (error) => {
                  reject(error);
                }
              );
            });

            let lat;
            let lng;
            if (
              responseGeocode &&
              responseGeocode.status === 'OK' &&
              responseGeocode.results &&
              responseGeocode.results[0] &&
              responseGeocode.results[0].geometry &&
              responseGeocode.results[0].geometry.location
            ) {
              lat = responseGeocode.results[0].geometry.location.lat;
              lng = responseGeocode.results[0].geometry.location.lng;
            } else {
              throw new Error('Unexpected format of geocode response');
            }

            // convert coordinates to geohash
            const geohash = ngeohash.encode(lat, lng);

            // return object
            return {
              ...data,
              geohash
            };
          }
        }
      })
    );
  }, []);

  const [columns] = useState([
    {
      title: 'House Num',
      field: 'houseNum',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Apartment Num',
      field: 'apartmentNum',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Street',
      field: 'street',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'City',
      field: 'city',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'State',
      field: 'state',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Country',
      field: 'country',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Postal',
      field: 'postal',
      editComponent: (props) => (
        <TextField
          fullWidth
          value={props.value || ''}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )
    }
  ]);

  return (
    <Box>
      {repository && (
        <Table
          title="Addresses"
          repository={repository}
          columns={columns}
          onNavigate={(id: string) => `/app/admin/addresses/${id}`}
        />
      )}
    </Box>
  );
}

export default List;
