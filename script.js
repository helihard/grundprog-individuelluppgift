import { newPostTitle, newPostBody, newPostTags, formInactive } from "./form-logic.js";
import { compileNewPost } from "./process-data-utils.js";

//skapar åtkomst till element i html-filen
const postForm = document.querySelector("#create-new-post");
//const newPostTitle = document.querySelector("#new-title");
//const newPostBody = document.querySelector("#new-post");
//const newPostTags = document.querySelectorAll(".new-tag");
const newPostTagsDiv = document.querySelector("#new-tags-div");
const submitBtn = document.querySelector("#submit-new-post");

const newPostsDiv = document.querySelector("#new-posts-div");
const dummyPostsDiv = document.querySelector("#dummy-posts-div");

let tagValues = [];

newPostTags.forEach((checkbox) => {
  checkbox.addEventListener("change", function() {
    if (this.checked && tagValues.length < 3) {
      tagValues.push(this.value);
      console.log(tagValues);
    } else if (this.checked && tagValues.length >= 3) {
      this.checked = false;
    } else {
      for (let i = 0; i < tagValues.length; i++) {
        if (tagValues[i] === this.value) {
          const index = tagValues.indexOf(this.value);
          tagValues.splice(index, 1);
          console.log(tagValues);
        }
      }
    }
  });
});

let posts = [];
let localStoragePosts = localStorage.getItem("posts");

if (localStoragePosts) {
  posts = JSON.parse(localStorage.getItem("posts"));
} else {
  //om det inte finns något i localStorage: hämta inlägg från dummyJSON
  posts = await fetchDummyPosts();
}

//funktion som hämtar inlägg från dummyJSON
async function fetchDummyPosts() {
  const response = await fetch("https://dummyjson.com/posts?limit=5");
  const dummyData = await response.json();
  localStorage.setItem("posts", JSON.stringify(dummyData.posts));
  return dummyData.posts;
}

//skriv ut inlägg från dummyJSON på sidan
for (let i = 0; i < posts.length; i++) {
  let post = posts[i];
  printPost(post, dummyPostsDiv);
}

//funktion som skriver ut nytt inlägg
function printPost(post, element) {
  const newArticle = document.createElement("article");
  const newTitle = document.createElement("h3");
  const newBody = document.createElement("p");
  const newTags = document.createElement("p");
  newTags.classList.add("tag-div");
  const newUpvotedBtn = document.createElement("button");
  const newUpvotedCount = document.createElement("span");
  //newArticle.style.borderBottom = "1px solid var(--darkgrey)";
  //newArticle.style.paddingBottom = "8px";

  //post.body = post.body.replace(/\\n/g, "<br />");

  newTitle.textContent = post.title;
  newBody.innerText = post.body;

  newUpvotedBtn.innerHTML = "<span class='fa-solid fa-temperature-arrow-up fa-lg'>";
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
  element.append(newArticle);

  newUpvotedBtn.addEventListener("click", () => {
    post.reactions++;
    newUpvotedBtn.innerHTML = "<span class='fa-solid fa-fire fa-lg'>";
    newUpvotedCount.textContent = post.reactions;
    post.upvoted = true;
    newUpvotedBtn.style.color = "var(--fire)";
    newUpvotedBtn.style.cursor = "default";
    newUpvotedBtn.classList.add("active");
    newUpvotedBtn.disabled = true;
    localStorage.setItem("posts", JSON.stringify(posts));
  });
  if (post.upvoted) {
    newUpvotedBtn.disabled = true;
    newUpvotedBtn.innerHTML = "<span class='fa-solid fa-fire fa-lg'>";
    newUpvotedBtn.style.color = "var(--fire)";
    newUpvotedBtn.style.cursor = "default";
    newUpvotedBtn.classList.add("active")
  }
}
/*
//när sidan laddas: 
//finns arrayen newPostsArray redan i localStorage? 
//om ja – parse
//om nej – skapa newPostsArray som en tom array
let newPostsArray = localStorage.getItem("newPosts") ? JSON.parse(localStorage.getItem("newPosts")) : [];
//för varje item som finns i newPostsArray, skriv ut
newPostsArray.forEach(printNewPost);*/

//om submit – läs in data från formuläret
postForm.addEventListener("submit", getFormData);

//läser in data från formuläret
function getFormData(event) {
  event.preventDefault();

  /*let post = new Post;
  post.title = newPostTitle.value;
  post.body = newPostBody.value;
  post.reactions = 0;*/

  let title = newPostTitle.value;
  let body = newPostBody.value;
  
  //let checkedTags = [];

  //valda taggar läggs i en array
  /*for (let tag of newPostTags) {
    if (tag.checked === true) { // && checkedTags.length < 3
      checkedTags.push(tag.value);
    }
  }*/

  let tags = tagValues;

  //skriv ut nytt inlägg
  printPost(compileNewPost(title, body, tags, posts), newPostsDiv);
  tagValues = [];
  console.log(tagValues);
  postForm.reset();
  formInactive();
}
