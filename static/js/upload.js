const inputElement = document.querySelector(".drop-zone__input");
const containerElement = document.querySelector(".drop-zone");
const cancelButton = document.querySelector(".removeUploadsButton");
const inputFileData = document.getElementById("inputFileData");

cancelButton.style.display = "none";

const dropZonePrompt = containerElement.querySelector(".drop-zone-prompt");

containerElement.addEventListener("dragover", (event) => {
  event.preventDefault();
  containerElement.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach((type) => {
  containerElement.addEventListener(type, (event) => {
    containerElement.classList.remove("drop-zone--over");
  });
});

containerElement.addEventListener("drop", (event) => {
  event.preventDefault();
  //   console.log(event.dataTransfer.files);
  if (event.dataTransfer.files.length) {
    inputElement.files = event.dataTransfer.files;
    updateThumbail(containerElement, event.dataTransfer.files);
  }
  containerElement.classList.remove("drop-zone--over");
});

containerElement.addEventListener("click", () => {
  inputElement.click();
});

inputElement.addEventListener("change", () => {
  if (inputElement.files.length) {
    updateThumbail(containerElement, inputElement.files);
  }
});

function updateThumbail(containerElement, files) {
  cancelButton.style.display = "";
  const numberOfThumbNailElements = files.length;
  if (dropZonePrompt) {
    dropZonePrompt.remove();
  }
  thumbNailElements = document.querySelectorAll(".drop-zone__thumb");
  // console.log(thumbNailElements);
  if (thumbNailElements.length == 0) {
    let thumbNailElements = [];
    for (var i = 0; i < numberOfThumbNailElements; i++) {
      thumbNailElements[i] = document.createElement("div");
      thumbNailElements[i].classList.add("drop-zone__thumb");
      thumbNailElements[i].draggable = true;
      containerElement.appendChild(thumbNailElements[i]);
      thumbNailElements[i].dataset.label = files[i].name;
    }
    for (var i = 0; i < numberOfThumbNailElements; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (function (thumbNailElement) {
        return function (e) {
          thumbNailElement.style.backgroundImage = `url(${e.target.result})`;
        };
      })(thumbNailElements[i]);
    }
    cancelButton.addEventListener("click", (event) => {
      console.log("Clicked");
      thumbNailElements.forEach((thumbNailElement) => {
        thumbNailElement.remove();
        containerElement.appendChild(dropZonePrompt);
      });
      thumbNailElements = [];
      thumbNailElements.forEach((thumbNailElement) => {
        console.log(thumbNailElement);
      });
      // console.log(thumbNailElements);
      // var dropZonePromptShowAgain = document.createElement("span");
    });
  }
}

// Member Function
const showMemberButton = document.querySelector(".show-button");
const displayContainer = document.querySelector(".display-container");
const listContainer = document.querySelector(".list");
let flagForShowMember = 0;

displayContainer.style.display = "none";
showMemberButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (flagForShowMember % 2 == 0) {
    displayContainer.style.display = "";
  } else {
    displayContainer.style.display = "none";
    document.querySelector("#input-area").value = "";
  }
  flagForShowMember++;
});

// Add Member
const addMemberButton = document.querySelector(".add-member");
var ListOFMembers = ["FIT19EE029"];

addMemberButton.addEventListener("click", (event) => {
  event.preventDefault();
  var inputValue = document.querySelector("#input-area").value;
  if (inputValue !== "") {
    if (
      typeof ListOFMembers.find((user) => user == inputValue) === "undefined"
    ) {
      ListOFMembers.push(inputValue);
      listNode = document.createElement("li");
      listNode.setAttribute("id", inputValue);
      listNode.setAttribute("draggable", true);
      listNode.setAttribute("ondragstart", "drag(event)");
      listNode.appendChild(document.createTextNode(inputValue));
      listContainer.appendChild(listNode);
    }
    // var Users = ListOFMembers.find((user) => user === inputValue);
    console.log(ListOFMembers);
  }
});

// Remove Member
const removeMemberButton = document.querySelector(".remove-member");
removeMemberButton.addEventListener("click", (event) => {
  event.preventDefault();
  var inputValue = document.querySelector("#input-area").value;
  if (inputValue !== "") {
    listNode = document.getElementById(inputValue);
    listContainer.removeChild(listNode);
    ListOFMembers = ListOFMembers.filter((element) => element !== inputValue);
    console.log(ListOFMembers);
  }
  inputValue = "";
});

// Drag and Drop
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  var listValue = document.querySelector(".list");
  if (listValue !== "") {
    ev.dataTransfer.setData("Text", ev.target.id);
  }
}
function drop(ev) {
  ev.preventDefault();
  var listValue = document.querySelector(".list");
  if (listValue !== "") {
    var data = ev.dataTransfer.getData("Text");
    ListOFMembers = ListOFMembers.filter((element) => element !== data);
    console.log(ListOFMembers);
    var el = document.getElementById(data);
    el.parentNode.removeChild(el);
  }
}

// Upload Video on video-id
const videoId = document.querySelector(".video-id");
const videoButton = document.querySelector(".video-button");
const parentNode = document.querySelector(".youtube-video-link");

videoButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (videoId.value !== "") {
    let video = document.querySelector(".youtube-link");
    if (video) {
      parentNode.removeChild(video);
    }
    video = document.createElement("iframe");
    video.setAttribute("class", "youtube-link");
    video.setAttribute("width", "560");
    video.setAttribute("height", "315");
    video.setAttribute("src", `https://www.youtube.com/embed/${videoId.value}`);
    video.setAttribute("frameborder", "0");
    video.setAttribute(
      "allow",
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    );
    video.setAttribute("allowfullscreen", "true");
    parentNode.appendChild(video);
    console.log(videoId.value);
    videoId.value = "";
  }
});

const submitUrl = "http://localhost:3000/projectUploadPage/";
const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", (event) => {
  // event.preventDefault();
  event.preventDefault();
  console.log("Clicked");
  console.log("Form Submission Occuring");
  const projectValues = {
    memberList: ListOFMembers,
    project_name: document.getElementById("Project_Name").innerText,
    guide_name: document.getElementById("guide").innerText,
    year_of_study: document.getElementById("YEAR_OF_STUDY").value,
    type_of_project: document.getElementById("TYPE_OF_PROJECT").value,
  };
  // console.log(projectValues);
  const formData = new FormData();

  Object.keys(projectValues).forEach((key) =>
    formData.append(key, projectValues[key])
  );

  // formData.append("inputMetaData", projectValues);
  // console.log(inputFileData.files);
  for (var i = 0; i < inputFileData.files.length; i++) {
    formData.append(`inputFileData_${i}`, inputFileData.files[i]);
  }
  console.log(formData);
  uploadToServer(submitUrl, "POST", formData).then((response) =>
    console.log(response.response)
  );
});

function uploadToServer(url, method, formData) {
  const req = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    req.onreadystatechange = () => {
      if (req.readyState !== 4) return;
      if (req.status >= 200 && req.status < 300) {
        console.log("Recieved Response");
        return resolve(req);
      } else {
        reject({
          status: req.status,
          statusText: req.statusText,
        });
      }
    };

    req.open(method || "POST", url, true);
    req.upload.addEventListener("progress", (event) => {
      console.log(event);
    });
    req.send(formData);
  });
}
