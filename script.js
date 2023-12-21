import { newPostTitle, newPostBody, clearForm, tagValues } from "./form-logic.js";
import { renderDefaultTitle } from "./process-data-utils.js";

//skapar åtkomst till element i html-filen
const postForm = document.querySelector("#create-new-post");
const postsDiv = document.querySelector("#posts-div");
const topics = document.querySelectorAll(".topics-tab");
const allPostsTab = document.querySelector("#all-posts");

//skapar en klass för nya inlägg
class Post {
  constructor(title, body, tags) {
    //tar bort mellanslag och radbrytningar i början och slutet av titeln
    //generera titel från inläggstexten om användaren inte angett titel
    this.title = title.trim().length > 0 ? title.trim() : renderDefaultTitle(body);
    //tar bort mellanslag och radbrytningar i början och slutet av inläggstexten
    this.body = body.trim();
    this.tags = tags;
    this.reactions = 0;
    this.upvoted = false;
  }
}

window.onload = function () {
  clearForm(postForm);
  newPostBody.disabled = false;
  allPostsTab.classList.add("active-tab");
}

let posts = [];
let localStoragePosts = localStorage.getItem("posts");

//om det finns något i localStorage: hämta
if (localStoragePosts) {
  posts = JSON.parse(localStoragePosts);
} else {
  //om det inte finns något i localStorage: hämta inlägg från dummyJSON
  posts = await fetchDummyPosts();
}

//hämtar inlägg från dummyJSON
async function fetchDummyPosts() {
  const response = await fetch("https://dummyjson.com/posts");
  const dummyData = await response.json();
  localStorage.setItem("posts", JSON.stringify(dummyData.posts));
  return dummyData.posts;
}

//skriv ut inlägg från localStorage på sidan
for (let i = 0; i < posts.length; i++) {
  let post = posts[i];
  printPost(post);
}

//skriver ut inlägg
function printPost(post) {
  const newArticle = document.createElement("article");
  const newTitle = document.createElement("h3");
  const newBody = document.createElement("p");
  const newTags = document.createElement("p");
  newTags.classList.add("tag-div");
  const newUpvotedBtn = document.createElement("button");
  const newUpvotedCount = document.createElement("span");

  newTitle.textContent = post.title;
  newBody.innerText = post.body //.replace(/\\n/g, "<br />");

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
  postsDiv.append(newArticle);

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
    newUpvotedBtn.classList.add("active");
  }
}

//om submit – läs in data från formuläret
postForm.addEventListener("submit", getFormData);

//läser in data från formuläret
function getFormData(event) {
  event.preventDefault();

  let title = newPostTitle.value;
  let body = newPostBody.value;
  let tags = tagValues;

  let post = new Post(title, body, tags)
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  //skriv ut nytt inlägg
  printPost(post);
  clearForm(postForm);
}

//filtrering på taggar
for (let i = 0; i < topics.length; i++) {
  topics[i].addEventListener("click", () => {
    let tag = topics[i].getAttribute("name");
    let filteredTopicsArray = filterByTag(posts, tag);
    let hotTopics = filterByUpvoted(posts);
    inactivateTabs();
    topics[i].classList.add("active-tab");
    clearForm(postForm);

    if (tag === "hot") {
      newPostBody.disabled = true;
      postsDiv.textContent = "";
      if (hotTopics.length === 0) {
        postsDiv.textContent = "Nothing to see here :("
      } else {
        printFilteredPosts(hotTopics);
      }
    } else if (tag === "all") {
      newPostBody.disabled = false;
      postsDiv.textContent = "";
      printFilteredPosts(posts);
    } else {
      newPostBody.disabled = true;
      postsDiv.textContent = "";
      printFilteredPosts(filteredTopicsArray);
    }
  });
}

function filterByTag(array, tag) {
  return array.filter((post) => post.tags.includes(tag));
}

function printFilteredPosts(array) {
  array.forEach((post) => printPost(post));
}

function filterByUpvoted(array) {
  return array.filter((post) => post.upvoted);
}

function inactivateTabs() {
  topics.forEach((topic) => topic.classList.remove("active-tab"));
}
