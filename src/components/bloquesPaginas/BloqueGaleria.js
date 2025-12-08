import React from "react";
import Bloque from "./Bloque";
import ItemCarrusel from "../carrusel/ItemCarrusel"
import BotonCarrusel from "../carrusel/BotonCarrusel";

 const BloqueGaleria = ({ datosBloque }) => {
  const STRAPI_URL = process.env.NODE_ENV === 'development' ? process.env.STRAPI_API_URL : '';


  return (
    <Bloque datosBloque={datosBloque.Bloque}>
    <div className="carousel w-1/4">
      {datosBloque.FotosGaleria.map((foto, index) => (
        <ItemCarrusel index={index+1} url={STRAPI_URL + foto.Foto.url} />
      ))}
    </div>
    <div className="flex w-full justify-center gap-2 py-2">
    {datosBloque.FotosGaleria.map((foto, index) => (
      <BotonCarrusel index={index+1}/>
    ))}     
    </div>
    </Bloque>
  );
};

export default BloqueGaleria;
