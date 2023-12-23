import { postForm, newPostBody, clearForm, getFormData } from "./form-logic.js";
import printPost, { postsDiv } from "./print-post.js";

//skapar åtkomst till element i html-filen
const topics = document.querySelectorAll(".topics-tab");
const allPostsTab = document.querySelector("#all-posts");

window.onload = function () {
  clearForm();
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

//om submit – läs in data från formuläret
postForm.addEventListener("submit", (event) => getFormData(event, posts));

//filtrering på taggar
for (let i = 0; i < topics.length; i++) {
  topics[i].addEventListener("click", () => {
    let tag = topics[i].getAttribute("name");
    let postsWithSelectedTag = posts.filter((post) => post.tags.includes(tag));
    let hotTopics = posts.filter((post) => post.upvoted);
    topics.forEach((topic) => topic.classList.remove("active-tab"));
    topics[i].classList.add("active-tab");
    clearForm();

    if (tag === "hot") {
      newPostBody.disabled = true;
      postsDiv.textContent = "";
      if (hotTopics.length === 0) {
        postsDiv.textContent = "Nothing to see here :("
      } else {
        hotTopics.forEach((post) => printPost(post));
      }
    } else if (tag === "all") {
      newPostBody.disabled = false;
      postsDiv.textContent = "";
      posts.forEach((post) => printPost(post));
    } else {
      newPostBody.disabled = true;
      postsDiv.textContent = "";
      postsWithSelectedTag.forEach((post) => printPost(post));
    }
  });
}
