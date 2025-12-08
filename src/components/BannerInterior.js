import React from "react";


const BannerInterior = ({ imagen, alt = "Banner" , titulo="", titulo_visible=true, color_titulo="azul-dictuc"}) => {
  
  console.log("color_titulo",color_titulo)
  return (
    <div className="w-full pt-2 mb-2 relative">
    {titulo_visible && (
      <div className={"text-sm xl:text-2xl w-auto z-10 opacity-85 text-white pl-10 pr-10 px-6 py-3 rounded-r-full absolute bottom-12 left-0 bg-"+color_titulo }>
        {titulo}
      </div>
    )}
      <img
        src={imagen}
        alt={alt}
        className="w-full h-auto object-contain"
        style={{ display: 'block' }}
      />
    </div>
    
  );
};

export default BannerInterior;
