import React from "react";

const ItemSectoresPais = ({ url_icono, url }) => {

  const STRAPI_URL = process.env.NODE_ENV === 'development' ? process.env.STRAPI_API_URL : '';

  return (
  <div className="flex flex-col items-center justify-center">
    <a href={url}>
      <img src={STRAPI_URL + url_icono} className="w-[140px] md:w-[105px] sm:w-[70px] h-auto" />
    </a>
  </div>
  )
};

export default ItemSectoresPais;
