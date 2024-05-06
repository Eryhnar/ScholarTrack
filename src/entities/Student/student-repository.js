import Student from "./student-model.js";

export const createStudentRepository = async (studentInfo) => {
    try {
        const student = await Student.create(
            studentInfo
        );
        return student;
    } catch (error) {
        throw error;
    }
}

export const getGroupStudentsRepository = async (groupId) => {
    try {
        const students = await Student.find(
            {
                groups: groupId,
            }
        );
        return students;
    } catch (error) {
        throw error;
    }
}

// export const isUserAuthorizedForGroup = async (userId, groupId) => {
//     try {
//         return await Group.exists({
//             _id: groupId,
//             $or: [
//                 { author: userId },
//                 { collaborators: { $in: [userId] } }
//             ]
//         });
//     } catch (error) {
//         throw error;
//     }
// }

export const getGroupStudentByIdRepository = async (studentId) => {
    try {
        const student = await Student.findOne(
            {
                _id: studentId,
            }
        );
        return student;
    } catch (error) {
        throw error;
    }
}

export const editStudentByIdRepository = async (studentId, studentInfo) => {
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            {
                _id: studentId,
            },
            studentInfo,
            {
                new: true,
            }
        );
        return updatedStudent;
    } catch (error) {
        throw error;
    }
}

export const studentExists = async (studentId) => {
    try {
        return await Student.exists(
            {
                _id: studentId,
            }
        );
    } catch (error) {
        throw error;
    }
}
