
    document.addEventListener('DOMContentLoaded', function() {
        const apiUrl = "http://127.0.0.1:8000";
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No hay token almacenado");
            window.location.href = "../login-uth.html";
            return;
        }

        fetch(apiUrl + "/api/usuarios/listarEstudiantes ", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            const grid = document.querySelector('.grid');
            grid.innerHTML = ""; // Limpia el grid antes de agregar

            data.forEach(usuarios => {
                // Construye los documentos con un ciclo
                let docsHtml = "";
                for (let i = 0; i < usuarios.length; i++) {
                    const doc = usuarios.documentos[i];
                    let color = "bg-gray-100 text-gray-700";
                    if (doc.tipo === "Word") color = "bg-blue-100 text-blue-700";
                    if (doc.tipo === "PDF") color = "bg-red-100 text-red-700";
                    if (doc.tipo === "DOCX") color = "bg-purple-100 text-purple-700";

                    docsHtml += `
                    <div class="bg-gray-100 rounded-md p-3 mb-2 flex flex-col">
                        <div class="flex justify-between items-center mb-1">
                            <p class="text-sm font-medium text-gray-700">${doc.nombre}</p>
                            <span class="inline-block ${color} rounded-full px-2 py-1 text-xs font-semibold">${doc.tipo}</span>
                        </div>
                        <p class="text-xs text-gray-500">Subido: ${doc.fecha_subida || "---"}</p>
                        <p class="text-xs ${doc.estado.includes('Aceptado') ? 'text-green-600' : doc.estado.includes('Pendiente') ? 'text-yellow-600' : 'text-gray-500'}">
                            Estado: <span class="font-semibold">${doc.estado}</span>
                        </p>
                        <div class="flex space-x-2 mt-2">
                            <button class="doc-action-btn download ${doc.estado === 'No subido' ? 'opacity-50 cursor-not-allowed' : ''}" ${doc.estado === 'No subido' ? 'disabled' : ''}>
                                <i class="fas fa-eye"></i> Ver
                            </button>
                            <button class="doc-action-btn view ${doc.estado === 'No subido' ? 'opacity-50 cursor-not-allowed' : ''}" ${doc.estado === 'No subido' ? 'disabled' : ''}>
                                <i class="fas fa-download"></i> Descargar
                            </button>
                            <div class="relative inline-block file-upload-wrapper">
                                <button class="doc-action-btn upload file-upload-button">
                                    <i class="fas fa-upload"></i> Subir
                                </button>
                                <input type="file" class="file-input absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer" style="font-size: 0;" onchange="handleFileUpload(event, '${doc.nombre}', '${alumno.nombre}')">
                            </div>
                        </div>
                    </div>
                    `;
                }

                // Construye la card del alumno
                const card = document.createElement('div');
                card.className = "bg-white rounded-lg shadow-md p-6";
                card.innerHTML = `
                    <div class="rounded-t-lg bg-green-900 px-6 py-4 flex items-center justify-between">
                        <div>
                            <h3 class="text-white font-semibold text-lg leading-tight">${alumno.nombre}</h3>
                            <p class="text-green-100 text-sm">${alumno.carrera}</p>
                        </div>
                        <span class="bg-gray-800 text-white text-xs font-semibold px-4 py-1 rounded-full ml-4">
                            ${alumno.matricula}
                        </span>
                    </div>
                    <div class="mb-3">
                        <h4 class="text-sm font-semibold text-gray-700 flex items-center mb-1">
                            <i class="fas fa-user mr-2 text-gray-500"></i> Datos Personales
                        </h4>
                        <p class="text-xs text-gray-600">
                            <i class="fas fa-envelope mr-2 text-gray-500"></i> Correo: ${alumno.correo}
                        </p>
                    </div>
                    <div class="mb-4">
                        <h4 class="text-sm font-semibold text-gray-700 flex items-center mb-1">
                            <i class="fas fa-briefcase mr-2 text-gray-500"></i> Empresa
                        </h4>
                        <p class="text-xs text-gray-600">Nombre: ${alumno.empresa ? alumno.empresa.nombre : "---"}</p>
                        ${alumno.empresa && alumno.empresa.contacto ? `<p class="text-xs text-gray-600 mt-1">Contacto: ${alumno.empresa.contacto}</p>` : ""}
                    </div>
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">Documentos de Estadía</h4>
                        ${docsHtml}
                    </div>document.addEventListener('DOMContentLoaded', function() {
    // Definición de la URL de la API
    const apiUrl = "http://127.0.0.1:8000";
    
    // Obtener el token de autenticación
    const token = localStorage.getItem('token');

    // Verificar si el token existe, si no, redirigir al login
    if (!token) {
        alert("No se ha iniciado sesión. Por favor, inicie sesión.");
        window.location.href = "../login-uth.html";
        return;
    }

    /**
     * Función principal para cargar y renderizar los datos de los estudiantes.
     */
    function fetchAndRenderStudents() {
        fetch(apiUrl + "/api/usuarios/listarEstudiantes", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const grid = document.querySelector('.grid');
            // Limpia el contenido previo del grid
            grid.innerHTML = "";

            // Verifica si se recibieron estudiantes
            if (data && data.length > 0) {
                // Itera sobre cada estudiante en la respuesta
                data.forEach(estudiante => {
                    // Crea la tarjeta (card) para cada estudiante
                    const card = createStudentCard(estudiante);
                    grid.appendChild(card);
                });
            } else {
                // Si no hay estudiantes, muestra un mensaje
                grid.innerHTML = "<p class='text-center text-gray-500'>No se encontraron estudiantes.</p>";
            }
        })
        .catch(error => {
            console.error("Error al cargar la documentación:", error);
            alert("Error al cargar la documentación. Intente de nuevo más tarde.");
        });
    }

    /**
     * Crea y devuelve el elemento HTML (card) de un estudiante.
     * @param {Object} estudiante - Objeto que contiene los datos del estudiante y sus documentos.
     * @returns {HTMLElement} El elemento div que representa la tarjeta del estudiante.
     */
    function createStudentCard(estudiante) {
        // Genera el HTML para la sección de documentos del estudiante
        const docsHtml = generateDocumentsHtml(estudiante.documentos);

        // Crea el elemento principal de la tarjeta
        const card = document.createElement('div');
        card.className = "bg-white rounded-lg shadow-md p-6";

        // Establece el contenido HTML de la tarjeta
        card.innerHTML = `
            <div class="rounded-t-lg bg-green-900 px-6 py-4 flex items-center justify-between">
                <div>
                    <h3 class="text-white font-semibold text-lg leading-tight">${estudiante.nombre || 'N/A'}</h3>
                    <p class="text-green-100 text-sm">${estudiante.carrera || 'N/A'}</p>
                </div>
                <span class="bg-gray-800 text-white text-xs font-semibold px-4 py-1 rounded-full ml-4">
                    ${estudiante.matricula || 'N/A'}
                </span>
            </div>
            <div class="mb-3">
                <h4 class="text-sm font-semibold text-gray-700 flex items-center mb-1">
                    <i class="fas fa-user mr-2 text-gray-500"></i> Datos Personales
                </h4>
                <p class="text-xs text-gray-600">
                    <i class="fas fa-envelope mr-2 text-gray-500"></i> Correo: ${estudiante.correo || 'N/A'}
                </p>
            </div>
            <div class="mb-4">
                <h4 class="text-sm font-semibold text-gray-700 flex items-center mb-1">
                    <i class="fas fa-briefcase mr-2 text-gray-500"></i> Empresa
                </h4>
                <p class="text-xs text-gray-600">Nombre: ${estudiante.empresa ? estudiante.empresa.nombre : "---"}</p>
                ${estudiante.empresa && estudiante.empresa.contacto ? `<p class="text-xs text-gray-600 mt-1">Contacto: ${estudiante.empresa.contacto}</p>` : ""}
            </div>
            <div>
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Documentos de Estadía</h4>
                ${docsHtml}
            </div>
        `;
        return card;
    }

    /**
     * Genera el HTML para la lista de documentos.
     * @param {Array<Object>} documentos - Arreglo de objetos de documentos.
     * @returns {string} El HTML generado para los documentos.
     */
    function generateDocumentsHtml(documentos) {
        if (!documentos || documentos.length === 0) {
            return "<p class='text-gray-500 text-sm'>No hay documentos registrados para este estudiante.</p>";
        }

        return documentos.map(doc => {
            // Asigna colores basados en el tipo de documento
            let color = "bg-gray-100 text-gray-700";
            switch (doc.tipo) {
                case "Word": color = "bg-blue-100 text-blue-700"; break;
                case "PDF": color = "bg-red-100 text-red-700"; break;
                case "DOCX": color = "bg-purple-100 text-purple-700"; break;
            }

            // Clases y estados dinámicos
            const estadoColor = doc.estado.includes('Aceptado') ? 'text-green-600' :
                                doc.estado.includes('Pendiente') ? 'text-yellow-600' :
                                'text-gray-500';
            const isDisabled = doc.estado === 'No subido' ? 'disabled' : '';
            const opacityClass = doc.estado === 'No subido' ? 'opacity-50 cursor-not-allowed' : '';

            // Retorna el HTML para cada documento
            return `
                <div class="bg-gray-100 rounded-md p-3 mb-2 flex flex-col">
                    <div class="flex justify-between items-center mb-1">
                        <p class="text-sm font-medium text-gray-700">${doc.nombre || 'N/A'}</p>
                        <span class="inline-block ${color} rounded-full px-2 py-1 text-xs font-semibold">${doc.tipo || 'N/A'}</span>
                    </div>
                    <p class="text-xs text-gray-500">Subido: ${doc.fecha_subida || "---"}</p>
                    <p class="text-xs ${estadoColor}">
                        Estado: <span class="font-semibold">${doc.estado || 'N/A'}</span>
                    </p>
                    <div class="flex space-x-2 mt-2">
                        <button class="doc-action-btn download ${opacityClass}" ${isDisabled}>
                            <i class="fas fa-eye"></i> Ver
                        </button>
                        <button class="doc-action-btn view ${opacityClass}" ${isDisabled}>
                            <i class="fas fa-download"></i> Descargar
                        </button>
                        <div class="relative inline-block file-upload-wrapper">
                            <button class="doc-action-btn upload file-upload-button">
                                <i class="fas fa-upload"></i> Subir
                            </button>
                            <input type="file" 
                                   class="file-input absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer" 
                                   style="font-size: 0;" 
                                   data-documento-nombre="${doc.nombre}" 
                                   data-alumno-nombre="${estudiante.nombre}" 
                                   onchange="handleFileUpload(event, this.dataset.documentoNombre, this.dataset.alumnoNombre)">
                        </div>
                    </div>
                </div>
            `;
        }).join(''); // Usa join('') para combinar todos los HTML en una sola cadena
    }

    // Llama a la función para iniciar el proceso
    fetchAndRenderStudents();

    // Se asume que la función handleFileUpload está definida globalmente en otro script
    // window.handleFileUpload = (event, docName, studentName) => { ... }
});
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => {
            alert("Error al cargar la documentación");
            console.error(error);
        });
    });