import { dbConnection } from "../db.js";
import mongoose from 'mongoose';
import seedUsers from './user-seeder.js';
import seedStudents from './student-seeder.js';
import seedTasks from './task-seeder.js';
import seedGroups from './group-seeder.js';
import seedMarks from './mark-seeder.js';

const seed = async () => {
    try {
        await dbConnection();
        console.log('Connected to database');
        const users = await seedUsers();
        const userIds = users.map(user => user._id);

        const groups = await seedGroups(userIds, 10);
        const groupIds = groups.map(group => group._id);
        
        const students = await seedStudents(groupIds, 50);
        const studentIds = students.map(student => student._id);

        const tasks = await seedTasks(groupIds, 10);
        const taskIds = tasks.map(task => task._id);
    
        await seedMarks(studentIds, taskIds, groupIds);
    } catch (error) {
        console.log("Database connection failed.");
        console.error(error.message);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

seed();