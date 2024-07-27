const testimonials = [
    {
        image : "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "Mantap bang!",
        author : "Nathan Tjoe A On",
        rating : 1
    },
    {
        image : "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content : "Terbaik, menyala abangku!",
        author : "Elon Musk",
        rating : 2
    },
    {
        image : "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg",
        content : "Karya-karyanya luar biasa!",
        author : "Najwa Shihab",
        rating : 1
    }
];

function allTestimonial() {
    const allTestimonial = testimonials.map((testimonial) => {
        return `
        <div class="card">
            <img src=${testimonial.image}>
            <p class="testimonial-words">"${testimonial.content}"</p>
            <p class="author">- ${testimonial.author}</p>
        </div>`
    }) ;
    
    document.getElementById("testimonials-list").innerHTML = allTestimonial.join("");
}

function testimonialByRating(rating) {

    const testimonialByRatingFilter = testimonials.filter( testimonial => {
        return testimonial.rating == rating;
    })
    
    const testimonialByRatingHTML = testimonialByRatingFilter.map( testimonial => {
        return `
        <div class="card">
            <img src=${testimonial.image}>
            <p class="testimonial-words">"${testimonial.content}"</p>
            <p class="author">- ${testimonial.author}</p>
        </div>`
    });
    
    document.getElementById("testimonials-list").innerHTML = testimonialByRatingHTML.join("");
};

allTestimonial()
