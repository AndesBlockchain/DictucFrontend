import * as React from "react"

import Footer from "../components/Footer"
import FooterSuperior from "../components/FooterSuperior"
import BarraSuperior from "../components/BarraSuperior"
import Breadcrumbs from "./Breadcrumbs"
import BannerInterior from "./BannerInterior"


export default function PaginaInterior({children, breadcrum = [], banner, titulo="", color_titulo="azul-dictuc", titulo_visible=true}) {
 
  return (
    <main className="container m-auto max-w-6xl mb-4 font-montserrat bg-white text-black">
      <BarraSuperior />
      <BannerInterior imagen={banner} titulo={titulo} titulo_visible={titulo_visible} color_titulo={color_titulo}  />
      <Breadcrumbs items={breadcrum} />

      {children}
      <FooterSuperior />
      <Footer />
    </main>
  )
}