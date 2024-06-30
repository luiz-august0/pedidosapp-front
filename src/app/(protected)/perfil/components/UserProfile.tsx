import FooterPage from "@/components/FooterPage/FooterPage";
import { User } from "@/core/users/types/models";
import { convertUrlToReadeableFile } from "@/helpers/converters";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthenticatedUserForm from "./form/AuthenticatedUserForm";

export default function UserProfile() {
  const { data } = useSession();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User>();

  const loadUser = async () => {
    if (data?.user) {
      setUser({
        ...data?.user,
        photoMultipart: data.user.photo
          ? {
              file: (await convertUrlToReadeableFile(
                data?.user.photo
              )) as string,
              filename: data?.user.photo.substring(
                data?.user.photo.lastIndexOf("/") + 1,
                data?.user.photo.length
              ),
            }
          : undefined,
      });
    }

    setLoadingUser(false);
  };

  useEffect(() => {
    loadUser();
  }, [data]);

  return (
    <>
      <FooterPage titlePage="Perfil" />
      <div className="flex justify-center">
        <div className="w-1/2 p-3 mt-5 rounded-lg bg-gray-50 min-h-96">
          {loadingUser || !user ? (
            <div className="flex w-full h-full justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <AuthenticatedUserForm user={user} />
          )}
        </div>
      </div>
    </>
  );
}
