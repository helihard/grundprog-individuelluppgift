//logik för formuläret

//skapar åtkomst till element i html-filen, de som behövs i script-filen exporteras
export const newPostTitle = document.querySelector("#new-title");
export const newPostBody = document.querySelector("#new-post");
export const newPostTags = document.querySelectorAll(".new-tag");
const newPostTagsDiv = document.querySelector("#new-tags-div");
const submitBtn = document.querySelector("#submit-new-post");

export function formInactive() {
  newPostBody.style.height = "auto";
  newPostTitle.style.display = "none";
  newPostTagsDiv.style.display = "none";
  submitBtn.style.display = "none";
  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "var(--lightgrey)";
  submitBtn.style.cursor = "default";
}

formInactive();

//visar hela formuläret vid fokus i textarea
newPostBody.addEventListener("focus", () => {
  newPostBody.style.height = "200px";
  newPostTitle.style.display = "block";
  newPostTagsDiv.style.display = "block";
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