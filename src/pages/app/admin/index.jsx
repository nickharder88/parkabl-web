// @flow

import React from 'react';

import { Router } from '@reach/router';

import Layout from '../../../components/layout';
import PrivateRoute from '../../../components/privateRoute';

import Dashboard from '../../../apps/admin/dashboard';
import Operators from '../../../apps/admin/operators';
import Landlords from '../../../apps/admin/landlords';
import Tenants from '../../../apps/admin/tenants';

function AdminApp() {
  return (
    <Layout>
      <Router basepath="/app/admin">
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/operators" component={Operators} />
        <PrivateRoute path="/landlords" component={Landlords} />
        <PrivateRoute path="/tenants" component={Tenants} />
      </Router>
    </Layout>
  );
}

export default AdminApp;
