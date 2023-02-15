import jwt from 'jsonwebtoken';

export const authProtect = async (req: any, res: any, next: any) => {
    try {
        let tmp = req.header("Authorization");

        const token = tmp ? tmp.slice(7, tmp.length) : "";
        if (!token) {
            return res.status(400).json({ message: "Invalid Authentification" });
        }
        jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err: any, user: any) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Authentification" });
            }
            req.user = user;
            next();
        });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
