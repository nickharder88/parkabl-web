// @flow

import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import lodash from 'lodash';

import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Repository from '../../repositories/repository';
import Model from '../../models/model';

import Table from '../../components/table';

export type Relationship = {
  key: string,
  type: 'hasOne' | 'hasMany',
  title: string,
  model: Class<Model<any>>,
  onNavigate: (id: string) => string,
  columns?: Array<any>
};

type Props<X> = {
  id: string,
  title: string,
  model: Class<Model<X>>,
  relationships: Array<Relationship>
};

function Details<Y, X: Model<Y>>({
  id,
  title,
  model,
  relationships
}: Props<X>) {
  const [data, setData] = useState<?X>();
  // $FlowFixMe
  const [repository] = useState<Repository<Y, X>>(
    // $FlowFixMe
    new Repository<Y, X>(model)
  );

  useEffect(() => {
    const subscription = repository.get(id).subscribe(setData);
    return () => {
      subscription.unsubscribe();
    };
  }, [repository, id]);

  if (!data) {
    return (
      <Box
        marginTop="200px"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <CircularProgress />
      </Box>
    );
  }

  const relationshipsHasOne: Array<Relationship> = relationships.filter(
    (item) => item.type === 'hasOne'
  );
  const relationshipsHasMany: Array<Relationship> = relationships.filter(
    (item) => item.type === 'hasMany'
  );

  const attributes = lodash.differenceWith(
    Object.entries(data.data),
    relationships,
    ([key], othVal) => key === othVal.key
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardHeader title={title} />
          <CardContent>
            {attributes.map(([key, value]) => (
              <React.Fragment key={key}>
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2">
                    {lodash.upperFirst(lodash.lowerCase(key))}
                  </Typography>
                  <Typography>{value}</Typography>
                </Box>
                <Box marginBottom={2}>
                  <Divider />
                </Box>
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {Boolean(relationshipsHasOne.length > 0) && (
          <Card>
            <CardContent>
              {relationshipsHasOne.map((item) => {
                return (
                  <React.Fragment key={item.key}>
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle2">
                        {lodash.upperFirst(lodash.lowerCase(item.key))}
                      </Typography>
                      <IconButton
                        // $FlowFixMe
                        onClick={() => {
                          const urlId = data.data[item.key];
                          const url = item.onNavigate(urlId);
                          navigate(url);
                        }}
                      >
                        <ExitToAppIcon />
                      </IconButton>
                    </Box>
                    <Box marginBottom={2}>
                      <Divider />
                    </Box>
                  </React.Fragment>
                );
              })}
            </CardContent>
          </Card>
        )}
      </Grid>
      <Hidden mdDown>
        <Grid item md={4} lg={6} />
      </Hidden>
      {relationshipsHasMany.map((item) => {
        const repo = new Repository(item.model);

        return (
          <Grid key={item.key} item xs={12} sm={6} xl={4}>
            <Table
              columns={item.columns}
              onNavigate={item.onNavigate}
              repository={repo}
              title={item.title}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Details;
