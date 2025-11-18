import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef(null)
  const fullMessage = 'Eres mi persona favorita en todo el mundo 🌟'

  // Calcular días desde una fecha especial (ajusta esta fecha)
  const specialDate = new Date('2024-01-01') // Cambia esta fecha
  const today = new Date()
  const daysSince = Math.floor((today - specialDate) / (1000 * 60 * 60 * 24))

  // Efecto para inicializar el audio al cargar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Volumen al 30%
      audioRef.current.loop = true // Asegurar que se repita
      
      // Event listeners para manejar la reproducción
      const audio = audioRef.current
      
      // Cuando la canción termina, reiniciarla (por si el loop falla)
      const handleEnded = () => {
        audio.currentTime = 0
        audio.play().catch(error => {
          console.log('Error al reiniciar:', error)
        })
      }
      
      // Manejar errores de carga
      const handleError = (e) => {
        console.error('Error en el audio:', e)
      }
      
      // Verificar cuando se carga el metadata (duración del audio)
      const handleLoadedMetadata = () => {
        console.log('Duración del audio:', audio.duration, 'segundos')
      }
      
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      
      return () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [])

  // Efecto para manejar mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  // Función para iniciar el audio
  const startAudio = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current.play().then(() => {
        setAudioStarted(true)
      }).catch(error => {
        console.log('Error al reproducir:', error)
      })
    }
  }

  // Función para alternar mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      // Si el audio está pausado, iniciarlo primero
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setAudioStarted(true)
        }).catch(error => {
          console.log('Error al reproducir:', error)
        })
      }
    }
    setIsMuted(!isMuted)
  }

  // Función para abrir la carta e iniciar el audio
  const handleOpenLetter = () => {
    setIsOpen(true)
    startAudio() // Iniciar música cuando se abre la carta
  }

  // Efecto de escritura
  useEffect(() => {
    if (isOpen) {
      setTypedText('')
      let index = 0
      const timer = setInterval(() => {
        if (index < fullMessage.length) {
          setTypedText(fullMessage.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
        }
      }, 100)
      return () => clearInterval(timer)
    } else {
      setTypedText('')
    }
  }, [isOpen, fullMessage])

  // Generar corazones flotantes
  const hearts = Array.from({ length: 15 }, (_, i) => (
    <div key={i} className={`floating-heart heart-${i}`}>💕</div>
  ))

  // Generar estrellas
  const stars = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className={`falling-star star-${i}`}>✨</div>
  ))

  return (
    <div className="container">
      {/* Audio de fondo */}
      <audio 
        ref={audioRef}
        src="/bri/musica/The Marías – Sienna.mp3" 
        loop
        preload="auto"
      />

      {/* Botón de mute */}
      <button 
        className="mute-button"
        onClick={toggleMute}
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Fondo con textura */}
      <div className="texture-overlay"></div>
      
      {/* Estrellas cayendo */}
      {stars}

      {/* Corazones flotantes */}
      {hearts}

      {/* Carta central con sobre */}
      <div className="letter-container">
        <div className={`envelope ${isOpen ? 'open' : ''}`}>
          <div className="envelope-flap"></div>
          <div className={`letter ${isOpen ? 'opened' : 'closed'}`}>
            <div className="letter-border"></div>
            <div className="letter-header">
              <h2>💌 Cartita para mi chinita</h2>
              <div className="letter-date">📅 {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
            {isOpen ? (
              <div className="letter-content">
                <p>
                  Hola mi chinita 💕,
                </p>
                <p>
                  Sé que es algo raro aparecer después de mucho tiempo y sin decirte nada, 
                  y la última vez que quise decirte algo simplemente me callé porque soy 
                  una persona muy orgullosa. Y si quería decirte algo en primer lugar, es 
                  que me perdones por ser alguien muy tonto y que lo que viste no es algo 
                  que yo quise hacer o faltarte el respeto como tal, porque yo sé lo que 
                  vales para mí y eres la única persona en la que me hizo salir de mi 
                  capa de protección. 🌟
                </p>
                <p>
                  Porque sí, yo tengo apego evitativo y no me enamoro así de manera sencilla, 
                  no soy una persona que anda de persona en persona, y tú eres la única 
                  persona con la que pude volver a sentir algo lindo y puro. ✨💖
                </p>
                <p>
                  Y quisiera decirte abiertamente que te amo y quisiera que vuelvas porque 
                  te extraño :c 💔
                </p>
                
                {/* Contador de días */}
                <div className="days-counter">
                  <p>Ya no aguanto ma, ya quiero saber de ti de nuevo:C</p>
                </div>


                {/* Botón de sorpresa */}
                <button 
                  className="surprise-button"
                  onClick={() => setShowSurprise(!showSurprise)}
                >
                  {showSurprise ? '💝' : 'Haz click aqui polfavo:>'}
                </button>
                
                {showSurprise && (
                  <div className="surprise-message">
                    <p>PERDONAME POLFAVO, POLFAVOLCITO</p>
                    <p>Eres espeshial para mi asdjasld💕</p>
                  </div>
                )}

                {/* Firma */}
                <div className="signature">
                  <p>Con todo mi amor,</p>
                  <p className="signature-name">Jhnn:D</p>
                </div>
              </div>
            ) : (
              <div className="letter-closed-content">
                <p>💌</p>
                <button className="open-letter-btn" onClick={handleOpenLetter}>
                  Abrir carta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
