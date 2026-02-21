const users = [
  { id: 1, name: "Laura Gómez", email: "laura@email.com", city: "Medellín" },
  { id: 2, name: "Carlos Ruiz", email: "carlos@email.com", city: "Bogotá" },
  { id: 3, name: "Sofía Martínez", email: "sofia@email.com", city: "Cali" },
  { id: 4, name: "Andrés López", email: "andres@email.com", city: "Barranquilla" },
  { id: 5, name: "Valentina Torres", email: "valentina@email.com", city: "Cartagena" }
];

const products = [
  { id: 101, userId: 1, name: "Laptop", price: 3500, status: "Enviado" },
  { id: 102, userId: 1, name: "Mouse Gamer", price: 150, status: "Entregado" },
  { id: 103, userId: 2, name: "Teclado Mecánico", price: 280, status: "En proceso" },
  { id: 104, userId: 3, name: "Monitor 24 pulgadas", price: 900, status: "Entregado" },
  { id: 105, userId: 3, name: "Base Refrigerante", price: 120, status: "Enviado" },
  { id: 106, userId: 4, name: "Audífonos Bluetooth", price: 200, status: "Cancelado" }
];




function buscarUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.id === id);

      if (user) {
        resolve(user);
      } else {
        reject(" Usuario no encontrado");
      }
    }, 1500);
  });
}


function buscarPedidos(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pedidos = products.filter(p => p.userId === userId);

      if (pedidos.length > 0) {
        resolve(pedidos);
      } else {
        reject(" Este usuario no tiene pedidos");
      }
    }, 1500);
  });
}



const input = document.getElementById("userIdInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {

  const id = parseInt(input.value);

  if (!id) {
    result.innerHTML = " Ingresa un ID válido";
    return;
  }

  result.innerHTML = "";
  button.disabled = true;
  result.innerHTML = " Cargando información...<br><br>";

  buscarUsuario(id)

    .then(user => {
      return buscarPedidos(user.id).then(pedidos => {
        return { user, pedidos };
      });
    })

    .then(data => {

      const { user, pedidos } = data;

      const ultimoPedido = pedidos[pedidos.length - 1];

      result.innerHTML = `
        <div class="section">
          <h3>Datos del Usuario</h3>
          <strong>Nombre:</strong> ${user.name}<br>
          <strong>Email:</strong> ${user.email}<br>
          <strong>Ciudad:</strong> ${user.city}
        </div>

        <div class="section">
          <h3>Productos del Usuario</h3>

          ${pedidos.map(p => `
            <div class="product-card ${p.id === ultimoPedido.id ? "last-order" : ""}">
              <strong>Nombre:</strong> ${p.name}<br>
              <strong>Precio:</strong> $${p.price}<br>
              <strong>Estado:</strong> ${p.status}
              ${p.id === ultimoPedido.id ? "<br><em>Última compra registrada</em>" : ""}
            </div>
          `).join("")}

        </div>
      `;
    })

    .catch(error => {
      result.innerHTML = error;
    })

    .finally(() => {
      button.disabled = false;
    });

});