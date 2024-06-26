import mongoose from "mongoose";
import Student from "./student-model.js";
import Attendance from "../Attendance/attendance-model.js";
import Mark from "../Mark/mark-model.js";

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
                status: "active",
            }
        );
        return students;
    } catch (error) {
        throw error;
    }
}

export const getGroupStudentByIdRepository = async (studentId) => {
    try {
        const student = await Student.findOne(
            {
                _id: studentId,
                status: "active",
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

export const deleteStudentRepository = async (studentId) => {
    try {
        await Student.findOneAndDelete(
            {
                _id: studentId,
            }
        );
    } catch (error) {
        throw error;
    }
}

export const getStudentsOverviewRepository = async (groupId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(groupId);
        const students = await Student.aggregate([
            { $match: { groups: {$in:[objectId]} } },
            {
                $lookup: {
                    from: 'attendances',
                    let: { studentId: '$_id' },
                    pipeline: [
                        { 
                            $match: { 
                                $expr: { 
                                    $and: [
                                        { $eq: ['$student', '$$studentId'] }, 
                                        { $eq: ['$group', objectId] }
                                    ] 
                                } 
                            },
                        },
                    ],
                    as: 'attendances',
                },
            },
            {
                $lookup: {
                    from: 'marks',
                    let: { studentId: '$_id' },
                    pipeline: [
                        { 
                            $match: { 
                                $expr: { 
                                    $and: [
                                        { $eq: ['$student', '$$studentId'] }, 
                                        { $eq: ['$group', objectId] }
                                    ] 
                                } 
                            },
                        },
                        {
                            $lookup: {
                                from: 'tasks',
                                let: { taskId: '$task' },
                                pipeline: [
                                    { 
                                        $match: { 
                                            $expr: { 
                                                $eq: ['$_id', '$$taskId']
                                            } 
                                        },
                                    },
                                    {
                                        $project: {
                                            weight: 1,
                                            name: 1  
                                        }
                                    }
                                ],
                                as: 'task',
                            },
                        },
                    ],
                    as: 'marks',
                },
            },
            {
                $lookup: {
                    from: 'groups',
                    localField: 'groups',
                    foreignField: '_id',
                    as: 'groupData',
                },
            },
            {
                $project: {
                    'groupData._id': 0,
                    'groupData.students': 0,
                },
            },
        ]);
        return students;
    } catch (error) {
        throw error;
    }
};
  