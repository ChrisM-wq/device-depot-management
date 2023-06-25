import Nav from "@/components/Nav"
import SideNav from "@/components/SideNav"
import { useSession, signIn, signOut } from "next-auth/react"
import { useAppContext } from "./AppContext";

export default function Layout({children}) {

  const { data: session } = useSession();
  const { sharedState, setSharedState } = useAppContext();

  if (!session) {
    return (
      <div className='bg-blue-500 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>Login with Google</button>
        </div>
      </div>
    )
  }

  const openMenu = "md:w-[calc(100%-192px)] w-full relative md:left-48 left-0 p-5 transition-all duration-300";
  const closeMenu = "md:w-[calc(100%-80px)] w-full relative md:left-20 left-0 p-5 transition-all duration-300";

  return (
    <div className='min-h-[calc(100vh-64px)]'>
      <Nav />
      <div className="flex mt-16">
        <SideNav />
        <div className={sharedState.menu ? openMenu : closeMenu}>{children}</div>
      </div>
      
    </div>
    
  )
}