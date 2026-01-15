exports.createPages = async ({ actions, graphql }) => {
  const { createSlice } = actions

  // Crear slices compartidos (header, footer)
  createSlice({
    id: `barra-superior`,
    component: require.resolve(`./src/slices/BarraSuperior.js`),
  })

  createSlice({
    id: `footer-superior`,
    component: require.resolve(`./src/slices/FooterSuperior.js`),
  })

  createSlice({
    id: `footer`,
    component: require.resolve(`./src/slices/Footer.js`),
  })

}

