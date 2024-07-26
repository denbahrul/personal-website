class Testimonials {
    image = ""
    content = ""
    author = ""

    constructor(image, content, author) {
        this.image = image
        this.content = content
        this.author = author
    };

    html() {
        return `
            <div class="card">
                <img src=${this.image}>
                <p class="testimonial-words">${this.content}</p>
                <p class="author">- ${this.author}</p>
            </div>`
    };   
};

const testimonial1 = new Testimonials("https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Mantap bang!", "Nathan Tjoe A On");
const testimonial2 = new Testimonials("https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Terbaik, menyala abangku!", "Elon Musk");
const testimonial3 = new Testimonials("https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg", "Karya-karyanya luar biasa!", "Najwa Shihab");
const testimonial = [testimonial1, testimonial2, testimonial3]

let testimonialHTML = ``

for (let i=0; i < testimonial.length; i++) {
    // console.log(testimonial[i].html());
    testimonialHTML += testimonial[i].html();
}

document.getElementById("testimonials-list").innerHTML = testimonialHTML;

