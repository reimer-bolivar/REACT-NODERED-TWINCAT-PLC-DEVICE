import { useState, useEffect, useRef } from 'react'

function App() {
  const [frequency, setFrequency] = useState(0)
  const [status, setStatus] = useState('OFFLINE')
  const [loading, setLoading] = useState(false)

  // Opcionalmente podemos leer el estado del backend (si este endpoint está implementado para polling)
  // useEffect(() => { ... }, [])

  const handleFrequencyChange = (e) => {
    setFrequency(e.target.value)
  }

  const sendCommand = async (payload) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/vfd/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('ONLINE')
        console.log('Command successful', data)
      } else {
        setStatus('ERROR')
        console.error('Server error', data)
      }
    } catch (err) {
      setStatus('OFFLINE')
      console.error('Network error', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFrequency = () => {
    sendCommand({ frequency: parseFloat(frequency) })
  }

  const startMotor = () => {
    // 1 = ARRANQUE según Node-RED
    sendCommand({ command: 1 })
  }

  const stopMotor = () => {
    // 5 = PARADA según Node-RED
    sendCommand({ command: 5 })
  }

  const safeStop = () => {
    setFrequency(0)
    sendCommand({ frequency: 0, command: 5 })
  }

  return (
    <div className="dashboard-container">
      <header className="header">
        <div>
          <h1>VFD Control Center</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)' }}>OPC UA Integration</p>
        </div>
        <div className={`status-badge ${status === 'OFFLINE' ? 'offline' : ''}`} style={status === 'ERROR' ? { color: 'var(--danger-color)', borderColor: 'var(--danger-color)', background: 'rgba(239, 68, 68, 0.1)' } : {}}>
          <div className="status-dot" style={status === 'ERROR' ? { background: 'var(--danger-color)', boxShadow: '0 0 8px var(--danger-color)' } : {}}></div>
          {status}
        </div>
      </header>

      <div className="grid">
        <div className="card">
          <h2 className="card-title">Frecuencia y Motor</h2>
          <div className="control-group">
            <div className="slider-container">
              <div className="value-display">
                {parseFloat(frequency).toFixed(1)}<span> Hz</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="60" 
                step="0.1" 
                value={frequency}
                onChange={handleFrequencyChange}
                disabled={loading}
              />
            </div>
            
            <button 
              className="btn-primary" 
              onClick={applyFrequency}
              disabled={loading}
            >
              APLICAR FRECUENCIA
            </button>
            
            <div className="button-group">
              <button 
                className="btn-start" 
                onClick={startMotor}
                disabled={loading}
              >
                ▶ SOLICITAR ARRANQUE
              </button>
              <button 
                className="btn-stop" 
                onClick={stopMotor}
                disabled={loading}
              >
                ■ SOLICITAR PARADA
              </button>
              <button 
                className="btn-safe" 
                onClick={safeStop}
                disabled={loading}
              >
                PARADA SEGURA
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Arquitectura y Diagnóstico</h2>
          <ul className="info-list">
            <li className="info-item">
              <span className="info-label">Endpoint Backend</span>
              <span className="info-value">http://localhost:3001</span>
            </li>
            <li className="info-item">
              <span className="info-label">Servidor OPC UA</span>
              <span className="info-value">opc.tcp://127.0.0.1:53881</span>
            </li>
            <li className="info-item">
              <span className="info-label">Node-RED Variable (Hz)</span>
              <span className="info-value">ns=1;s=FrequencySetpointHz</span>
            </li>
            <li className="info-item">
              <span className="info-label">Node-RED Variable (Cmd)</span>
              <span className="info-value">ns=1;s=MotorCommand</span>
            </li>
          </ul>
          
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
            <strong style={{ color: 'var(--danger-color)' }}>Precaución:</strong> Esta interfaz emite comandos OPC UA hacia el backend local, el cual los retransmite al dispositivo BL302.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
