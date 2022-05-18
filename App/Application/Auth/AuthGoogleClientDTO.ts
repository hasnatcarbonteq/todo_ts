import { Request } from 'express';

class AuthGoogleClientDTO {
    private readonly code: string;
    constructor(request: Request) {
        this.code = request.query.code as string;
    }

    getCode() {
        return this.code;
    }
}

export default AuthGoogleClientDTO;