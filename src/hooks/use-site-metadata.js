import { useStaticQuery, graphql } from "gatsby"


const useSiteMetadata = () => {
   const data = useStaticQuery(graphql`
          query
          {
            site {
            siteMetadata {
              siteUrl
              title
              description
            }
          }
   }
  `);
  return data.site.siteMetadata; 
}

export default useSiteMetadata;