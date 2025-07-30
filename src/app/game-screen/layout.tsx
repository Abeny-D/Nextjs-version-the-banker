import type {Metadata} from "next";
import GamePlayScreenBg from '@@/public/game-screen-image1.png'


export const metadata: Metadata = {
    title: "Game Play Screen",
    description: "The banker card game",
};

// width: 100%
// w-screen -> width: 100vw

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {

    console.log('image data : ', GamePlayScreenBg)

    return (
        <section className='w-screen h-screen bg-center bg-no-repeat bg-fixed bg-cover'

             style={{
                 backgroundImage: `url(${GamePlayScreenBg.src})`,
             }}
        >
            {children}
        </section>

    );
}
