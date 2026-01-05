import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const ItemSectoresPais = ({ icono, url_icono, url }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <a href={url}>
        {icono?.[0]?.localFile?.childImageSharp?.gatsbyImageData ? (
          <GatsbyImage 
            image={icono[0].localFile.childImageSharp.gatsbyImageData}
            alt=""
            className="w-[90px] h-auto"
          />
        ) : url_icono ? (
          <img 
            src={url_icono} 
            className="w-[90px] h-auto" 
            alt=""
          />
        ) : null}
      </a>
    </div>
  )
};

export default ItemSectoresPais;
