// @flow

import React, { forwardRef, type Node, useEffect, useState } from 'react';
import { navigate } from 'gatsby';

import MaterialTable from 'material-table';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Edit from '@material-ui/icons/Edit';
import SaveAlt from '@material-ui/icons/SaveAlt';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Search from '@material-ui/icons/Search';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Remove from '@material-ui/icons/Remove';
import ViewColumn from '@material-ui/icons/ViewColumn';

import useAlert from '../../hooks/useSnackbar';

import Repository from '../../repositories/repository';
import Model from '../../models/model';

export type Column = {
  title: string,
  field: string,
  model?: Class<Model<any>>,
  editComponent?: (props: any) => Node
};

type Option = {
  key: string,
  value: string,
  label: string
};

type Props<Y, X: Model<Y>> = {
  title: string,
  repository: Repository<Y, X>,
  columns: Array<Column>,
  // Return URL to navigate to
  onNavigate: (id: string) => string,
  // true -> can crud rows for this table
  editable?: boolean,
  // true -> can relate rows to a parent
  associable?: boolean
};

function Table<Y, X: Model<Y>>({
  title,
  repository,
  columns,
  onNavigate,
  editable,
  associable
}: Props<Y, X>) {
  const { createError, createSuccess } = useAlert();
  const [menuAssociateAnchorEl, setMenuAssociateAnchorEl] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<Y>>([]);
  const [remaining, setRemaining] = useState<Array<Option>>([]);

  useEffect(() => {
    function handleItems(items: Array<X>): Promise<Array<X>> {
      return Promise.all(
        items.map(async (item: X) => {
          await Promise.all(
            columns.map(async (column) => {
              if (!column.model) {
                return;
              }

              const found = await column.model.find(item.data[column.field]);
              item.data[column.field] = await found.toStringAsync();
            })
          );

          return item;
        })
      );
    }

    setIsLoading(true);
    const subscription = repository.list().subscribe((items: Array<X>) => {
      handleItems(items)
        .then((handled: Array<X>) => {
          setIsLoading(false);
          setData(
            handled.map((item) => ({
              id: item.id,
              ...item.data
            }))
          );
        })
        .catch(() => {
          setIsLoading(false);
        });
    });

    let subscriptionAssociable;
    if (associable) {
      subscriptionAssociable = repository
        .remaining()
        .subscribe(async (items: Array<X>) => {
          const remaining = await Promise.all(
            items.map(async (item: X) => {
              const label = await item.toStringAsync();
              return {
                key: item.id,
                value: item.id,
                label
              };
            })
          );
          setRemaining(remaining);
        });
    }

    return () => {
      subscription.unsubscribe();

      if (subscriptionAssociable) {
        subscriptionAssociable.unsubscribe();
      }
    };
  }, [repository, columns, associable]);

  function onRowClick(event: any, rowData: { id: string }) {
    navigate(onNavigate(rowData.id));
  }

  function handleMenuAssociateClick(e) {
    setMenuAssociateAnchorEl(e.currentTarget);
  }

  function handleMenuAssociateClose() {
    setMenuAssociateAnchorEl(null);
  }

  function handleMenuItemAssociateClick(id: string) {
    repository
      .associate(id)
      .then(() => {
        createSuccess('Success');
      })
      .catch(() => {
        createError('Error');
      });
  }

  let actions;
  if (associable) {
    actions = [
      {
        icon: forwardRef((props, ref) => (
          <RemoveCircleIcon {...props} ref={ref} />
        )),
        tooltip: 'Dissociate',
        onClick: (event, rowData) => {
          repository
            .dissociate(rowData.id)
            .then(() => {
              createSuccess('Success');
            })
            .catch(() => {
              createError('Error');
            });
        }
      },
      {
        disabled: !remaining || remaining.length === 0,
        icon: forwardRef((props, ref) => <Add {...props} ref={ref} />),
        tooltip: 'Associate',
        isFreeAction: true,
        onClick: handleMenuAssociateClick
      }
    ];
  }

  let editableObj;
  if (editable) {
    editableObj = {
      onRowAdd: (newData: Y) =>
        repository
          .create(newData)
          .then(() => {
            createSuccess('Success');
          })
          .catch(() => {
            createError('Error');
          }),
      onRowUpdate: (newData, oldData) => {
        const updated = {
          ...newData
        };
        delete updated.id;
        return repository
          .update(oldData.id, updated)
          .then(() => {
            createSuccess('Success');
          })
          .catch(() => {
            createError('Error');
          });
      },
      onRowDelete: (oldData: { id: string }) =>
        repository
          .delete(oldData.id)
          .then(() => {
            createSuccess('Success');
          })
          .catch(() => {
            createError('Error');
          })
    };
  }

  return (
    <>
      <MaterialTable
        actions={actions}
        title={title}
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        isLoading={isLoading}
        editable={editableObj}
        options={{
          actionsColumnIndex: -1
        }}
        icons={{
          Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
          Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
          Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
          Delete: forwardRef((props, ref) => (
            <DeleteOutline {...props} ref={ref} />
          )),
          DetailPanel: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
          )),
          Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
          Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
          Filter: forwardRef((props, ref) => (
            <FilterList {...props} ref={ref} />
          )),
          FirstPage: forwardRef((props, ref) => (
            <FirstPage {...props} ref={ref} />
          )),
          LastPage: forwardRef((props, ref) => (
            <LastPage {...props} ref={ref} />
          )),
          NextPage: forwardRef((props, ref) => (
            <ChevronRight {...props} ref={ref} />
          )),
          PreviousPage: forwardRef((props, ref) => (
            <ChevronLeft {...props} ref={ref} />
          )),
          ResetSearch: forwardRef((props, ref) => (
            <Clear {...props} ref={ref} />
          )),
          Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
          SortArrow: forwardRef((props, ref) => (
            <ArrowUpward {...props} ref={ref} />
          )),
          ThirdStateCheck: forwardRef((props, ref) => (
            <Remove {...props} ref={ref} />
          )),
          ViewColumn: forwardRef((props, ref) => (
            <ViewColumn {...props} ref={ref} />
          ))
        }}
      />
      {associable && (
        <Menu
          anchorEl={menuAssociateAnchorEl}
          open={Boolean(menuAssociateAnchorEl)}
          onClose={() => handleMenuAssociateClose()}
        >
          {remaining &&
            remaining.map((item) => (
              <MenuItem
                key={item.key}
                onClick={() => handleMenuItemAssociateClick(item.key)}
              >
                {item.label}
              </MenuItem>
            ))}
        </Menu>
      )}
    </>
  );
}

Table.defaultProps = {
  editable: true,
  associable: false
};

export default Table;
