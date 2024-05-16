import FooterPage from '@/components/FooterPage/FooterPage';
import { Product } from '@/core/products/types/models';
import { useState } from 'react';
import ProductForm from '../form/ProductForm';
import useProductsListQuery from '../hooks/useProductsListQuery';
import Filters from './Filters';
import ProductsTable from './ProductsTable';

export default function Products() {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useProductsListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();

  const onSubmitForm = () => {
    setOpen(false);
    getList();
  };

  return (
    <>
      <FooterPage
        titlePage="Produtos"
        search={search}
        setOpenFilter={setOpenFilter}
        setOpenForm={() => {
          setProduct(undefined);
          setOpen(true);
        }}
      />
      <div className="mt-10 px-3">
        <ProductsTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
          setProduct={setProduct}
          setOpen={setOpen}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      <ProductForm open={open} setOpen={setOpen} onSubmitForm={onSubmitForm} product={product} />
    </>
  );
}
