const apiUrl = "http://127.0.0.1:8000"; // URL base de la API
const token = localStorage.getItem('token');
    if(!token){
        alert("Nohay token almacenado ");
        window.location.href ="";
    } else {
        fetch(apiUrl + "/api/estadia/contarEstadias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.total_estadias !== undefined) {
                document.getElementById("total-estadias").textContent = data.total_estadias;
            } else {
                alert("Error: " + (data.mensaje || "Error al obtener las estadías"));
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Ocurrió un error inesperado. Intenta más tarde.");
        });
    }
