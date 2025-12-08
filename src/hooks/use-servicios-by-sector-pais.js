import { useStaticQuery, graphql } from "gatsby"

const useServiciosBySectorPais = (sectorPaisSlug) => {
    const data = useStaticQuery(graphql`
 {
  allStrapiServicio {
    nodes {
      contenido {
        data {
          contenido
        }
      }
      nombre
      slug
      tipo_de_servicio {
        nombre
        slug
      }
      tarjetas {
        Titulo
        Texto {
          data {
            Texto
          }
        }
      }
      unidad {
        nombre
      }
      sectores_pais {
        nombre
        slug
      }
    }
  }
}
  `); 

  // Filtrar servicios que contengan el sector país especificado
  const serviciosFiltrados = data.allStrapiServicio.nodes.filter(servicio => 
    servicio.sectores_pais && 
    servicio.sectores_pais.some(sector => sector.slug === sectorPaisSlug)
  );

  return serviciosFiltrados;
}

export default useServiciosBySectorPais;
