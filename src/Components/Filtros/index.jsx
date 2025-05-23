import React from 'react'
import FiltroVentaAlq from '../FiltroVentaAlq';
import FiltroPrecio from '../FIltroRangoPrecio';
import './styles.css';

function Filtros({muestraVntaAlq, setOperacion, setTipoPropiedad, setAmbientes, precioMin, precioMax, setPrecioMin, setPrecioMax, setCurrentPage}) {

    const arrayFiltros = [
        'Depto', 'Casa', 'PH', 'Local', 
        'Oficina', 'Cochera', 'Terreno', 'Galpón',
    ];
    const [ambientesLocal, setAmbientesLocal] = React.useState(); //estado para ver el tilde en los checkbox

    // Actualizar `ambientes` en Home y `ambientesLocal` en BarraLateral
    const handleAmbientes = (event) => {
        const { value } = event.target;
        const nuevosAmbientes = value === ambientesLocal ? 0 : value;
        setAmbientesLocal(nuevosAmbientes);
        setAmbientes(nuevosAmbientes
        );
    };
    // Actualizar `tipoPropiedad` en Home y `tipoP` en BarraLateral
    const handleClick = (e) => {
        const { id } = e.target;
        setTipoPropiedad(id);
    };

    return (
        <div className='cont-filtros'>
            <div className='titulo-filtros'>
                <h2 data-translate>Personalizá tu búsqueda</h2>
            </div>
            {/* filtro Vnt / Alq */}
            <div className='cont-venta-alq'>
                {
                    muestraVntaAlq !== 'false' && <FiltroVentaAlq setOperacion={setOperacion}/>
                }
            </div>

            <div className='cont-filtros'>
                <h3 data-translate>Tipo de propiedad</h3>
                <div className='cont-filtros-map'>
                {
                    arrayFiltros.map((filtro, index) => (
                            <button
                                key={index}
                                id={filtro}
                                onClick={handleClick}
                                className='btn-filtro'
                            >
                                {filtro}
                            </button>
                        )
                    )
                }
                </div>
            </div>

            {/* btn TODAS */}
            <div className='cont-todas'>
                <button 
                    id='todas' 
                    onClick={handleClick} 
                    className='btn-filtro'
                    style={{marginTop: '0px'}}
                >
                    Todas
                </button>
            </div>

            <div className='cont-amb'>
                <p className='p-ambientes' data-translate>Ambientes: </p>
                <div className='cont-ambientes'>
                    <div className='cont-ambiente-1'>
                        <input type='checkbox' id='1' value={1} checked={ambientesLocal === '1'} onChange={handleAmbientes} className='check-amb' />
                        <label htmlFor='1' className='label-amb'>1</label>
                    </div>
                    <div className='cont-ambiente-2'>
                        <input type='checkbox' id='2' value={2} checked={ambientesLocal === '2'} onChange={handleAmbientes} className='check-amb' />
                        <label htmlFor='2' className='label-amb'>2</label>
                    </div>
                    <div className='cont-ambiente-3'>
                        <input type='checkbox' id='3' value={3} checked={ambientesLocal === '3'} onChange={handleAmbientes} className='check-amb' />
                        <label htmlFor='3' className='label-amb'>3</label>
                    </div>
                    <div className='cont-ambiente-4'>
                        <input type='checkbox' id='4' value={4} checked={ambientesLocal === '4'} onChange={handleAmbientes} className='check-amb' />
                        <label htmlFor='4' className='label-amb'>4</label>
                    </div>
                    <div className='cont-ambiente-4'>
                        <input type='checkbox' id='mas' value={'mas'} checked={ambientesLocal === 'mas'} onChange={handleAmbientes} className='check-amb' />
                        <label htmlFor='4' className='label-amb'>Más</label>
                    </div>
                </div>
            </div>

            {/* filtro rango precio */}
            <div className='cont-filtro-rangoPrecio'>
                <FiltroPrecio 
                    precioMin={precioMin} 
                    precioMax={precioMax}
                    setPrecioMin={setPrecioMin}
                    setPrecioMax={setPrecioMax}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default Filtros