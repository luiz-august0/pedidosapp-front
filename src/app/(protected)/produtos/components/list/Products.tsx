import * as Icon from '@mui/icons-material';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import useProductsListQuery from '../hooks/useProductsListQuery';
import Filters from './Filters';
import ProductsTable from './ProductsTable';

export default function Products() {
  const { list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } = useProductsListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <div>
      <div className="flex max-md:flex-col justify-between items-center">
        <div>
          <Typography fontSize={32}>Produtos</Typography>
        </div>
        <div className="flex gap-4 max-md:mt-5">
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
          <Button color="primary" variant="outlined" size="small" onClick={() => setOpenFilter(true)}>
            <Icon.FilterList color="primary" />
          </Button>
          <Button startIcon={<Icon.Add />} color="primary" variant="contained" size="small">
            Novo
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <ProductsTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
    </div>
  );
}
