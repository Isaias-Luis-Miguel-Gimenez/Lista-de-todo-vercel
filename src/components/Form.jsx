import React from 'react';

const Form = ({ handleChange, addTar, tarea }) => {
  return (
    <div>
      <form onSubmit={addTar}>
        <input
          type="text"
          value={tarea}
          placeholder="Ingresa la tarea..."
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export { Form };
