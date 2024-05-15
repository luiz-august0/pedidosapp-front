import yup from '@/lib/yup/yup';

export default yup.object().shape({
  description: yup.string().required().label('Descrição'),
  unit: yup.string().required().label('Unidade de medida'),
  unitaryValue: yup.number().required().label('Valor unitário'),
});
