import * as React from "react"

import Footer from "../components/Footer"
import FooterSuperior from "../components/FooterSuperior"
import BarraSuperior from "../components/BarraSuperior"
import Carrusel from "../components/Carrusel"
import SectoresPais from "../components/SectoresPais"
import Agente from "../components/Agente"
import TiposDeServicios from "../components/TiposDeServicios"
import Noticias from "../components/Noticias"
import ModalAlerta from "../components/ModalAlerta"
import useUltimasNoticias from "../hooks/use-ultimas-noticias"
import useModals from "../hooks/use-modals"

const IndexPage = () => {

  const noticias= useUltimasNoticias()
  const modals = useModals();
  const modalsNodes = modals?.nodes || [];
  const hoy = new Date();
  const modalsFiltrados = modalsNodes.filter(modal => {
    const desde = new Date(modal.Publicacion.fechaDesde);
    const hasta = new Date(modal.Publicacion.fechaHasta);
    return hoy >= desde && hoy <= hasta;
  });

  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [modalMostrado, setModalMostrado] = React.useState(false);

  // Abrir modal automáticamente si hay modals filtrados y no se ha mostrado antes
  React.useEffect(() => {
    if (modalsFiltrados.length > 0 && !modalMostrado) {
      setModalAbierto(true);
      setModalMostrado(true);
    }
  }, [modalsFiltrados, modalMostrado]);

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <main className="container m-auto max-w-6xl mb-4 font-montserrat bg-white text-black">
      <BarraSuperior />
      <Carrusel />
      <SectoresPais/>
      <Agente 
        titulo="¿Qué <span class='text-azul-dictuc'>Necesitas?</span>"
        franja={true}
      />
      <TiposDeServicios/>
      <Noticias noticias={noticias} titulo='<span class="text-azul-dictuc">Noticias</span> y Proyectos destacados' />
      <FooterSuperior />
      <Footer />
      
      {/* Modal de Alerta */}
      {modalAbierto && modalsFiltrados.length > 0 && (
        <ModalAlerta 
          onClose={cerrarModal}
          Alerta={modalsFiltrados[0].imagen.url}
        />
      )}
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Sitio Web Dictuc</title>