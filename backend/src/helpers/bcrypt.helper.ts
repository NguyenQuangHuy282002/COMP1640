import bcrypt from 'bcrypt';

export const bcryptHash = async (data) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(data, salt);
}

export const bcryptCompare = async (data, comparedData) => {
    return await bcrypt.compare(data, comparedData)
}