import FooterPage from '@/components/FooterPage/FooterPage';
import { getCustomer } from '@/core/customers/services/customers';
import { Customer } from '@/core/customers/types/models';
import { useEffect, useState } from 'react';
import CustomerForm from '../form/CustomerForm';
import useCustomersListQuery from '../hooks/useCustomersListQuery';
import CustomersTable from './CustomersTable';
import Filters from './Filters';

export default function Customers({ id }: { id?: number }) {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useCustomersListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer>();
  const [loadingCustomer, setLoadingCustomer] = useState<boolean>(false);

  const loadCustomer = async () => {
    if (id) {
      setLoadingCustomer(true);

      setCustomer(await getCustomer({ id }));
      setOpen(true);

      setLoadingCustomer(false);
    }
  };

  useEffect(() => {
    loadCustomer();
  }, [id]);

  return (
    <>
      <FooterPage
        titlePage="Clientes"
        search={search}
        setOpenFilter={setOpenFilter}
        setOpenForm={() => {
          setCustomer(undefined);
          setOpen(true);
        }}
      />
      <div className="mt-10 px-3">
        <CustomersTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
          setCustomer={setCustomer}
          setOpen={setOpen}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      <CustomerForm open={open} setOpen={setOpen} onSubmitForm={() => getList()} customer={customer} />
    </>
  );
}
