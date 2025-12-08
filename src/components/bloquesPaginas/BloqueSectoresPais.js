import React from "react"
import useSectoresPais from "../../hooks/use-sectores-pais"; 
import Bloque from "./Bloque";

const BloqueSectoresPais = ({datosBloque}) => {

    const sectores = useSectoresPais();
    const STRAPI_URL = process.env.NODE_ENV === 'development' ? process.env.STRAPI_API_URL : '';

    console.log("sectores pais",sectores)
    console.log("bloque",datosBloque)

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div id="items-servicios" className="grid gap-2 mt-8 w-220 ml-auto mr-auto">
        <div className="flex gap-2 justify-center">
        {sectores.nodes.map(item=>
          <div className="">
          <div className="justify-center w-full">
          <a href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center">
            <img src={STRAPI_URL + item.icono[0].url} alt="" className="ml-auto mr-auto"/>
          </a>
          </div>
          </div>
        )}
        </div>
      </div>
    </Bloque>
  )
}

export default BloqueSectoresPais