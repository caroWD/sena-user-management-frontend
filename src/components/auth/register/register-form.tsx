import { useState, type ComponentProps } from 'react'
import type LoginForm from '../login/login-form'
import { useNavigate } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { registerFormSchema, type FormRegister } from './register-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoginResponse } from '../login/login-form'
import { toast } from 'sonner'
import { fetchData } from '@/lib/fetch-utils'
import { VITE_API_HOST, VITE_API_VERSION } from '@/config'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

type RegisterResponse = Omit<LoginResponse, 'token'>

const RegisterForm = ({ formId }: ComponentProps<typeof LoginForm>) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const form = useForm<FormRegister>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit = (request: FormRegister) => {
    toast.promise<RegisterResponse | null>(
      () =>
        fetchData<RegisterResponse, Omit<FormRegister, 'confirm'>>(
          `${VITE_API_HOST}${VITE_API_VERSION}/user`,
          {
            method: 'POST',
            headers: [['Content-Type', 'application/json']],
            request: {
              username: request.username,
              firstName: request.firstName,
              lastName: request.lastName,
              email: request.email,
              password: request.password,
            },
          }
        ),
      {
        loading: 'Cargando...',
        success: (data) => {
          if (!data)
            throw new Error('Algo salio mal al intentar inicial sesión')

          if (!data.status) throw new Error(data.message)

          navigate('/auth', { viewTransition: true })

          return data.message
        },
      }
    )
  }

  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-username`}>
                Nombre de usuario
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  id={`${formId}-username`}
                  aria-invalid={fieldState.invalid}
                  placeholder="john-wick"
                  autoComplete="off"
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-firstName`}>Nombre</FieldLabel>
              <Input
                {...field}
                id={`${formId}-firstName`}
                aria-invalid={fieldState.invalid}
                placeholder="John"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-lastName`}>Apellido</FieldLabel>
              <Input
                {...field}
                id={`${formId}-lastName`}
                aria-invalid={fieldState.invalid}
                placeholder="Wick"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
              <FieldDescription>
                Usaremos esta dirección para ponernos en contacto contigo. No
                compartiremos tu correo electrónico con nadie más.
              </FieldDescription>
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
              <FieldDescription>
                Debe tener al menos 8 caracteres.
              </FieldDescription>
            </Field>
          )}
        />
        <Controller
          name="confirm"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${formId}-confirm`}>Confirmar</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={`${formId}-confirm`}
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
              <FieldDescription>Confirma tu contraseña.</FieldDescription>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}

export default RegisterForm
