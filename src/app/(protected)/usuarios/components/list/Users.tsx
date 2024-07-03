import FooterPage from '@/components/FooterPage/FooterPage';
import { User } from '@/core/users/types/models';
import { convertUrlToReadeableFile } from '@/helpers/converters';
import { getFilenameFromUrl } from '@/helpers/general';
import UserForm from '@/shared/profile/components/form/UserForm';
import { useEffect, useState } from 'react';
import useUsersListQuery from '../hooks/useUsersListQuery';
import Filters from './Filters';
import UsersTable from './UsersTable';

export default function Users() {
  const { getList, list, pagination, setPagination, loading, sort, setSort, status, setStatus, search } =
    useUsersListQuery();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const loadUser = async () => {
    if (open && user) {
      setLoadingUser(true);

      setUser({
        ...user,
        photoMultipart: user.photo
          ? {
              file: (await convertUrlToReadeableFile(user.photo)) as string,
              filename: getFilenameFromUrl(user.photo),
            }
          : undefined,
      });

      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [open]);

  return (
    <>
      <FooterPage titlePage="Usuários" search={search} setOpenFilter={setOpenFilter} />
      <div className="mt-10 px-3">
        <UsersTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
          setUser={setUser}
          setOpen={setOpen}
        />
      </div>
      <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} status={status} setStatus={setStatus} />
      {open && (
        <UserForm open={open} setOpen={setOpen} user={user} loadingUser={loadingUser} onSubmitForm={() => getList()} />
      )}
    </>
  );
}
