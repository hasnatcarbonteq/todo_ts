import { z } from 'zod'

class TodoValidation {
    static create(obj) {
        const createValid = z.object({
            title: z.string().min(1),
            description: z.string(),
            status: z.boolean(),
        });
        return createValid.parse(obj);
    }

    static update(obj) {
        const updateValid = z.object({
            title: z.string().min(1),
            description: z.string(),
            status: z.boolean(),
        });
        return updateValid.parse(obj);
    }
}

export default TodoValidation;