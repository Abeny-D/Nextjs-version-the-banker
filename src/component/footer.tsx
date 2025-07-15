import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    return (
        <div>
            <div className="flex justify-center items-center w-screen p-4 gap-10 absolute bottom-0 left-0 ">

                <FacebookIcon className="text-white hover:text-yellow-200 "/>
                <LinkedInIcon className="text-white hover:text-yellow-200 "/>
                <XIcon className="text-white hover:text-yellow-200 "/>
                <InstagramIcon className="text-white hover:text-yellow-200 "/>

            </div>
        </div>
    );
};

export default Footer;