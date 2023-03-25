let allPostIts = document.querySelectorAll(".postit");
const postList = document.querySelector("ul");
const addButton = document.querySelector(".addbutton");
const getData = window.localStorage;
const dataInspector = document.querySelector(".datainspector");
document.addEventListener("keyup", savePostIt);
addButton.addEventListener("click", addPostIt);

window.localStorage.clear();

if (getData.length !== 0) {
  console.log("Data!");
  console.log(getData.length);
  console.log(getData);
  createPostIts();
} else {
  console.log("No Data!");
  dummyPost();
}

function showData() {
  dataInspector.innerHTML = "";
  let localCount = getData.length;
  console.log(localCount);
  //   let keyCounter = 1;
  for (let keyCounter = 1; keyCounter <= localCount; keyCounter++) {
    console.log(getData[keyCounter]);
    const postDetails = JSON.parse(getData[keyCounter]);

    //   Object.keys(getData).forEach(key => {
    // const postDetails = JSON.parse(getData.getItem(key));
    const cardTitle = postDetails.title;
    const cardContent = postDetails.content;
    const numEntry = document.createElement("div");
    const titleEntry = document.createElement("div");
    const keyEntry = document.createElement("div");

    numEntry.innerHTML = `${keyCounter}`;
    titleEntry.innerHTML = `${cardTitle}`;
    keyEntry.innerHTML = `${keyCounter}`;

    dataInspector.appendChild(numEntry);
    dataInspector.appendChild(titleEntry);
    dataInspector.appendChild(keyEntry);
  }
}

function addPostIt() {
  const postItData = {
    title: "Title",
    content: "Content",
  };
  const addKey = getData.length + 1;
  console.log("Adding Number " + addKey);

  window.localStorage.setItem(addKey, JSON.stringify(postItData));
  createPostIts();
}

function createPostIts() {
  postList.innerHTML = "";
  let localCount = getData.length;
  console.log(localCount);
  //   let keyCounter = 1;
  //   Object.keys(getData).forEach(key => {
  //     keyCounter++;
  //     const postDetails = JSON.parse(getData.getItem(key));
  for (let keyCounter = 1; keyCounter <= localCount; keyCounter++) {
    console.log(getData[keyCounter]);
    const postDetails = JSON.parse(getData[keyCounter]);
    const cardTitle = postDetails.title;
    const cardContent = postDetails.content;
    const newCard = document.createElement("li");
    const newHref = document.createElement("a");
    const newTitle = document.createElement("h2");
    const newBody = document.createElement("p");
    const deleteBox = document.createElement("div");

    deleteBox.classList.add("deleteme");
    deleteBox.innerText = "X";
    newHref.href = "#";
    newHref.setAttribute("contenteditable", "true");
    newHref.classList.add("postit");
    newCard.id = keyCounter;
    newTitle.innerText = cardTitle;
    newBody.innerText = cardContent;
    newCard.appendChild(newHref);
    newHref.appendChild(newTitle);
    newHref.appendChild(newBody);
    postList.appendChild(newCard);
    // console.log(newCard);
  }
  allPostIts = document.querySelectorAll(".postit");
  window.localStorage.clear();
  savePostIt();
}

function dummyPost() {
  console.log("starting Dummy Post");
  postList.innerHTML = "";
  let localCount = getData.length;
  console.log(localCount);
  const newCard = document.createElement("li");
  const newHref = document.createElement("a");
  const newTitle = document.createElement("h2");
  const newBody = document.createElement("p");
  const deleteBox = document.createElement("div");

  newHref.href = "#";
  newHref.setAttribute("contenteditable", "true");
  newHref.classList.add("postit");
  deleteBox.classList.add("deleteme");
  deleteBox.innerText = "X";
  newCard.id = 1;
  newTitle.innerText = "Title Here";
  newBody.innerText = "Content Here";
  newCard.appendChild(newHref);
  newCard.appendChild(deleteBox);
  newHref.appendChild(newTitle);
  newHref.appendChild(newBody);
  postList.appendChild(newCard);
  console.log(newCard);

  allPostIts = document.querySelectorAll(".postit");
  window.localStorage.clear();
  console.log("Dummy Post Created");

  savePostIt();
}

function savePostIt() {
  window.localStorage.clear();

  var keyCounter = 1;
  for (let k of allPostIts) {
    const titleText = k.querySelector("h2").innerText;
    const bodyText = k.querySelector("p").innerText;
    const postItKey = keyCounter;
    console.log("id: " + k.id);
    const thisLi = k.parentElement;
    const index = [thisLi.parentElement.children].indexOf(thisLi);
    console.log(thisLi.parentElement.children);

    const postItData = {
      title: titleText,
      content: bodyText,
    };
    console.log("Post It #" + postItKey + " " + titleText + " Added. ");
    window.localStorage.setItem(postItKey, JSON.stringify(postItData));
    keyCounter++;
  }
  console.log(window.localStorage.length + " cards");
  showData();
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
