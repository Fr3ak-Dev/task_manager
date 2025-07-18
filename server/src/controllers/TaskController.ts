import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send("Task created")
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send("Task updated")
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])
            res.send("Task deleted")
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send("Task status updated")
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}