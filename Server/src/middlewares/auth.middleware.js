import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {

        const token = req.cookies?.token;

        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: "Authentication required. please login."
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_KEY);

            req.user = decode;
            next();
        }

        catch(err)
        {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token. Please login again."
            });
        }
    };
