// Global state
let activeSection = 'inicio';
let sidebarOpen = true;
let showNotifications = false;

// DOM elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const notificationsBtn = document.getElementById('notificationsBtn');
const notificationsDropdown = document.getElementById('notificationsDropdown');
const closeNotifications = document.getElementById('closeNotifications');
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const cancelLogout = document.getElementById('cancelLogout');
const confirmLogout = document.getElementById('confirmLogout');
const mainContent = document.getElementById('mainContent');
const navBtns = document.querySelectorAll('.nav-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is coming from login
    const urlParams = new URLSearchParams(window.location.search);
    const fromLogin = urlParams.get('from') === 'login';
    
    if (fromLogin) {
        // Show welcome message
        showWelcomeMessage();
    }
    
    // Load initial content
    loadContent(activeSection);
    
    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Sidebar toggle
    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebarBtn.addEventListener('click', () => setSidebarOpen(false));
    
    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            setActiveSection(section);
        });
    });
    
    // Notifications
    notificationsBtn.addEventListener('click', toggleNotifications);
    closeNotifications.addEventListener('click', () => setNotificationsOpen(false));
    
    // Logout
    logoutBtn.addEventListener('click', () => setLogoutModalOpen(true));
    cancelLogout.addEventListener('click', () => setLogoutModalOpen(false));
    confirmLogout.addEventListener('click', handleLogout);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationsBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
            setNotificationsOpen(false);
        }
        
        if (!logoutModal.contains(e.target) && e.target === logoutModal) {
            setLogoutModalOpen(false);
        }
    });
}

function showWelcomeMessage() {
    // Create and show a welcome toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all';
    toast.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            ¡Bienvenido al sistema de estadías!
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
}

function setSidebarOpen(open) {
    sidebarOpen = open;
    if (open) {
        sidebar.classList.remove('sidebar-closed');
        sidebar.classList.add('sidebar-open');
    } else {
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-closed');
    }
}

function toggleNotifications() {
    setNotificationsOpen(!showNotifications);
}

function setNotificationsOpen(open) {
    showNotifications = open;
    if (open) {
        notificationsDropdown.classList.remove('hidden');
    } else {
        notificationsDropdown.classList.add('hidden');
    }
}

function setLogoutModalOpen(open) {
    if (open) {
        logoutModal.classList.remove('hidden');
    } else {
        logoutModal.classList.add('hidden');
    }
}

function setActiveSection(section) {
    activeSection = section;
    
    // Update navigation buttons
    navBtns.forEach(btn => {
        if (btn.dataset.section === section) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Load content for the section
    loadContent(section);
}

function loadContent(section) {
    let content = '';
    
    switch (section) {
        case 'documentos':
            content = getDocumentosContent();
            break;
        case 'mi-estadia':
            content = getMiEstadiaContent();
            break;
        case 'cronograma':
            content = getCronogramaContent();
            break;
        case 'seguimiento':
            content = getSeguimientoContent();
            break;
        default:
            content = getInicioContent();
    }
    
    mainContent.innerHTML = content;
    
    // Set up event listeners for the new content
    setupContentEventListeners(section);
}

function getInicioContent() {
    return `
        <div class="max-w-4xl">
            <!-- Page Header -->
            <div class="flex items-center mb-6">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h1 class="text-xl font-medium text-gray-800">Resumen de Estadía</h1>
            </div>

            <!-- Status Card -->
            <div class="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span class="text-green-800 font-medium">Estado actual:</span>
                    <span class="text-green-700 ml-2">Solicitud en revisión</span>
                </div>
            </div>

            <!-- Progress Section -->
            <div class="mb-8">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-gray-700 font-medium">Progreso general</h2>
                    <span class="text-sm text-gray-600">40% - Faltan 3 pasos</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>

            <!-- Steps List -->
            <div class="space-y-4">
                <!-- Solicitud -->
                <div class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="status-dot completed">
                        <div class="status-dot-inner"></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">Solicitud</h3>
                        <p class="text-sm text-gray-500">Completado: 01/07/2023</p>
                    </div>
                </div>

                <!-- Carta de presentación -->
                <div class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="status-dot completed">
                        <div class="status-dot-inner"></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">Carta de presentación</h3>
                        <p class="text-sm text-gray-500">Subido el: 04/07/2023</p>
                    </div>
                </div>

                <!-- Firma del director -->
                <div class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="status-dot pending">
                        <div class="status-dot-inner"></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">Firma del director</h3>
                        <p class="text-sm text-gray-500">Pendiente</p>
                    </div>
                </div>

                <!-- Carta de aceptación -->
                <div class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="status-dot pending">
                        <div class="status-dot-inner"></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">Carta de aceptación</h3>
                        <p class="text-sm text-gray-500">Por subir</p>
                    </div>
                </div>

                <!-- Registro final -->
                <div class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="status-dot rejected">
                        <div class="status-dot-inner"></div>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-gray-800">Registro final</h3>
                        <p class="text-sm text-gray-500">Rechazado. Faltan documentos</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getDocumentosContent() {
    return `
        <div class="max-w-4xl">
            <!-- Page Header -->
            <div class="flex items-center mb-6">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5L12 5H5a2 2 0 00-2 2z"></path>
                </svg>
                <h1 class="text-xl font-medium text-gray-800">Documentos importantes</h1>
            </div>

            <!-- Documents List -->
            <div class="space-y-4">
                <!-- Carta de Presentación -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-start space-x-3">
                            <svg class="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <div class="flex-1">
                                <h3 class="font-medium text-gray-800 mb-1">Carta de Presentación</h3>
                                <p class="text-sm text-yellow-600 mb-1">Descargado (presentar-firma)</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button class="doc-action-btn download" onclick="downloadDocument('carta-presentacion')">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Descargar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Carta de Aceptación -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-start space-x-3">
                            <svg class="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <div class="flex-1">
                                <h3 class="font-medium text-gray-800 mb-1">Carta de Aceptación</h3>
                                <p class="text-sm text-gray-500 mb-1">No subido</p>
                                <p class="text-xs text-gray-500">Formato requerido: PDF (Tamaño máximo: 5MB)</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button class="doc-action-btn upload" onclick="uploadDocument('carta-aceptacion')">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                Subir documento
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Formato de Evaluación -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-start space-x-3">
                            <svg class="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <div class="flex-1">
                                <h3 class="font-medium text-gray-800 mb-1">Formato de Evaluación</h3>
                                <p class="text-sm text-green-600 mb-1">Aprobado</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button class="doc-action-btn view" onclick="viewDocument('formato-evaluacion')">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                Ver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getMiEstadiaContent() {
    return `
        <div class="max-w-4xl">
            <div class="flex items-center mb-6">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <h1 class="text-xl font-medium text-gray-800">Mi Estadía</h1>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-medium text-gray-800 mb-4">Información de la Estadía</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-600">Empresa:</label>
                        <p class="text-gray-800">TechSolutions México S.A. de C.V.</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-600">Período:</label>
                        <p class="text-gray-800">Enero - Abril 2023</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-600">Proyecto:</label>
                        <p class="text-gray-800">Sistema de Gestión de Inventarios</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-600">Asesor Empresarial:</label>
                        <p class="text-gray-800">Ing. María González</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCronogramaContent() {
    return `
        <div class="max-w-4xl">
            <div class="flex items-center mb-6">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <h1 class="text-xl font-medium text-gray-800">Cronograma</h1>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-medium text-gray-800 mb-4">Actividades Programadas</h2>
                <div class="space-y-4">
                    <div class="border-l-4 border-green-500 pl-4">
                        <h3 class="font-medium text-gray-800">Semana 1-2: Inducción</h3>
                        <p class="text-sm text-gray-600">Conocimiento de la empresa y capacitación inicial</p>
                    </div>
                    <div class="border-l-4 border-yellow-500 pl-4">
                        <h3 class="font-medium text-gray-800">Semana 3-8: Desarrollo</h3>
                        <p class="text-sm text-gray-600">Implementación del proyecto asignado</p>
                    </div>
                    <div class="border-l-4 border-blue-500 pl-4">
                        <h3 class="font-medium text-gray-800">Semana 9-12: Finalización</h3>
                        <p class="text-sm text-gray-600">Pruebas, documentación y entrega</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSeguimientoContent() {
    return `
        <div class="max-w-4xl">
            <div class="flex items-center mb-6">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <h1 class="text-xl font-medium text-gray-800">Seguimiento</h1>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-medium text-gray-800 mb-4">Reportes de Avance</h2>
                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 border border-gray-200 rounded">
                        <div>
                            <h3 class="font-medium text-gray-800">Reporte Semanal #1</h3>
                            <p class="text-sm text-gray-600">Fecha: 15/01/2023</p>
                        </div>
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Aprobado</span>
                    </div>
                    <div class="flex items-center justify-between p-4 border border-gray-200 rounded">
                        <div>
                            <h3 class="font-medium text-gray-800">Reporte Semanal #2</h3>
                            <p class="text-sm text-gray-600">Fecha: 22/01/2023</p>
                        </div>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pendiente</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupContentEventListeners(section) {
    // Add any section-specific event listeners here
    if (section === 'documentos') {
        // Document action listeners are handled by onclick attributes
    }
}

function downloadDocument(docType) {
    alert(`Descargando documento: ${docType}`);
    // Here you would implement the actual download logic
}

function uploadDocument(docType) {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            alert(`Subiendo documento: ${file.name}`);
            // Here you would implement the actual upload logic
        }
    };
    input.click();
}

function viewDocument(docType) {
    alert(`Visualizando documento: ${docType}`);
    // Here you would implement the document viewer
}

function handleLogout() {
    setLogoutModalOpen(false);
    
    // Show logout message
    alert('Sesión cerrada exitosamente');
    
    // Redirect to login page
    window.location.href = 'login-uth.html';
}