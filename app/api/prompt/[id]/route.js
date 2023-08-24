import {connectedDB} from "@utils/database"
import Prompt from "@models/prompt"

//get
export const GET = async(request,{params})=>{
    try {
        await connectedDB()

        const prompt=await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not found ",{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to collect all prompts",{status:500})
    }
}

//update
export const PATCH = async(request,{params})=>{
    const{prompt,tag}=await request.json()
    try {
        await connectedDB()

        const existingprompt=await Prompt.findById(params.id).populate('creator')

        if(!existingprompt) return new Response("Prompt not found ",{status:404})
        existingprompt.prompt=prompt
        existingprompt.tag=tag
        await existingprompt.save()
        return new Response(JSON.stringify(existingprompt),{status:200})
    } catch (error) {
        return new Response("Failed to update all prompts",{status:500})
    }
}

//delete
export const DELETE =async(request,{params})=>{
    try {
        await connectedDB()
        await Prompt.findByIdAndRemove(params.id)

        new Response("Prompt deleted successfully",{status:200})
        
    } catch (error) {
        return new Response("Failed to delete all prompts",{status:500})
        
    }
}
