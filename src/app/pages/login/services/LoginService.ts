import { auth } from '../../../../FirebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ILogin } from '../interfaces';

interface LoginResultProps {
    status: number;
    message: string;
}

export const LoginService = async function ({ email, password }: ILogin): Promise<LoginResultProps> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return {
            status: 200,
            message: 'success'
        };

    } catch (error) {
        console.log("Erro ao fazer login", error);
        return {
            status: 403,
            message: 'error'
        };
    }
};