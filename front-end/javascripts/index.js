function resetFormInputs() {
   ratingInput().value = "";
   contentInput().value = "";
 }
 
 function resetMain() {
   main().innerHTML = "";
 }
 
 function formLinkEvent() {
   formLink().addEventListener("click", function (e) {
     e.preventDefault();
 
     Review.renderForm();
   });
 }
 
 function reviewsLinkEvent() {
   reviewsLink().addEventListener("click", function (e) {
     e.preventDefault();
     console.log(this);
     Review.renderReviews();
   });
 }

 async function getVillagers() {
   villagers = await Api.get("/villagers")
 }
 
 document.addEventListener("DOMContentLoaded", function () {
   Review.getReviews();
   getVillagers();
   formLinkEvent();
   reviewsLinkEvent();
 });

