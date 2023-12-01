const postForm = document.querySelector("#create-new-post");
const newPostTitle = document.querySelector("#new-title");
const newPostInput = document.querySelector("#new-post");
const newPostTagsDiv = document.querySelector("#new-tags-div");
const newPostTags = document.querySelectorAll(".new-tag");
const submitBtn = document.querySelector("#submit-new-post");
const newPostsDiv = document.querySelector("#new-posts-div");

submitBtn.disabled = true;
newPostTitle.style.display ="none";
newPostTagsDiv.style.display = "none";
submitBtn.style.display = "none";

//visar hela formuläret vid focus i textarea
newPostInput.addEventListener("focus", () => {
  newPostInput.style.width = "400px";
  newPostInput.style.height = "200px";
  newPostTitle.style.display = "block";
  newPostTagsDiv.style.display = "block";
  submitBtn.style.display = "block";

  //kollar om det finns text i textarea
  newPostInput.addEventListener("input", checkIfEmpty);
});

function checkIfEmpty() {
  let fieldToCheck = this.value;

  //tar bort whitespace i början och slutet av texten
  let trimmedNewBodyValue = fieldToCheck.trim();

  //om textarea inte är tom och om det inmatade inte enbart är whitespaces: visa submitknappen
  //(endast text i textarea är obligatoriskt för att kunna posta)
  if (fieldToCheck !== "" && trimmedNewBodyValue.length !== 0) {
    submitBtn.disabled = false;     
  } else if (trimmedNewBodyValue.length === 0){
    submitBtn.disabled = true;
  }
}

//begränsar antal taggar för nytt inlägg
(function() {
  newPostTags.forEach(el => {
    el.addEventListener("change", function() {
      if (el.closest("#new-tags-div").querySelectorAll("input:checked").length > 3) {
        this.checked = false;
      }
    });
  });
})();

//hämta data från formulär på submit
postForm.addEventListener("submit", getFormData);

//hämtar datan
function getFormData(event) {
  event.preventDefault();

  //sammanställ nytt inlägg från hämtad data
  renderNewPost(compileNewPost(postForm));

  //återställ formulär efter submit: töm, dölj delar av formulär, disabla submitknapp 
  postForm.reset();
  newPostInput.style.width = "auto";
  newPostInput.style.height = "auto";
  newPostTitle.style.display = "none";
  newPostTagsDiv.style.display = "none";
  submitBtn.style.display = "none";
  submitBtn.disabled = true;
}

//sammanställer hämtad data från formuläret till ett inlägg
function compileNewPost(form) {
  let checkedTags = [];

  //valda taggar läggs i en array
  for (let tag of newPostTags) {
    if (tag.checked === true && checkedTags.length < 3) {
      checkedTags.push(tag.value);
      console.log(checkedTags);
    }
  }

  let newPost = {
    "title": form.newtitle.value,
    "body": form.newbody.value,
    "tags": checkedTags
  }

  //tar bort whitespaces i början och slutet av inläggstexten och titeln
  newPost.body = newPost.body.trim();
  newPost.title = newPost.title.trim();

  //autogenerera titel från inläggstexten om användaren inte anger titel
  if (newPost.title === "") {
    newPost.title = renderDefaultTitle(newPost.body);
  } else {
    newPost.title;
  }
  return newPost;
}

//autogenererar titel
function renderDefaultTitle(body) {
  //delar upp inlägget i rader
  //alla tomma rader blir en tom sträng i arrayen även om de innehåller mellanslag
  const splitByNewLine = body.split(/\r?\n/).map(line => line.trim());
  //console.log(splitByNewLine);
  //första raden i inlägget
  const firstLine = splitByNewLine[0];
 
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

//skriver ut data i form av nytt inlägg
function renderNewPost(post) {
  let newArticle = document.createElement("article");
  let newTitle = document.createElement("h3");
  let newPostBody = document.createElement("p");
  let newTags = document.createElement("p");
  newTitle.innerText = post.title;
  newPostBody.innerText = post.body;
  newTags.innerText = post.tags.join(", ");
  newArticle.append(newTitle, newPostBody, newTags);
  newPostsDiv.append(newArticle);
}