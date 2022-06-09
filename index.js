// "use strict";

const Url = "./my_model/";
const modelURL = Url + "model.json";
const metadataURL = Url + "metadata.json";

let model;
let file;
let image = document.getElementById("image");

function loadFile(input) {
    file = input.files[0];

    console.log(input.files[0].name);
    //console.log(input);
    // console.log(input.files[0]);
    //console.log(file.name);

    var name = document.getElementById('fileName');
    name.textContent = file.name;

    image.src = URL.createObjectURL(file);
    image.style.width = "500px";
    image.style.height = "500px";
};


async function init() {
    console.log("init() call");


    // console.log(modelURL);
    // console.log(metadataURL);

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();



    predict();
}

async function predict() {
    console.log(file.name);
    var prediction = await model.predict(image, false);
    console.log(prediction[0].probability);
    if(prediction[0].probability > 0.5){
        console.log('고양이');
    }else{
        console.log('그 외');
    }

    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    // }
}