import { newPostTitle, newPostBody, newPostTags, formInactive } from "./form-logic.js";

//skapar åtkomst till element i html-filen
const postForm = document.querySelector("#create-new-post");
const newPostsDiv = document.querySelector("#new-posts-div");

//skapar en klass för nya inlägg
class Post {
  constructor(title, body, tags) {
    this.title = title;
    this.body = body;
    this.tags = tags;
  }
}

//skriver ut nytt inlägg
function printNewPost(post) {
  const newArticle = document.createElement("article");
  const newTitle = document.createElement("h3");
  const newBody = document.createElement("p");
  const newTags = document.createElement("p");
  newTags.classList.add("tag-div");
  const newUpvotedBtn = document.createElement("button");
  const newUpvotedCount = document.createElement("span");

  post.body = post.body.replace(/\\n/g, "<br />");

  newTitle.textContent = post.title;
  newBody.innerText = post.body;

  newUpvotedBtn.innerHTML = "<span class='fa-regular fa-thumbs-up fa-lg'>";
  newUpvotedCount.textContent = post.reactions;
  
  newArticle.append(newTitle, newBody);
  if (post.tags !== "") {
    post.tags.forEach((tag) => {
      const newTagSpan = document.createElement("span");
      newTagSpan.classList.add("tag-span");
      newTagSpan.textContent = tag;
      newTags.append(newTagSpan);
      newArticle.append(newTags);
    });
  }
  newArticle.append(newUpvotedBtn, newUpvotedCount);
  newPostsDiv.append(newArticle);

  newUpvotedBtn.addEventListener("click", () => {
    post.reactions++;
    newUpvotedBtn.innerHTML = "<span class='fa-solid fa-thumbs-up fa-lg'>";
    newUpvotedCount.textContent = post.reactions;
    post.upvoted = true;
    newUpvotedBtn.classList.add("active");
    newUpvotedBtn.disabled = true;
    localStorage.setItem("newPosts", JSON.stringify(newPostsArray));
  });
  if (post.upvoted) {
    newUpvotedBtn.disabled = true;
    newUpvotedBtn.innerHTML = "<span class='fa-solid fa-thumbs-up fa-lg'>";
    newUpvotedBtn.classList.add("active")
  }
}

//när sidan laddas: 
//finns arrayen newPostsArray redan i localStorage? 
//om ja – parse
//om nej – skapa newPostsArray som en tom array
let newPostsArray = localStorage.getItem("newPosts") ? JSON.parse(localStorage.getItem("newPosts")) : [];
//för varje item som finns i newPostsArray, skriv ut
newPostsArray.forEach(printNewPost);

//om submit – läs in data från formuläret
postForm.addEventListener("submit", getFormData);

//läser in data från formuläret
function getFormData(event) {
  event.preventDefault();

  let title = newPostTitle.value;
  let body = newPostBody.value;
  let checkedTags = [];

  //valda taggar läggs i en array
  for (let tag of newPostTags) {
    if (tag.checked === true) { // && checkedTags.length < 3
      checkedTags.push(tag.value);
    }
  }

  //skriv ut nytt inlägg
  printNewPost(compileNewPost(title, body, checkedTags));
  postForm.reset();
  formInactive();
}

//sammanställer hämtad data från formuläret till ett inlägg
function compileNewPost(title, body, tags) {

  let newPost = new Post(title, body, tags);
  newPost.reactions = 0;


  //tar bort mellanslag och radbrytningar i början och slutet av titeln och inläggstexten
  newPost.title = newPost.title.trim();
  newPost.body = newPost.body.trim();

  //autogenerera titel från inläggstexten om användaren inte angett titel
  if (newPost.title === "") {
    newPost.title = renderDefaultTitle(newPost.body);
  } else {
    newPost.title;
  }
  newPostsArray.push(newPost);
  localStorage.setItem("newPosts", JSON.stringify(newPostsArray));
  return newPost;
}

//autogenererar titel
function renderDefaultTitle(body) {
  //delar upp inlägget i rader
  //alla tomma rader blir en tom sträng i arrayen även om de innehåller mellanslag
  const splitByNewLine = body.split(/\r?\n/).map(line => line.trim());
  
  //första raden i inlägget
  const firstLine = splitByNewLine[0];

  //tar bort resterande items i arrayen
  for (let i = 1; i < splitByNewLine.length; i++) {
    splitByNewLine.pop();
    i--;
  }

  //console.log(splitByNewLine);
 
  //delar upp första raden i ord
  const splitByWhiteSpace = firstLine.split(" ");
  //console.log(splitByWhiteSpace);
  const defaultTitleArray = [];

  //lägger bestämt maxantal ord i arrayen som ska bli inläggets genererade titel
  for (let i = 0; i < splitByWhiteSpace.length; i++) {
    let word = splitByWhiteSpace[i];

    //max sex ord i titeln
    if (i < 6) {
      defaultTitleArray.push(word);
    }
  }

  //skapar en string av arrayen: detta är titeln
  let defaultTitle = defaultTitleArray.join(" ");

  //returnerar titeln
  return defaultTitle;
}
