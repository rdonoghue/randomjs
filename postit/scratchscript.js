let allPostIts = document.querySelectorAll(".postit");
let allPostItContainer = document.querySelectorAll("li");
let deleteBoxes = document.querySelectorAll(".deleteme");
var allPostItHeaders = document.querySelectorAll(".cardheader");

const postList = document.querySelector("ul");
const addButton = document.querySelector(".addbutton");
const getData = window.localStorage;
const dataInspector = document.querySelector(".datainspector");
document.addEventListener("keyup", savePostIt);
addButton.addEventListener("click", addPostIt);
for (var k of deleteBoxes) {
  k.addEventListener("click", deletePostIt);
}

window.localStorage.clear();
// if (getData.length !== 0) {
//   console.log(getData.length + " Data Elements");
//   createPostIts();
// } else {
//   console.log("No Data!");
//   dummyPost();
// }
// dummyPost();

// for (let k of allPostItHeaders) {
//   k.addEventListener("click", doSomething);
// }

// function doSomething(e) {
//   console.log("ping");
//   console.log(e.target.parentElement);
// }

enableDrag();

function deletePostIt(e) {
  console.log("ping - " + e.target.parentElement.id);
  getData.removeItem(e.target.parentElement.id);
  createPostIts();
  // createPostIts();
  // createPostIts();
  // createPostIts();
}

function dummyPost() {
  console.log("starting Dummy Post");
  postList.innerHTML = "";
  const newCard = document.createElement("li");
  const newHref = document.createElement("a");
  const newBody = document.createElement("p");
  const deleteBox = document.createElement("div");

  newHref.href = "#";
  newHref.setAttribute("contenteditable", "true");
  newHref.classList.add("postit");
  newCard.classList.add("postitwrapper");
  deleteBox.classList.add("deleteme");
  deleteBox.innerText = "X";
  newCard.id = 1;
  newBody.innerText = "Content Here";
  newCard.appendChild(newHref);
  newCard.appendChild(deleteBox);
  newHref.appendChild(newBody);
  postList.appendChild(newCard);
  console.log(newCard);

  allPostIts = document.querySelectorAll(".postit");
  window.localStorage.clear();

  savePostIt();
}

function savePostIt() {
  window.localStorage.clear();
  allPostIts = document.querySelectorAll(".postit");
  var keyCounter = 1;
  for (let k of allPostIts) {
    const bodyText = k.innerText;
    const postItKey = keyCounter;
    const thisLi = k.parentElement;
    const postItData = {
      content: bodyText,
    };
    window.localStorage.setItem(postItKey, JSON.stringify(postItData));
    keyCounter++;
  }
  showData();
  enableDrag();
}

// if (getData.length !== 0) {
//   console.log("Data!");
//   console.log(getData.length);
//   console.log(getData);
//   createPostIts();
// } else {
//   console.log("No Data!");
//   dummyPost();
// }

function showData() {
  dataInspector.innerHTML = "";
  let localCount = getData.length;
  //   let keyCounter = 1;
  for (let keyCounter = 1; keyCounter <= localCount; keyCounter++) {
    const postDetails = JSON.parse(getData[keyCounter]);
    const numEntry = document.createElement("div");
    const textEntry = document.createElement("div");
    const keyEntry = document.createElement("div");

    numEntry.innerHTML = `${keyCounter}`;
    textEntry.innerHTML = postDetails.content;
    keyEntry.innerHTML = `${keyCounter}`;

    dataInspector.appendChild(numEntry);
    dataInspector.appendChild(textEntry);

    dataInspector.appendChild(keyEntry);
  }
}

function addPostIt() {
  const postItData = {
    content: "Content",
  };
  const addKey = getData.length + 1;

  window.localStorage.setItem(addKey, JSON.stringify(postItData));
  createPostIts();
}

function createPostIts() {
  // console.log("Creating Post:" + getData.length);
  postList.innerHTML = "";
  let localCount = getData.length;
  for (let keyCounter = 1; keyCounter <= localCount + 1; keyCounter++) {
    // That +1 is kind of silly, but it catches it when a post it has been deleted
    if (getData[keyCounter]) {
      // console.log("Post " + keyCounter);
      const postDetails = JSON.parse(getData[keyCounter]);
      const cardContent = postDetails.content;
      const newCard = document.createElement("li");
      const newHref = document.createElement("a");
      const newBody = document.createElement("p");
      const deleteBox = document.createElement("div");
      deleteBox.classList.add("deleteme");

      deleteBox.innerText = "X";
      newHref.href = "#";
      newHref.setAttribute("contenteditable", "true");
      newHref.classList.add("postit");
      newCard.id = keyCounter;
      newBody.innerText = cardContent;
      newCard.appendChild(newHref);
      newCard.appendChild(deleteBox);
      newHref.appendChild(newBody);
      postList.appendChild(newCard);
    }
    // else {
    //   console.log("failed " + keyCounter);
    // }
  }

  allPostIts = document.querySelectorAll(".postit");
  deleteBoxes = document.querySelectorAll(".deleteme");
  for (var k of deleteBoxes) {
    k.addEventListener("click", deletePostIt);
  }
  // console.log("Created Post:" + getData.length);

  savePostIt();
  enableDrag();
}

function enableDrag() {
  allPostItHeaders = document.querySelectorAll(".cardheader");
  // console.log("not ping");
  // console.log(allPostItContainer.length);
  // for (let k of allPostItContainer) {
  // console.log(k);
  // }
  for (let k = 0; k < allPostItContainer.length; k++) {
    dragElement(allPostItHeaders[k]);
    // console.log(allPostItHeaders[k]);
    // console.log("ping");
  }
}

function dragElement(elmnt) {
  console.log(elmnt.parentElement);
  const parentElmnt = elmnt.parentElement;

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    console.log("Something");
    // parentElmnt.parentNode.appendChild(elmnt);
    parentElmnt.style.transition = "none";

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    parentElmnt.style.top = parentElmnt.offsetTop - pos2 + "px";
    parentElmnt.style.left = parentElmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    parentElmnt.style.transition = "0.5s ease";
    parentElmnt.classList.remove("indeck");

    // console.log(elmnt.id);
    // console.log(activeCard.id);
    // console.log(activeCard);
  }
}
