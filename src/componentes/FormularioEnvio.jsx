import React, { useState } from 'react';
import { ArrowLeft, Save, Package, User, Hash, MapPin, Scale, ShieldCheck, XCircle } from 'lucide-react';

const FormularioEnvio = ({ alGuardar, alVolver }) => {
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

  const manejarCambioRemitente = (e) => {
    setDatosRemitente({
      ...datosRemitente,
      [e.target.name]: e.target.value
    });
  };

  const manejarCambioDestinatario = (e) => {
    setDatosDestinatario({
      ...datosDestinatario,
      [e.target.name]: e.target.value
    });
  };

  const manejarCambioCarga = (e) => {
    setDatosCarga({
      ...datosCarga,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Check if terms are accepted
    if (!terminosAceptados) {
      alert("Por favor, acepta la declaración de datos personales.");
      return;
    }

    // Check for required fields (simple check for empty values in data objects)
    const formsToValidate = [datosRemitente, datosDestinatario, datosCarga];
    const camposVacios = formsToValidate.some(form => Object.values(form).some(valor => valor.trim() === '' || valor === 'Seleccionar...'));
    if (camposVacios) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // IA Simulada: Rule logic based on cargo type and weight
    const isSpecialCargo = ['Peligrosa', 'Médica'].includes(datosCarga.tipoCarga);
    const isFragileOrHeavy = datosCarga.tipoCarga === 'Frágil' || parseFloat(datosCarga.peso) > 10;
    const prioridad = (isSpecialCargo || isFragileOrHeavy) ? 'Alta' : 'Media';

    // Structure the new shipping according to target criteria and my code compatibility
    const nuevoEnvio = {
      id: Date.now().toString(),
      trackingId: `TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      estado: 'Registrado',
      prioridad: prioridad,
      fechaCreacion: new Date().toISOString(),
      // Specific fields from the new form
      remitenteDNI: datosRemitente.dni,
      remitenteNombreCompleto: datosRemitente.nombreCompleto,
      remitenteCiudadOrCP: datosRemitente.ciudadOrCP,
      destinatarioDNI: datosDestinatario.dni,
      destinatarioNombreCompleto: datosDestinatario.nombreCompleto,
      destinatarioCiudad: datosDestinatario.ciudadDestino,
      destinatarioCP: datosDestinatario.cpDestino,
      cargaTipo: datosCarga.tipoCarga,
      cargaPeso: datosCarga.peso,
      // Compatibility fields for the main list table:
      destinatario: datosDestinatario.nombreCompleto, // needed for table sorting
      destino: `${datosDestinatario.ciudadDestino} (${datosDestinatario.cpDestino})` // needed for table destination column
    };

    alGuardar(nuevoEnvio);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <button onClick={alVolver} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-gray-800 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Nuevo envío</h2>
          <p className="text-gray-400 text-sm mt-1">Complete todos los campos obligatorios (*)</p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-6">
          
          {/* SECCIÓN REMITENTE */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <User size={12}/> REMITENTE
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="nombreCompleto" required
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nombre y apellido *"
                value={datosRemitente.nombreCompleto} onChange={manejarCambioRemitente}
              />
              <input 
                name="dni" required type="number"
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="DNI *"
                value={datosRemitente.dni} onChange={manejarCambioRemitente}
              />
            </div>
            <input 
              name="ciudadOrCP" required
              className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ciudad / CP origen *"
              value={datosRemitente.ciudadOrCP} onChange={manejarCambioRemitente}
            />
          </div>

          {/* SECCIÓN DESTINATARIO */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <User size={12}/> DESTINATARIO
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="nombreCompleto" required
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nombre y apellido *"
                value={datosDestinatario.nombreCompleto} onChange={manejarCambioDestinatario}
              />
              <input 
                name="dni" required type="number"
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="DNI *"
                value={datosDestinatario.dni} onChange={manejarCambioDestinatario}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                name="ciudadDestino" required
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ciudad destino *"
                value={datosDestinatario.ciudadDestino} onChange={manejarCambioDestinatario}
              />
              <input 
                name="cpDestino" required type="number"
                className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Código postal destino *"
                value={datosDestinatario.cpDestino} onChange={manejarCambioDestinatario}
              />
            </div>
          </div>

          {/* SECCIÓN CARGA */}
          <div className="space-y-3 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
              <Package size={12}/> CARGA
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select 
                    name="tipoCarga" required
                    className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-500"
                    value={datosCarga.tipoCarga} onChange={manejarCambioCarga}
                >
                    <option disabled>Seleccionar...</option>
                    {['Estándar', 'Frágil', 'Médica', 'Peligrosa'].map(option => (
                        <option key={option} value={option} className="text-gray-800">{option}</option>
                    ))}
                </select>
                <input 
                    name="peso" required type="number" step="0.1"
                    className="w-full p-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Peso (kg) *"
                    value={datosCarga.peso} onChange={manejarCambioCarga}
                />
            </div>
          </div>

          {/* CHECKBOX DE DECLARACIÓN */}
          <div className="mt-8 p-6 bg-blue-50/50 rounded-3xl border-2 border-dashed border-blue-100 flex items-start gap-4">
              <input 
                  type="checkbox" required
                  className="mt-1 w-5 h-5 rounded-lg border-blue-200 text-blue-600 focus:ring-blue-500"
                  checked={terminosAceptados} onChange={() => setTerminosAceptados(!terminosAceptados)}
              />
              <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="font-bold flex items-center gap-2 text-blue-700">
                      <ShieldCheck size={16}/> Declaración de Datos Personales
                  </p>
                  Declaro que los datos personales del remitente y destinatario fueron informados conforme a la <span className="font-bold text-gray-900">Ley 25.326</span> (Protección de Datos Personales) y que ambos prestaron consentimiento para su tratamiento con la finalidad exclusiva de gestión del envío.
              </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-4 pt-4 mt-8 border-t border-gray-100">
              <button 
                  type="button" onClick={alVolver}
                  className="w-1/3 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                  <XCircle size={18}/> Cancelar
              </button>
              <button 
                  type="submit"
                  className="w-2/3 bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all"
              >
                  <Save size={18}/> Registrar envío
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioEnvio;