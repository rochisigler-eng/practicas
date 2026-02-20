const allTracks = [
  {
    id: 0,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3",
    title: "Heater 1",
    key: "q"
  },
  {
    id: 1,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3",
    title: "Heater 2",
    key: "w"
  },
  {
    id: 2,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3",
    title: "Heater 3",
    key: "e"
  },
  {
    id: 3,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3",
    title: "Heater 4",
    key: "a"
  },
  {
    id: 4,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3",
    title: "Clap",
    key: "s"
  },
  {
    id: 5,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3",
    title: "Open-HH",
    key: "d"
  },
  {
    id: 6,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3",
    title: "Kick-n'-Hat",
    key: "z"
  },
  {
    id: 7,
    src: "https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3",
    title: "Kick",
    key: "x"
  },
  {
    id: 8,
    src: "https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3",
    title: "Closed-HH",
    key: "c"
  }
];

const audio = new Audio()

const userData = {
  tracks: allTracks,
  currentTrack: null
}

const playTrack = (id) => {
  const track = userData.tracks.find(track => track.id === id)
  audio.src = track.src
  audio.title = track.title
  userData.currentTrack = track
  setDisplayText()
  audio.play()
}

const getCurrentTrackIndex = () => {
  userData.tracks.indexOf(userData.currentTrack)
}

const displayText = document.getElementById("display")

const setDisplayText = () => {
  const currentTitle = userData.currentTrack.title;
  displayText.textContent = currentTitle;
}

const buttons = document.querySelectorAll(".drum-pad")

buttons.forEach(button => {
  const id = button.getAttribute("id").slice(4)
  button.addEventListener("click", () => {
    playTrack(Number(id))
  })
})


document.addEventListener("keydown", (e)=> {
  const key = e.key.toLowerCase();
  const track= userData.tracks.find(t=> t.key===key)
  if (!track) return;
  const button =document.getElementById(`pad-${track.id}`)
  button.classList.add("active")
  playTrack(track.id)
})

document.addEventListener("keyup", (e)=>{
  const key = e.key.toLowerCase();
  const track= userData.tracks.find(t=> t.key===key)
  if (!track) return;
  const button =document.getElementById(`pad-${track.id}`)
  button.classList.remove("active")
  
})
