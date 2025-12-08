import React from "react";
import Bloque from "./Bloque";


const BloquePersonas = ({datosBloque}) => {



    const STRAPI_URL = process.env.NODE_ENV === 'development' ? process.env.STRAPI_API_URL : '';
 
    const personasSorted = datosBloque.etiqueta_persona.personas.sort((a, b) => a.sortOrder - b.sortOrder);
    console.log(personasSorted)
    return (
        <Bloque datosBloque={datosBloque.Bloque}>
        <div className="grid grid-cols-2 justify-center items-center gap-8 mt-8 lg:ml-32 lg:mr-32 md:mr-32 md:ml-32 sm:mr-2 sm:ml-2">
        {personasSorted.map((persona)=>(
                <div className="flex flex-row justify-center items-center w-96">
                    <div className="avatar">
                        <div className="w-24 border border-azul-dictuc rounded-full">
                            {persona.Foto?.formats?.thumbnail?.url && (
                              persona.Link ? (
                                <a href={persona.Link} target="_blank" rel="noopener noreferrer">
                                  <img src={STRAPI_URL + persona.Foto.formats.thumbnail.url} alt={persona.Nombre} />
                                </a>
                              ) : (
                                <img src={STRAPI_URL + persona.Foto.formats.thumbnail.url} alt={persona.Nombre} />
                              )
                            )}
                        </div>
                    </div> 
                   <div className="flex flex-col ml-4 w-full"> 
                    <div className="text-left">{persona.Nombre}</div>
                    <div className="text-gray-500 text-sm text-left">{persona.Cargo}</div>
                    <div className="text-gray-500 text-xs text-left">{persona.Link && <a href={persona.Link} target="_blank" rel="noopener noreferrer">Más información</a>}</div>
                    </div>
                </div>
        ))}
        </div>
        </Bloque>
    )
}

export default BloquePersonas