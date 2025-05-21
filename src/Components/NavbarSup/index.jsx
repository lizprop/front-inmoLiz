import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import './styles.css';

function NavbarSup() {

    return (
        <div className='cont-navbarSup'>
            <div className='sub-cont-navbarSup'>
                <div className='cont-navbarSup__tel'>
                    <LocalPhoneIcon sx={{ fontSize: 15, color: 'white' }} />
                    <p className='p-tel-navSup'>2236162426</p>
                </div>
                <div className='cont-navbarSup__email'>
                    <EmailIcon sx={{ fontSize: 15, color: 'white' }} />
                    <a href="mailto: info@ortizlizmar" className='a-email-navSup'>
                        <p className='p-tel-navSup'>info@ortizlizmar.com</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NavbarSup