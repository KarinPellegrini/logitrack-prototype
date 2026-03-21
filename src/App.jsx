import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';

// IMPORTACIONES DE TUS COMPONENTES
import Acceso from './componentes/Acceso';
import BarraNavegacion from './componentes/BarraNavegacion';
import ListaEnvios from './componentes/ListaEnvios';
import DetalleEnvio from './componentes/DetalleEnvio';
import FormularioEnvio from './componentes/FormularioEnvio';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('listado'); 
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [notificacion, setNotificacion] = useState(null);

  const [envios, setEnvios] = useState([
    { 
      id: '1', 
      trackingId: 'TRK-982341', 
      destinatario: 'María García', 
      destino: 'CÓRDOBA (5000)', 
      estado: 'Registrado', 
      prioridad: 'Media',
      cargaPeso: '2.5',
      cargaTipo: 'Estándar'
    }
  ]);

  const enviosFiltrados = useMemo(() => {
    return envios.filter(e => 
      e.trackingId.toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
      e.destinatario.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
  }, [envios, terminoBusqueda]);

  const mostrarNotificacion = (msj) => {
    setNotificacion(msj);
    setTimeout(() => setNotificacion(null), 3000);
  };

  const cerrarTodo = () => {
    setEnvioSeleccionado(null);
    setVista('listado');
  };

  if (!usuario) {
    return (
      <Acceso alIngresar={(rol) => {
        setUsuario({ nombre: rol === 'Operador' ? 'Melina Scabini' : 'Ciro López', rol });
        mostrarNotificacion(`Bienvenido: Acceso como ${rol}`);
      }} />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <BarraNavegacion 
        usuario={usuario} 
        alCerrarSesion={() => setUsuario(null)} 
        alIrInicio={cerrarTodo} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {vista === 'listado' && !envioSeleccionado && (
          <ListaEnvios 
            envios={enviosFiltrados} 
            rol={usuario.rol} 
            terminoBusqueda={terminoBusqueda} 
            alCambiarBusqueda={setTerminoBusqueda} 
            alSeleccionar={(e) => { setEnvioSeleccionado(e); setVista('detalle'); }} 
            alIrNuevo={() => setVista('alta')} 
          />
        )}

        {vista === 'alta' && (
          <FormularioEnvio 
            alVolver={cerrarTodo} 
            alGuardar={(nuevo) => {
              // Lógica de IA sincronizada con los campos del Formulario
              const esPesado = parseFloat(nuevo.cargaPeso) > 10;
              const esEspecial = ['Peligrosa', 'Médica', 'Frágil'].includes(nuevo.cargaTipo);
              
              const envioFinal = {
                ...nuevo,
                prioridad: (esPesado || esEspecial) ? 'Alta' : 'Media'
              };

              setEnvios([envioFinal, ...envios]);
              cerrarTodo();
              mostrarNotificacion(`¡Envío Registrado! Prioridad: ${envioFinal.prioridad}`);
            }} 
          />
        )}

        {vista === 'detalle' && envioSeleccionado && (
          <DetalleEnvio 
            envio={envioSeleccionado} 
            alVolver={cerrarTodo} 
          />
        )}

      </main>

      {notificacion && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
          <AlertCircle className="text-blue-400" />
          <p className="text-sm font-bold">{notificacion}</p>
        </div>
      )}
    </div>
  );
}