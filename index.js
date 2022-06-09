var submit = document.getElementById('submitButton');
// submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

// function showImage() {
//     var newImage = document.getElementById('image-show').lastElementChild;
//     newImage.style.visibility = "visible";
    
//     document.getElementById('image-upload').style.visibility = 'hidden';

//     document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
// }

var file;
function loadFile(input) {
    file = input.files[0];

    console.log(input);
    console.log(input.files[0]);
    console.log(file.name);

    var name = document.getElementById('fileName');
    name.textContent = file.name;

};



const Url = "./my_model/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    console.log("init() call");
    const modelURL = Url + "model.json";
    const metadataURL = Url + "metadata.json";

    console.log(modelURL);
    console.log(metadataURL);

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    let image = document.getElementById("image");
    image.src = URL.createObjectURL(file);
    image.style.width = "500px";
    image.style.height = "500px";
    predict(image);
}

async function predict(image) {
    const prediction = await model.predict(image);
    console.log(prediction[0].probability);
    if(prediction[0].probability > 0.5){
        console.log('고양이');
    }else{
        console.log('그 외');
    }

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    }
}