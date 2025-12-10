
import React, {useState, useEffect} from "react";
import PaginaInterior from "../../components/PaginaInterior";
import FranjaAzul from "../../components/FranjaAzul";
import FilaServicios from "../../components/FilaServicios";
import FiltroServicios from "../../components/FiltroServicios";
import useServicios from "../../hooks/use-servicios";
import useTipoDeServicio from "../../hooks/use-tipo-de-servicios";
import bannerLaboratorios from "../../images/BannerLaboratorioServicios.webp";


export default function HomeTipoServicio(props) 
{
  const slug= props.pageContext.slug
  const tiposDeServicio= useTipoDeServicio()
  const tipoServicio = tiposDeServicio?.nodes?.find(item => item.slug === slug);
  const servicios= useServicios();

console.log("tipo servcio",tipoServicio);
  const [filtros,setFiltros]= useState({
    tipoServicio: '',
    sectoresPais: [slug],
    busqueda: ''
  })

  const STRAPI_URL = process.env.STRAPI_API_URL;

  const [serviciosVisibles,setServiciosVisibles]=useState(servicios)


  // Función para filtrar servicios basándose en el estado filtros
  const filtrarServicios = (servicios, filtros) => {
    if (!servicios || !servicios.nodes) return { nodes: [] };
    
    return {
      ...servicios,
      nodes: servicios.nodes.filter(servicio => {
        // Filtro por tipo de servicio
        if (filtros.tipoServicio && servicio.tipo_de_servicio?.slug !== filtros.tipoServicio) {
          return false;
        }
        
        // Filtro por sectores país
        if (filtros.sectoresPais && filtros.sectoresPais.length > 0) {
          const servicioSectores = servicio.sectores_pais?.map(s => s.slug) || [];
          const tieneSector = filtros.sectoresPais.some(sector => 
            servicioSectores.includes(sector)
          );
          if (!tieneSector) {
            return false;
          }
        }
        
        // Filtro por búsqueda de texto
        if (filtros.busqueda && filtros.busqueda.trim() !== '') {
          const busqueda = filtros.busqueda.toLowerCase();
          const nombreServicio = servicio.nombre?.toLowerCase() || '';
          const contenidoServicio = servicio.contenido?.data?.contenido?.toLowerCase() || '';
          
          if (!nombreServicio.includes(busqueda) && !contenidoServicio.includes(busqueda)) {
            return false;
          }
        }
        
        return true;
      })
    };
  };

  // Actualizar servicios visibles cuando cambien los filtros
  useEffect(() => {
    const serviciosFiltrados = filtrarServicios(servicios, filtros);
    setServiciosVisibles(serviciosFiltrados);
  }, [filtros, servicios]);

  const handleFiltrosChange = (data) => {
    // Crear un nuevo objeto de filtros combinando los datos recibidos
    // y manteniendo el sector actual como base
    const nuevosFiltros = {
      tipoServicio: data.tipoServicio || '',
      busqueda: data.busqueda || '',
      sectoresPais: data.sectoresPais && data.sectoresPais.length > 0 ? data.sectoresPais : [slug]
    };
    console.log('Nuevos filtros:', nuevosFiltros);
    setFiltros(nuevosFiltros);
  }

  const obtenerBanner = () => {
    if (tipoServicio?.BannerBuscadorServicios === null || tipoServicio?.BannerBuscadorServicios === undefined) {
      return bannerLaboratorios;
    }
    return STRAPI_URL + tipoServicio.BannerBuscadorServicios.url;
  }

  const banner = obtenerBanner();



  return (
    <PaginaInterior banner={banner} titulo={tipoServicio.nombre} breadcrum={[{ label: "Home", link: "/" }, { label: tipoServicio.nombre, link: "/" + slug }]}> 
        <div className="mb-4">
        <div className="flex flex-row">
        <FiltroServicios tiposDeServicioVisibles={false} onFiltrosChange={handleFiltrosChange} filtroTipoServicio={slug} />
        <div className="flex-3 pl-4 pr-4">
          <div className="text-xl font-semibold mb-1 text-center">Servicios Encontrados</div>
          <FranjaAzul />
          {servicios.nodes.map((item, idx) =>
            <FilaServicios 
              nombre_servicio={item.nombre}
              sectores={item.sectores_pais}
              unidad={item.unidade}
              slug={item.slug}
              color_fondo={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
            />
          )}

        </div>
        </div>
          
        </div>
    </PaginaInterior>
  );
}