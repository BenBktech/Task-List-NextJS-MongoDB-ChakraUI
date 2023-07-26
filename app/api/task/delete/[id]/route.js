import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        console.log(params.id)

        // Find the prompt by ID and remove it
        await Task.findByIdAndRemove(params.id);

        return new Response("Task deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting task", { status: 500 });
    }
};