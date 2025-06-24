import mongoose, { Schema, Document } from "mongoose"

/**
 * Interface for the projects in the database. 
 * This interface defines the structure of the documents stored in the database.
 */
export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
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
    }
});

/**
 * This Mongoose model represents the projects collection in the database.
 * It defines a model called 'Project' using the 'ProjectSchema'.
 * It allows performing CRUD operations on the projects collection.
 */
const Project = mongoose.model<IProject>extends'Project', ProjectSchema);
export default Project;
