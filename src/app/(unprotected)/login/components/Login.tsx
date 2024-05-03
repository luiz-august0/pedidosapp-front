import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"


export default function Login(): JSX.Element {
  const [tenant, setTenant] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSubmit = async(e: SyntheticEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      tenant,
      login,
      password,
      redirect: false
    })

    if (result?.error) {
      console.log(result)
      return
    }

    router.replace('/home')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col justify-center h-2/4 w-2/4 bg-neutral-300 rounded-md">        
        <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit}>
          <label>Tenant de acesso</label>
          <input type="text" value={tenant} onChange={(e) => setTenant(e.target.value)}/>
          <label>Login</label>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="w-64 bg-green-300 h-10" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}