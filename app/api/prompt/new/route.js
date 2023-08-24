import {connectedDB} from "@utils/database"
import Prompt from "@models/prompt"
export const POST=async(request)=>{
    const {userId,prompt,tag,image,username,owner}=await request.json() 
    try {
        await connectedDB();
        const newPrompt = new Prompt({creator:userId , prompt, tag,image,username,owner: owner});
        await newPrompt.save()
    
        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("Failed to create a prompt",{status:500})
    }
}