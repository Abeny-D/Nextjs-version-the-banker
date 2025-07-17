import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
    return (
        <div>
            <div className="flex justify-center items-center w-screen p-4 gap-10 absolute bottom-0 left-0 ">

                <a href="https://facebook.com" target="_blank"><FacebookIcon className="text-white hover:text-yellow-200 "/></a>
                <a href="https://www.linkedin.com/in/abenezer-dereje-17599319b/" target="_blank"><LinkedInIcon className="text-white hover:text-yellow-200 "/></a>
                <a href="https://x.com/home" target="_blank"><XIcon className="text-white hover:text-yellow-200 "/></a>
            <a href="https://www.instagram.com/" target="_blank"><InstagramIcon className="text-white hover:text-yellow-200 "/></a>

            </div>
        </div>
    );
};

export default Footer;