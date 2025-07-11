"use client"

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from "next/navigation";


export default function Home() {
    const router = useRouter();

    function routerAdd() {
        router.push('/game-play-screen')
    }

    return (

        <div className="w-full">
            <div className='flex justify-between w-full  fixed top-0 p-5 text-white'>
                <MenuIcon className="" to="/"/>
                <VolumeUpIcon className=""/>
            </div>
            <div className="flex justify-center text-3xl text-gray-800 ">
            <button onClick={routerAdd} className="p-2 bg-white  rounded-2xl hover:text-green-500">Let&#39;s get started</button>
            </div>


        </div>
    );
}
