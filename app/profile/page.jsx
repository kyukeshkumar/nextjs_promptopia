'use client'

import {useEffect,useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
const Profilepg = () => {
    const {data:session}=useSession()
    const [posts,setPosts]=useState([])
    const router=useRouter()

    useEffect(()=>{
        const fetchPosts=async ()=>{
            // alert(session?.user._id)
          const response=await fetch( `api/users/${session?.user.email}/posts`)
          const data=await response.json()
          setPosts(data)
        }
        console.log(posts)
    
        if(session?.user.email)fetchPosts()
      },[])

    const handleEdit=(post)=>{
      router.push(`/update-prompt?id=${post._id}`)

    }
    const handleDelete=async (post)=>{
      const hasConfirmed=confirm("Are you sure you want to delete the prompt?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE'
          })

          const filteredPost=posts.filter((p)=>p._id!==post._id)
          setPosts(filteredPost)
        } catch (error) {
          
        }
      }
    }

  return (
    <Profile
    name="My"
    desc="Welcome to my page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default Profilepg