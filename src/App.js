import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InmobiliariaProvider  from './Context';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import PropsVenta from './Pages/PropsVenta';
import PropsAlquiler from './Pages/PropsAlquiler';
import Emprendimientos from './Pages/Emprendimientos';
import NosotrosPage from './Pages/Nosotros';
import DetalleProp from './Pages/DetallePropiedad';
import FavoritosPage from './Pages/Favoritos';
import WhatsAppButton from './Components/BotonWhastApp';
import Contactanos from './Pages/Contactanos';
import Footbar from './Components/Footbar';
import PropsInternacionales from './Pages/PropsInternacionales';
import './App.css';

function App() {

  return (
    <InmobiliariaProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>

        <main>          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/ventas' element={<PropsVenta />} />
            <Route path='/alquiler' element={<PropsAlquiler />} />
            <Route path='/emprendimientos' element={<Emprendimientos />} />
            <Route path='/internacional' element={<PropsInternacionales />} />
            <Route path='/nosotros' element={<NosotrosPage />} />
            <Route path='/contacto' element={<Contactanos />} />
            <Route path='/detalle/:id' element={<DetalleProp />} />
            <Route path='/favoritos' element={<FavoritosPage />} />
            <Route path='*' element={<Home />} />
          </Routes>
          {/* btn whatsapp */}
          <WhatsAppButton />
        </main>

        <footer>
          <Footbar />
        </footer>
        
      </div>
    </InmobiliariaProvider>
  );
}

export default App;
