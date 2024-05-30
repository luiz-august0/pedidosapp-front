import FilterDrawer from '@/components/FilterDrawer/FilterDrawer';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Dispatch } from 'react';

type Props = {
  openFilter: boolean;
  setOpenFilter: Dispatch<React.SetStateAction<boolean>>;
  status: EnumDefaultStatus;
  setStatus: Dispatch<React.SetStateAction<'ACTIVE' | 'INACTIVE' | 'ALL'>>;
};

export default function Filters({ openFilter, setOpenFilter, status, setStatus }: Props) {
  const handleStatus = (statusValue: EnumDefaultStatus) => {
    setStatus(statusValue);
    setOpenFilter(false);
  };

  return (
    <FilterDrawer openFilter={openFilter} setOpenFilter={setOpenFilter} disableButtons>
      <div>
        <InputLabel>Situação</InputLabel>
        <ToggleButtonGroup
          fullWidth
          value={status}
          exclusive
          onChange={(_, value) => handleStatus(value??status)}
          color="primary"
        >
          <ToggleButton value={'ACTIVE'}>Ativo</ToggleButton>
          <ToggleButton value={'INACTIVE'}>Inativo</ToggleButton>
          <ToggleButton value={'ALL'}>Todos</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </FilterDrawer>
  );
}
