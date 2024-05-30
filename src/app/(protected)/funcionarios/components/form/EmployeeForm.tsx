import StandardForm from "@/components/FormTypes/StandardForm";
import { FormButton } from "@/components/FormTypes/types/models";
import { InputMaskField } from "@/components/InputMaskField/InputMaskField";
import { getDigits } from "@/helpers/general";
import { successToast } from "@/helpers/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import schemaValidation from "./schemaValidation";
import { Employee } from "@/core/employees/types/models";
import { mutateEmployee } from "@/core/employees/services/employees";
import { EmployeeRequestDTO } from "@/core/employees/types/dtos";

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  employee?: Employee;
  onSubmitForm?: () => void;
};

export default function EmployeeForm({
  open,
  setOpen,
  employee,
  onSubmitForm,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<EmployeeRequestDTO>({
    resolver: yupResolver(schemaValidation),
  });

  useEffect(() => {
    if (open) {
      if (employee) {
        reset({
          login: employee.user.login,
          password: undefined,
          name: employee.name,
          contact: employee.contact,
          cpf: employee.cpf,
          email: employee.email,
          active: employee.active,
        });
      } else {
        reset({
          login: "",
          password: undefined,
          name: "",
          contact: "",
          cpf: "",
          email: "",
          active: true,
        });
      }
    }
  }, [employee, form, open]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors,
  } = form;

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: EmployeeRequestDTO) => {
    setLoading(true);

    const submitData: EmployeeRequestDTO = {
      ...data,
      cpf: getDigits(data.cpf ?? ""),
      contact: getDigits(data.contact ?? ""),
    };

    await mutateEmployee(submitData, employee?.id)
      .then(() => {
        successToast("Funcionário salvo com sucesso!");
        setLoading(false);
        handleClose();
        onSubmitForm?.();
      })
      .catch(() => setLoading(false));
  };

  const buttons: FormButton[] = [
    {
      id: "cancel",
      title: "Cancelar",
      color: "primary",
      onClick: handleClose,
      variant: "outlined",
    },
    {
      id: "submit",
      title: "Salvar",
      isSubmit: true,
      color: "primary",
      onClick: handleSubmit(onSubmit),
      loading: loading,
      variant: "contained",
    },
  ];

  return (
    <FormProvider {...form}>
      <StandardForm
        formButtons={buttons}
        formTitle={employee ? `Funcionário #${employee.id}` : "Novo"}
        handleClose={handleClose}
        open={open}
      >
        <div className="flex flex-col mt-4 gap-4 items-start">
          <FormControlLabel
            sx={{ margin: "0", marginBottom: "16px" }}
            value="top"
            control={
              <Switch
                checked={watch("active")}
                onChange={() => setValue("active", !watch("active"))}
                name="active"
                color="primary"
                id="employee-active-switch"
              />
            }
            label="Ativo"
            labelPlacement="top"
          />
          <Typography fontSize={18} fontWeight={"bold"}>Dados principais</Typography>
          <TextField
            {...register("name")}
            required
            fullWidth
            id="employee-name-text"
            label="Nome"
            name="name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("email")}
            fullWidth
            id="employee-email-text"
            label="E-mail"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <InputMaskField
            mask="999.999.999-99"
            value={watch("cpf")}
            onChange={(e) => {
              clearErrors("cpf");
              setValue("cpf", e.target.value);
            }}
          >
            {() => (
              <TextField
                fullWidth
                id="employee-cpf-text"
                label="CPF"
                name="cpf"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            )}
          </InputMaskField>
          <InputMaskField
            mask="(99) 99999-9999"
            value={watch("contact")}
            onChange={(e) => {
              clearErrors("contact");
              setValue("contact", e.target.value);
            }}
          >
            {() => (
              <TextField
                fullWidth
                id="employee-contact-text"
                label="Contato"
                name="contact"
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            )}
          </InputMaskField>
          <Typography fontSize={18} fontWeight={"bold"} sx={{ marginTop: "10px" }}>Dados para acesso ao sistema</Typography>
          <div className="flex flex-row gap-4 justify-between w-full">
            <TextField
              {...register("login")}
              fullWidth
              id="employee-login-text"
              label="Login"
              name="login"
              error={!!errors.login}
              helperText={errors.login?.message}
            />
            <TextField
              {...register("password")}
              fullWidth
              id="employee-password-text"
              label="Senha"
              name="password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>
        </div>
      </StandardForm>
    </FormProvider>
  );
}
