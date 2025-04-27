import React, {useEffect, useState} from 'react'
import ListaFavoritos from '../../Components/ListaFavoritos';
import './styles.css';

function FavoritosPage() {
    const [fav, setFav] = useState([]); console.log("fav:", fav)

    // Desplaza la página hacia la parte superior cuando el componente se monta
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // El array vacío asegura que se ejecute solo al montar el componente

    useEffect(()=>{
        let listaFav = JSON.parse(localStorage.getItem('favorites')) || [];
        setFav(listaFav);
    },[]);


    return (
        <div >
            <ListaFavoritos allProps={fav} />            
        </div>
    )
    
}

export default FavoritosPage;