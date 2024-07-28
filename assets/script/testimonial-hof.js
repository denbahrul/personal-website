// HOF(Higher-Order Functions) = A function that accepts and/or returns another function.

// XMLHttpRequest atau XHR merupakan class atau Browser API yang digunakan untuk membuat HTTP Requests menggunakan JavaScript.

function getTestimonials() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = "https://api.npoint.io/f1ad96a17b9f22902ca0";

        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
          };

        xhr.onerror = () => {
          reject("Network error!");
        };
        
        xhr.open("GET", url, true);
        xhr.send();
      });
};

console.log(getTestimonials());

async function allTestimonial() {
    try {
        const testimonials = await getTestimonials();
        const allTestimonial = testimonials.map((testimonial) => {
            return `
            <div class="card">
                <img src=${testimonial.image}>
                <p class="testimonial-words">"${testimonial.content}"</p>
                <p class="author">- ${testimonial.author}</p>
                <p class="rating">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
            </div>`
        }) ;
        
        document.getElementById("testimonials-list").innerHTML = allTestimonial.join("");
    } catch (error) {
        console.log(error);
    };
};

async function testimonialByRating(rating) {
    try {
        const testimonials = await getTestimonials();
        const testimonialByRatingFilter = testimonials.filter( testimonial => {
            return testimonial.rating == rating;
        })
        
        const testimonialByRatingHTML = testimonialByRatingFilter.map( testimonial => {
            return `
            <div class="card">
                <img src=${testimonial.image}>
                <p class="testimonial-words">"${testimonial.content}"</p>
                <p class="author">- ${testimonial.author}</p>
                <p class="rating">${testimonial.rating} <i class="fa-solid fa-star"></i></p>
            </div>`
        });
        
        document.getElementById("testimonials-list").innerHTML = testimonialByRatingHTML.join("");
    } catch {
        console.log(error);
    }
};

allTestimonial();
