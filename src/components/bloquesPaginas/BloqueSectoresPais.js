import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import useSectoresPais from "../../hooks/use-sectores-pais"; 
import Bloque from "./Bloque";

const BloqueSectoresPais = ({datosBloque}) => {

    const sectores = useSectoresPais();

    console.log("sectores pais",sectores)
    console.log("bloque",datosBloque)

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div id="items-servicios" className="grid gap-2 mt-8 w-220 ml-auto mr-auto">
        <div className="flex gap-2 justify-center">
        {sectores.nodes.map(item=>
          <div key={item.slug} className="">
          <div className="justify-center w-full">
          <a href={"/tipos-de-servicio/" + item.slug} className="flex flex-col justify-center">
            {item.icono?.[0]?.localFile?.childImageSharp?.gatsbyImageData ? (
              <GatsbyImage 
                image={item.icono[0].localFile.childImageSharp.gatsbyImageData}
                alt=""
                className="ml-auto mr-auto"
              />
            ) : item.icono?.[0]?.url ? (
              <img src={item.icono[0].url} alt="" className="ml-auto mr-auto"/>
            ) : null}
          </a>
          </div>
          </div>
        )}
        </div>
      </div>
    </Bloque>
  )
}

export default BloqueSectoresPais