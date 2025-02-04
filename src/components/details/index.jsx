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
import Skeleton from '@material-ui/lab/Skeleton';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Repository from '../../repositories/repository';
import Model from '../../models/model';

import Table, { type Column } from '../../components/table';
import File from '../../components/file';

export type RelationshipHasOne = {
  // field on this object
  field: string,
  title: string,
  value?: ?string,
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

export type FileDefinition = {
  field: string,
  title: string,
  path: (value: string) => string
};

type Props<X> = {
  id: string,
  title: string,
  model: Class<X>,
  hasOne?: ?Array<RelationshipHasOne>,
  hasMany?: ?Array<RelationshipHasMany>,
  files?: ?Array<FileDefinition>,
  children?: ?ChildrenArray<any>
};

function Details<Y, X: Model<Y>>({
  id,
  title,
  model,
  hasOne,
  hasMany,
  files,
  children
}: Props<X>) {
  const [data, setData] = useState<?X>();
  const [hasOneLoading, setHasOneLoading] = useState<boolean>(false);
  const [hasOneValues, setHasOneValues] = useState();
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

  useEffect(() => {
    if (!data) {
      return;
    }

    if (hasOne && hasOne.length > 0) {
      setHasOneLoading(true);
      Promise.all(
        hasOne.map(async (item) => {
          const found = await item.model.find(data.data[item.field]);
          const value = await found.toStringAsync();
          return {
            ...item,
            value
          };
        })
      )
        .then((items) => {
          setHasOneLoading(false);
          setHasOneValues(items);
        })
        .catch(() => {
          setHasOneLoading(false);
        });
    }
  }, [data, hasOne]);

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
  }

  if (files && files.length > 0) {
    attributes = lodash.differenceWith(
      attributes,
      files,
      ([key], othVal) => key === othVal.field
    );
  }

  if (!attributes) {
    // TODO hard code attributes
    // $FlowFixMe
    attributes = Object.entries(data.data);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
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
      <Grid item xs={12} sm={6} lg={4}>
        {Boolean(hasOne && hasOne.length > 0) && (
          <Card>
            <CardContent>
              {Boolean(hasOneLoading || !hasOneValues)
                ? hasOne.map((item) => (
                    <Skeleton key={item.field} height={58} width="100%" />
                  ))
                : hasOneValues.map((item, index) => {
                    return (
                      <React.Fragment key={item.field}>
                        <Box
                          width="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                            flexDirection="column"
                          >
                            <Typography variant="caption">
                              {lodash.upperFirst(lodash.lowerCase(item.field))}
                            </Typography>
                            {item.value && (
                              <Typography>{item.value}</Typography>
                            )}
                          </Box>
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
                        {Boolean(index !== hasOneValues.length - 1) && (
                          <Box marginBottom={2}>
                            <Divider />
                          </Box>
                        )}
                      </React.Fragment>
                    );
                  })}
            </CardContent>
          </Card>
        )}
      </Grid>
      {Boolean(hasMany && hasMany.length > 0) && (
        <>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          {hasMany.map((item) => {
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
                  editable={false}
                  associable={true}
                />
              </Grid>
            );
          })}
        </>
      )}
      {Boolean(files && files.length > 0) && (
        <>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Typography>Files</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              {files.map((item) => {
                return (
                  <File
                    key={item.field}
                    title={item.title}
                    path={item.path(`${data.id}:${item.field}`)}
                  />
                );
              })}
            </Box>
          </Grid>
        </>
      )}
      {Boolean(children && Array.isArray(children)) && (
        <>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          {children.map((child) => (
            <Grid key={child.key} item xs={12} sm={6} xl={4}>
              {child}
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}

Details.defaultProps = {
  hasOne: null,
  hasMany: null,
  children: null
};

export default Details;
