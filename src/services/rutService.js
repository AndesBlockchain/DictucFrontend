

class RutService {
  constructor() {
    this.baseURL = 'http://localhost:1339/api';
  }

  async obtenerNombrePorRut(rut) {
    try {
      const response = await fetch(`${this.baseURL}/rutificador`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut: rut
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      return {
        success: true,
        data: data.message.razon_social,
        error: null
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: null,
        error: error.message || 'Error al consultar el RUT'
      };
    }
  }
}

export default new RutService(); 