var song = "";
var scoreLeftWrist = 0;
var songStatus = "";

var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

function preload(){
    song =  loadSound("music.mp3","music2.mp3")
}

function  setup(){
    canvas = createCanvas(600,500);
    canvas.position(400,200);

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function gotPoses(results){
    if(results.length > 0){
        //console.log(results)

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score pulso esquerdo "+scoreLeftWrist)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("x:"+leftWristX+"y:"+leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y

        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}

function modelLoaded(){
    console.log("posNet foi inicializado")
}

function draw(){
    image(video,0,0,600,500)

    songStatus = song.isPlaying()

    fill("#ff0000")
    stroke("#00EEB5")

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,40)

        console.log("Stop")
        song.stop()
    }
    console.log(songStatus)
    if(!songStatus){
      console.log("Play")
      play()

      document.getElementById("song").innerHTML = "o nome da musica é: musica 1"
    }
}

