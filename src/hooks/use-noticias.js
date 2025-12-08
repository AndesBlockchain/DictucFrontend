import { useStaticQuery, graphql } from "gatsby"


const useNoticias = () => {
     const data = useStaticQuery(graphql`
  {
      allStrapiNoticia {
    nodes {
      slug
      titulo
      url_foto
      galeria {
        url
      }
      foto {
        url
      }
      fecha
      cuerpo {
        data {
          cuerpo
        }
      }
      etiqueta_noticias {
        documentId
        etiqueta
      }
    }
  }
}
      `);
  return data.allStrapiNoticia;   
}

export default useNoticias;