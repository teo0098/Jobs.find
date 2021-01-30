import { VerifyOptions } from 'jsonwebtoken'

interface VerifyToken extends VerifyOptions {
    user : string;
}

export default VerifyToken