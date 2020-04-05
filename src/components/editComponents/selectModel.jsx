// @flow

import React, { type Node, useState, useEffect } from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Repository from '../../repositories/repository';
import Model from '../../models/model';

type Props<X> = {
  model: Class<X>,
  value: string,
  onChange: (value: string) => void
};

type Option = {
  key: string,
  value: string,
  label: string
};

function SelectModel<Y, X: Model<Y>>({
  model,
  value,
  onChange
}: Props<X>): Node {
  const [repo] = useState(new Repository<Y, X>(model));
  const [options, setOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    repo.list().subscribe((items) => {
      Promise.all(
        items.map(async (item: X) => {
          const label = await item.toStringAsync();
          return {
            key: item.id,
            value: item.id,
            label
          };
        })
      ).then(setOptions);
    });
  }, [repo]);

  console.log(value);
  console.log(options);

  return (
    <Select
      fullWidth
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <MenuItem value="">None</MenuItem>
      {options.map((option: Option) => (
        <MenuItem key={option.key} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectModel;
