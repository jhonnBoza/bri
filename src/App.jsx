import { useState, useEffect, useRef } from 'react'
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('letter') // 'letter' o 'music'
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

      {/* Botones superiores */}
      <div className="top-buttons">
        <button 
          className={`music-nav-button ${currentView === 'music' ? 'active' : ''}`}
          onClick={() => handleViewChange('music')}
          title="Música"
        >
          🎵
        </button>
      </div>

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
      ) : (
        /* Sección de Música */
        <div className="music-section">
          <div className="music-container">
            <div className="music-header">
              <button 
                className="back-button"
                onClick={() => handleViewChange('letter')}
                title="Volver a la carta"
              >
                ← Volver
              </button>
              <h2 className="music-title">🎵 Canciones que me recuerdan a ti</h2>
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
      )}
    </div>
  )
}

export default App
