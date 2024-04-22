import { loginService, registerService } from "./auth-service.js";

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

export const login = async (req, res, next) => {
    try {
        const {token, userName} = await loginService(req.body);
        res.status(200).json(
            {
                success: true,
                message: "User logged in successfully",
                data: {
                    token: token,
                    user: {
                        name: userName,
                    }
                }
            }
        );
    } catch (error) {
        next(error);
    }
}