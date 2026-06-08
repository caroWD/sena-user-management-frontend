import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { type FormLogin, loginFormSchema } from './login-form-schema'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { fetchData } from '@/lib/fetch-utils'
import { VITE_API_HOST, VITE_API_VERSION } from '@/config'
import { useNavigate } from 'react-router'

export type LoginResponse = {
  message: string
  status: boolean
  token: string | null
}

interface LoginFormProps {
  formId: string
}

const LoginForm = ({ formId }: LoginFormProps) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const form = useForm<FormLogin>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (request: FormLogin) => {
    toast.promise<LoginResponse | null>(
      () =>
        fetchData<LoginResponse, FormLogin>(
          `${VITE_API_HOST}${VITE_API_VERSION}/user/login`,
          {
            method: 'POST',
            request,
            headers: [['Content-Type', 'application/json']],
          }
        ),
      {
        loading: 'Cargando...',
        success: (data) => {
          if (!data)
            throw new Error('Algo salio mal al intentar inicial sesión')

          if (!data.status || !data.token) throw new Error(data.message)

          localStorage.setItem(
            'tokens',
            JSON.stringify({ accessToken: data.token })
          )

          navigate('/', { viewTransition: true })

          return 'Usuario autorizado'
        },
        error: (error) =>
          error instanceof Error ? error.message : 'Algo salio mal',
      }
    )
  }

  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-email`}>
                Correo electrónico
              </FieldLabel>
              <Input
                {...field}
                id={`${formId}-email`}
                aria-invalid={fieldState.invalid}
                placeholder="john.wick@ejemplo.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-password`}>Contraseña</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={`${formId}-password`}
                  type={!showPassword ? 'password' : 'text'}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Show Password"
                    title="Show Password"
                    size="icon-xs"
                    onClick={() => handleShowPassword()}
                  >
                    {!showPassword ? <IconEyeOff /> : <IconEye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}

export default LoginForm
