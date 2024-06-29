import { mutateAuthenticatedUser } from "@/core/users/services/users";
import { User } from "@/core/users/types/models";
import { successToast } from "@/helpers/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit } from "@mui/icons-material";
import { Avatar, Badge, Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import schemaValidation from "./schemaValidation";

export default function AuthenticatedUserForm({ user }: { user: User }) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<User>({
    defaultValues: {
      login: user.login,
      photo: user.photo,
    },
    resolver: yupResolver(schemaValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
    clearErrors,
  } = form;

  const onSubmit = async (data: User) => {
    setLoading(true);

    await mutateAuthenticatedUser(data)
      .then(() => {
        successToast("Usuário alterado com sucesso!");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleUploadClick = (event: SyntheticEvent) => {
    var file = event.target?.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setValue("photoMultipart", {
          file: reader.result as string,
          filename: file.name,
        });
      };
    }
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex justify-center">
          <input
            style={{ display: "none" }}
            accept="image/jpeg,image/png"
            id="photo-input-file"
            name="photo"
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="photo-input-file">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<Edit />}
              sx={{ cursor: "pointer" }}
            >
              <Avatar
                src={watch("photoMultipart")?.file ?? watch("photo")}
                sx={{ width: 150, height: 150 }}
              />
            </Badge>
          </label>
        </div>

        <TextField
          {...register("login")}
          required
          fullWidth
          id="user-login-text"
          label="Login"
          name="login"
          error={!!errors.login}
          helperText={errors.login?.message}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          color={"primary"}
          disabled={loading}
        >
          Salvar
        </Button>
      </div>
    </FormProvider>
  );
}
