import { useStaticQuery, graphql } from "gatsby"


const useSectoresPais = () => {
   const data = useStaticQuery(graphql`
     {
      allStrapiSector(sort: {nombre: ASC}) {
        nodes {
          nombre
          slug
          icono {
            url
            width
            height
          }
        }
        totalCount
      }
    }
  `);
  return data.allStrapiSector; 
}

export default useSectoresPais;