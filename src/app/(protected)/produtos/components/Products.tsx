import * as Icon from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import ProductsTable from './ProductsTable';

export default function Products() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Typography fontSize={32}>Produtos</Typography>
        </div>
        <div className="flex gap-2">
          <Button startIcon={<Icon.FilterAlt/>} color='primary' variant='outlined'>
            Filtrar
          </Button>
          <Button startIcon={<Icon.Add/>} color='primary' variant='contained'>
            Novo
          </Button>
        </div>
      </div>
      <div className='mt-10'>
        <ProductsTable/>
      </div>
    </div>
  );
}
