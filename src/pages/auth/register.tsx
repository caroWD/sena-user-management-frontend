import RegisterForm from '@/components/auth/register/register-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FieldDescription } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router'

const formId: string = 'form-register'

const Register = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>
          Introduce tus datos a continuación para crear tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm formId={formId} />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="flex-col gap-2 *:w-full">
        <Button type="submit" form={formId}>
          Crear cuenta
        </Button>
        <Button variant="outline">Regístrate con Google</Button>
        <FieldDescription className="text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/auth" viewTransition>
            Inicia sesión
          </Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}

export default Register
