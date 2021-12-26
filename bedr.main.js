img="";
status="";
objects=[];

function preload() {
    img=loadImage("ac-rooms.jpg");
}

function setup() {
    canvas=createCanvas(670, 400);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Is Loaded!");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
    console.log(error);
    }
    console.log(results);
    objects=results;
}

function back() {
    window.location="index.html";
}

function draw() {
    image(img, 0, 0, 740, 400);

    if(status != "") {
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status: Objects detected";
            document.getElementById("number_of_objects_detected").innerHTML="There are 5 big objects in the image from which cocossd model has detected "+objects.length+" objects.";
            fill("blue");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}