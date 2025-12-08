import React from "react"

export function AcortarNoticia(texto,largo=100) {
  if (!texto || texto.length <= largo) return texto;
  const corte = texto.slice(0, largo);
  const ultimoEspacio = corte.lastIndexOf(" ");
  if (ultimoEspacio === -1) return corte + "...";
  return corte.slice(0, ultimoEspacio) + "...";
}


const CardNoticia = ({ titulo, foto, fecha, bajada, slug, mostrarFecha = true }) => {

  const STRAPI_URL = process.env.NODE_ENV === 'development' ? process.env.STRAPI_API_URL : '';


  return(
  <div className="relative flex flex-col h-full w-72 bg-white rounded-xl shadow-lg overflow-hidden mt-4">
    <img
      src={ foto}
      alt={titulo}
      className="w-full h-44 object-cover"
    />
    <div className="p-4">
      <h3 className="text-base font-semibold mb-2">{titulo}</h3>
      <div className="text-gray-600 text-xs leading-relaxed mb-3" dangerouslySetInnerHTML={{__html:AcortarNoticia(bajada)}} />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        {mostrarFecha ? <span className="text-gray-500 text-xs">{fecha}</span> : <span></span>}
        <a href={"/noticias/" + slug} className="text-blue-600 text-xs hover:text-blue-800 font-medium">Ver más</a>
      </div>
    </div>
  </div>
  )
}

export default CardNoticia 