let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

function createNoise(ctx, duration) {
  const bufferSize = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  return source
}

// Apple → soft crunch (noise burst, quick decay)
function playCrunch(ctx) {
  const noise = createNoise(ctx, 0.15)
  const gainNode = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1200
  filter.Q.value = 0.8
  gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
  noise.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)
  noise.start()
  noise.stop(ctx.currentTime + 0.15)
}

// Broccoli → light pop/boing
function playPop(ctx) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(520, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.12)
  gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.2)
}

// Chips → crispy crunch (higher noise burst)
function playCrisp(ctx) {
  const noise = createNoise(ctx, 0.12)
  const gainNode = ctx.createGain()
  const filter = ctx.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 2400
  gainNode.gain.setValueAtTime(0.35, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
  noise.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)
  noise.start()
  noise.stop(ctx.currentTime + 0.12)
}

// Ice Cream → soft playful chime
function playChime(ctx) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(880, ctx.currentTime)
  osc.frequency.setValueAtTime(1046, ctx.currentTime + 0.1)
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.5)
}

export function playSound(type) {
  try {
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    switch (type) {
      case 'crunch': playCrunch(ctx); break
      case 'pop':    playPop(ctx);    break
      case 'crisp':  playCrisp(ctx);  break
      case 'chime':  playChime(ctx);  break
    }
  } catch (e) {
    // silently fail if audio not supported
  }
}
