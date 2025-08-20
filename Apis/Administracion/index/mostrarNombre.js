//const apiUrl = "http://127.0.0.1:8000";
//const token = localStorage.getItem('token');
const idU = localStorage.getItem('idU');

if (!token) {
    alert("No hay token almacenado");
    window.location.href = ""; // Redirige al login
} else {
    fetch(apiUrl + "/api/usuarios/por-id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, idU }) // Enviamos el token y el id del usuario,
    })
    .then(response => response.json())
    .then(data => {
        if (data.usuario!== undefined) {
           
         document.getElementById("usuario").textContent = data.usuario.nombre + data.usuario.apellido_paterno + data.usuario.apellido_materno; // Mostrar el nombre completo del usuario
         document.getElementById("rol-usuario").textContent = data.usuario.tipo_usuario; // Mostrar el tipo de usuario
        } else {
            // Mostrar el nombre del usuario en el elemento con id "obtenerUsuarioPorId"
            alert("Error: " + (data.mensaje || "No se pudo obtener la información del usuario"));
        }
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error inesperado. Intenta más tarde.");
    });
}
