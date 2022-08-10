let sineShader, slidesShader;
let textSrc;
let text1;
let shaderLayer;
let amtX = 50;
let amtY = 50;
let txtSize = 300;
let testText = "RAYO";
let level;
let jazz;
let laugh;
let rock;
let dance;

let input;

let mode = 2;
let mode2 = 3;
var mic;
let sound;
let mouse;
let shaderSelect;

function preload() {
  sineShader = loadShader("basic.txt", "sine.txt");
  slidesShader = loadShader("basic.txt", "slides.txt");

  jazz = loadSound(
    "Gregory-Porter-sings-Musical-Genocide-and-Natural-Blues-Jazz-FM-Session-vidiget-dot-com-225617_1_1.mp3"
  );

  rock = loadSound("Y2Mateis-Queen-Bohemian-Rhapsody (1).mp3");

  dance = loadSound(
    "Y2Mate.is - lovestation teardrops wildcat dub-UJa3CjZMcs0-160k-1658316936381_1.mp3"
  );

  laugh = loadSound(
    "Ian-Wright-and-Christian-O-Connell-crack-up-laughing-on-Absolute-Radio-vidiget-dot-com-225578_1_1.mp3"
  );

  radio = loadSound(
    "Y2Mate.is - Absolute Radio News (050322)-La-MjzYYEYs-128k-1658915791924_1.mp3"
  );

  WildYouth = loadFont("Wild Youth.otf");

  DMSans = loadFont("DMSans-Regular.ttf");

  Twent = loadFont("TWENTest-Medium.otf");

  Mabry = loadFont("mabry-bold-italic-pro.ttf");
}

function setup() {
  //colorMode(RGB, 1.0);

  noStroke();

  pixelDensity(2.0);

  canvas = createCanvas(windowWidth, windowHeight);

  textSrc = createGraphics(windowWidth * 2, windowHeight * 2);

  shaderLayer = createGraphics(windowWidth, windowHeight, WEBGL);

  input1 = select("#input1");
  input1.input(updateText);

  shaderSelect = select("#shaderSelect");
  shaderSelect.changed(chooseMode);

  genre = select("#Genre");
  genre.changed(choosegenre);

  Font = select("#Font");
  Font.changed(choosefont);

  textscale = select("#textscale");

  repeattextY = select("#repeattextY");
  repeattextX = select("#repeattextX");

  Colour = select("#Colour");
  Colour.input(choosecolourtext);
  
  microphone = select("#microphone");
  microphone.mousePressed(microphoneon);

  textSrc.textFont(Twent);
  textSrc.fill("#FFFFFF");
  textSrc.background("#8F00FF");
  
  save1 = select("#save");
  save1.mousePressed(save2);

  amplitude = new p5.Amplitude();
  
  mic = new p5.AudioIn();
  mic.start();
  
   mode2 = 1;
  
 // colorPicker = createColorPicker("#8F00FF");
  //colorPicker.position(CENTER,CENTER);
  
  BackgroundColour = select("#jackgroundColour");
  BackgroundColour.changed(choosebackgroundcolour);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}

function draw() {

  
  textSrc.background(BackgroundColour.value());

  image(shaderLayer, 0, 0, windowWidth, windowHeight);

  let level = amplitude.getLevel();
  let vol = mic.getLevel();
  

  textSrc.textAlign(CENTER, CENTER);
  //textSrc.text(testText, windowWidth +200, windowHeight -200);

  for (let y1 = repeattextY.value(); y1 >= 0; y1--) {
    textSrc.text(testText, windowWidth *1.1,windowHeight / 1.4 + y1 * repeattextY.value() * 50);  
  }

  for (let y2 = repeattextY.value(); y2 >= 0; y2--) {
    textSrc.text(testText,windowWidth *1.1,windowHeight / 1.4 - y2 * repeattextY.value() * 50);
  } 

  

  if (mode == 1) {

    
     let vol = mic.getLevel();

    shaderLayer.shader(sineShader);
    sineShader.setUniform("tex0", textSrc);
    let offsetX = map(vol, 0, 0.3, 0, 200);
    let offsetY = map(vol, 0, 0.3, 0.001, 0.01);
    sineShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0, 0, windowWidth * 2, windowHeight * 2);

    textSrc.textSize(
      map(vol, 0, 0.2, textscale.value(), +textscale.value() * 1.5)
    );
  } else if (mode == 2) {
     let vol = mic.getLevel();

    shaderLayer.shader(slidesShader);
    slidesShader.setUniform("tex0", textSrc);
    let offsetX = map(vol, 0, 0.3, -50, 50);
    let offsetY = map(vol, 0, 0.3, 0.001, 0.05);
    slidesShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0, 0, windowWidth * 2, windowHeight * 2);

    textSrc.textSize(
      map(vol, 0, 0.2, textscale.value(), +textscale.value() * 1.5)
    );
  }
  if (mode == 1 && mode2 == 2) {
    shaderLayer.shader(sineShader);
    sineShader.setUniform("tex0", textSrc);
    let offsetX = map(mouseX, 0, width, 0, 200);
    let offsetY = map(mouseY, 0, height, 0.001, 0.01);
    sineShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0, 0, windowWidth * 2, windowHeight * 2);
    mic.stop();
  } else if (mode == 2 && mode2 == 2) {
    shaderLayer.shader(slidesShader);
    slidesShader.setUniform("tex0", textSrc);
    let offsetX = map(mouseX, 0, width, -50, 50);
    let offsetY = map(mouseY, 0, height, 0.001, 0.05);
    slidesShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0, 0, windowWidth * 2, windowHeight * 2);
    mic.stop();
  }

  if (mode == 1 && mode2 == 3) {
    let level = amplitude.getLevel();

    shaderLayer.shader(sineShader);
    sineShader.setUniform("tex0", textSrc);
    let offsetX = map(level, 0, 0.3, 0, 200);
    let offsetY = map(level, 0, 0.3, 0.001, 0.01);
    sineShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0, 0, windowWidth * 2, windowHeight * 2);
     mic.stop();

    textSrc.textSize(
      map(level, 0, 0.2, textscale.value(), +textscale.value() * 1.5)
    );
  } else if (mode == 2 && mode2 == 3) {
     let level = amplitude.getLevel();

    shaderLayer.shader(slidesShader);
    slidesShader.setUniform("tex0", textSrc);
    let offsetX = map(level, 0, 0.3, -50, 50);
    let offsetY = map(level, 0, 0.3, 0.001, 0.05);
    slidesShader.setUniform("offset", [offsetX, offsetY]);
    shaderLayer.rect(0, 0, windowWidth * 2, windowHeight * 2);
     mic.stop();

    textSrc.textSize(
      map(level, 0, 0.2, textscale.value(), +textscale.value() * 1.5)
    );
  }
}
function jazzon() {
  amplitude = new p5.Amplitude();
  amplitude.setInput(jazz);
}

function laughon() {
  amplitude = new p5.Amplitude();
  amplitude.setInput(laugh);
}

function rockon() {
  amplitude = new p5.Amplitude();
  amplitude.setInput(rock);
}

function danceon() {
  amplitude = new p5.Amplitude();
  amplitude.setInput(dance);
}

function updateText() {
  testText = input1.value();
}

function chooseMode() {
  if (shaderSelect.value() == "Slides") {
    mode = 2;
  }
  if (shaderSelect.value() == "Wavy") {
    mode = 1;
  }
}

function choosegenre() {
  if (genre.value() == "Microphone") {
     mode2 = 1;

    getAudioContext().resume();
    mic = new p5.AudioIn();
  mic.start();
  }

  if (genre.value() == "None") {
    mic.stop();
   mode2 = 2;
  }

  if (genre.value() == "Jazz") {
  mode2 = 3;
    amplitude = new p5.Amplitude();

    jazz.play();
  } else {
    jazz.stop();
  }
  if (genre.value() == "Rock") {
    mode2 = 3;

    amplitude = new p5.Amplitude();
    rock.play();
  } else {
    rock.stop();
  }
  if (genre.value() == "Dance") {
 mode2 = 3;

    amplitude = new p5.Amplitude();
    dance.play();
  } else {
    dance.stop();
  }
  if (genre.value() == "Laugh") {
 mode2 = 3;

    amplitude = new p5.Amplitude();
    laugh.play();
  } else {
    laugh.stop();
  }
  if (genre.value() == "Radio") {
    mode2 = 3;

    amplitude = new p5.Amplitude();
    radio.play();
  } else {
    radio.stop();
  }
}

function save2() {
  // If you hit the s key, save an image
 
    save("RAYO.png");
}

function choosefont() {
  if (Font.value() == "WildYouth") {
    textSrc.textFont(WildYouth);
  }

  if (Font.value() == "DMSans") {
    textSrc.textFont(DMSans);
  }

  if (Font.value() == "Twent") {
    textSrc.textFont(Twent);
  }
  if (Font.value() == "Mabry") {
    textSrc.textFont(Mabry);
  }
}
function choosecolourtext() {
  if (Colour.value() == "White") {
    textSrc.fill("#FFFFFF");

  }

  if (Colour.value() == "Purple") {
    textSrc.fill("#8F00FF");

  }
  if (Colour.value() == "Yellow") {
    textSrc.fill("#FFE809");

  }
  if (Colour.value() == "Black") {
    textSrc.fill("#1A1A1A");
    
  }
}

function choosebackgroundcolour() {
  if (BackgroundColour.value() == "Yellow") {
    textSrc.background("#FFE809");
    
  }

  if (BackgroundColour.value() == "Purple") {
    textSrc.background("#8F00FF");
  }
  if (BackgroundColour.value() == "Black") {
    textSrc.background("#1A1A1A");
  }
  if (BackgroundColour.value() == "White") {
    textSrc.background("#FFFFFF");
  }
}

function microphoneon() {
  
 getAudioContext().resume();
    mic = new p5.AudioIn();
  mic.start();
  
   mode2 = 1;
  
}

function keyTyped() {
  
  if (key == '1') {
    save("RAYO.png");
  }
  
}

