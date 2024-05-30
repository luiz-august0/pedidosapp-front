import yup from '@/lib/yup/yup';

export default yup.object().shape({
  name: yup.string().required().label('Nome'),
  email: (yup.string() as any).isValidEmail().label('E-mail'),
  cnpj: (yup.string() as any).isValidCpfCnpj().label('CNPJ'),
  cpf: (yup.string() as any).isValidCpfCnpj().label('CPF'),
  contact: (yup.string() as any).isValidPhone().label('Contato'),
});
