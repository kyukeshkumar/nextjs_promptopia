'use client'

import {useEffect,useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
const Nav = () => {
  const {data:session}=useSession();
  const [providers, setProviders]=useState(null)
  const [toggleDrop,setToggleDrop]=useState(false)

  useEffect(()=>{
    const setUpProviders=async()=>{
      const response=await getProviders();
      setProviders(response);
    }

    setUpProviders()
  },[]);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='promptopia logo' width={30} height={30}
        className='object-contain'></Image>
        <p className='logo_text'>Promtopia</p>
      </Link>
      {/* desktop view */}
      <div className='sm:flex hidden'>
          {session?.user?(
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className='black_btn'>
                Create Post
              </Link>
              <button type='button' onClick={signOut} className='outline_btn'> 
                Sign Out
              </button>

              <Link href="/profile">
                <Image src={session?.user.image} width={37} height={37} alt='profile' className='rounded-full'>

                </Image>
              </Link>

            </div>
          ):(
            <>
            {providers && Object.values(providers).map((providers)=>(
              <button type='button' key={providers.name} className='black_btn' onClick={()=>signIn(providers.id)} >
                Sign In
              </button>
            ))
            }
            </>
          )}
        </div>
        {/* mobile view */}
        <div className='sm:hidden flex relative'>
          {session?.user?(
            <div className='flex'>
                <Image src={session?.user.image} width={37} height={37} alt='profile' className='rounded-full' onClick={()=>setToggleDrop((prev)=>!prev)}/>
                {toggleDrop && (
                  <div className='dropdown'>
                    <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDrop(false)}>My profile</Link>
                    <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDrop(false)}>Create Prompt</Link>
                    <button type='button' onClick={()=>{setToggleDrop(false); signOut();}} className='mt-5 w-full black_btn'> Sign Out</button>

                  </div>
                )}
            </div>
          ):(
            <>
            {providers && Object.values(providers).map((providers)=>(
              <button type='button' key={providers.name} className='black_btn' onClick={()=>signIn(providers.id)} >
                Sign In
              </button>
            ))
            }
            </>
          )}

        </div>
    </nav>
    )
}

export default Nav