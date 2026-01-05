import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const ItemCarrusel =({index, foto}) => {
  return(
    <div id={"item"+index} className="carousel-item w-full">
      {foto?.localFile?.childImageSharp?.gatsbyImageData ? (
        <GatsbyImage 
          image={foto.localFile.childImageSharp.gatsbyImageData}
          alt=""
          className="w-full"
        />
      ) : foto?.url ? (
        <img
          src={foto.url}
          className="w-full"
          alt="" />
      ) : null}
    </div>
  )
}

export default ItemCarrusel