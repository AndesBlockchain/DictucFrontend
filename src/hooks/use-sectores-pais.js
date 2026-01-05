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
            localFile {
              childImageSharp {
                gatsbyImageData(width: 280, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
        totalCount
      }
    }
  `);
  return data.allStrapiSector; 
}

export default useSectoresPais;