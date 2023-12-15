//logik för formuläret

//skapar åtkomst till element i html-filen, de som behövs i script-filen exporteras
export const newPostTitle = document.querySelector("#new-title");
const titleCharCount = document.querySelector("#title-char-count");
export const newPostBody = document.querySelector("#new-post");
const bodyCharCount = document.querySelector("#body-char-count");
export const newPostTags = document.querySelectorAll(".new-tag");
const newPostTagsDiv = document.querySelector("#new-tags-div");
const submitBtn = document.querySelector("#submit-new-post");

export function formInactive() {
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

formInactive();

//visar hela formuläret vid fokus i textarea
newPostBody.addEventListener("focus", () => {
  newPostBody.style.height = "200px";
  newPostTitle.style.display = "inline-block";
  titleCharCount.style.display = "inline-block";
  newPostTagsDiv.style.display = "block";
  bodyCharCount.style.display = "inline-block";
  submitBtn.style.display = "block";

  //kollar om det finns text i textarea
  newPostBody.addEventListener("input", checkIfEmpty);
});

function checkIfEmpty() {
  let fieldToCheck = this.value;

  //tar bort whitespace i början och slutet av texten
  let trimmedNewBodyValue = fieldToCheck.trim();

  //om textarea inte är tom och om det inmatade inte enbart är whitespaces: visa submitknappen
  //(endast text i textarea är obligatoriskt för att kunna posta)
  if (fieldToCheck !== "" && trimmedNewBodyValue.length !== 0) {
    submitBtn.disabled = false;    
    submitBtn.style.backgroundColor = "var(--fire)"; 
    submitBtn.style.cursor = "pointer";
  } else if (trimmedNewBodyValue.length === 0){
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "var(--lightgrey)";
    submitBtn.style.cursor = "default";
  }
}

/*
//begränsar antal taggar för nytt inlägg
(function() {
  newPostTags.forEach((checkbox) => {
    checkbox.addEventListener("change", function() {
      if (checkbox.closest("#new-tags-div").querySelectorAll("input:checked").length > 3) {
        this.checked = false;
      }
    });
  });
})();*/

newPostTitle.addEventListener("keyup", function() {
  let str = newPostTitle.value;
  let max = 70;
  if (str.length > 0) {
  titleCharCount.textContent = `${(max - str.length)}/${max} chars remain`;
  } else {
    titleCharCount.textContent = "70/70 chars remain";
  }
});

newPostBody.addEventListener("keyup", function() {
  let str = newPostBody.value;
  let max = 2000;
  if (str.length > 0) {
  bodyCharCount.textContent = `${(max - str.length)}/${max} chars remain`;
  } else {
    bodyCharCount.textContent = "2000/2000 chars remain";
  }
});