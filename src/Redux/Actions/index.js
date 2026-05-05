import axios from "axios";
import {  GET_PROPERTY,  GET_PROPS, IS_OPEN_MODAL_PICTURE, LOADING, RESET_PROPS, GET_PROPS_MAP,
    RESET_PROPERTY, GET_EMPRENDIMIENTOS, GET_EMPRENDIMIENTO, RESET_EMPRENDIMIENTO,
    GET_PROPS_DESTADAS, 
} from "./actionsType";
import { actual } from "../../url";

const isActiveFilter = (value) => value !== undefined && value !== null && value !== '' && value !== 'Todas';

const appendQueryParam = (params, key, value) => {
    if (isActiveFilter(value)) params.append(key, value);
};

const buildQueryParams = ({ limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas }) => {
    const params = new URLSearchParams();

    params.append('limit', limit);
    params.append('offset', offset);
    appendQueryParam(params, 'operacion', operacion);
    appendQueryParam(params, 'tipo', tipoPropiedad);
    appendQueryParam(params, 'ambientes', ambientes);
    appendQueryParam(params, 'precioMin', precioMin);
    appendQueryParam(params, 'precioMax', precioMax);
    appendQueryParam(params, 'destacadas', destacadas);

    return `?${params.toString()}`;
};

const getPrecioParaFiltro = (propiedad, operacion) => {
    const operaciones = Array.isArray(propiedad.operacion) ? propiedad.operacion : [];
    const operacionFiltrada = isActiveFilter(operacion)
        ? operaciones.find(op => op.operacion === operacion)
        : operaciones[0];

    return Number(operacionFiltrada?.precios?.[0]?.precio);
};

const filtrarPropiedadesLocalmente = (propiedades, { operacion, tipoPropiedad, precioMin, precioMax, ambientes }) => {
    return propiedades.filter(propiedad => {
        const operaciones = Array.isArray(propiedad.operacion) ? propiedad.operacion : [];
        const precio = getPrecioParaFiltro(propiedad, operacion);

        if (isActiveFilter(operacion) && !operaciones.some(op => op.operacion === operacion)) return false;
        if (isActiveFilter(tipoPropiedad) && propiedad.tipo?.nombre !== tipoPropiedad) return false;
        if (isActiveFilter(ambientes)) {
            const cantidadAmbientes = Number(propiedad.ambientes);
            if (ambientes === 'mas') {
                if (cantidadAmbientes < 5) return false;
            } else if (cantidadAmbientes !== Number(ambientes)) {
                return false;
            }
        }
        if (isActiveFilter(precioMin) && (!Number.isFinite(precio) || precio < Number(precioMin))) return false;
        if (isActiveFilter(precioMax) && (!Number.isFinite(precio) || precio > Number(precioMax))) return false;

        return true;
    });
};

const getFallbackProps = async (filtros) => {
    const queryParams = buildQueryParams({
        ...filtros,
        limit: 1000,
        offset: 0,
        operacion: '',
    });
    const resp = await axios.get(`${actual}/propiedades/propiedades${queryParams}`);

    return filtrarPropiedadesLocalmente(resp.data.propiedades || [], filtros);
};


//--actions para props-------------------------------------------------------------
export const getPropsDestacadas = () => {
    return async function (dispatch) {
        try {
            const resp = await axios.get(`${actual}/propiedades/propsDestacadas`); 
            dispatch({type: GET_PROPS_DESTADAS, payload: resp.data});
        } catch (error) {
            console.log(error);
        }
    }
}

//trae props
export const getProps = (limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas) => {
    return async function(dispatch) {
        dispatch({type: LOADING});

        try {
            const filtros = { limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas };

            if (isActiveFilter(operacion) && isActiveFilter(tipoPropiedad)) {
                const propiedadesFiltradas = await getFallbackProps(filtros);
                dispatch({
                    type: GET_PROPS,
                    payload: {
                        total: propiedadesFiltradas.length,
                        propiedades: propiedadesFiltradas.slice(offset, offset + limit),
                    },
                });
                return;
            }

            const queryParams = buildQueryParams(filtros);
            //if(internacional) queryParams += `&internacional=${internacional}`;

            const resp = await axios.get(`${actual}/propiedades/propiedades${queryParams}`); 
            dispatch({ type: GET_PROPS, payload: resp.data });
        } catch (error) {
            console.log(error);

            if (isActiveFilter(operacion) && isActiveFilter(tipoPropiedad)) {
                try {
                    const propiedadesFiltradas = await getFallbackProps({ operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas });
                    dispatch({
                        type: GET_PROPS,
                        payload: {
                            total: propiedadesFiltradas.length,
                            propiedades: propiedadesFiltradas.slice(offset, offset + limit),
                        },
                    });
                } catch (fallbackError) {
                    console.log(fallbackError);
                }
            }
        }
    }
}

export const getPropsMap = (limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas) => {
    return async function (dispatch) {
        
        try {
            const filtros = { limit, offset, operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas };

            if (isActiveFilter(operacion) && isActiveFilter(tipoPropiedad)) {
                const propiedadesFiltradas = await getFallbackProps(filtros);
                dispatch({type: GET_PROPS_MAP, payload: { propiedades: propiedadesFiltradas }});
                return;
            }

            const queryParams = buildQueryParams(filtros);
            //if(internacional) queryParams += `&internacional=${internacional}`;

            const resp = await axios.get(`${actual}/propiedades/propsMap${queryParams}`); 
            dispatch({type: GET_PROPS_MAP, payload: resp.data});
        } catch (error) {
            console.log(error);

            if (isActiveFilter(operacion) && isActiveFilter(tipoPropiedad)) {
                try {
                    const propiedadesFiltradas = await getFallbackProps({ operacion, tipoPropiedad, precioMin, precioMax, ambientes, destacadas });
                    dispatch({type: GET_PROPS_MAP, payload: { propiedades: propiedadesFiltradas }});
                } catch (fallbackError) {
                    console.log(fallbackError);
                }
            }
        }
    }
}

//trae prop por id
export const getProperty = (id) => {
    return async function(dispatch) {
        dispatch({type: LOADING});
        
        try {
            const resp = await axios.get(`${actual}/propiedades/${id}`);
            dispatch({type: GET_PROPERTY, payload: resp.data});
        } catch (error) {
            console.log(error);
        }
    }
};

//reset detalle
export const resetProperty = () => {
    return function(dispatch) {
        dispatch({ type: RESET_PROPERTY });
    }
};

//cierra Modal imagen prop
export const isOpenModalPicture = () => {
    return function(dispatch){
        dispatch({type: IS_OPEN_MODAL_PICTURE});
    }
};

//reset propiedades
export const resetPropiedades = () => {
    return function(dispatch){
        dispatch({type: RESET_PROPS});
    }
}

//--EMPRENDIMIENTOS------------------------------
//trae emprendimientos
export const getEmprendimientos = (tipo) => {
    return async function(dispatch) {
        dispatch({type: LOADING});

        try {
            const resp = await axios.get(`${actual}/emprendimientos`); 
            dispatch({type: GET_EMPRENDIMIENTOS, payload: resp.data});
        } catch (error) {
            console.log(error);
        }
    }
}

//trae emprendimiento por ID
export const getEmprendimiento = (id) => {
    return async function(dispatch) {
        dispatch({type: LOADING});
        const resp = await axios.get(`${actual}/emprendimientos/${id}`);
        dispatch({type: GET_EMPRENDIMIENTO, payload: resp.data});
    }
}

//reset emprendimientos
export const resetEmprendimientos = () => {
    return function(dispatch){
        dispatch({type: RESET_EMPRENDIMIENTO});
    }
}

//--botón me gusta------------------------------------
export const sumoMeGusta = (id) => { 
    return async function(){
        await axios.post(`${actual}/meGusta/suma`, {id});
    }
};

export const restaMeGusta = (id) => {
    return async function () {
        await axios.put(`${actual}/meGusta/resta`, {id});
    }
}
