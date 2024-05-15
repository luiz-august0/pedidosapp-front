import * as Icon from '@mui/icons-material';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  titlePage: string;
  search?: Dispatch<SetStateAction<string | undefined>>;
  setOpenFilter?: Dispatch<SetStateAction<boolean>>;
  setOpenForm?: Dispatch<SetStateAction<boolean>>;
};

export default function FooterPage({ titlePage, search, setOpenFilter, setOpenForm }: Props) {
  return (
    <div className="flex max-md:flex-col justify-between max-md:items-center items-end sticky z-50 min-h-24 bg-gray-50 rounded-es-lg rounded-ee-lg top-0 p-2 drop-shadow-lg">
      <div>
        <Typography fontSize={32}>{titlePage}</Typography>
      </div>
      <div className="flex gap-4 max-md:mt-5">
        {search && (
          <TextField
            placeholder="Pesquisar"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon.Search />
                </InputAdornment>
              ),
            }}
            onChange={(e) => search(e.target.value)}
          />
        )}
        {setOpenFilter && (
          <Button color="primary" variant="outlined" size="small" onClick={() => setOpenFilter(true)}>
            <Icon.FilterList color="primary" />
          </Button>
        )}
        {setOpenForm && (
          <Button
            startIcon={<Icon.Add />}
            color="primary"
            variant="contained"
            size="small"
            onClick={() => setOpenForm(true)}
          >
            Novo
          </Button>
        )}
      </div>
    </div>
  );
}
