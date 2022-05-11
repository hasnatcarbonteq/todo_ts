import { z } from 'zod'

class TodoValidation {
    static create(obj) {
        const createValid = z.object({
            title: z.string(),
            description: z.string(),
            status: z.string(),
        });
        return createValid.parse(obj);
    }
}

export default TodoValidation;