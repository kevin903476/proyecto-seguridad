import "./App.css";
import accesoService from "./service/accesoService";
import { useEffect, useState, useRef } from "react";

function App() {
  const [accesos, setAccesos] = useState([]);
  const ws = useRef(null);
  const [connected, setConnected] = useState(false);

  const connectWebSocket = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
    }

    ws.current = new WebSocket(
      "wss://marvellous-muskox-kevin903476-82a785f6.koyeb.app/ws"
    );

    ws.current.onopen = () => {
      console.log("WebSocket conectado");
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      console.log("Mensaje WS recibido:", event.data);
      const msg = JSON.parse(event.data);
      if (msg.type === "updateTodayAccess") {
        accesoService
          .getTodayAccess()
          .then((data) => setAccesos(data.data))
          .catch((err) => console.error("Error:", err));
      }
    };

    ws.current.onerror = (e) => {
      console.error("WebSocket error", e);
    };

    ws.current.onclose = () => {
      console.log("WebSocket cerrado");
      setConnected(false);
    };
  };

  useEffect(() => {
    accesoService
      .getTodayAccess()
      .then((data) => setAccesos(data.data))
      .catch((err) => console.error("Error:", err));

    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div>
      <h1>Listado Accesos</h1>
      <p>Estado WebSocket: {connected ? "✅ Conectado" : "❌ Desconectado"}</p>
      <button onClick={connectWebSocket} disabled={connected}>
        {connected ? "Conectado" : "Reconectar WebSocket"}
      </button>

      {accesos.map((a) => (
        <div key={a.id_registro}>
          {a.nombre_completo} - {a.dni_escaneado} - {a.estado_acceso}
        </div>
      ))}
    </div>
  );
}

export default App;
