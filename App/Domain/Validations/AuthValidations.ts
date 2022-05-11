import { z } from 'zod';

class AuthValidation {

    static login(obj){
        const loginValid = z.object({
            email: z.string().email({message: 'invalid email error'}),
            password: z.string().min(1)
        });

        return loginValid.parse(obj);
    }

    static register(obj){
        const registerValid = z.object({
            email: z.string().email(),
            password: z.string().min(1),
            username: z.string().min(1)
        });
        return registerValid.parse(obj);
    }
}

export default AuthValidation;
