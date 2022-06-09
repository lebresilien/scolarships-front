import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Registration = () => {
    const { registration } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const router = useRouter()

    const { token } = router.query
     const submitForm = event => {
        event.preventDefault()
        registration({ name, surname, password, password_confirmation, token, setErrors })
    } 

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <a>
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </a>
                    </Link>
                }>

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <form onSubmit={submitForm}>
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">Nom</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={event => setName(event.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div>
                        <Label htmlFor="surname">Prenom</Label>

                        <Input
                            id="surname"
                            type="text"
                            value={surname}
                            className="block mt-1 w-full"
                            onChange={event => setSurname(event.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Mot de passe</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirmez votre mot de passe
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            value={password_confirmation}
                            className="block mt-1 w-full"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link href="/login">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Already registered?
                            </a>
                        </Link>

                        <Button className="ml-4">Register</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Registration
