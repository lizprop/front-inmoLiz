import React, { useContext } from 'react';
import './styles.css';
import { InmobiliariaContext } from '../../Context';

function LanguageSelector() {
  const { traducirPagina } = useContext(InmobiliariaContext);

  const handleChange = (e) => {
    traducirPagina(e.target.value); // Llama a la función de traducción global
  };

  return (
    <select onChange={handleChange} defaultValue="es" className="select-language">
      <option value="es" className='opc-select-language'>ES</option>
      <option value="en" className='opc-select-language'>EN</option>
      <option value="pt" className='opc-select-language'>PT</option>
    </select>
  );
}

export default LanguageSelector;
