import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {

    const { task } = await request.json();

    try {
        await connectToDB();
        // console.log(JSON.stringify(task))

        const existingTask = await Task.findById(params.id)

        if(!existingTask) {
            return new Response('Task not found', { status: 404 })
        }

        existingTask.task = task.task

        await existingTask.save()

        return new Response("Task updated successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting task" + params.id + params.task, { status: 500 });
    }
};