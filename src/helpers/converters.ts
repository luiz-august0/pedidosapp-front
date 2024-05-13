import { GridSortItem, GridSortModel } from '@mui/x-data-grid';

export const convertSortModelToString = (sortModel?: GridSortModel): string => {
  if (sortModel && sortModel?.length > 0) {
    let sortedField: GridSortItem = sortModel[0];

    if (!sortedField.field || sortedField.field == "") return "";

    return (sortedField.field + "," + sortedField.sort);
  }

  return "";
} 