import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { task } = await request.json();

    try {
        await connectToDB();
        const newTask = new Task({ task });

        await newTask.save();
        return new Response(JSON.stringify(newTask), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new task", { status: 500 });
    }
}