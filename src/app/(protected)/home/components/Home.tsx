import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ButtonLogout from "./LogoutButton";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div>
      <h2>Ola, {session?.user?.login}</h2>
      <ButtonLogout/>
    </div>
  );
}
