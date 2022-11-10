import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { Footer } from '@components/Footer'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { trpc } from '@shared/services/trpc'
import { useNavigate, Link } from 'react-router-dom'

export function SignUp () {
  const signUpSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    passwordConfirmation: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    name: z.string().min(2, 'Nome completo é obrigatório'),
    terms: z.boolean().refine((value) => value, {
      message: 'Você precisa aceitar os termos de uso'
    })
  })
  type FieldValues = z.infer<typeof signUpSchema>

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(signUpSchema)
  })
  const navigation = useNavigate()

  const { mutateAsync } = trpc.users.create.useMutation({
    onSuccess: () => {
      navigation('/signin')
    },
    onError: (err) => {
      if (err.data?.httpStatus === 409) {
        setError('email', { message: 'E-mail já cadastrado' })
      }
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const { email, name, password, passwordConfirmation } = data
    if (password !== passwordConfirmation) {
      return setError('passwordConfirmation', { type: 'manual', message: 'As senhas não conferem' })
    }
    mutateAsync({ email, name, password })
  }
  const onError: SubmitErrorHandler<FieldValues> = (errors) => {
    console.log(errors)
  }

  return (
    <section className=" w-screen h-screen flex flex-1 flex-col">
      <div className="flex w-full justify-between h-full">
        <div className="w-full bg-[url('/money-save-background.jpg')] bg-cover bg-center "></div>
        <div className="bg-slate-200 w-full flex flex-col justify-center items-center">
          <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" color={ errors.name ? 'failure' : ''} value="Nome completo" />
                </div>
                <TextInput
                  color={ errors.name ? 'failure' : ''}
                  id="name"
                  type="text"
                  placeholder="João da Silva"
                  shadow={true}
                  {...register('name')}
                  required
                />
                {errors.name?.message && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.name.message}</p>}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" color={ errors.email ? 'failure' : ''} value="E-mail" />
                </div>
                <TextInput
                  id="email"
                  color={ errors.email ? 'failure' : ''}
                  type="email"
                  placeholder="joao@exemplo.com"
                  shadow={true}
                  {...register('email')}
                  required
                />
                {errors.email?.message && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.email.message}</p>}

              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" color={ errors.password ? 'failure' : ''} value="Senha" />
                </div>
                <TextInput
                  id="password"
                  color={ errors.password ? 'failure' : ''}
                  type="password"
                  shadow={true}
                  placeholder="••••••••"
                  {...register('password')}
                  required
                />
                {errors.password?.message && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.password.message}</p>}

              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="repeat-password" color={ errors.passwordConfirmation ? 'failure' : ''} value="Confirmar senha" />
                </div>
                <TextInput
                  id="repeat-password"
                  color={ errors.passwordConfirmation ? 'failure' : ''}
                  type="password"
                  shadow={true}
                  placeholder="••••••••"
                  {...register('passwordConfirmation')}
                  required
                />
                {errors.passwordConfirmation?.message && <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors.passwordConfirmation.message}</p>}

              </div>
              <div className={`flex items-center gap-2 ${errors.terms ? 'border border-red-600 rounded' : ''}`}>
                <Checkbox id="agree"
                  {...register('terms')}
                  required
                />
                <Label htmlFor="agree">
                  Eu li e aceito os{' '}
                  <a
                    href="/forms"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    termos e condições
                  </a>

                </Label>
              </div>
              {errors.terms?.message && <p className='text-sm text-red-600 dark:text-red-500'>{errors.terms.message}</p>}
              <Button type="submit">Criar nova conta</Button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Já tem conta?{' '}
                <Link to='/signin'
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Faça o login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
