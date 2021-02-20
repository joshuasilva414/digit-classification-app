window.addEventListener('load', () => {
    const canvas = document.querySelector("#big-canvas");
    const context = canvas.getContext('2d');

    //Resizing
    canvas.height = 500;
    canvas.width = 500;

    //variables
    let drawing = false;

    function startPosition(e) {
        drawing = true;
        draw(e);
    }
    function finishedPosition() {
        drawing = false;
        context.beginPath();
    }

    function draw(e){
        if(!drawing) return;
        context.lineWidth = 10;
        context.lineCap = "round";

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    //EventListeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});

function clearCanvas()
{   
    const bigCanvas = document.getElementById("big-canvas");
    const bigContext = bigCanvas.getContext('2d');
    bigContext.clearRect(0, 0, bigCanvas.width, bigCanvas.height);
    const smallCanvas = document.getElementById("small-canvas");
    const smallContext = smallCanvas.getContext('2d');
    smallContext.clearRect(0, 0, smallCanvas.width, smallCanvas.height)
}

function submitDigit()
{
    const bigCanvas = document.querySelector("#big-canvas");
    const bigContext = bigCanvas.getContext("2d");
    const scaleFactor = 28/bigCanvas.width;
    const smallCanvas = document.querySelector("#small-canvas");
    smallCanvas.height = 28;
    smallCanvas.width = 28;
    const smallContext = smallCanvas.getContext("2d");
    smallContext.scale(scaleFactor, scaleFactor);
    smallContext.drawImage(bigCanvas, 0, 0);
    const smallImageData = smallContext.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
    // smallContext.scale(bigCanvas.width/28, bigCanvas.width/28);
    var tensor = tf.browser.fromPixels(smallImageData, 4);
    console.log(tensor.shape);
    var input = tensor.split(4, axis=2)[3];
    input = input.reshape([28*28]);
    var model = await tf.loadLayersModel('https://github.com/prosh14/digit-classification-app/blob/master/digit_classifier.h5?raw=true');
    console.log(model.predict(input))
}