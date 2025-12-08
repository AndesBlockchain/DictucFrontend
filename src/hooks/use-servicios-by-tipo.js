import { useStaticQuery, graphql } from "gatsby"

const useServiciosByTipo = (tipoServicioSlug) => {
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

  // Filtrar servicios que tengan el tipo de servicio especificado
  const serviciosFiltrados = data.allStrapiServicio.nodes.filter(servicio => 
    servicio.tipo_de_servicio && 
    servicio.tipo_de_servicio.slug === tipoServicioSlug
  );

  return serviciosFiltrados;
}

export default useServiciosByTipo;
