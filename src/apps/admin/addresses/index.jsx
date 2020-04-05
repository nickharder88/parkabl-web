// @flow

import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import ngeohash from 'ngeohash';

import Box from '@material-ui/core/Box';

// data
import Repository from '../../../repositories/repository';
import AddressModel, { type Address } from '../../../models/address';

// components
import Table from '../../../components/table';
import TextField from '../../../components/editComponents/textField';

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
            const address = [];
            if (data.houseNum) {
              if (data.street) {
                address.push(`${data.houseNum} ${data.street}`);
              }
            } else if (data.apartmentNum) {
              if (data.street) {
                address.push(`${data.apartmentNum} ${data.street}`);
              }
            } else if (data.street) {
              address.push(data.street);
            }

            if (data.city) {
              address.push(data.city);
            }

            if (data.state) {
              if (data.postal) {
                address.push(`${data.state} ${data.postal}`);
              } else {
                address.push(data.state);
              }
            }

            if (data.country) {
              address.push(data.country);
            }

            // convert address to coordinates
            const responseGeocode = await new Promise((resolve, reject) => {
              Geocode.fromAddress(address.join(', ')).then(
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
      editComponent: TextField
    },
    {
      title: 'Apartment Num',
      field: 'apartmentNum',
      editComponent: TextField
    },
    {
      title: 'Street',
      field: 'street',
      editComponent: TextField
    },
    {
      title: 'City',
      field: 'city',
      editComponent: TextField
    },
    {
      title: 'State',
      field: 'state',
      editComponent: TextField
    },
    {
      title: 'Country',
      field: 'country',
      editComponent: TextField
    },
    {
      title: 'Postal',
      field: 'postal',
      editComponent: TextField
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
