import { useStaticQuery, graphql } from "gatsby"

const useServicios = () => {
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
  return data.allStrapiServicio;
}

export default useServicios;