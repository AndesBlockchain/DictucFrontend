import React, { useState } from "react"
import FranjaAzul from "./FranjaAzul"
import ModalAgente from "./ModalAgente"
import Titulo from "./Titulo"

const Agente = ({
  titulo = "¿Qué Necesitas?",
  franja = true,
  backgroundColor = "bg-gray-100",
  padding = 8,
  marginTop = 12
}) => {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [textoConsulta, setTextoConsulta] = useState("")
  const [placeholder, setPlaceholder] = useState("Describe lo que estas buscando, el servicio que necesitas o el problema en que necesitas de nuestra ayuda")
  
  const marginTopClass = {
     0: "mt-0",
     4: "mt-4",
     8: "mt-8",
     12: "mt-12",
     // agrega los valores que necesites
   }[marginTop] || "";

   const paddingClass = {
     0: "pt-0 pb-0",
     4: "pt-4 pb-4",
     8: "pt-8 pb-8",
     12: "pt-12 pb-12",
     // agrega los valores que necesites
   }[padding] || "";

  const handleConsultar = () => {
    if (!textoConsulta.trim()) {
      setPlaceholder("Por favor ingresa tu pregunta.")
      return
    }
    setModalAbierto(true)
  }

  return (
    <div
      id="agente"
      className="mt-8 pt-6 bg-gray-100 pb-6"
    >
      {franja && <FranjaAzul />}
      <Titulo titulo="¿Qué <span class='text-azul-dictuc'>necesitas?</span>" />
      <div className="flex justify-center">
        <div className="flex flex-col max-w-2xl w-full mx-2 sm:mx-0 sm:p-1 rounded-2xl border border-gray-300 bg-white overflow-hidden shadow-lg">
          <textarea
            rows={3}
            value={textoConsulta}
            onChange={(e) => setTextoConsulta(e.target.value)}
            placeholder={placeholder}
            className="flex-grow px-6 py-6 text-lg focus:outline-none resize-none"
          />
          <div className="flex justify-end">
            <button 
              className="bg-blue-600 text-white px-4 py-2 m-4 text-xs rounded-full hover:bg-blue-700 transition-all"
              onClick={handleConsultar}
            >
              Consultar
            </button>
          </div>
        </div>
      </div>
      {modalAbierto && <ModalAgente onClose={() => { setModalAbierto(false); setTextoConsulta(""); }} pregunta={textoConsulta} />}
    </div>
  )
}

export default Agente 