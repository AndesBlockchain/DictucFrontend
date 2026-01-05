import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Bloque from "./Bloque";
import CallToActionGroup from "../CallToActionGroup";

const BloqueTabs = ({ datosBloque }) => {

  // Ejemplo de datos para las tabs
  const tabsData = datosBloque?.Tabs || [];

  return (
    <Bloque datosBloque={datosBloque.Bloque}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-sm" dangerouslySetInnerHTML={{__html: datosBloque.texto?.Texto.data.Texto || ""}} />
        {/* Ejemplo 1: Tabs básicas */}
        <div className="mb-8">
          <div role="tablist" className="tabs tabs-lifted justify-center">
            {tabsData.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <input 
                  type="radio" 
                  name="tabs-basic" 
                  role="tab" 
                  className="tab checked:text-azul-dictuc checked:border-b-2 checked:border-azul-dictuc" 
                  aria-label={tab.Titulo}
                  defaultChecked={index === 0}
                />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <div className="flex flex-row items-start gap-2 mb-4">
                    <div className="flex flex-item w-2/5 pl-8 pr-8">
                      {tab.Foto?.localFile?.childImageSharp?.gatsbyImageData ? (
                        <GatsbyImage 
                          image={tab.Foto.localFile.childImageSharp.gatsbyImageData}
                          alt=""
                          className="rounded-xl"
                        />
                      ) : tab.Foto?.formats?.medium?.url ? (
                        <img className="rounded-xl" src={tab.Foto.formats.medium.url} alt="" />
                      ) : null}
                    </div>
                    <div className="mt-auto mb-auto w-3/5 pl-8 text-left text-sm" dangerouslySetInnerHTML={{__html: tab.Texto?.data.Texto || ""}} />
                   
                  </div>
                  <CallToActionGroup buttons={tab.CallToAction}/>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>


      </div>
    </Bloque>
  );
};

export default BloqueTabs;