import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('letter') // 'letter', 'music', 'reasons' o 'timeline'
  const [isOpen, setIsOpen] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [selectedMusic, setSelectedMusic] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const musicAudioRef = useRef(null)
  const fullMessage = 'Eres mi persona favorita en todo el mundo 🌟'

  // Datos de música - puedes agregar más canciones aquí
  const musicData = [
    {
      id: 1,
      image: '/bri/musicimagenes/Daniel Caesar - Superpowers.webp',
      title: 'Superpowers',
      artist: 'Daniel Caesar',
      text: 'Superpowers',
      src: '/bri/musica/Daniel Caesar - Superpowers.mp3'
    },
    {
      id: 2,
      image: '/bri/musicimagenes/Yebbas.png',
      title: 'Yebba\'s Heartbreak',
      artist: 'Drake',
      text: 'Yebba\'s Heartbreak',
      src: '/bri/musica/Drake - Yebbas Heartbreak.mp3'
    },
    {
      id: 3,
      image: '/bri/musicimagenes/No One Noticed.png',
      title: 'No One Noticed',
      artist: 'Unknown Artist',
      text: 'No One Noticed',
      src: '/bri/musica/No One Noticed.mp3'
    },
    {
      id: 4,
      image: '/bri/musicimagenes/ONLY.png',
      title: 'ONLY',
      artist: 'Unknown Artist',
      text: 'ONLY',
      src: '/bri/musica/ONLY.mp3'
    },
    {
      id: 5,
      image: '/bri/musicimagenes/The Marías – Sienna.webp',
      title: 'Sienna',
      artist: 'The Marías',
      text: 'Sienna',
      src: '/bri/musica/The Marías – Sienna.mp3'
    }
  ]

  // 100 razones para amarte
  const reasonsToLove = [
    "Eres mi persona favorita en todo el mundo",
    "Eres la única persona que me hizo salir de mi capa de protección",
    "Contigo pude volver a sentir algo lindo y puro",
    "Tu forma de escribir me hace sonreír incluso en mis días más grises",
    "Me encanta cómo me haces sentir que valgo la pena sin conocerme en persona",
    "Tus palabras tienen el poder de hacerme sentir en casa aunque estemos lejos",
    "Eres la razón por la que creo que el amor puede existir a través de la distancia",
    "Me encanta cómo me haces reír con tus mensajes incluso cuando estoy triste",
    "Tienes una forma única de entender mis sentimientos sin que tenga que explicarlos",
    "Eres la persona más especial que he conocido, aunque aún no te haya visto",
    "Me encanta cómo me haces sentir que no estoy solo en este mundo",
    "Tu forma de ser me inspira a ser mejor persona cada día",
    "Eres la única persona con la que puedo ser completamente yo mismo",
    "Me encanta cómo me haces sentir que pertenezco a algún lugar",
    "Tienes una forma única de hacer que los problemas se sientan más pequeños",
    "Eres la persona que me hace creer que el amor puede ser real y duradero",
    "Me encanta cómo me haces sentir que soy importante para alguien",
    "Tienes una energía positiva que se siente incluso a través de los mensajes",
    "Eres la razón por la que quiero mejorar como persona cada día",
    "Me encanta cómo me haces sentir que puedo confiar en alguien completamente",
    "Tienes una forma única de hacer que me sienta amado y valorado",
    "Eres la persona que me hace sentir que no necesito cambiar para ser amado",
    "Me encanta cómo me haces sentir que puedo ser yo mismo sin miedo",
    "Tienes una forma de amarme que me hace sentir completo",
    "Eres la razón por la que creo que el destino existe",
    "Me encanta cómo me haces sentir que puedo ser vulnerable contigo",
    "Tienes una forma única de hacer que cada día sea especial",
    "Eres la persona que me hace sentir que el amor no es solo una palabra",
    "Me encanta cómo me haces sentir que puedo soñar sin límites",
    "Tienes una forma de estar presente que me hace sentir que todo estará bien",
    "Eres la razón por la que creo que el amor puede sanar heridas del pasado",
    "Me encanta cómo me haces sentir que puedo ser honesto contigo sin miedo",
    "Tienes una forma única de hacer que me sienta especial y único",
    "Eres la persona que me hace sentir que puedo ser feliz de verdad",
    "Me encanta cómo me haces sentir que puedo confiar en el futuro contigo",
    "Tienes una forma de amarme que me hace sentir que soy suficiente tal como soy",
    "Eres la razón por la que creo que el amor puede ser puro y sincero",
    "Me encanta cómo me haces sentir que puedo ser vulnerable sin ser juzgado",
    "Tienes una forma única de hacer que me sienta importante en tu vida",
    "Eres la persona que me hace sentir que puedo ser feliz sin condiciones",
    "Me encanta cómo me haces sentir que puedo ser yo mismo sin disculpas",
    "Tienes una forma de estar ahí que me hace sentir que no estoy solo",
    "Eres la razón por la que creo que el amor puede ser eterno",
    "Me encanta cómo me haces sentir que puedo ser honesto sobre mis sentimientos",
    "Tienes una forma única de hacer que me sienta amado sin tener que pedirlo",
    "Eres la persona que me hace sentir que puedo ser feliz simplemente siendo yo",
    "Me encanta cómo me haces sentir que puedo confiar en ti completamente",
    "Tienes una forma de amarme que me hace sentir que soy valioso",
    "Eres la razón por la que creo que el amor puede superar cualquier distancia",
    "Me encanta cómo me haces sentir que puedo ser débil y eso está bien",
    "Tienes una forma única de hacer que cada conversación sea especial",
    "Eres la persona que me hace sentir que puedo ser feliz sin tener que fingir",
    "Me encanta cómo me haces sentir que puedo ser yo mismo sin miedo al rechazo",
    "Tienes una forma de estar presente que me hace sentir que todo tiene sentido",
    "Eres la razón por la que creo que el amor puede ser incondicional",
    "Me encanta cómo me haces sentir que puedo ser honesto sobre mis miedos",
    "Tienes una forma única de hacer que me sienta especial en tu vida",
    "Eres la persona que me hace sentir que puedo ser feliz sin tener que cambiar",
    "Me encanta cómo me haces sentir que puedo confiar en ti con mi corazón completo",
    "Tienes una forma de amarme que me hace sentir que soy suficiente",
    "Eres la razón por la que creo que el amor puede ser real y verdadero",
    "Me encanta cómo me haces sentir que puedo ser vulnerable sin perder mi fuerza",
    "Tienes una forma única de hacer que cada día sea mejor que el anterior",
    "Eres la persona que me hace sentir que puedo ser feliz simplemente existiendo",
    "Me encanta cómo me haces sentir que puedo ser yo mismo sin tener que explicar",
    "Tienes una forma de estar ahí que me hace sentir que no necesito estar solo",
    "Eres la razón por la que creo que el amor puede durar para siempre",
    "Me encanta cómo me haces sentir que puedo ser honesto sobre mis sentimientos",
    "Tienes una forma única de hacer que me sienta amado sin condiciones",
    "Eres la persona que me hace sentir que puedo ser feliz sin tener que esforzarme",
    "Me encanta cómo me haces sentir que puedo confiar en ti con mis secretos más profundos",
    "Tienes una forma de amarme que me hace sentir que soy importante",
    "Eres la razón por la que creo que el amor puede ser puro y sincero",
    "Me encanta cómo me haces sentir que puedo ser débil y fuerte al mismo tiempo",
    "Tienes una forma única de hacer que cada momento sea memorable",
    "Eres la persona que me hace sentir que puedo ser feliz sin tener que justificarlo",
    "Me encanta cómo me haces sentir que puedo ser yo mismo sin tener que disculparme",
    "Tienes una forma de estar presente que me hace sentir que todo está bien",
    "Eres la razón por la que creo que el amor puede superar cualquier distancia",
    "Me encanta cómo me haces sentir que puedo ser honesto sobre mis inseguridades",
    "Tienes una forma única de hacer que me sienta especial y único en tu vida",
    "Eres la persona que me hace sentir que puedo ser feliz sin tener que cambiar nada",
    "Me encanta cómo me haces sentir que puedo confiar en ti completamente",
    "Tienes una forma de amarme que me hace sentir que soy valioso y suficiente",
    "Eres la razón por la que creo que el amor puede ser eterno e incondicional",
    "Me encanta cómo me haces sentir que puedo ser vulnerable sin perder mi dignidad",
    "Tienes una forma única de hacer que cada día sea una nueva oportunidad",
    "Eres la persona que me hace sentir que puedo ser feliz simplemente porque existes",
    "Me encanta cómo me haces sentir que puedo ser yo mismo sin tener que fingir",
    "Tienes una forma de estar ahí que me hace sentir que no estoy solo en este mundo",
    "Eres la razón por la que creo que el amor puede ser real, puro y verdadero",
    "Me encanta cómo me haces sentir que puedo ser honesto sobre todo contigo",
    "Tienes una forma única de hacer que me sienta amado sin tener que merecerlo",
    "Eres la persona que me hace sentir que puedo ser feliz sin condiciones ni límites",
    "Me encanta cómo me haces sentir que puedo confiar en ti con mi corazón y mi alma",
    "Tienes una forma de amarme que me hace sentir que soy la persona más afortunada del mundo",
    "Me emociona pensar en el día en que finalmente podamos conocernos en persona",
    "Eres la razón por la que creo que las mejores cosas de la vida valen la pena esperar"
  ]

  // Datos del Timeline
  const timelineData = [
    {
      id: 1,
      date: "6 de septiembre de 2025",
      title: "El primer Hola",
      description: "Ese día decidí escribirte sin saber si responderías, pero algo en mí me decía que tenía que conocerte. Desde la primera vez que te vi, sentí algo especial, una atracción que no pude ignorar. Tomé valor y te envié ese primer mensaje con la esperanza de que fuera el comienzo de algo hermoso. Y así fue, porque ese simple 'Hola' cambió todo.",
      image: "/bri/timeline/primerhola.jpg"
    },
    {
      id: 2,
      date: "25 de septiembre de 2025",
      title: "Después de tiempo",
      description: "Después de tanto tiempo sin hablar y cuando ya había dejado de contestar, apareciste de la nada pidiendo disculpas. Ese día me alegró mucho porque pude ver las buenas intenciones que tenías. Fue un momento que me llenó de esperanza y me hizo sonreír, porque significaba que aún importaba para ti y que querías arreglar las cosas.",
      image: "/bri/timeline/depuesdetiempo.jpg"
    },
    {
      id: 3,
      date: "26 de septiembre de 2025",
      title: "Tu primer audio",
      description: "Cuando me mandaste tu primer audio me emocioné mucho. Escuchar tu voz por primera vez fue lindo.",
      image: "/bri/timeline/audio.jpg"
    },
    {
      id: 4,
      date: "Septiembre de 2025",
      title: "La indirecta",
      description: "Ese día me tiraste una indirecta y no supe cómo reaccionar. Me quedé pensando en qué decir y cómo responder, porque no quería arruinarlo.",
      image: "/bri/timeline/tiktok.jpg"
    },
    {
      id: 5,
      date: "Septiembre de 2025",
      title: "Nuestra primera videollamada",
      description: "Ese día hicimos nuestra primera videollamada y hablamos toda la tarde. Fue una conversación linda y me reí mucho. Fue un día especial.",
      image: "/bri/timeline/videollamada.jpg"
    },
    {
      id: 6,
      date: "Septiembre de 2025",
      title: "Tus ojitos",
      description: "Ese día me mandaste muchas fotos y me enamoré de tus ojos. Son tan lindos que desde entonces lo tengo de fondo de pantalla y no lo cambio.",
      image: "/bri/timeline/ojitos.jpg"
    },
    {
      id: 7,
      date: "Hoy",
      title: "Te extraño",
      description: "Extraño tanto hablar contigo y pasar tiempo juntos. Ahora mis días se sienten vacíos sin tus mensajes y sin saber de ti. Cada momento que pasamos juntos lo guardo como un tesoro porque contigo todo era más especial.",
      image: null
    }
  ]

  // Inicializar con "Sienna" por defecto
  useEffect(() => {
    const defaultSong = musicData.find(m => m.title === 'Sienna') || musicData[4]
    if (defaultSong && !selectedMusic) {
      setSelectedMusic(defaultSong)
    }
  }, [])

  // Calcular días desde una fecha especial (ajusta esta fecha)
  const specialDate = new Date('2024-01-01') // Cambia esta fecha
  const today = new Date()
  const daysSince = Math.floor((today - specialDate) / (1000 * 60 * 60 * 24))


  // Función para abrir la carta
  const handleOpenLetter = () => {
    setIsOpen(true)
  }

  // Función para cambiar de música
  const handleMusicSelect = (music) => {
    setSelectedMusic(music)
    setIsPlaying(true)
  }

  // Función para siguiente canción
  const handleNext = () => {
    if (!selectedMusic) return
    const currentIndex = musicData.findIndex(m => m.id === selectedMusic.id)
    const nextIndex = (currentIndex + 1) % musicData.length
    handleMusicSelect(musicData[nextIndex])
  }

  // Función para canción anterior
  const handlePrev = () => {
    if (!selectedMusic) return
    const currentIndex = musicData.findIndex(m => m.id === selectedMusic.id)
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length
    handleMusicSelect(musicData[prevIndex])
  }

  // Función para play/pause
  const handlePlayPause = () => {
    if (musicAudioRef.current) {
      if (musicAudioRef.current.paused) {
        musicAudioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.log('Error al reproducir:', error)
        })
      } else {
        musicAudioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  // Efecto para cargar y reproducir la canción seleccionada
  useEffect(() => {
    if (musicAudioRef.current && selectedMusic) {
      const audio = musicAudioRef.current
      const wasPlaying = isPlaying
      audio.src = selectedMusic.src
      audio.volume = 0.3
      audio.load()
      
      // Reproducir automáticamente si ya estaba reproduciendo
      if (wasPlaying) {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          console.log('Error al reproducir:', error)
        })
      }
    }
  }, [selectedMusic])

  // Efecto para actualizar tiempo de reproducción
  useEffect(() => {
    if (musicAudioRef.current && selectedMusic) {
      const audio = musicAudioRef.current
      
      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => {
        setIsPlaying(false)
        // Auto-play siguiente canción
        const currentIndex = musicData.findIndex(m => m.id === selectedMusic.id)
        const nextIndex = (currentIndex + 1) % musicData.length
        handleMusicSelect(musicData[nextIndex])
      }

      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [selectedMusic, musicData])

  // Función para cambiar de vista
  const handleViewChange = (view) => {
    setCurrentView(view)
    // Si es la primera vez que entras a música y hay una canción seleccionada, reproducirla
    if (view === 'music' && selectedMusic) {
      // El audio se cargará y reproducirá automáticamente en el useEffect de selectedMusic
      setIsPlaying(true)
    }
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

  return (
    <div className="container">
      {/* Audio para la sección de música */}
      <audio 
        ref={musicAudioRef}
        preload="auto"
        onEnded={() => {
          if (musicAudioRef.current && selectedMusic) {
            musicAudioRef.current.currentTime = 0
            musicAudioRef.current.play()
          }
        }}
      />

      {/* Navbar con pestañas */}
      <nav className="main-navbar">
        <button 
          className={`nav-tab ${currentView === 'letter' ? 'active' : ''}`}
          onClick={() => handleViewChange('letter')}
        >
          💌
        </button>
        <button 
          className={`nav-tab ${currentView === 'music' ? 'active' : ''}`}
          onClick={() => handleViewChange('music')}
        >
          🎵
        </button>
        <button 
          className={`nav-tab ${currentView === 'reasons' ? 'active' : ''}`}
          onClick={() => handleViewChange('reasons')}
        >
          💕
        </button>
        <button 
          className={`nav-tab ${currentView === 'timeline' ? 'active' : ''}`}
          onClick={() => handleViewChange('timeline')}
        >
          📅
        </button>
      </nav>

      {/* Fondo con textura */}
      <div className="texture-overlay"></div>

      {/* Contenido según la vista */}
      {currentView === 'letter' ? (
        /* Carta central con sobre */
      <div className="letter-container">
        <div className={`envelope ${isOpen ? 'open' : ''}`}>
          <div className="envelope-flap"></div>
          <div className={`letter ${isOpen ? 'opened' : 'closed'}`}>
            <div className="letter-border"></div>
            <div className="letter-header">
              <h2>334</h2>
            </div>
            {isOpen ? (
              <div className="letter-content">
                <p>
                  Hola
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
      ) : currentView === 'music' ? (
        /* Sección de Música */
        <div className="music-section">
          <div className="music-container">
            <div className="music-header">
              <h2 className="music-title">Canciones que me recuerdan a ti</h2>
            </div>
            
            {/* Reproductor de música - Arriba */}
            {selectedMusic && (
              <div className="music-player">
                <div className="player-info">
                  <img src={selectedMusic.image} alt={selectedMusic.title} className="player-album-art" />
                  <div className="player-details">
                    <h3 className="player-title">{selectedMusic.title}</h3>
                    <p className="player-artist">{selectedMusic.artist}</p>
                  </div>
                </div>
                <div className="player-controls-main">
                  <button className="player-btn-nav" onClick={handlePrev} title="Anterior">
                    <FaStepBackward />
                  </button>
                  <button className="player-btn-play" onClick={handlePlayPause} title={isPlaying ? "Pausar" : "Reproducir"}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <button className="player-btn-nav" onClick={handleNext} title="Siguiente">
                    <FaStepForward />
                  </button>
                </div>
                <div className="player-progress">
                  <span className="player-time">{Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    className="progress-slider"
                    onChange={(e) => {
                      if (musicAudioRef.current) {
                        musicAudioRef.current.currentTime = e.target.value
                        setCurrentTime(e.target.value)
                      }
                    }}
                  />
                  <span className="player-time">{Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}</span>
                </div>
                <div className="player-volume">
                  <span>🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="volume-slider"
                    onChange={(e) => {
                      if (musicAudioRef.current) {
                        musicAudioRef.current.volume = e.target.value / 100
                      }
                    }}
                    defaultValue="30"
                  />
                </div>
              </div>
            )}

            {/* Listado de canciones - Abajo */}
            <div className="music-list">
              <h3 className="music-list-title">Todas las canciones</h3>
              <div className="music-list-items">
                {musicData.map((music) => (
                  <div
                    key={music.id}
                    className={`music-list-item ${selectedMusic?.id === music.id ? 'active' : ''}`}
                    onClick={() => handleMusicSelect(music)}
                  >
                    <img src={music.image} alt={music.title} className="music-list-item-image" />
                    <div className="music-list-item-info">
                      <p className="music-list-item-title">{music.title}</p>
                      <p className="music-list-item-artist">{music.artist}</p>
                    </div>
                    {selectedMusic?.id === music.id && isPlaying && (
                      <span className="music-list-item-playing">
                        <FaPlay />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : currentView === 'reasons' ? (
        /* Sección de 100 Razones */
        <div className="reasons-section">
          <div className="reasons-container">
            <div className="reasons-header">
              <h2 className="reasons-title">100 Razones para Amarte</h2>
            </div>
            <div className="reasons-list">
              {reasonsToLove.map((reason, index) => (
                <div key={index} className="reason-item">
                  <span className="reason-number">{index + 1}.</span>
                  <span className="reason-text">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Sección de Timeline */
        <div className="timeline-section">
          <div className="timeline-container">
            <div className="timeline-header">
              <h2 className="timeline-title">you and me</h2>
            </div>
            <div className="timeline-wrapper">
              {timelineData.map((moment, index) => (
                <div key={moment.id} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{moment.date}</div>
                    <div className="timeline-card">
                      {moment.image && (
                        <div className="timeline-image-container">
                          <img src={moment.image} alt={moment.title} className="timeline-image" />
                        </div>
                      )}
                      <div className="timeline-text">
                        {moment.title && (
                          <h3 className="timeline-card-title">{moment.title}</h3>
                        )}
                        <p className="timeline-card-description">{moment.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
