import { useStaticQuery, graphql } from "gatsby"


const useUltimasNoticias = () => {
const data = useStaticQuery(graphql`
{
  allStrapiNoticia(sort: {fecha: DESC}, limit: 3) {
    nodes {
      titulo
      slug
      fecha
      url_foto
      cuerpo {
        data {
          cuerpo  
        }
      }
      foto {
        url
      }
    }
  }
}
      `);
  return data.allStrapiNoticia;  
}

export default useUltimasNoticias;