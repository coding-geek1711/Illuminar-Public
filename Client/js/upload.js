const inputElement = document.querySelector(".drop-zone__input");
const containerElement = document.querySelector(".drop-zone");

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
    updateThumbail(containerElement, event.dataTransfer.files[0]);
  }
  containerElement.classList.remove("drop-zone--over");
});

containerElement.addEventListener("click", () => {
  inputElement.click();
});

inputElement.addEventListener("change", () => {
  if (inputElement.files.length) {
    updateThumbail(containerElement, inputElement.files[0]);
  }
});

const updateThumbail = (containerElement, file) => {
  let thumbailElement = containerElement.querySelector(".drop-zone__thumb");

  // first time, remove the prompt
  if (containerElement.querySelector(".drop-zone-prompt")) {
    containerElement.querySelector(".drop-zone-prompt").remove();
  }
  // first time, no thumbail element
  if (!thumbailElement) {
    thumbailElement = document.createElement("div");
    thumbailElement.classList.add("drop-zone__thumb");
    thumbailElement.draggable = true;
    containerElement.appendChild(thumbailElement);
  }
  thumbailElement.dataset.label = file.name;
  // show thumbnail for image type
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else if (file.type.startsWith("application/pdf")) {
    thumbailElement.style.backgroundImage = `url("imgs/pdf.png")`;
  } else {
    thumbailElement.style.backgroundImage = NULL;
  }

  thumbailElement.addEventListener("dragexit", (event) => {
    console.log("Drag Exit");
  });
};

// Member Function
const showMemberButton = document.querySelector(".show-button");
const displayContainer = document.querySelector(".display-container");
const listContainer = document.querySelector(".list");
let flagForShowMember = 0;

displayContainer.style.display = "none";
showMemberButton.addEventListener("click", (event) => {
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

addMemberButton.addEventListener("click", (event) => {
  var inputValue = document.querySelector("#input-area").value;
  if (inputValue !== "") {
    listNode = document.createElement("li");
    listNode.setAttribute("id", inputValue);
    listNode.setAttribute("draggable", true);
    listNode.setAttribute("ondragstart", "drag(event)");
    listNode.appendChild(document.createTextNode(inputValue));
    listContainer.appendChild(listNode);
  }
});

// Remove Member
const removeMemberButton = document.querySelector(".remove-member");

removeMemberButton.addEventListener("click", (event) => {
  var inputValue = document.querySelector("#input-area").value;
  if (inputValue !== "") {
    listNode = document.getElementById(inputValue);
    listContainer.removeChild(listNode);
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
    var el = document.getElementById(data);
    el.parentNode.removeChild(el);
  }
}

// Upload Video on video-id
const videoId = document.querySelector(".video-id");
const videoButton = document.querySelector(".video-button");
const parentNode = document.querySelector(".youtube-video-link");
/*
<iframe
          class="youtube-link"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/C04xFTV1FvE"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
*/

videoButton.addEventListener("click", (event) => {
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
