// @flow

import React, { type ChildrenArray, useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import lodash from 'lodash';

import Box from '@material-ui/core/Box';
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

import Table, { type Column } from '../../components/table';

export type RelationshipHasOne = {
  // field on this object
  field: string,
  title: string,
  model: Class<Model<any>>,
  onNavigate: (id: string) => string
};

export type RelationshipHasMany = {
  key: string,
  // field on other object
  field: string,
  title: string,
  model: Class<Model<any>>,
  columns: Array<Column>,
  onNavigate: (id: string) => string
};

type Props<X> = {
  id: string,
  title: string,
  model: Class<X>,
  hasOne?: ?Array<RelationshipHasOne>,
  hasMany?: ?Array<RelationshipHasMany>,
  children?: ?ChildrenArray<any>
};

function Details<Y, X: Model<Y>>({
  id,
  title,
  model,
  hasOne,
  hasMany,
  children
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

  let attributes;
  if (hasOne && hasOne.length > 0) {
    attributes = lodash.differenceWith(
      // $FlowFixMe
      Object.entries(data.data),
      hasOne,
      ([key], othVal) => key === othVal.field
    );
  } else {
    // TODO hard code attributes
    // $FlowFixMe
    attributes = Object.entries(data.data);
  }

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
        {Boolean(hasOne && hasOne.length > 0) && (
          <Card>
            <CardContent>
              {hasOne.map((item) => {
                return (
                  <React.Fragment key={item.field}>
                    <Box
                      width="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle2">
                        {lodash.upperFirst(lodash.lowerCase(item.field))}
                      </Typography>
                      <IconButton
                        // $FlowFixMe
                        onClick={() => {
                          const urlId = data.data[item.field];
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
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      {Boolean(hasMany && hasMany.length > 0) &&
        hasMany.map((item) => {
          const repo = new Repository(item.model, {
            parent: {
              key: item.field,
              value: data.id
            }
          });
          return (
            <Grid key={item.key} item xs={12} md={6} xl={4}>
              <Table
                columns={item.columns}
                onNavigate={item.onNavigate}
                repository={repo}
                title={item.title}
              />
            </Grid>
          );
        })}
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      {Boolean(children && Array.isArray(children)) &&
        children.map((child) => (
          <Grid key={child.key} item xs={12} sm={6} xl={4}>
            {child}
          </Grid>
        ))}
    </Grid>
  );
}

Details.defaultProps = {
  hasOne: null,
  hasMany: null,
  children: null
};

export default Details;
