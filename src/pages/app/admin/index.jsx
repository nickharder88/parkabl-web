// @flow

import React from 'react';

import { Router } from '@reach/router';

import Layout from '../../../components/layout';
import PrivateRoute from '../../../components/privateRoute';

import Dashboard from '../../../apps/admin/dashboard';

function AdminApp() {
  return (
    <Layout>
      <Router basepath="/app/admin">
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Router>
    </Layout>
  );
}

export default AdminApp;
