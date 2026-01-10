import React, { useState } from "react";
import logoDictuc from "../images/logo_dictuc.png"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { getFullUrl } from "../helpers/links-helpers";
import useSiteMetadata from "../hooks/use-site-metadata";

const BarraSuperior = () => {

    const data = useStaticQuery(graphql`
        query {
          allStrapiMenuSuperior(sort: {posicion: ASC}) {
            nodes {
              Nombre
              link
            }
          }
        }
      `);

    const siteMetadata = useSiteMetadata();

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }

    return (
      <header class="w-full items-start grid grid-cols-12 grid-row-1 z-100 uppercase">
    <div id="logo" className="col-span-3">
      <a href="/"><img src={logoDictuc} alt="Logo Dictuc" className="h-20 mt-16 lg:mt-4 mb-4 ml-2" /></a>
    </div>
    <div id="menu-superior" className="col-span-9 items-start">
      <nav className="flex flex-row gap-4 justify-end text-xs pr-2 pt-1 ml-auto">
        {/* Menú hamburguesa para móviles */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex justify-end bg-white p-2 shadow-md">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            aria-label="Toggle menu"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú de navegación - oculto en móviles por defecto */}
        <div className={`${isMenuOpen ? 'flex fixed top-0 right-0 w-full justify-end' : 'hidden'} lg:flex lg:relative lg:top-auto lg:left-auto lg:right-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none z-40 flex-col lg:flex-row gap-4 lg:gap-4 justify-end items-start lg:items-center text-xs p-4 lg:p-0 lg:pr-2 lg:pt-1 border-b lg:border-b-0`}>
        <a href="/" className="w-full lg:w-auto py-2 lg:py-0 hover:text-blue-600 cursor-pointer">
          <FontAwesomeIcon icon={faHouse}/></a>
        {data.allStrapiMenuSuperior.nodes.map(item => (
            <a href={getFullUrl(item.link,siteMetadata.siteUrl)} className="w-full lg:w-auto py-2 lg:py-0 hover:text-blue-600 text-[10px] cursor-pointer">
              {item.Nombre}
            </a>
          ))}
          {/* Barra de búsqueda */}
          <div className="w-full lg:w-auto flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full lg:w-auto px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="w-full lg:w-auto py-2 lg:py-0 hover:text-blue-600 cursor-pointer text-[10px]">Buscar en el sitio</div>
          </div>
        </div>
      </nav>
    </div>
  </header>
            )
}

export default BarraSuperior
