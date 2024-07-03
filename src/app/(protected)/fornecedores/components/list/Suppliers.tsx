import FooterPage from '@/components/FooterPage/FooterPage';
import { Supplier } from '@/core/suppliers/types/models';
import { useState } from 'react';
import SupplierForm from '../form/SupplierForm';
import useSuppliersListQuery from '../hooks/useSuppliersListQuery';
import Filters from './Filters';
import SuppliersTable from './SuppliersTable';

export default function Suppliers() {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useSuppliersListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<Supplier>();

  return (
    <>
      <FooterPage
        titlePage="Fornecedores"
        search={search}
        setOpenFilter={setOpenFilter}
        setOpenForm={() => {
          setSupplier(undefined);
          setOpen(true);
        }}
      />
      <div className="mt-10 px-3">
        <SuppliersTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
          setSupplier={setSupplier}
          setOpen={setOpen}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      <SupplierForm open={open} setOpen={setOpen} onSubmitForm={() => getList()} supplier={supplier} />
    </>
  );
}
