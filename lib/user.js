import crypto from 'crypto'
import User from '../models/User'

export async function createUser({ username, email, password }) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    const new_user = new User({
        email,
        hash,
        salt,
        username
    });

    await new_user.save();
}

export async function findUser({ email }) {
    return await User.findOne({ email }).lean();
}

export function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex')
    const passwordsMatch = user.hash === inputHash
    return passwordsMatch
}
