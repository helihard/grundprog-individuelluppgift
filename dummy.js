const dummyPostsDiv = document.querySelector("#dummy-posts-div");

//hämtar inlägg från DummyJSON
//sparar inlägg i localStorage - får se om det går att göra något med detta
(async () => {
  const response = await fetch("https://dummyjson.com/posts?limit=5");
  const dummyData = await response.json();
  localStorage.setItem("dummyPosts", JSON.stringify(dummyData.posts));
  printDummyData(dummyData.posts);
})();

//skriver ut inlägg från DummyJSON
//se om det går att göra en gemensam printfunktion för nya och gamla inlägg
function printDummyData(posts) {
  posts.forEach((post) => {
  
    const dummyArticle = document.createElement("article");
    const dummyTitle = document.createElement("h3");
    const dummyBody = document.createElement("p");
    const dummyTags = document.createElement("p");
    dummyTags.classList.add("tag-div");

    post.tags.forEach((tag) => {
      const dummyTagSpan = document.createElement("span");
      dummyTagSpan.classList.add("tag-span");
      dummyTagSpan.textContent = tag;
      dummyTags.append(dummyTagSpan);
    });

    dummyTitle.textContent = post.title;
    dummyBody.textContent = post.body;

    dummyArticle.append(dummyTitle, dummyBody, dummyTags);
    dummyPostsDiv.append(dummyArticle);
  });
}