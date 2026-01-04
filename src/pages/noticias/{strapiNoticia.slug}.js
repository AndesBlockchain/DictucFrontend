
import React from "react";
import PaginaInterior from "../../components/PaginaInterior";
import bannerNoticias from "../../images/BannerMicrofonos.webp";
import useNoticias from "../../hooks/use-noticia";
import FranjaAzul from "../../components/FranjaAzul";
import FotoDefaultNoticias from '../../images/noticias.png'

export default function PaginasContenido(props) 
{

    const STRAPI_URL = process.env.STRAPI_API_URL;

    const slug= props.pageContext.slug
    const noticia= useNoticias(slug)

  return (
    <PaginaInterior banner={bannerNoticias} 
                    titulo="Noticias y Proyectos Destacados"
    breadcrum={[{ label: "Home", link: "/" }, {label:"Noticias y Proyectos Destacados", link:"/noticias"}, { label: noticia.titulo, link: "/" }]}> 
        <h1 className="text-lg text-bold uppercase font-bold">{noticia.titulo}</h1>
        <div className="text-sm text-gray-300">{noticia.fecha}</div>
        <div className="w-min mt-2 mb-2">
        <FranjaAzul/>
        </div>
        <div className="p-8 pl-16 pr-16 text-sm">
          <div dangerouslySetInnerHTML={{__html: noticia.cuerpo.data.cuerpo}}></div>
         </div>
         <div className="flex justify-center mb-8">
           <img 
             src={FotoDefaultNoticias} 
             className="max-w-[250px] max-h-[250px] md:max-w-[350px] md:max-h-[350px] lg:max-w-[1/3] lg:max-h-[1/3] w-full h-auto object-contain rounded-lg"
             alt={noticia.titulo || 'Imagen de la noticia'}
           />
         </div>
         </PaginaInterior>

  );
}

export async function config() {
  // Optionally use GraphQL here

  return ({ params }) => {
    return {
      defer: true,
    }
  }
}