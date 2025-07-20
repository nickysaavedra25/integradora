import React, { useState } from 'react';
import { Menu, FileText, Home, User, Calendar, FolderOpen, TrendingUp, ChevronDown, Bell, Settings, Download, Upload, Eye, X, LogOut } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Documento aprobado',
      message: 'Tu carta de presentación ha sido aprobada',
      time: '2 horas',
      type: 'success'
    },
    {
      id: 2,
      title: 'Firma pendiente',
      message: 'Se requiere la firma del director para continuar',
      time: '1 día',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Nuevo mensaje',
      message: 'Tienes un mensaje del coordinador de estadías',
      time: '3 días',
      type: 'info'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Carta de Presentación',
      status: 'Descargado (presentar-firma)',
      statusColor: 'text-yellow-600',
      hasDownload: true,
      hasUpload: false,
      hasView: false
    },
    {
      id: 2,
      name: 'Carta de Aceptación',
      status: 'No subido',
      statusColor: 'text-gray-500',
      description: 'Formato requerido: PDF (Tamaño máximo: 5MB)',
      hasDownload: false,
      hasUpload: true,
      hasView: false
    },
    {
      id: 3,
      name: 'Formato de Evaluación',
      status: 'Aprobado',
      statusColor: 'text-green-600',
      hasDownload: false,
      hasUpload: false,
      hasView: true
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'documentos':
        return (
          <div className="flex-1 p-8 bg-gray-50">
            <div className="max-w-4xl">
              {/* Page Header */}
              <div className="flex items-center mb-6">
                <FolderOpen className="w-5 h-5 text-gray-600 mr-2" />
                <h1 className="text-xl font-medium text-gray-800">Documentos importantes</h1>
              </div>

              {/* Documents List */}
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-gray-600 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-1">{doc.name}</h3>
                          <p className={`text-sm ${doc.statusColor} mb-1`}>{doc.status}</p>
                          {doc.description && (
                            <p className="text-xs text-gray-500">{doc.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {doc.hasDownload && (
                          <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
                            <Download className="w-4 h-4 mr-1" />
                            Descargar
                          </button>
                        )}
                        {doc.hasUpload && (
                          <button className="flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                            <Upload className="w-4 h-4 mr-1" />
                            Subir documento
                          </button>
                        )}
                        {doc.hasView && (
                          <button className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex-1 p-8 bg-gray-50">
            <div className="max-w-4xl">
              {/* Page Header */}
              <div className="flex items-center mb-6">
                <FileText className="w-5 h-5 text-gray-600 mr-2" />
                <h1 className="text-xl font-medium text-gray-800">Resumen de Estadía</h1>
              </div>

              {/* Status Card */}
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-800 font-medium">Estado actual:</span>
                  <span className="text-green-700 ml-2">Solicitud en revisión</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-gray-700 font-medium">Progreso general</h2>
                  <span className="text-sm text-gray-600">40% - Faltan 3 pasos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-4">
                {/* Solicitud */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">Solicitud</h3>
                    <p className="text-sm text-gray-500">Completado: 01/07/2023</p>
                  </div>
                </div>

                {/* Carta de presentación */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">Carta de presentación</h3>
                    <p className="text-sm text-gray-500">Subido el: 04/07/2023</p>
                  </div>
                </div>

                {/* Firma del director */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">Firma del director</h3>
                    <p className="text-sm text-gray-500">Pendiente</p>
                  </div>
                </div>

                {/* Carta de aceptación */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">Carta de aceptación</h3>
                    <p className="text-sm text-gray-500">Por subir</p>
                  </div>
                </div>

                {/* Registro final */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <div className="w-2 h-2 bg-white"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">Registro final</h3>
                    <p className="text-sm text-gray-500">Rechazado. Faltan documentos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col`}>
        {/* Header with close button */}
        <div className="p-4 border-b border-green-700">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-white hover:text-green-200 hover:bg-green-700 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 text-center border-b border-green-700">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
              alt="Carlos Martinez Gomez" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-sm">Carlos Martínez Gómez</h3>
          <p className="text-xs text-green-200 mb-2">9° Cuatrimestre</p>
          <p className="text-xs text-green-200">Semestre: Ene - Abr 2023</p>
          <p className="text-xs text-green-200">Ing. Desarrollo y Gestión de Software</p>
          <p className="text-xs text-green-200">Grupo: B</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveSection('inicio')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeSection === 'inicio' 
                    ? 'text-white bg-green-700 border-r-2 border-green-400' 
                    : 'text-green-200 hover:text-white hover:bg-green-700'
                }`}
              >
                <Home className="w-4 h-4 mr-3" />
                <span className="text-sm">Inicio</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('mi-estadia')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeSection === 'mi-estadia' 
                    ? 'text-white bg-green-700 border-r-2 border-green-400' 
                    : 'text-green-200 hover:text-white hover:bg-green-700'
                }`}
              >
                <User className="w-4 h-4 mr-3" />
                <span className="text-sm">Mi Estadía</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('cronograma')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeSection === 'cronograma' 
                    ? 'text-white bg-green-700 border-r-2 border-green-400' 
                    : 'text-green-200 hover:text-white hover:bg-green-700'
                }`}
              >
                <Calendar className="w-4 h-4 mr-3" />
                <span className="text-sm">Cronograma</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('documentos')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeSection === 'documentos' 
                    ? 'text-white bg-green-700 border-r-2 border-green-400' 
                    : 'text-green-200 hover:text-white hover:bg-green-700'
                }`}
              >
                <FolderOpen className="w-4 h-4 mr-3" />
                <span className="text-sm">Documentos</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('seguimiento')}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeSection === 'seguimiento' 
                    ? 'text-white bg-green-700 border-r-2 border-green-400' 
                    : 'text-green-200 hover:text-white hover:bg-green-700'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-3" />
                <span className="text-sm">Seguimiento</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left side - Menu Toggle and UTN Logo */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <img 
                src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=120&h=60&fit=crop" 
                alt="UTN Logo" 
                className="h-8 w-auto"
              />
            </div>

            {/* Right side buttons */}
            <div className="flex space-x-3">
              {/* Notifications Button */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="flex items-center px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  <ChevronDown className="w-4 h-4" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">Notificaciones</h3>
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">Hace {notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {renderContent()}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <LogOut className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-medium text-gray-800">Cerrar Sesión</h3>
            </div>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder al sistema.
            </p>
            <div className="flex space-x-3 justify-end">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setShowLogoutModal(false);
                  alert('Sesión cerrada exitosamente');
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;