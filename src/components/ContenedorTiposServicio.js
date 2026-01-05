import React from "react"
import useTipoDeServicio from "../hooks/use-tipo-de-servicios";
import StrapiImage from "./StrapiImage";

const ContenedorTiposServicio = ({useIcono=false}) => {

    const tipos = useTipoDeServicio();
    const STRAPI_URL = process.env.STRAPI_API_URL;

    console.log(tipos)

  return (
    <div id="items-servicios" className="grid gap-6 mt-8 pl-2 pr-2">
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
      {tipos.nodes.map(item=>
        <a href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center lg:w-[215px] lg:h-[180px] group">
        <img src={STRAPI_URL + (useIcono ? item.Icono.url : item.fotoPortada.url)} alt="" className="rounded-xl object-cover shadow-md "/>
          <div className="w-full bg-gray-700 rounded-b-xl -mt-[40px] py-2 text-center">
            <span className="text-white lg:text-xs xl:text-xs text-xs font-bold">{item.nombre}</span>
          </div>
        </a>
      )}
    </div>
    </div>
  )
}

export default ContenedorTiposServicio