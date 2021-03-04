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
 
 document.addEventListener("DOMContentLoaded", function () {
   Review.getReviews();
   formLinkEvent();
   reviewsLinkEvent();
 });