import { useState, useEffect } from "react"
import Error from "./Error";

export default function Formulario({ setPacientes, pacientes, paciente, setPaciente }) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);
    }

  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion de formulario
    if ([nombre, propietario, email, alta, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    const objPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    };

    if (paciente.id) {
      // Editando registro      
      objPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objPaciente : pacienteState);

      setPacientes(pacientesActualizados);
      setPaciente({});

    } else {
      // Nuevo registro
      objPaciente.id = generarId();
      setPacientes([...pacientes, objPaciente]);
    }


    setNombre('');
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintomas('');
  }

  return (
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-xl mt-5 text-center mb-10'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'>

        {error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className='mb-5'>
          <label htmlFor='mascota' className='block font-bold text-gray-700 uppercase'>
            Nombre Mascota
          </label>

          <input
            id='mascota'
            type="text"
            placeholder='Nombre de la mascota'
            className='border-2 p-2 mt-2 placeholder-gray-400 rounded-md w-full'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='propietario' className='block font-bold text-gray-700 uppercase'>
            Nombre Propietario
          </label>

          <input
            id='propietario'
            type="text"
            placeholder='Nombre del propietario'
            className='border-2 p-2 mt-2 placeholder-gray-400 rounded-md w-full'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='block font-bold text-gray-700 uppercase'>
            Email
          </label>

          <input
            id='email'
            type="email"
            placeholder='Email Contacto Propietario'
            className='border-2 p-2 mt-2 placeholder-gray-400 rounded-md w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='alta' className='block font-bold text-gray-700 uppercase'>
            Alta
          </label>

          <input
            id='alta'
            type="date"
            className='border-2 p-2 mt-2 placeholder-gray-400 rounded-md w-full'
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' className='block font-bold text-gray-700 uppercase'>
            Síntomas
          </label>

          <textarea
            id='sintomas'
            placeholder='Describe los síntomas'
            className='border-2 p-2 mt-2 placeholder-gray-400 rounded-md w-full'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className='bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all w-full p-3 text-white uppercase font-bold'
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
        />

      </form>

    </div>
  )
}
