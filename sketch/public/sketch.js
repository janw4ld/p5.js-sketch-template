let nameTextbox;
let tempoDrowndownMenu;

// middle C frequency
const first = 262;
const frequencies = [
  first,
  first * 9 / 8,
  first * 5 / 4,
  first * 4 / 3,
  first * 3 / 2,
  first * 5 / 3,
  first * 15 / 8,
  first * 2
];

const tempoList = ["100", "110", "120", "130", "140", "150"]

let oscillators = [];

let melody = { name: "Untitled", notes: [], tempo: 0 };

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  for (let freq of frequencies) {
    let osc = new p5.Oscillator(freq);
    // set oscillator volume to 0 as default
    osc.amp(0);
    // set started property to false
    osc.started = false;
    // add the oscillator to the oscillators array
    oscillators.push(osc);
  }

  let button = createButton('Play Song');
  button.position(10, 450);
  button.mousePressed(play);

  // Tempo select dropdown
  let p = createP('Select a tempo:');
  p.style("color", "white");
  p.position(10, 385);
  tempoDrowndownMenu = createSelect();
  tempoDrowndownMenu.position(10, 420);
  tempoDrowndownMenu.option(0);
  // add tempos to dropdown options
  for (let i = 0; i < tempoList.length; i++) {
    tempoDrowndownMenu.option(tempoList[i]);
  }

  // Add a callback function when tempo is selected
  tempoDrowndownMenu.changed(setTempo);

  // Song name input
  nameTextbox = createInput("Untitled");
  nameTextbox.position(100, 420);
  nameTextbox.size(200);
}

function draw() {
  background(0);
  drawEditor();
}

function drawEditor() {
  let numIntervals = 8;
  let gridSize = width / numIntervals;
  let numNotes = 8;
  for (let t = 0; t < numIntervals; t += 1) {
    // Draw from left to right.
    let x = t * gridSize;
    for (let n = 0; n < numNotes; n += 1) {
      // Draw from bottom to top.
      let y = height - (n + 1) * gridSize;

      // Set the fill color.
      if (melody.tempo !== 0) {
        if (melody.notes[t] === n) {
          let h = map(n, 0, numNotes, 0, 360);
          fill(h, 100, 100);
        } else {
          fill("white");
        }
      }
      // Draw a rounded square.
      square(x, y, gridSize, 10);
    }
  }
}

// save notes based on squares on the screen
function updateMelody() {
  let numIntervals = 8;
  let gridSize = width / numIntervals;
  let numNotes = 8;
  for (let t = 0; t < numIntervals; t += 1) {
    // Move from left to right.
    let x = t * gridSize;
    for (let n = 0; n < numNotes; n += 1) {
      // Move from bottom to top.
      let y = height - (n + 1) * gridSize;

      // Check if the mouse is within the square.
      // If it is, set that time interval's note.
      if (mouseX > x && mouseX < x + gridSize && mouseY > y && mouseY < y + gridSize && mouseIsPressed) {
        melody.notes[t] = n;
        playNote(n);
      }
    }
  }
}

// everytime the mouse is pressed the melody is updated
function mousePressed() {
  updateMelody();
}

// set tempo details
function setTempo() {
  if (tempoDrowndownMenu.selected() !== 0) {
    melody.tempo = tempoDrowndownMenu.selected();
    noteDuration = 60 / melody.tempo;
  }
}

// plays a note
function playNote(n) {
  if (melody.tempo !== 0) {
    // check if oscilator is started, start it if it hasnt
    let osc = oscillators[n]
    console.log(osc.started)
    if (!osc.started) {
      osc.start();
      osc.started = true;
    }
    // Start playing the note by increasing volume and adding fade in time
    osc.amp(1, 0.01);
    // Stops playing the note after number of seconds stored in noteDuration
    setTimeout(function () { stopNote(n); }, noteDuration * 1000);
  }
}

// Stops playing the note
function stopNote(n) {
  let osc = oscillators[n]
  osc.amp(0);
  osc.started = false;
}

// Plays notes in a song
function play() {
  if (melody.length != 0) {
    // start oscillators
    for (let osc of oscillators) {
      if (!osc.started) {
        osc.start();
        osc.started = true;
      }
    }

    // save notes array
    let notes = melody.notes;

    // read each note in melody
    for (let note in notes) {
      // play each note noteDuration * 1000 * i secs after code runs
      setTimeout(function () { playNote(note); }, noteDuration * 1000 * notes.indexOf(notes));
    }
  }
}
