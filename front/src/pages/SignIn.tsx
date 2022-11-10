import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { Footer } from '@components/Footer'
import {
  FieldErrorsImpl,
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { trpc } from '@shared/services/trpc'

export function SignIn () {
  const signInSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres')
  })

  type FieldValues = z.infer<typeof signInSchema>
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(signInSchema)
  })
  const { mutateAsync: handleSignIn } = trpc.users.signin.useMutation()

  const onSubmit: SubmitHandler<FieldValues> = ({
    email,
    password
  }: FieldValues) => {
    handleSignIn({ email, password })
  }
  const onError: SubmitErrorHandler<FieldValues> = (
    errors: FieldErrorsImpl<FieldValues>
  ) => {
    console.log(errors)
  }

  return (
    <section className=" w-screen h-screen flex flex-1 flex-col">
      <div className="flex w-full justify-between h-full">
        <div className="w-full bg-[url('/money-save-background.jpg')] bg-cover bg-center "></div>
        <div className="bg-slate-200 w-full flex flex-col justify-center items-center">
          <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-6"
            >
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Save Money
              </h5>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Seu e-mail</Label>
                </div>
                <TextInput
                  type="email"
                  id="email"
                  placeholder="joao@exemplo.com.br"
                  {...register('email')}
                  color={errors.email ? 'failure' : ''}
                />
                {errors.email?.message && (
                  <p className="mt-2 text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Sua senha</Label>
                </div>
                <TextInput
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register('password')}
                  color={errors.password ? 'failure' : ''}
                />
                {errors.password?.message && (
                  <p className="mt-2 text-red-600">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox id="remember" />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="remember" value="Lembrar-me" />
                  </div>
                </div>
                <a
                  href="'"
                  className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Esqueci minha senha?
                </a>
              </div>
              <Button type="submit" style={{ width: '100%' }}>
                Entrar na conta
              </Button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Não cadastrado?{' '}
                <Link
                  to="/signup"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Criar conta
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
