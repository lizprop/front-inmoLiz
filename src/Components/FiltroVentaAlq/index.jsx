import React, {useState} from 'react';
import './styles.css';

function FiltroVentaAlq({setOperacion}) {

    const [operacionLocal, setOperacioLocal] = useState(''); //estado para ver el tilde en los checkbox
    
    // Asegurarse de que `setOperacion` en Home sea invocado cada vez que cambia el checkbox
    const handleOperacion = (event) => {
        const { value } = event.target;
        const nuevaOperacion = value === operacionLocal ? '' : value;
        setOperacioLocal(nuevaOperacion);
        setOperacion(nuevaOperacion);
    };

    return (
        <div className='cont-venta-alq'>
            <div className='sub-cont-venta-alq'>
                <div className='cont-venta-filtro'>
                    <label className='label-venta-alq'>Venta</label>
                    <input
                        id='Venta'
                        type='checkbox'
                        value='Venta'
                        checked={operacionLocal === 'Venta'}
                        onChange={handleOperacion}
                        className='input-venta-alq'
                    />
                </div>
                <div className='cont-alq-filtro'>
                    <label className='label-venta-alq'>Alquiler</label>
                    <input
                        id='Alquiler'
                        type='checkbox'
                        value='Alquiler'
                        checked={operacionLocal === 'Alquiler'}
                        onChange={handleOperacion}
                        className='input-venta-alq'
                    />
                </div>
            </div>
        </div>
    )
}

export default FiltroVentaAlq