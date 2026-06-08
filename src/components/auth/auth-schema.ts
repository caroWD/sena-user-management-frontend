import * as z from 'zod'

export const passwordSchema = z
  .string({ error: 'La Contraseña debe ser una cadena de caracteres.' })
  .refine((password) => !/\s+/g.test(password), {
    error: 'La Contraseña no puede contener espacios en blanco.',
  })
  .regex(/^(?=.*[a-z]).+$/, {
    error: 'La Contraseña debe contener mínimo una letra minúscula.',
  })
  .regex(/^(?=.*[A-Z]).+$/, {
    error: 'La Contraseña debe contener mínimo una letra mayúscula.',
  })
  .regex(/^(?=.*[0-9]).+$/, {
    error: 'La Contraseña debe contener mínimo un número.',
  })
  .regex(/^(?=.*\d)(?=.*[$@$!%*?&/])([A-Za-z\d$@$!%*?&/]|[^ ]).+$/, {
    error:
      'La Contraseña debe contener mínimo uno de los siguientes caracteres especiales: "$@$!%*?&/".',
  })
  .min(8, {
    error: 'La Contraseña debe contener mínimo 8 caracteres de longitud.',
  })
  .max(22, {
    error: 'La Contraseña debe contener máximo 22 caracteres de longitud.',
  })

export const emailSchema = z.email({
  error:
    'El correo electrónico debe tener el siguiente formato: <<nombre@dominio.com>>.',
})
