
import React from "react";
import PaginaInterior from "../../components/PaginaInterior";
import useServicios from "../../hooks/use-servicios";
import CardServicio from "../../components/CardServicio";
import Badge from "../../components/Badge";
import FranjaAzul from "../../components/FranjaAzul";
import Contacto from "../../components/Contacto";
import bannerLaboratorio from "../../images/BannerLaboratorioServicios.webp";

export default function Servicio(props) {

  const slug= props.pageContext.slug
  const servicios= useServicios();
  const servicio = servicios?.nodes?.find(s => s.slug === slug);

  // Early return si no hay servicio disponible
  if (!servicio) {
    return (
      <PaginaInterior fallback={bannerLaboratorio} titulo="Cargando..." breadcrum={[{ label: "Home", link: "/" }, { label: "Servicios", link: "/" }]}>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando información del servicio...</p>
        </div>
      </PaginaInterior>
    );
  }

  return (
    <PaginaInterior fallback={bannerLaboratorio} titulo="Descripción del Servicio" breadcrum={[{ label: "Home", link: "/" }, { label: "Servicios", link: "/" }, {label: servicio.nombre}]}> 
    <h1 className="text-xl font-bold uppercase">{servicio.nombre}</h1>
    <div className="text-sm text-gray">{servicio.tipo_de_servicio.nombre} | {servicio.unidad.nombre}</div>
    <div className="mb-8">
      {servicio.sectores_pais.map(sector=>(
        <Badge texto={sector.nombre}/>
      ))}
    </div>
    
    {servicio.tarjetas && servicio.tarjetas.length > 0 && (
      <div>
      <div id="tarjetas" className="flex flex-row p-8 bg-gray-200 flex-wrap justify-center items-center gap-8 h-80">
        {servicio.tarjetas.map(tarjeta=>(
          <CardServicio titulo={tarjeta.Titulo} contenido={tarjeta.Texto.data.Texto}/>
        ))}
      </div>
      <div className="flex justify-center mb-4 pb-8 bg-gray-200">
      <a href="#cotizar" className="bg-azul-dictuc text-white px-4 py-1 rounded-full shadow hover:bg-gray-900 transition-all text-sm">
        Cotizar servicio
      </a>
    </div>
    </div>
    )}

    <FranjaAzul />
    <div className="text-lg text-center mt-2 uppercase font-semibold"><span className="text-azul-dictuc">Descripción</span> del Servicio</div>
    <div className="mt-6 mb-12" dangerouslySetInnerHTML={{ __html: servicio.contenido.data.contenido }} />
      <div id="cotizar" className="w-full md:w-1/2 flex justify-center mx-auto mb-6">
        <Contacto titulo="Solicitud de <span class='text-azul-dictuc'>Cotización</span>" border={true} isCotizacion={true} servicio={slug} />
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