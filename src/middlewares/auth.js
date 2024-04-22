import jwt from "jsonwebtoken";
import  User  from "../entities/User/user-model.js";
import UnauthorizedError from "../utils/errors/UnauthorizedError.js";

export const auth = async (req, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];


        if (!token) {
            throw new UnauthorizedError(401, "Unauthorized");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )


        req.tokenData = decoded;
        const { userId } = req.tokenData;
        const user = await User.findOne(
            { 
                _id: userId
            }
        );
        const { isActive, ...tokenUser } = user._doc;

        if (!user || !user.isActive) {
            throw new UnauthorizedError(401, "Unauthorized");
        }
        next();
    } catch (error) {
        next(error);
    }
}