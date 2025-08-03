import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose"
import { ITask } from "./Task"
import { IUser } from "./User"

/**
 * Interface for the projects in the database. 
 * This interface defines the structure of the documents stored in the database.
 */
export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[] // Reference to the tasks collection
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
};

/**
 * Mongoose schema for the projects collection.
 */
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
}, {timestamps: true})

/**
 * This Mongoose model represents the projects collection in the database.
 * It defines a model called 'Project' using the 'ProjectSchema'.
 * It allows performing CRUD operations on the projects collection.
 */
const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project