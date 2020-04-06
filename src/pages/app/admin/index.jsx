// @flow

import React, { useEffect, useState } from 'react';
import { useStaticQuery } from 'gatsby';
import { Router } from '@reach/router';

import Layout from '../../../components/layout';
import PrivateRoute from '../../../components/privateRoute';

import Dashboard from '../../../apps/admin/dashboard';
import Address from '../../../apps/admin/addresses/details';
import ParkingSpot from '../../../apps/admin/parkingSpots/details';

const query = graphql`
  query Admin {
    site {
      siteMetadata {
        title
        menu {
          admin {
            links {
              key
              name
              icon
            }
          }
        }
      }
    }
  }
`;

function AdminApp() {
  const { site } = useStaticQuery(query);

  const [links, setLinks] = useState([]);

  useEffect(() => {
    Promise.all(
      site.siteMetadata.menu.admin.links
        .filter((link) => link.key !== 'dashboard')
        .map(async (link) => {
          // $FlowFixMe
          const ComponentList = await import(`../../../apps/admin/${link.key}`);
          // $FlowFixMe
          const ComponentDetails = await import(
            `../../../apps/admin/${link.key}/details`
          );

          return {
            ...link,
            componentList: ComponentList.default,
            componentDetails: ComponentDetails.default
          };
        })
    ).then(setLinks);
  }, [site]);

  return (
    <Layout>
      <Router basepath="/app/admin">
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/addresses/:id" component={Address} />
        <PrivateRoute path="/parking-spots/:id" component={ParkingSpot} />

        {links
          .filter((link) => link.key !== 'dashboard')
          .map((link) => (
            <React.Fragment key={link.key}>
              <PrivateRoute
                path={`/${link.key}`}
                component={link.componentList}
              />
              <PrivateRoute
                path={`/${link.key}/:id`}
                component={link.componentDetails}
              />
            </React.Fragment>
          ))}
      </Router>
    </Layout>
  );
}

export default AdminApp;
