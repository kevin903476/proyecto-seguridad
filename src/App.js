import logo from "./logo.svg";
import "./App.css";
import accesoService from "./service/accesoService";
import { useEffect, useState } from "react";

function App() {
  const [accesos, setAccesos] = useState([]);
  useEffect(() => {
    accesoService
      .getTodayAccess()
      .then((data) => {
        console.log("Respuesta de getTodayAccess:", data);
        setAccesos(data.data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Listado Accesos</h1>
      {accesos.map((a) => (
        <div key={a.id_registro}>
          {a.nombre_completo} - {a.estado_acceso}
        </div>
      ))}
    </div>
  );
}

export default App;
