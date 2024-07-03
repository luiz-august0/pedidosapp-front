import FooterPage from '@/components/FooterPage/FooterPage';
import { useState } from 'react';
import useOrdersListQuery from '../hooks/useOrdersListQuery';
import Filters from './Filters';
import OrdersTable from './OrdersTable';

export default function Orders() {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useOrdersListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <>
      <FooterPage titlePage="Pedidos de Venda" search={search} setOpenFilter={setOpenFilter} />
      <div className="mt-10 px-3">
        <OrdersTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
    </>
  );
}
