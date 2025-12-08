import React from "react";
import Badge from "./Badge";

const FilaServicios = ({ nombre_servicio, sectores, unidad, color_fondo = "bg-gray-100", slug }) => {

  return (
    <div className={`${color_fondo} flex flex-row p-6`}>
      <div className="basis-full">
        <div>
          {slug ? (
            <a href={"/servicios/"+slug} className="text-black text-lg no-underline">{nombre_servicio}</a>
          ) : (
            nombre_servicio
          )}
        </div>
        <div>
          {sectores.map((sector, idx) => (
            <Badge key={idx} texto={sector.nombre} />
          ))}<br />

            {unidad?.nombre && (
              <Badge key="badge-unidad" texto={unidad.nombre} color="gray"/>
            )}
        </div>
      </div>
    </div>
  );
};

export default FilaServicios; 