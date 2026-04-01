import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LuPlay,
  LuPause,
  LuSkipForward,
  LuSkipBack,
  LuVolume2,
  LuVolumeX,
  LuShuffle,
  LuRepeat,
  LuMusic,
} from 'react-icons/lu'

const tracks = [
  { file: '(U)topia.drm - Bring Me The Horizon.mp3', title: '(U)topia.drm', artist: 'Bring Me The Horizon' },
  {
    file: '1DayTheOnlyButterfliesLeftWillBInurChestAsuMarchTowards UrDeath.finx - Bring Me The Horizon.mp3',
    title: '1DayTheOnlyButterflies...',
    artist: 'Bring Me The Horizon',
  },
  { file: '1x1.syncd - Bring Me The Horizon.mp3', title: '1x1.syncd', artist: 'Bring Me The Horizon' },
  { file: 'DOOMED.errX - Bring Me The Horizon.mp3', title: 'DOOMED.errX', artist: 'Bring Me The Horizon' },
  { file: 'Darkside.verXx - Bring Me The Horizon.mp3', title: 'Darkside.verXx', artist: 'Bring Me The Horizon' },
  { file: 'DiE4u.sysrsk - Bring Me The Horizon.mp3', title: 'DiE4u.sysrsk', artist: 'Bring Me The Horizon' },
  { file: 'Throne.GOD - Bring Me The Horizon.mp3', title: 'Throne.GOD', artist: 'Bring Me The Horizon' },
  { file: 'avalanche_.drft - Bring Me The Horizon.mp3', title: 'avalanche_.drft', artist: 'Bring Me The Horizon' },
  {
    file: 'canyoufeelmyᐸ3.tmpx - Bring Me The Horizon.mp3',
    title: 'canyoufeelmyᐸ3.tmpx',
    artist: 'Bring Me The Horizon',
  },
  { file: 'd1g_it.core - Bring Me The Horizon.mp3', title: 'd1g_it.core', artist: 'Bring Me The Horizon' },
  { file: 'drwn.vvv - Bring Me The Horizon.mp3', title: 'drwn.vvv', artist: 'Bring Me The Horizon' },
  { file: 'followU.bnd - Bring Me The Horizon.mp3', title: 'followU.bnd', artist: 'Bring Me The Horizon' },
  { file: 'in_the_dark.ech - Bring Me The Horizon.mp3', title: 'in_the_dark.ech', artist: 'Bring Me The Horizon' },
  { file: 'king_sl@yer.fmk - Bring Me The Horizon.mp3', title: 'king_sl@yer.fmk', artist: 'Bring Me The Horizon' },
  { file: 'koolaid.xxo - Bring Me The Horizon.mp3', title: 'koolaid.xxo', artist: 'Bring Me The Horizon' },
  { file: 'losT_404.nll - Bring Me The Horizon.mp3', title: 'losT_404.nll', artist: 'Bring Me The Horizon' },
  { file: 'm0th3r.tng - Bring Me The Horizon.mp3', title: 'm0th3r.tng', artist: 'Bring Me The Horizon' },
  { file: 'med!cine.fbk - Bring Me The Horizon.mp3', title: 'med!cine.fbk', artist: 'Bring Me The Horizon' },
  { file: 'parasite.ev3 - Bring Me The Horizon.mp3', title: 'parasite.ev3', artist: 'Bring Me The Horizon' },
  { file: 'sL33pwalking.idl - Bring Me The Horizon.mp3', title: 'sL33pwalking.idl', artist: 'Bring Me The Horizon' },
  { file: 'sTr4nG3r5.vsn0 - Bring Me The Horizon.mp3', title: 'sTr4nG3r5.vsn0', artist: 'Bring Me The Horizon' },
  {
    file: 'seenitallbefore_xx.arch - Bring Me The Horizon.mp3',
    title: 'seenitallbefore_xx.arch',
    artist: 'Bring Me The Horizon',
  },
  { file: 'shadowm0ses.frq - Bring Me The Horizon.mp3', title: 'shadowm0ses.frq', artist: 'Bring Me The Horizon' },
]

export function MusicPlayer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const shuffleRef = useRef(shuffle)
  const repeatRef = useRef(repeat)
  const trackIdxRef = useRef(trackIdx)
  shuffleRef.current = shuffle
  repeatRef.current = repeat
  trackIdxRef.current = trackIdx

  const playTrack = useCallback((idx: number) => {
    const audio = audioRef.current
    if (!audio) return
    setTrackIdx(idx)
    setProgress(0)
    audio.src = `/music/${encodeURIComponent(tracks[idx].file)}`
    audio.load()
    audio.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  const goNext = useCallback(() => {
    const idx = shuffleRef.current
      ? Math.floor(Math.random() * tracks.length)
      : (trackIdxRef.current + 1) % tracks.length
    playTrack(idx)
  }, [playTrack])

  const goPrev = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
    } else {
      const idx = trackIdxRef.current > 0 ? trackIdxRef.current - 1 : tracks.length - 1
      playTrack(idx)
    }
  }, [playTrack])

  useEffect(() => {
    const audio = new Audio()
    audio.volume = volume
    audioRef.current = audio

    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnd = () => {
      if (repeatRef.current) {
        audio.currentTime = 0
        audio.play()
      } else {
        goNext()
      }
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
      audio.pause()
      audio.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      if (!audio.src || audio.src === window.location.href) {
        audio.src = `/music/${encodeURIComponent(tracks[trackIdx].file)}`
        audio.load()
      }
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = pct * duration
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const track = tracks[trackIdx]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full right-0 mt-2 w-80 rounded-2xl bg-surface/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden z-[300]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex gap-3 p-4 pb-2">
            <img src="/music/cover.png" alt="Cover" className="w-14 h-14 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm font-semibold text-text truncate">{track.title}</p>
              <p className="text-xs text-text-muted truncate">{track.artist}</p>
            </div>
          </div>

          <div className="px-4 pb-1">
            <div className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group" onClick={seek}>
              <div
                className="h-full rounded-full bg-primary group-hover:bg-primary/80 transition-colors relative"
                style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow" />
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-text-muted font-mono">{fmt(progress)}</span>
              <span className="text-[10px] text-text-muted font-mono">{fmt(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <button
              onClick={() => setShuffle(s => !s)}
              className={`transition-colors ${shuffle ? 'text-primary' : 'text-text-muted hover:text-text'}`}
            >
              <LuShuffle size={14} />
            </button>
            <button onClick={goPrev} className="text-text-muted hover:text-text transition-colors">
              <LuSkipBack size={18} />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-bg hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
            >
              {playing ? <LuPause size={18} /> : <LuPlay size={18} className="ml-0.5" />}
            </button>
            <button onClick={goNext} className="text-text-muted hover:text-text transition-colors">
              <LuSkipForward size={18} />
            </button>
            <button
              onClick={() => setRepeat(r => !r)}
              className={`transition-colors ${repeat ? 'text-primary' : 'text-text-muted hover:text-text'}`}
            >
              <LuRepeat size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2 px-4 pb-3">
            <button onClick={() => setMuted(m => !m)} className="text-text-muted hover:text-text transition-colors">
              {muted || volume === 0 ? <LuVolumeX size={14} /> : <LuVolume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={e => {
                setVolume(Number(e.target.value))
                setMuted(false)
              }}
              className="flex-1 h-1 accent-[#00e5ff]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { LuMusic }
