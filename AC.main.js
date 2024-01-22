ac_img="";
var status="";
objects=[];

function preload()
{
    ac_img=loadImage('AC.jpg');
}

function setup()
{
    canvas=createCanvas(640,350);
    canvas.position(600,200);
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Object";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    var status=true;
    object_detector.detect(ac_img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}

function draw()
{
    image(ac_img,0,0,640,350);

    if(status != "")
    {
        for(i=0;i<objects.length;i++)
        {
           document.getElementById("status").innerHTML="Status:Object Detected"; 

           fill('#fc0303');
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+" %",objects[i].x,objects[i].y);
           noFill();
           stroke('#fc0303');
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}