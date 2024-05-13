import FilterDrawer from '@/components/FilterDrawer/FilterDrawer';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { Button, ButtonGroup, InputLabel } from '@mui/material';
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
        <ButtonGroup variant="outlined" color="primary" fullWidth>
          <Button variant={status == 'ACTIVE' ? 'contained' : 'outlined'} onClick={() => handleStatus('ACTIVE')}>
            Ativo
          </Button>
          <Button variant={status == 'INACTIVE' ? 'contained' : 'outlined'} onClick={() => handleStatus('INACTIVE')}>
            Inativo
          </Button>
          <Button variant={status == 'ALL' ? 'contained' : 'outlined'} onClick={() => handleStatus('ALL')}>
            Todos
          </Button>
        </ButtonGroup>
      </div>
    </FilterDrawer>
  );
}
