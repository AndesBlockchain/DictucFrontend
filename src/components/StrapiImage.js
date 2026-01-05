import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

/**
 * Componente para renderizar imágenes de Strapi con soporte para:
 * - GatsbyImage optimizada
 * - URLs directas
 * - gatsbyImageData directo
 * - Iconos/imágenes de fallback
 */
const StrapiImage = ({
  imagen,
  gatsbyImageData = null,
  fallback = null,
  alt = "",
  className = "",
  containerClassName = ""
}) => {
  // Normalizar imagen (puede venir como array)
  const imageData = Array.isArray(imagen) ? imagen[0] : imagen;

  // Determinar qué renderizar
  const renderImage = () => {
    // Caso 1: URL de Strapi (PRIORIDAD MÁXIMA)
    if (imageData?.url) {
      const imageUrl = process.env.NODE_ENV === 'development'
        ? `${process.env.STRAPI_API_URL}${imageData.url}`
        : `${process.env.STRAPI_API_URL}${imageData.url}`;
      return (
        <img
          src={imageUrl}
          alt={alt}
          className={className}
        />
      );
    }

    // Caso 2: gatsbyImageData pasado directamente como prop
    if (gatsbyImageData) {
      return (
        <GatsbyImage
          image={gatsbyImageData}
          alt={alt}
          className={className}
        />
      );
    }

    // Caso 3: GatsbyImage optimizada desde Strapi
    if (imageData?.localFile?.childImageSharp?.gatsbyImageData) {
      return (
        <GatsbyImage
          image={imageData.localFile.childImageSharp.gatsbyImageData}
          alt={alt}
          className={className}
        />
      );
    }

    // Caso 4: Fallback
    if (fallback) {
      return (
        <img
          src={fallback}
          alt={alt}
          className={className}
        />
      );
    }

    return null;
  };

  const content = renderImage();

  if (!content) return null;

  return containerClassName ? (
    <div className={containerClassName}>
      {content}
    </div>
  ) : content;
};

export default StrapiImage;
