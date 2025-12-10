import { useStaticQuery, graphql } from "gatsby"


const useTipoDeServicio = () => {
  const data = useStaticQuery(graphql`
   {
      allStrapiTipoDeServicio(sort: {nombre: ASC}) {
        totalCount
        nodes {
          nombre
          slug
          fotoPortada {
            height
            url
            width
          }
          Icono {
            height
            url
            width
          }
          BannerBuscadorServicios {
            height
            url
            width
          }
        }
      }
    }
  `);
  return data.allStrapiTipoDeServicio; 
}

export default useTipoDeServicio;