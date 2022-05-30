import { signIn, signOut, useSession } from 'next-auth/react'
import estilos from './signinbutton.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX, FiUserX } from 'react-icons/fi'

export default function SignInButton(){

    const { data: session, status } = useSession()

    return session ? (
        <button type="button"
                className={estilos.SignInButton}
                onClick={ () => signOut() }
        >
            <img src={session.user.image} alt={`Usuário: ${session.user.name}`} />
            {session.user.name}
            <FiX className={estilos.closeIcon}/>
        </button>
    ) :
    (
        <button type="button"
                className={estilos.SignInButton}
                onClick={ () => signIn('github') }
        >
            <FiUserX color="#FFB800" />
            Entrar
        </button>
    ) 
}