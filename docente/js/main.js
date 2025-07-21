// Student data
const studentsData = [
    {
        id: 1,
        name: "Carlos Martínez Gómez",
        studentId: "3522110450",
        semester: "9° Cuatrimestre",
        program: "Ing. Desarrollo y Gestión de Software",
        group: "Grupo B",
        period: "Ene - Abr 2023",
        status: "En revisión",
        statusClass: "status-revision",
        progress: 40,
        progressClass: "progress-40",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    {
        id: 2,
        name: "Ana González Ruiz",
        studentId: "3522114875",
        semester: "9° Cuatrimestre",
        program: "Ing. Desarrollo y Gestión de Software",
        group: "Grupo A",
        period: "Ene - Abr 2023",
        status: "Aceptada",
        statusClass: "status-accepted",
        progress: 75,
        progressClass: "progress-75",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    },
    {
        id: 3,
        name: "Luis Pérez Mora",
        studentId: "3522110653",
        semester: "9° Cuatrimestre",
        program: "Ing. Desarrollo y Gestión de Software",
        group: "Grupo C",
        period: "Ene - Abr 2023",
        status: "Documentos faltantes",
        statusClass: "status-missing",
        progress: 20,
        progressClass: "progress-20",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
    }
];

// Current selected student
let currentStudent = null;

// DOM elements
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const studentsTableBody = document.getElementById('studentsTableBody');
const studentCount = document.getElementById('studentCount');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderStudentsTable();
    updateStudentCount();
    setupEventListeners();
});

// Render students table
function renderStudentsTable() {
    studentsTableBody.innerHTML = '';
    
    studentsData.forEach(student => {
        const row = createStudentRow(student);
        studentsTableBody.appendChild(row);
    });
}

// Create individual student row
function createStudentRow(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-id">${student.studentId}</div>
            </div>
        </td>
        <td>
            <span class="status-badge ${student.statusClass}">${student.status}</span>
        </td>
        <td>
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill ${student.progressClass}" style="width: ${student.progress}%"></div>
                </div>
                <div class="progress-text">${student.progress}% completado</div>
            </div>
        </td>
        <td>
            <div class="actions-container">
                <button class="btn btn-info" onclick="viewDocuments(${student.id})">📄 Documentos</button>
                <button class="btn btn-success" onclick="viewSchedule(${student.id})">📅 Cronograma</button>
            </div>
        </td>
    `;
    return row;
}

// Update student count
function updateStudentCount() {
    const count = studentsData.length;
    studentCount.textContent = `${count} estudiante${count !== 1 ? 's' : ''}`;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const screen = this.getAttribute('data-screen');
            if (screen) {
                showScreen(screen);
                setActiveNavItem(this);
            }
        });
    });
    
    // Logout button
    logoutBtn.addEventListener('click', function() {
        showNotification('Cerrando sesión...', 'info');
        setTimeout(() => {
            showNotification('Sesión cerrada exitosamente', 'success');
        }, 1000);
    });
    
    // Resize handler
    window.addEventListener('resize', handleResize);
}

// Show specific screen
function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-screen') === screenName) {
            item.classList.add('active');
        }
    });
    
    // Close mobile sidebar
    closeSidebar();
}

// View documents for a student
function viewDocuments(studentId) {
    currentStudent = studentsData.find(s => s.id === studentId);
    if (currentStudent) {
        populateDocumentsScreen();
        showScreen('documents');
    }
}

// View schedule for a student
function viewSchedule(studentId) {
    currentStudent = studentsData.find(s => s.id === studentId);
    if (currentStudent) {
        populateScheduleScreen();
        showScreen('schedule');
    }
}

// Populate documents screen with student data
function populateDocumentsScreen() {
    if (!currentStudent) return;
    
    const studentHeader = document.getElementById('documentsStudentHeader');
    studentHeader.innerHTML = `
        <div class="student-avatar">
            <img src="${currentStudent.avatar}" alt="${currentStudent.name}">
        </div>
        <div class="student-details">
            <h2>${currentStudent.name}</h2>
            <p>${currentStudent.semester}</p>
            <p>Semestre: ${currentStudent.period}</p>
            <p>${currentStudent.program}</p>
            <p>${currentStudent.group}</p>
        </div>
    `;
    
    // Update progress
    const progressFill = document.getElementById('documentsProgress');
    const progressText = document.getElementById('documentsProgressText');
    
    progressFill.style.width = currentStudent.progress + '%';
    progressText.textContent = `${currentStudent.progress}% - Faltan ${Math.ceil((100 - currentStudent.progress) / 20)} pasos`;
}

// Populate schedule screen with student data
function populateScheduleScreen() {
    if (!currentStudent) return;
    
    const studentHeader = document.getElementById('scheduleStudentHeader');
    studentHeader.innerHTML = `
        <div class="student-avatar">
            <img src="${currentStudent.avatar}" alt="${currentStudent.name}">
        </div>
        <div class="student-details">
            <h2>${currentStudent.name}</h2>
            <p>${currentStudent.semester}</p>
            <p>Semestre: ${currentStudent.period}</p>
            <p>${currentStudent.program}</p>
            <p>${currentStudent.group}</p>
        </div>
    `;
}

// Toggle sidebar for mobile
function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

// Close sidebar
function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
}

// Set active navigation item
function setActiveNavItem(clickedItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    clickedItem.classList.add('active');
}

// Show notification (enhanced implementation)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: ${type === 'warning' ? '#212529' : 'white'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        border-left: 4px solid ${getNotificationBorderColor(type)};
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Get notification colors
function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'warning': return '#ffc107';
        case 'error': return '#dc3545';
        case 'info':
        default: return '#17a2b8';
    }
}

function getNotificationBorderColor(type) {
    switch(type) {
        case 'success': return '#1e7e34';
        case 'warning': return '#e0a800';
        case 'error': return '#c82333';
        case 'info':
        default: return '#117a8b';
    }
}

// Simulate real-time updates
function simulateUpdates() {
    setInterval(() => {
        // Simulate progress updates
        const randomStudent = studentsData[Math.floor(Math.random() * studentsData.length)];
        if (randomStudent.progress < 100 && Math.random() > 0.7) {
            randomStudent.progress = Math.min(100, randomStudent.progress + Math.floor(Math.random() * 10));
            
            // Update progress class
            if (randomStudent.progress >= 75) {
                randomStudent.progressClass = 'progress-75';
            } else if (randomStudent.progress >= 40) {
                randomStudent.progressClass = 'progress-40';
            }
            
            renderStudentsTable();
            
            // Update documents screen if viewing this student
            if (currentStudent && currentStudent.id === randomStudent.id) {
                populateDocumentsScreen();
            }
            
            showNotification(`Progreso actualizado para ${randomStudent.name}: ${randomStudent.progress}%`, 'info');
        }
    }, 15000); // Update every 15 seconds
}

// Start simulations
simulateUpdates();

// Add some interactive features
document.addEventListener('keydown', function(e) {
    // ESC key to go back to home
    if (e.key === 'Escape') {
        showScreen('home');
    }
    
    // Ctrl/Cmd + 1-4 for quick navigation
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault();
        const screens = ['home', 'my-internship', 'schedule', 'documents'];
        const screenIndex = parseInt(e.key) - 1;
        if (screens[screenIndex]) {
            showScreen(screens[screenIndex]);
        }
    }
});

// Add loading states for better UX
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<div style="display: flex; align-items: center; gap: 0.5rem;"><div style="width: 16px; height: 16px; border: 2px solid #ccc; border-top: 2px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite;"></div>Cargando...</div>';
    
    // Add spin animation
    if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }
    
    return originalContent;
}

function hideLoading(element, originalContent) {
    setTimeout(() => {
        element.innerHTML = originalContent;
    }, 800);
}