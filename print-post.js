export const postsDiv = document.querySelector("#posts-div");

//skriver ut inlägg
export default function printPost(post) {
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
