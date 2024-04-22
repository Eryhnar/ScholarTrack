import { registerService } from "./auth-service.js";

export const register = async (req, res, next) => {
    try {
        await registerService(req.body);
        res.status(201).json(
            {
                success: true,
                message: 'User registered successfully',
            }
        )
    } catch (error) {
        next(error);
    }
}