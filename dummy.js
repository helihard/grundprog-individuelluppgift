const dummyPostsDiv = document.querySelector("#dummy-posts-div");

let storedDummyPosts = [];

async function fetchDummyData() {
  const localStoragePosts = localStorage.getItem("dummyPosts"); 
  if (localStoragePosts) {
    storedDummyPosts = JSON.parse(localStoragePosts); 
    printDummyData(storedDummyPosts);
    console.log(storedDummyPosts);
  } else {
    const response = await fetch("https://dummyjson.com/posts?limit=5");
    const dummyData = await response.json();
    storedDummyPosts = dummyData.posts;
    localStorage.setItem("dummyPosts", JSON.stringify(storedDummyPosts));
    printDummyData(storedDummyPosts);
    console.log("jag har fetchat klart!")
  }
}

fetchDummyData();



/*
//hämtar inlägg från DummyJSON
//sparar inlägg i localStorage - får se om det går att göra något med detta
(async () => {
  const response = await fetch("https://dummyjson.com/posts?limit=5");
  const dummyData = await response.json();
  localStorage.setItem("dummyPosts", JSON.stringify(dummyData.posts));
  printDummyData(dummyData.posts);
})();*/

//skriver ut inlägg från DummyJSON
//se om det går att göra en gemensam printfunktion för nya och gamla inlägg
function printDummyData(posts) {
  posts.forEach((post) => {
  
    const dummyArticle = document.createElement("article");
    const dummyTitle = document.createElement("h3");
    const dummyBody = document.createElement("p");
    const dummyTags = document.createElement("p");
    dummyTags.classList.add("tag-div");
    const dummyUpvotedBtn = document.createElement("button");
    const dummyUpvotedCount = document.createElement("span");

    post.tags.forEach((tag) => {
      const dummyTagSpan = document.createElement("span");
      dummyTagSpan.classList.add("tag-span");
      dummyTagSpan.textContent = tag;
      dummyTags.append(dummyTagSpan);
    });

    dummyTitle.textContent = post.title;
    dummyBody.textContent = post.body;
    dummyUpvotedBtn.innerHTML = "<span class='fa-regular fa-thumbs-up fa-lg'>";
    dummyUpvotedCount.textContent = post.reactions;

    dummyArticle.append(dummyTitle, dummyBody, dummyTags, dummyUpvotedBtn, dummyUpvotedCount);
    dummyPostsDiv.append(dummyArticle);

    dummyUpvotedBtn.addEventListener("click", () => {
      post.reactions++;
      dummyUpvotedBtn.innerHTML = "<span class='fa-solid fa-thumbs-up fa-lg'>";
      dummyUpvotedCount.textContent = post.reactions;
      post.upvoted = true;
      dummyUpvotedBtn.classList.add("active");
      dummyUpvotedBtn.disabled = true;
      localStorage.setItem("dummyPosts", JSON.stringify(storedDummyPosts));
    })
    if (post.upvoted) {
      dummyUpvotedBtn.disabled = true;
      dummyUpvotedBtn.innerHTML = "<span class='fa-solid fa-thumbs-up fa-lg'>";
      dummyUpvotedBtn.classList.add("active");
    }
  });
}