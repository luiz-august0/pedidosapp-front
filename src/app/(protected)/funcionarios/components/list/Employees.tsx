import FooterPage from '@/components/FooterPage/FooterPage';
import { Employee } from '@/core/employees/types/models';
import { useState } from 'react';
import EmployeeForm from '../form/EmployeeForm';
import useEmployeesListQuery from '../hooks/useEmployeesListQuery';
import EmployeesTable from './EmployeesTable';
import Filters from './Filters';

export default function Employees() {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useEmployeesListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();

  return (
    <>
      <FooterPage
        titlePage="Funcionários"
        search={search}
        setOpenFilter={setOpenFilter}
        setOpenForm={() => {
          setEmployee(undefined);
          setOpen(true);
        }}
      />
      <div className="mt-10 px-3">
        <EmployeesTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
          setEmployee={setEmployee}
          setOpen={setOpen}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      {open && <EmployeeForm open={open} setOpen={setOpen} onSubmitForm={() => getList()} employee={employee} />}
    </>
  );
}
