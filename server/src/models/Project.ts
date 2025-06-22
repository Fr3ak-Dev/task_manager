import mongoose, { Schema, Document } from "mongoose";

/**
* Represents a project type in the database.
* Defines a data type called "ProjectType" that extends the "Document" interface (provided by mongoose)
* and adds additional properties using "&".
*/
export type ProjectType = Document & {
    projectName: string;
    clientName: string;
    description: string;
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
const Project = mongoose.model<ProjectType>('Project', ProjectSchema);
export default Project;
