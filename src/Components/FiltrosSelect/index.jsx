import React from "react";
import './style.css'

function FiltrosSelect ({muestraVntaAlq, setOperacion, setTipoPropiedad, setAmbientes, precioMin, precioMax, setPrecioMin, setPrecioMax, setCurrentPage, destacadas,setDestacadas}) {

    const operacion = ['Todas','Venta', 'Alquiler', 'Emprendimiento'];
    const tipoProp = [
        'Todas', 'Departamento', 'Casa', 'PH', 'Local', 
        'Oficina', 'Cochera', 'Terreno', 'Galpón',
    ];
    const ambientes = ['1', '2', '3', '4', 'mas'];

    //estados btns tipo operacion
    /* const [compra, setCompra] = useState(true);
    const [alquiler, setAlquiler] = useState(false);
    const [emprendimiento, setEmprendimiento] = useState(false); */
    /* const onClickCompra = (e) => {
        setCompra(true);
        setAlquiler(false);
        setEmprendimiento(false);
    };
    const onClickAlquiler = (e) => {
        setCompra(false);
        setAlquiler(true);
        setEmprendimiento(false);
    };
    const onClickEmprendimiento = (e) => {
        setCompra(false);
        setAlquiler(false);
        setEmprendimiento(true);
    }; */
    const onChangeTipoOp = (e) => {
        setOperacion(e.target.value);
    }
    const onChangeTipoProp = (e) => {
        setTipoPropiedad(e.target.value);
    }
    const onChangeAmb = (e) => {
        setAmbientes(e.target.value);
    }
    const onChangeDestacadas = (e) => {
        setDestacadas(e.target.checked);       
    }

    return(
        <div className="cont-filtrosSelect">
            <div className="subCont-filtrosSelect">
                <div className="cont-filtro-tipoOperacion">
                    <p className='focoCompra' >Filtros</p>
                </div>
                <div className="cont-selects">
                    <div className="cont-op-tipoP">
                        <select onChange={(e) => { onChangeTipoOp(e) }} className="select-tipoProp">
                            <option>Tipo de operación</option>
                            {
                                operacion?.map(op => {
                                    return (
                                        <option key={op} value={op}>{op}</option>
                                    )
                                })
                            }
                        </select>
                        <select onChange={onChangeTipoProp} className="select-tipoProp">
                            <option>Tipo de propiedad</option>
                            {
                                tipoProp?.map(prop => {
                                    return (
                                        <option key={prop} value={prop}>{prop}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="cont-amb-destacadas">
                        <select onChange={onChangeAmb} className="select-tipoProp">
                            <option>Ambientes</option>
                            {
                                ambientes?.map(amb => {
                                    return (
                                        <option key={amb} value={amb}>{amb}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="cont-destacadas">
                            <input type="checkbox" checked={destacadas} onChange={onChangeDestacadas} className="check-destacadas" />
                            <p className="p-destacadas">Destacadas</p>
                        </div>
                    </div>
                    
                    <div className="cont-primario-precio">
                        <div className="cont-filtro-precioMaxMin">
                            <label>Precio</label>
                            <input
                                type="number"
                                value={precioMin}
                                onChange={(e) => setPrecioMin(e.target.value)}
                                placeholder="Desde"
                                className="input-precioMin"
                            />
                            <input
                                type="number"
                                value={precioMax}
                                onChange={(e) => setPrecioMax(e.target.value)}
                                placeholder="Hasta"
                                className="input-precioMin"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FiltrosSelect;