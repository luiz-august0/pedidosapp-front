import yup from "@/lib/yup/yup";

export default yup.object().shape({
  tenant: yup.string().required().label("Tenant de acesso"),
  login: yup.string().required().label("Login"),
  password: yup.string().required().label("Senha"),
});
