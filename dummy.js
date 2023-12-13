const dummyPostsDiv = document.querySelector("#dummy-posts-div");

let storedDummyPosts = await fetchDummyData();
storedDummyPosts.forEach(printDummyPost);

async function fetchDummyData() {
  const localStoragePosts = localStorage.getItem("dummyPosts"); 
  if (localStoragePosts) {
    console.log("Jag har fetchat klart!");
    return JSON.parse(localStoragePosts); 
  } else {
      const response = await fetch("https://dummyjson.com/posts?limit=5");
      const dummyData = await response.json();
      localStorage.setItem("dummyPosts", JSON.stringify(dummyData.posts));
      console.log("Jag har fetchat första gången!");
      return dummyData.posts;
  }
}

function printDummyPost(post) {
  
  const dummyArticle = document.createElement("article");
  const dummyTitle = document.createElement("h3");
  const dummyBody = document.createElement("p");
  const dummyTags = document.createElement("p");
  dummyTags.classList.add("tag-div");
  const dummyUpvotedBtn = document.createElement("button");
  const dummyUpvotedCount = document.createElement("span");
  //dummyArticle.style.borderBottom = "1px solid var(--darkgrey)";
  //dummyArticle.style.paddingBottom = "8px";

  post.tags.forEach((tag) => {
    const dummyTagSpan = document.createElement("span");
    dummyTagSpan.classList.add("tag-span");
    dummyTagSpan.textContent = tag;
    dummyTags.append(dummyTagSpan);
  });

  dummyTitle.textContent = post.title;
  dummyBody.textContent = post.body;
  dummyUpvotedBtn.innerHTML = "<span class='fa-solid fa-temperature-arrow-up fa-lg'>";
  dummyUpvotedCount.textContent = post.reactions;

  dummyArticle.append(dummyTitle, dummyBody, dummyTags, dummyUpvotedBtn, dummyUpvotedCount);
  dummyPostsDiv.append(dummyArticle);

  dummyUpvotedBtn.addEventListener("click", () => {
    post.reactions++;
    dummyUpvotedBtn.innerHTML = "<span class='fa-solid fa-fire fa-lg'>";
    dummyUpvotedCount.textContent = post.reactions;
    post.upvoted = true;
    dummyUpvotedBtn.style.color = "var(--fire)";
    dummyUpvotedBtn.style.cursor = "default";
    dummyUpvotedBtn.classList.add("active");
    dummyUpvotedBtn.disabled = true;
    localStorage.setItem("dummyPosts", JSON.stringify(storedDummyPosts));
  })
  if (post.upvoted) {
    dummyUpvotedBtn.disabled = true;
    dummyUpvotedBtn.innerHTML = "<span class='fa-solid fa-fire fa-lg'>";
    dummyUpvotedBtn.style.color = "var(--fire)";
    dummyUpvotedBtn.style.cursor = "default";
    dummyUpvotedBtn.classList.add("active");
  }
}