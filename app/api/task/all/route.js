import Task from "@models/tasks";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const tasks = await Task.find({})

        return new Response(JSON.stringify(tasks), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all tasks", { status: 500 })
    }
} 