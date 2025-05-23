import React from 'react';
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CampaignIcon from '@mui/icons-material/Campaign';
import BalanceIcon from '@mui/icons-material/Balance';
import './estilos.css';


function LandingC() {
    return (
        <div className='cont-landing-C'>
            <div className='cont-fila-1'>
                <h2 className="titulo-land-C" data-translate>¿QUE HACEMOS?</h2>
                <p className='texto-2-land-C' data-translate>Servicios inmobiliarios premium para ayudarte con la propiedad de tus sueños</p>
            </div>
            <div className='cont-fila-2'>
                <div className='col-1'>
                    <GroupIcon sx={{'fontSize':'60px'}} className='iconos'/>
                    <p className='texto-fila-2' data-translate>Asesoría personalizada en Bienes Raíces</p>
                </div>
                <div className='col-2'>
                    <MapsHomeWorkIcon sx={{'fontSize':'60px'}}/>
                    <p className='texto-fila-2' data-translate>Valoración de propiedades</p>
                </div>
                <div className='col-3'>
                    <CampaignIcon sx={{'fontSize':'60px'}}/>
                    <p className='texto-fila-2' data-translate>Marketing de propiedades</p>
                </div>
                <div className='col-4'>
                    <BalanceIcon sx={{'fontSize':'60px'}}/>
                    <p className='texto-fila-2' data-translate>Asesoría legal y gestión de transacciones</p>
                </div>
            </div>
            <div className='cont-fila-3'>
                <div className='cont-inf-fila-3'>
                    <p className='texto-1-fila-3' data-translate>ESTAMOS PARA ATENDERTE</p>
                    <p className='texto-2-fila-3' data-translate>Compra, vende o alquila tu propiedad con confianza</p>
                    <p className='texto-3-fila-3' data-translate>
                        ¿Tienes curiosidad sobre el valor exacto de tu casa o su precio de venta potencial? 
                        Benefíciate de nuestra amplia experiencia en el mercado de bienes raíces.
                    </p>
                    <Link to={'/contacto'}>
                        <button className='btn-fila-3' data-translate>Contacto</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingC