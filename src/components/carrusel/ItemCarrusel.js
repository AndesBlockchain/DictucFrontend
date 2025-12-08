import React from "react";


const ItemCarrusel =({index, url}) => {
  return(
    <div id={"item"+index} className="carousel-item w-full">
      <img
        src={url}
        className="w-full"
        alt="" />
    </div>
  )
}

export default ItemCarrusel