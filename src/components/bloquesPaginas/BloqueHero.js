import React from "react";
import clsx from "clsx";
import Bloque from "./Bloque";
import DegradeBase from "../DegradeBase";

const BloqueHero = ({ datosBloque }) => {

const letra = datosBloque.Texto?.tipografia?.class || "";
const colorLetra = datosBloque.Texto?.colorTexto?.Codigo || "black";
const STRAPI_API_URL = process.env.STRAPI_API_URL
const posicion_foto= datosBloque.posicion_foto
const margenSuperior= datosBloque.Bloque.MargenSuperior
const margenInferior= datosBloque.Bloque.MargenInferior

console.log("bloque hero",datosBloque)

// Clases CSS usando clsx
const tituloClasses = clsx(
  "border border-[#53565A] text-[#53565A] uppercase text-base rounded-full",
  "pt-4 pb-4 pl-8 pr-8 w-fit min-w-[40%] mx-auto relative z-20",
  "text-center bg-white font-semibold"
);

const imagenContainerClasses = clsx(
  "flex-col w-2/5 pl-8 pr-8"
);

const imagenClasses = clsx(
  "rounded-xl w-[640px]"
);

const textoContainerClasses = clsx(
  "flex-col w-3/5 pt-12 pl-8 text-sm text-justify pr-4"
);

const contenidoFlexClasses = clsx(
  "flex flex-row p-12"
);

const contenedorPrincipalClasses = clsx(
  {
    [`mt-${margenSuperior}`]: true,
  }
);

  // Definir el contenido de los divs
  const contenidoImagen = (
    <div className={imagenContainerClasses}>
      <img className={imagenClasses} src={STRAPI_API_URL + datosBloque.foto.formats.medium.url} />
    </div>
  );

  const contenidoTexto = (
    <div className={textoContainerClasses}>
      <div dangerouslySetInnerHTML={{__html: datosBloque.texto.data.texto.replace("classname","class")}} />
    </div>
  );

  return (
    <div className={contenedorPrincipalClasses}>
      <div className={tituloClasses}
          dangerouslySetInnerHTML={{__html:datosBloque.Bloque.Titulo}} />
      
        {posicion_foto === "Derecha" ? (
          <div>
          <div className={contenidoFlexClasses}>
            {contenidoTexto}
            {contenidoImagen}
          </div>
          <DegradeBase color="azul-dictuc" />
          </div>
        ) : (
          <div>
          <div className={contenidoFlexClasses}>
            {contenidoImagen}
            {contenidoTexto}
          </div>
          <DegradeBase color="azul-dictuc" toRight={false} />
          </div>
        )}
     </div>
);
};

export default BloqueHero;