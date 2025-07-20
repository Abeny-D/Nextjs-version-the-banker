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

        <section className="w-full h-full">
            <div className='flex justify-between w-full fixed top-0 p-5 text-white'>
                <MenuIcon className="hover:text-yellow-200" to="/"/>
                <VolumeUpIcon className="hover:text-yellow-200"/>
            </div>
            <div className=" flex items-center justify-center w-full h-screen text-white">
            <button onClick={routerAdd} className="border-1 p-3 rounded-2xl hover:text-yellow-200">Let&#39;s get started</button>
            </div>


        </section>
    );
}
