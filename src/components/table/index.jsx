// @flow

import React, { forwardRef, useState, useEffect } from 'react';

import MaterialTable from 'material-table';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
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

import Repository from '../../repositories/repository';
import Model from '../../models/model';

type Props<Y, X: Model<Y>> = {
  repository: Repository<Y, X>,
  columns: Array<any>
};

function Table<Y, X: Model<Y>>({ repository, columns }: Props<Y, X>) {
  const [data, setData] = useState<Array<Y>>([]);

  useEffect(() => {
    repository.list().then((items: Array<X>) => {
      setData(
        items.map((item: X) => ({
          id: item.id,
          ...item.data
        }))
      );
    });
  }, [repository]);

  return (
    <MaterialTable
      title="Tenants"
      columns={columns}
      data={data}
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
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => (
          <FirstPage {...props} ref={ref} />
        )),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => (
          <ChevronRight {...props} ref={ref} />
        )),
        PreviousPage: forwardRef((props, ref) => (
          <ChevronLeft {...props} ref={ref} />
        )),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
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
      editable={{
        onRowAdd: (newData: X) => repository.create(newData),
        onRowUpdate: (newData, oldData) => {
          const updated = {
            ...newData
          };
          delete updated.id;
          return repository.update(oldData.id, updated);
        },
        onRowDelete: (oldData: X) => repository.delete(oldData.id)
      }}
    />
  );
}

export default Table;
