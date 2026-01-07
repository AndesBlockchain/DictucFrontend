import React from "react"
import clsx from "clsx"
import CallToAction from "./CallToAction";
import StrapiImage from "./StrapiImage";

const CardServicio = ({ titulo, icono, imagen, contenido, callToAction=false, color_fondo="white", color_texto="black" }) => {

  // Función para detectar si el contenido es una lista
  const esLista = (html) => {
    return /<(ul|ol)[^>]*>/i.test(html);
  };

  const bg_color = 'bg-' + color_fondo;

  return (
    <div className={clsx("flex flex-col w-80 h-full rounded-xl shadow-lg overflow-hidden flex-1",
      color_fondo && color_fondo !== "white" && "border")}>
      <div className={clsx("p-4 flex flex-col flex-1", bg_color)}>

        <StrapiImage
          imagen={imagen}
          fallback={icono}
          alt={titulo}
          className="h-32 w-auto object-contain"
          containerClassName="h-32 flex items-center justify-center mx-auto"
        />

        <h3 className={clsx("text-lg font-bold mb-2 text-center", `text-${color_texto}`)}>
          {titulo}
        </h3>

        <div className={clsx("text-gray-600 text-xs leading-relaxed mb-3 flex-1", `text-${color_texto}`)}>
          {esLista(contenido) ? (
            <div
              className="list-inside list-disc [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-4"
              dangerouslySetInnerHTML={{ __html: contenido }}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: contenido }} />
          )}
        </div>

        {callToAction && (
          <CallToAction
            url={callToAction.url}
            texto={callToAction.texto}
            colorFondo={callToAction.colorFondo}
            colorTexto={callToAction.colorTexto}
            ComoAbrir={callToAction.ComoAbrir}
          />
        )}
      </div>
    </div>
  );
};

export default CardServicio; 