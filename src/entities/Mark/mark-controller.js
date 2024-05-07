
export const createMark = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const markInfo = req.body;
        const mark = await createMarkService(userId, markInfo);
        res.status(201).json(
            {
                success: true,
                message: "Mark created successfully",
                data: mark,
            }
        );
    } catch (error) {
        next(error);
    }
}