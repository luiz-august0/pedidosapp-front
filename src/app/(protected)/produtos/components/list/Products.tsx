import FooterPage from '@/components/FooterPage/FooterPage';
import { useState } from 'react';
import ProductForm from '../form/ProductForm';
import useProductsListQuery from '../hooks/useProductsListQuery';
import Filters from './Filters';
import ProductsTable from './ProductsTable';

export default function Products() {
  const { list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } = useProductsListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <FooterPage titlePage="Produtos" search={search} setOpenFilter={setOpenFilter} setOpenForm={setOpen} />
      <div className="mt-10 px-3">
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
      <ProductForm open={open} setOpen={setOpen} />
    </>
  );
}
