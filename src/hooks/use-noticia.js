import { useStaticQuery, graphql } from "gatsby";

const useNoticia = (slug) => {
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
  const noticia = data.allStrapiNoticia.nodes.find(p => p.slug === slug);
  return noticia ? noticia : [];
}

export default useNoticia; 