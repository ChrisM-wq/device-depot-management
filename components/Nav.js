import Image from 'next/image';
import Logo from '../assets/logo-white.png'
import { useAppContext } from "./AppContext";
import Profile from "./Profile";

export default function Nav() {

    const { sharedState, setSharedState } = useAppContext();

    // Function to toggle the menu
    function toggleMenu() {
        setSharedState((prevState) => ({
        ...prevState,
        menu: !prevState.menu,
        }));
    }

    return (

        <div className="bg-black flex justify-between h-16 items-center px-7 fixed w-full top-0 z-10">
            
            {/* Menu, Logo & Title */}
            <div className="flex space-x-4 items-center">
                <div onClick={toggleMenu} className="cursor-pointer mr-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
               <Image
                    src={Logo}
                    width={50}
                    height={50}
                    alt="Picture of the author"
                    className="select-none"
                />
                <div className="text-white font-semibold text-lg select-none">Device Depot</div> 
            </div>
            
            <Profile />
     
        </div>
    )
};