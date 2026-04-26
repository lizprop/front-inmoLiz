import React, { useState } from "react";
import './style.css';

function FiltrosSelect({
    setOperacion,
    setTipoPropiedad,
    setAmbientes,
    setPrecioMin,
    setPrecioMax,
    setCurrentPage,
}) {
    const operacion = ['Todas', 'Venta', 'Alquiler', 'Emprendimiento'];
    const tipoProp = [
        'Todas', 'Departamento', 'Casa', 'PH', 'Local',
        'Oficina', 'Cochera', 'Terreno', 'Galpón',
    ];
    const ambientes = ['1', '2', '3', '4', 'mas'];

    const [localOperacion, setLocalOperacion] = useState('');
    const [localTipoPropiedad, setLocalTipoPropiedad] = useState('');
    const [localAmbientes, setLocalAmbientes] = useState('');
    const [localMin, setLocalMin] = useState('');
    const [localMax, setLocalMax] = useState('');

    const resetPage = () => {
        if (setCurrentPage) setCurrentPage(1);
    };

    const scrollToResults = () => {
        window.setTimeout(() => {
            const listaResultados = document.getElementById('listaProps');
            if (listaResultados) {
                listaResultados.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 120);
    };

    const onChangeTipoOp = (e) => {
        setLocalOperacion(e.target.value);
        setOperacion(e.target.value);
        resetPage();
    };

    const onChangeTipoProp = (e) => {
        setLocalTipoPropiedad(e.target.value);
        setTipoPropiedad(e.target.value);
        resetPage();
    };

    const onChangeAmb = (e) => {
        setLocalAmbientes(e.target.value);
        setAmbientes(e.target.value);
        resetPage();
    };

    const aplicarRangoPrecios = () => {
        setPrecioMin(localMin);
        setPrecioMax(localMax);
        resetPage();
        scrollToResults();
    };

    const limpiarFiltros = () => {
        setOperacion('');
        setTipoPropiedad('Todas');
        setAmbientes();
        setLocalOperacion('');
        setLocalTipoPropiedad('');
        setLocalAmbientes('');
        setLocalMin('');
        setLocalMax('');
        setPrecioMin();
        setPrecioMax();
        resetPage();
    };

    return (
        <div className="cont-filtrosSelect">
            <div className="subCont-filtrosSelect">
                <div className="cont-filtro-tipoOperacion">
                    <p className='focoCompra' data-translate>Búsqueda de propiedades</p>
                    <p className="focoCompra-sub" data-translate>Filtrá por operación, tipo, ambientes y rango de precio.</p>
                </div>

                <div className="cont-selects" aria-label="Filtros de propiedades">
                    <label className="filtro-field">
                        <span data-translate>Operación</span>
                        <select onChange={onChangeTipoOp} className="select-tipoProp" value={localOperacion}>
                            <option value="" disabled>Tipo de operación</option>
                            {operacion.map(op => (
                                <option key={op} value={op}>{op}</option>
                            ))}
                        </select>
                    </label>

                    <label className="filtro-field">
                        <span data-translate>Propiedad</span>
                        <select onChange={onChangeTipoProp} className="select-tipoProp" value={localTipoPropiedad}>
                            <option value="" disabled>Tipo de propiedad</option>
                            {tipoProp.map(prop => (
                                <option key={prop} value={prop}>{prop}</option>
                            ))}
                        </select>
                    </label>

                    <label className="filtro-field filtro-field-small">
                        <span data-translate>Ambientes</span>
                        <select onChange={onChangeAmb} className="select-tipoProp" value={localAmbientes}>
                            <option value="" disabled>Ambientes</option>
                            {ambientes.map(amb => (
                                <option key={amb} value={amb}>{amb === 'mas' ? '5+' : amb}</option>
                            ))}
                        </select>
                    </label>

                    <div className="cont-primario-precio">
                        <div className="cont-filtro-precioMaxMin">
                            <span className="precio-label" data-translate>Precio</span>
                            <input
                                type="number"
                                value={localMin}
                                onChange={(e) => setLocalMin(e.target.value)}
                                placeholder="Desde"
                                className="input-precioMin"
                            />
                            <input
                                type="number"
                                value={localMax}
                                onChange={(e) => setLocalMax(e.target.value)}
                                placeholder="Hasta"
                                className="input-precioMin"
                            />
                        </div>
                    </div>

                    <div className="filtro-actions">
                        <button
                            type="button"
                            className="btn-aplicar-precio"
                            onClick={aplicarRangoPrecios}
                            data-translate
                        >
                            Aplicar
                        </button>
                        <button
                            type="button"
                            className="btn-limpiar-filtros"
                            onClick={limpiarFiltros}
                            data-translate
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltrosSelect;
