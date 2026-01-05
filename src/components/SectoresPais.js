import React from "react"
import FranjaAzul from "./FranjaAzul";
import ItemSectoresPais from "./ItemSectoresPais";
import useSectoresPais from "../hooks/use-sectores-pais";

const SectoresPais=(titulo)=>{

    const data = useSectoresPais();
    const gridClassTop = (sectoresCount) => {
        if (sectoresCount <= 10){
            return sectoresCount;
        } else {
            return Math.floor(sectoresCount/2) + (sectoresCount % 2);
        }
    }

    const gridClassBottom = (sectoresCount) => {
        if (sectoresCount <= 10){
            return sectoresCount;
        } else {
            return Math.floor(sectoresCount/2);
        }
    }

    return(
        <div id="sectores" className="relative z-10 mt-4 lg:-mt-8 p-2 pb-4 pt-5 max-w-4xl mx-auto bg-emerald rounded-3xl shadow-lg">
        <FranjaAzul />
        <div className="text-center mb-4 mt-4 font-semibold uppercase">
        Encuentra soluciones y servicios según tu tipo de <span className="text-azul-dictuc">industria</span>
        </div> 
        {data.totalCount<=10 ?
            <div className={"flex flew-row justify-center" + data.totalCount + " gap-2"}>
                {data.nodes.map(item=>
                    <ItemSectoresPais 
                      key={item.slug}
                      url={"/sectores-pais/" + item.slug} 
                      icono={item.icono}
                      url_icono={item.icono?.[0]?.url}
                    />
                )}
            </div>
            :
            <div>
                <div className="flex flex-row justify-center gap-2">
                    {data.nodes.slice(0,gridClassTop(data.totalCount)).map(item=>
                        <ItemSectoresPais 
                          key={item.slug}
                          url={"/sectores-pais/" + item.slug}
                          icono={item.icono}
                          url_icono={item.icono?.[0]?.url}
                        />
                    )}
                </div>
                <div className="flex flex-row gap-2 justify-center">
                    {data.nodes.slice(gridClassBottom(data.totalCount)+1).map(item=>
                        <ItemSectoresPais 
                          key={item.slug}
                          url={"/sectores-pais/" + item.slug}
                          icono={item.icono}
                          url_icono={item.icono?.[0]?.url}
                        />
                    )}
                </div>
            </div>
        }
    </div>

    )

}

export default SectoresPais;