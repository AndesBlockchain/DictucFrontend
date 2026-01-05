import React from "react";
import StrapiImage from "./StrapiImage";

const ItemSectoresPais = ({ icono, url_icono, url }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <a href={url}>
        <StrapiImage
          imagen={icono}
          fallback={url_icono}
          alt=""
          className="w-[90px] h-auto"
        />
      </a>
    </div>
  )
};

export default ItemSectoresPais;
