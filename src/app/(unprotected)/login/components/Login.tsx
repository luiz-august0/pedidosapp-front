import { SessionLogin } from '@/core/auth/types/models';
import { handlerHttpError, successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';

const defaultTheme = createTheme();

export default function Login() {
  const router = useRouter();
  const form = useForm<SessionLogin>({
    resolver: yupResolver(schemaValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SessionLogin) => {
    setLoading(true);

    const signInData = {
      tenant: data.tenant,
      login: data.login,
      password: data.password,
    };

    const result = await signIn('credentials', {
      ...signInData,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      handlerHttpError(JSON.parse(result.error));
      return;
    }

    successToast('Login realizado com sucesso!');

    router.replace('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                {...register('tenant')}
                margin="normal"
                required
                fullWidth
                id="tenant"
                hiddenLabel
                label="Tenant de acesso"
                name="tenant"
                autoFocus
                InputLabelProps={{ shrink: true }}
                error={!!errors.tenant}
                helperText={errors.tenant?.message}
              />
              <TextField
                {...register('login')}
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoFocus
                InputLabelProps={{ shrink: true }}
                error={!!errors.login}
                helperText={errors.login?.message}
              />
              <TextField
                {...register('password')}
                margin="normal"
                required
                fullWidth
                name="password"
                autoFocus
                InputLabelProps={{ shrink: true }}
                label="Senha"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              {loading ? (
                <LinearProgress color='primary' sx={{ mt: 3, mb: 2 }}/>
              ) : (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Entrar
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
