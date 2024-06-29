import FooterPage from "@/components/FooterPage/FooterPage";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import AuthenticatedUserForm from "./form/AuthenticatedUserForm";

export default function UserProfile() {
  const { data } = useSession();

  return (
    <>
      <FooterPage titlePage="Perfil" />
      <div className="flex justify-center">
        <div className="w-1/2 p-3 mt-5 rounded-lg bg-gray-50 min-h-96">
          {!data?.user ? (
            <div className="flex w-full h-full justify-center items-center">
              <CircularProgress/>
            </div>
          ) : (
            <AuthenticatedUserForm user={data.user} />
          )}
        </div>
      </div>
    </>
  );
}
