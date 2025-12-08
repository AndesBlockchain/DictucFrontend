import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import logo_ingenieria from "../images/logo_ingenieria_uc.webp"
import logo_gbc from "../images/logo_gbc.webp"

const FooterSuperior = () => {
  
  const STRAPI_URL = process.env.NODE_ENV === 'development' ? process.env.STRAPI_API_URL : '';

  const data = useStaticQuery(graphql`
    query {
      allStrapiMenuFooterSuperior(sort: {createdAt: ASC}) {
        nodes {
          Nombre
          Logo {
            url
          }
        }
      }
    }
  `)

  return(
    <div id="footer-superior" className="grid grid-cols-12 pl-8 pr-8 pt-4 pb-2 w-full gap-6 bg-gray-200">
    {/* Logo Escuela de Ingeniería UC */}
    <div className="lg:col-span-3 md:col-span-4 col-span-12 content-center">
      <div>
        <img src={logo_ingenieria} alt="Logo Ingenieria UC" className="max-w-xs w-full h-auto"/>
      </div>
    </div>
    {/* Certificaciones */}
    <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-6">
      <div className="text-blue-700 text-base font-bold mb-3 self-start" style={{ marginLeft: '4px' }}>Certificaciones</div>
      <div className="flex flex-row gap-4 w-full">
        {data.allStrapiMenuFooterSuperior.nodes.map(item => (
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={STRAPI_URL + item.Logo.url} alt="" className="h-16 w-auto mx-auto" />
          </div>
        ))}
      </div>
    </div>
    {/* Empresas Relacionadas */}
    <div className="col-span-12 md:col-span-2">
      <div className="text-blue-700 text-base font-bold mb-3">Entidades Relacionadas</div>
      <div>
        <img src={logo_gbc} className="h-12" alt="Logo GBC" />
      </div>
    </div>
  </div>
      )
}

export default FooterSuperior