import Post from "./Post.js";
import printPost from "./print-post.js";

//logik för formuläret

//skapar åtkomst till element i html-filen, de som behövs i script-filen exporteras
export const postForm = document.querySelector("#create-new-post");
export const newPostTitle = document.querySelector("#new-title");
const titleCharCount = document.querySelector("#title-char-count");
export const newPostBody = document.querySelector("#new-post");
const bodyCharCount = document.querySelector("#body-char-count");
export const newPostTags = document.querySelectorAll(".new-tag");
const newPostTagsDiv = document.querySelector("#new-tags-div");
const submitBtn = document.querySelector("#submit-new-post");

const searchBtn = document.querySelector("#search-button");
const searchBar = document.querySelector("#searchbar");

export function clearForm() {
  postForm.reset();
  tagValues = [];
  newPostBody.style.height = "auto";
  newPostTitle.style.display = "none";
  titleCharCount.style.display = "none";
  titleCharCount.textContent = "70/70 chars remain";
  newPostTagsDiv.style.display = "none";
  bodyCharCount.style.display = "none";
  bodyCharCount.textContent = "2000/2000 chars remain";
  submitBtn.style.display = "none";
  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "var(--lightgrey)";
  submitBtn.style.cursor = "default";
}

//visar hela formuläret vid fokus i textarea
newPostBody.addEventListener("focus", () => {
  newPostBody.style.height = "200px";
  newPostTitle.style.display = "inline-block";
  titleCharCount.style.display = "inline-block";
  newPostTagsDiv.style.display = "block";
  bodyCharCount.style.display = "inline-block";
  submitBtn.style.display = "block";

  submitBtn.disabled = true;
  //kollar om det finns text i textarea
  newPostBody.addEventListener("input", function () {
    let valueToCheck = this.value;

    //tar bort whitespace i början och slutet av texten
    let trimmedNewBodyValue = valueToCheck.trim();

    //om textarea inte är tom och om det inmatade inte enbart är whitespaces: visa submitknappen
    //(endast text i textarea är obligatoriskt för att kunna posta)
    if (valueToCheck.length > 0 && trimmedNewBodyValue.length !== 0) {
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = "var(--fire)";
      submitBtn.style.cursor = "pointer";
    } else if (valueToCheck.length === 0 && trimmedNewBodyValue.length === 0) {
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = "var(--lightgrey)";
      submitBtn.style.cursor = "default";
    }
  });
});

newPostTitle.addEventListener("keyup", function () {
  let str = newPostTitle.value;
  let max = 70;
  if (str.length > 0) {
    titleCharCount.textContent = `${(max - str.length)}/${max} chars remain`;
  } else {
    titleCharCount.textContent = "70/70 chars remain";
  }
});

newPostBody.addEventListener("keyup", function () {
  let str = newPostBody.value;
  let max = 2000;
  if (str.length > 0) {
    bodyCharCount.textContent = `${(max - str.length)}/${max} chars remain`;
  } else {
    bodyCharCount.textContent = "2000/2000 chars remain";
  }
});

export let tagValues = [];
newPostTags.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked && tagValues.length < 3) {
      tagValues.push(this.value);
    } else if (this.checked && tagValues.length >= 3) {
      this.checked = false;
    } else {
      for (let i = 0;i < tagValues.length;i++) {
        if (tagValues[i] === this.value) {
          const index = tagValues.indexOf(this.value);
          tagValues.splice(index, 1);
        }
      }
    }
  });
});

//läser in data från formuläret
export function getFormData(event, posts) {
  event.preventDefault();

  let title = newPostTitle.value;
  let body = newPostBody.value;
  let tags = tagValues;

  let post = new Post(title, body, tags)
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  //skriv ut nytt inlägg
  printPost(post);
  clearForm();
}

searchBtn.addEventListener("click", () => {
  let search = searchBar.value;
  if (searchBar.value !== "") {
    window.open("https://www.google.com/search?q=" + search, "_blank");
    searchBar.value = "";
  }
});

searchBar.addEventListener("keydown", (event) => {
  let search = searchBar.value;
  if (event.key === "Enter" && searchBar.value !== "") {
    window.open("https://www.google.com/search?q=" + search, "_blank");
    searchBar.value = "";
  }
});
