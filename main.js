status1 = "";
objects = [];
text1 = "";
function setup(){
    canvas = createCanvas(480, 380);
canvas.position(500, 200);
video = createCapture(VIDEO);
video.hide();
}
function start(){
    x = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
    text1 = document.getElementById("textbox").value;
}
function modelloaded(){
    console.log('The "CoCo" singleshot multibox detection model has loaded!');
    status1 = true;
}
function gotresult(error, result){
if(error){
    console.error(error);
}
else{
    console.log(result);
    objects = result;
}
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status1 != ""){
        x.detect(video, gotresult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x + 13, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == text1){
video.stop();
x.detect(gotresult);
document.getElementById('object').innerHTML = "Object found!";
var synth = window.speechSynthesis;
var y = "Object found!";
var a = new SpeechSynthesisUtterance(y);
synth.speak(a);
            }
            else{
                document.getElementById('object').innerHTML = "Object not found";
                video.play();
            }
        }
    }
}