exports.createPages = async ({ actions }) => {
  const { createSlice } = actions

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
