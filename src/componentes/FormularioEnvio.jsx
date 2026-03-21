import React, { useState } from 'react';
import { ArrowLeft, Save, User, MapPin, ShieldCheck, XCircle, Package } from 'lucide-react';

const FormularioEnvio = ({ alGuardar, alVolver }) => {
  // --- ESTADOS INTERNOS DEL FORMULARIO ---
  const [datosRemitente, setDatosRemitente] = useState({
    nombreCompleto: '',
    dni: '',
    ciudadOrCP: ''
  });

  const [datosDestinatario, setDatosDestinatario] = useState({
    nombreCompleto: '',
    dni: '',
    ciudadDestino: '',
    cpDestino: ''
  });

  const [datosCarga, setDatosCarga] = useState({
    tipoCarga: 'Seleccionar...',
    peso: ''
  });

  const [terminosAceptados, setTerminosAceptados] = useState(false);

  // --- MANEJADORES DE CAMBIO ---
  const manejarCambioRemitente = (e) => setDatosRemitente({...datosRemitente, [e.target.name]: e.target.value});
  const manejarCambioDestinatario = (e) => setDatosDestinatario({...datosDestinatario, [e.target.name]: e.target.value});
  const manejarCambioCarga = (e) => setDatosCarga({...datosCarga, [e.target.name]: e.target.value});

  // --- FUNCIÓN PRINCIPAL DE ENVÍO ---
  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // 1. Validación de Checkbox de Privacidad
    if (!terminosAceptados) {
      alert("Por favor, acepta la declaración de datos personales conforme a la Ley 25.326.");
      return;
    }

    // 2. Validación de Campos Obligatorios (Evita errores si el dato es numérico)
    const todosLosCampos = [
      ...Object.values(datosRemitente),
      ...Object.values(datosDestinatario),
      ...Object.values(datosCarga)
    ];

    const hayCamposVacios = todosLosCampos.some(valor => 
      String(valor).trim() === '' || valor === 'Seleccionar...'
    );

    if (hayCamposVacios) {
        alert("Por favor, completa todos los campos obligatorios (*).");
        return;
    }

    // 3. Estructura del objeto para App.jsx
    const nuevoEnvio = {
      id: Date.now().toString(),
      trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      estado: 'Registrado',
      fechaCreacion: new Date().toISOString(),
      // Mapeo de datos para la tabla de App.jsx
      destinatario: datosDestinatario.nombreCompleto,
      destino: `${datosDestinatario.ciudadDestino} (${datosDestinatario.cpDestino})`,
      cargaTipo: datosCarga.tipoCarga,
      cargaPeso: datosCarga.peso,
      // Datos extra para el detalle
      remitenteNombre: datosRemitente.nombreCompleto,
      remitenteDNI: datosRemitente.dni,
      destinatarioDNI: datosDestinatario.dni
    };

    // 4. Enviar a App.jsx
    alGuardar(nuevoEnvio);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <button 
        onClick={alVolver} 
        className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Nuevo envío</h2>

        <form onSubmit={manejarEnvio} className="space-y-6">
          {/* SECCIÓN: REMITENTE */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">REMITENTE</label>
            <div className="grid grid-cols-2 gap-4">
              <input name="nombreCompleto" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre y apellido *" value={datosRemitente.nombreCompleto} onChange={manejarCambioRemitente} />
              <input name="dni" required type="number" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="DNI *" value={datosRemitente.dni} onChange={manejarCambioRemitente} />
            </div>
            <input name="ciudadOrCP" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ciudad / CP origen *" value={datosRemitente.ciudadOrCP} onChange={manejarCambioRemitente} />
          </div>

          {/* SECCIÓN: DESTINATARIO */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">DESTINATARIO</label>
            <div className="grid grid-cols-2 gap-4">
              <input name="nombreCompleto" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre y apellido *" value={datosDestinatario.nombreCompleto} onChange={manejarCambioDestinatario} />
              <input name="dni" required type="number" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="DNI *" value={datosDestinatario.dni} onChange={manejarCambioDestinatario} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="ciudadDestino" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ciudad destino *" value={datosDestinatario.ciudadDestino} onChange={manejarCambioDestinatario} />
              <input name="cpDestino" required type="number" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="CP destino *" value={datosDestinatario.cpDestino} onChange={manejarCambioDestinatario} />
            </div>
          </div>

          {/* SECCIÓN: CARGA */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">CARGA</label>
            <div className="grid grid-cols-2 gap-4">
              <select name="tipoCarga" required className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={datosCarga.tipoCarga} onChange={manejarCambioCarga}>
                <option disabled>Seleccionar...</option>
                {['Estándar', 'Frágil', 'Médica', 'Peligrosa'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <input name="peso" required type="number" step="0.1" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Peso (kg) *" value={datosCarga.peso} onChange={manejarCambioCarga} />
            </div>
          </div>

          {/* CHECKBOX LEY 25.326 */}
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-start gap-3 border border-blue-100">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500" checked={terminosAceptados} onChange={() => setTerminosAceptados(!terminosAceptados)} />
              <div className="text-[11px] text-gray-600 leading-tight">
                <p className="font-bold text-blue-800 mb-1 flex items-center gap-1"><ShieldCheck size={12}/> Protección de Datos Personales</p>
                Declaro que los datos personales fueron informados conforme a la Ley 25.326 y que ambos prestaron consentimiento para su tratamiento con la finalidad exclusiva de gestión del envío.
              </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-4 pt-4 border-t border-gray-50">
              <button type="button" onClick={alVolver} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors">Cancelar</button>
              <button type="submit" className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all">
                <Save size={18}/> Registrar envío
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio; // <--- Exportación agregada