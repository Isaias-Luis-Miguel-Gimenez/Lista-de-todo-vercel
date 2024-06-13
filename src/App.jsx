import { useState, useEffect } from 'react';
import './App.css';
import { Form } from './components/Form';
import { Tar } from './components/Tar';

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
      
        const tareasFormateadas = data.map(tarea => ({
          id: tarea.id,
          tarea: tarea.title,
          completada: tarea.completed
        }));
      
        setTareas(tareasFormateadas);
      })
      .catch(error => console.error('Error al obtener las tareas:', error));
  }, []);
  

  const handleChange = e => {
    setTarea(e.target.value);
  };

  const addTar = e => {
    e.preventDefault();
    if (tarea.trim() === "") {
      alert("Agregue alguna tarea");
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      tarea: tarea,
      completada: false
    };

    const totalTareas = [nuevaTarea, ...tareas];
    setTareas(totalTareas);
    setTarea("");
  };

  const borrarTarea = id => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasActualizadas);
  };

  return (
    <>
      <h2>Lista de Tareas</h2>
      <Form
        handleChange={handleChange}
        addTar={addTar}
        tarea={tarea}
      />

      {tareas.length > 1 && (
        <button onClick={() => setTareas([])}>Vaciar</button>
      )}

      {tareas.map(tarea => (
        <Tar
          key={tarea.id}
          tarea={tarea}
          borrarTarea={borrarTarea}
        />
      ))}
    </>
  );
}

export default App;
