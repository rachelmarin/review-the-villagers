class Review {
    static all = []
  
    constructor(attr) {
      this.id = attr.id;
      this.rating = attr.rating;
      this.content = attr.content;
      this.villager = attr.villager;
      // this.img_url = attr.img_url;
    }
  
    render() {
      let div = document.createElement("div");
      let img = document.createElement("img");
      let h4 = document.createElement("h4");
      let byVillager = document.createElement('p');
      let p = document.createElement("p");
      let span = document.createElement("span");
      let deleteLink = document.createElement("a");
      let editLink = document.createElement("a");
      let reviewsDiv = document.getElementById("reviews");
    
      editLink.dataset.id = this.id;
      editLink.setAttribute("href", "#")
      editLink.innerText = "Edit"
      
      deleteLink.dataset.id = this.id
      deleteLink.setAttribute("href", "#")
      deleteLink.innerText = "Delete"
    
      editLink.addEventListener("click", Review.editReview);
      deleteLink.addEventListener("click", Review.deleteReview)
    
      byVillager.innerText = `Name: ${this.villager.name}`;
      img.setAttribute("src", this.villager.img_url)
      h4.innerText = `${this.rating}/10`;
      p.innerText = this.content;
    
      div.appendChild(h4);
      div.appendChild(img);
      div.appendChild(span);
      div.appendChild(byVillager);
      div.appendChild(p);
      div.appendChild(editLink);
      div.appendChild(document.createElement("br"));
      div.appendChild(deleteLink);
      div.appendChild(document.createElement("br"));

      reviewsDiv.appendChild(div);
    }
    
    save() {
      Review.all.push(this)
    }
  
    static create(attr) {
      let review = new Review(attr);
      review.save();
      return review;
    }
  
    static createFromCollection(collection) {
      collection.forEach(data => Review.create(data))
    }
  
    /** Review Templates **/
  
    static reviewsTemplate() {
      return `
      <h3>List Of Reviews</h3>
      <div id="reviews"></div>
      `;
    }
  
    static formTemplate() {
      return `
      <h3>Create Review</h3>
      <form id="form">
      <div class="input-field">
            <label for="rating">How would you rate this villager on a scale from 1-10? </label>
            <input type="number" name="rating" id="rating" min="1" max="10" />
          </div>
        <div class="input-field">
          <select id="villager">
            ${villagers.map (villager =>`<option value="${villager.id}">${villager.name}</option>`)}
          </select>
        </div>
        <div class="input-field">
          <label for="content">Content</label><br />
          <textarea name="content" id="content" cols="30" rows="10"></textarea>
        </div>
        <input type="submit" value="Create Review" />
      </form>
      `;
    }
  
    static editFormTemplate(review) {
      return `
      <h3>Edit Review</h3>
      <form id="form" data-id="${review.id}">
        <div class="input-field">
            <label for="rating">How would you rate this villager on a scale from 1-10?</label>
            <input type="number" name="rating" id="rating" min="1" max="10" value="${review.rating} />
          </div>
        <div class="input-field">
          <label for="content">Content</label><br />
          <textarea name="content" id="content" cols="30" rows="10">${review.content}</textarea>
        </div>
        <input type="submit" value="Edit Review" />
      </form>
      `;
    }
  
    /** renders **/
  
    static renderForm() {
      resetMain();
      main().innerHTML = Review.formTemplate();
      form().addEventListener("submit", Review.submitForm);
    }
  
    static renderEditForm(review) {
      resetMain();
      main().innerHTML = Review.editFormTemplate(review);
      form().addEventListener("submit", Review.submitEditForm);
    }
  
    static renderReviews() {
      resetMain();
      main().innerHTML = Review.reviewsTemplate();
    
      Review.all.forEach(review => review.render());
    }
  
    static editReview(e) {
      e.preventDefault();
      const id = e.target.dataset.id;
      
      const review = Review.all.find(function(review) {
        return review.id == id;
      })
    
      Review.renderEditForm(review)
    }
  
    static submitForm(e) {
      e.preventDefault();
    
      let strongParams = {
        review: {
          rating: ratingInput().value,
          content: contentInput().value,
          villager_id: villagerInput().value
        }
      }
    
      // send data to the backend via a post request
      Api.post('/reviews', strongParams)
        .then(function(data) {
          Review.create(data);
          Review.renderReviews();
        })
    }
  
    static submitEditForm(e) {
      e.preventDefault();
    
      let strongParams = {
        review: {
          rating: ratingInput().value,
          content: contentInput().value
        }
      }
    
      const id = e.target.dataset.id;
      
      Api.patch("/reviews/" + id, strongParams)
        .then(function(data) {
          // selects the review out of the array
          let b = Review.all.find((b) => b.id == data.id);
      
          // gets the index of the review selected
          let idx = Review.all.indexOf(b);

          // updates the index value with the newly updated review
          Review.all[idx] = new Review(data);
          
          // renders the array of reviews to page
          Review.renderReviews();
        })
    
    }

    static async getReviews() {
      // fetch to the rails api, reviews index. Grab the reviews
      // populate the main div with the reviews
    
      const data = await Api.get("/reviews");
      
      Review.createFromCollection(data)
      Review.renderReviews();
    }
  
    static async deleteReview(e) {
      e.preventDefault();
    
      let id = e.target.dataset.id;
    
      const data = await Api.delete("/reviews/" + id);
    
      Review.all = Review.all.filter(function(review){
        return review.id !== data.id;
      })
    
      Review.renderReviews();
    }

    static inputFilter() {
      const searchString = document.querySelector('#search').value 
      const filtered = Review.all.filter(review => review.villager.name.toLowerCase().includes(searchString))
      document.querySelector("#reviews").innerHTML = ""
      filtered.forEach(review => review.render())
  
    }
  }

    

