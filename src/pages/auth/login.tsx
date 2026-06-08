import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router'
import LoginForm from '@/components/auth/login/login-form'
import { FieldDescription } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'

const formId: string = 'form-login'

const Login = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicia sesión en tu cuenta</CardTitle>
        <CardDescription>
          Introduce tu correo electrónico y contraseña a continuación para
          iniciar sesión en tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm formId={formId} />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="flex-col gap-2 *:w-full">
        <Button type="submit" form={formId}>
          Iniciar sesión
        </Button>
        <Button variant="outline">Iniciar sesión con Google</Button>
        <FieldDescription className="text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/auth/register" viewTransition>
            Regístrate
          </Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}

export default Login
