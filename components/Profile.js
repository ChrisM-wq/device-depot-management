import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Profile() {

    const { data: session } = useSession()
    const [ profileMenu, setProfileMenu] = useState(false);
    const router = useRouter();

    async function logout() {
        await router.push('/');
        await signOut();
    };

    return (
        <div onClick={() => setProfileMenu(!profileMenu)} className="bg-default rounded-full h-8 flex flex-col select-none hidden md:inline-flex">
        <div className="flex items-center space-x-2 pr-3 cursor-pointer">
            <img src={session?.user?.image} alt='' className="w-8 h-8 rounded-full"/>
            <div className="font-semibold">{session.user.name}</div>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
         
                className= {!profileMenu ? "w-4 h-4 hover:transition-all duration-300" : "w-4 h-4 origin-center rotate-180 hover:transition-all duration-300"}>
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
         
         {/* Sub menu for settings and logout */}
         {profileMenu && ( <div className="transition-all duration-300">
             <Link href={'/settings'} className="bg-black w-full flex px-3 items-center gap-2 text-white cursor-pointer h-8 mt-3">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
                 Settings
             </Link>
             <div onClick={logout} className="bg-black w-full flex px-3 rounded-b-lg items-center gap-2 text-white cursor-pointer h-8">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                 </svg>
                 Logout
             </div>
         </div>
         )}

     </div>
    )
};