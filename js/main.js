
const elList = document.querySelector(".user-list");
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector(".comment-list");
const elTemplate = document.querySelector(".template").content;
const elPostTemplate = document.querySelector(".post-template").content;
const elCommentTemplate = document.querySelector(".comment-template").content;
const newFragment = new DocumentFragment();

try {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        elCommentList.innerHTML = "";
        data.forEach(item =>{
            const clonedTemplate = elTemplate.cloneNode(true);
            clonedTemplate.querySelector(".user-name").textContent = item.name;
            clonedTemplate.querySelector(".user-id").textContent = item.id;
            clonedTemplate.querySelector(".user-username").textContent = item.username;
            clonedTemplate.querySelector(".user-email").textContent = item.email;
            clonedTemplate.querySelector(".user-email").href = `mailto:${item.email}`;
            clonedTemplate.querySelector(".user-telephone-number").href = `tel:${item.phone}`;
            clonedTemplate.querySelector(".user-telephone-number").textContent = `${item.phone}`;
            clonedTemplate.querySelector(".user-website").textContent = `${item.website}`;
            clonedTemplate.querySelector(".user-website").href = `${item.website}`;
            clonedTemplate.querySelector(".user-city").textContent = `${item.address.city}`;
            clonedTemplate.querySelector(".user-street").textContent = `${item.address.street}`;
            clonedTemplate.querySelector(".user-suite").textContent = `${item.address.suite}`;
            clonedTemplate.querySelector(".user-zipcode").textContent = `${item.address.zipcode}`;
            clonedTemplate.querySelector(".user-location").href = `${item.address.geo}`;
            const userLocation = item.address.geo.lat + item.address.geo.lng
            clonedTemplate.querySelector(".user-location").href = `https://www.google.com/maps/place/${userLocation}`
            clonedTemplate.querySelector(".user-posts").dataset.id = item.id;
            
            newFragment.appendChild(clonedTemplate)
        })
        elList.appendChild(newFragment)
    })
} catch (error) {
    console.log(error);
}

function fetchSecondList(key){
    try {
        fetch(`${key}`)
        .then(res => res.json())
        .then(data => {
            elPostList.innerHTML = "";
            data.forEach(item =>{
                const clonedTemplate = elPostTemplate.cloneNode(true);
                clonedTemplate.querySelector(".post-item").dataset.id = item.id;
                clonedTemplate.querySelector(".post-title").textContent = item.title;
                clonedTemplate.querySelector(".post-title").dataset.titleId = item.id;
                clonedTemplate.querySelector(".post-body").textContent = item.body;
                clonedTemplate.querySelector(".post-body").dataset.bodyId = item.id;
                
                newFragment.appendChild(clonedTemplate)
            })
            elPostList.appendChild(newFragment)
        })
    } catch (error) {
        console.log(error);
    }
}

elList.addEventListener("click", function(evt){
    const userBtnId = evt.target.dataset.id
    elCommentList.innerHTML = ""
    fetchSecondList(`https://jsonplaceholder.typicode.com/posts?userId=${userBtnId}`)
})


function fetchThirdList(key){
    try {
        fetch(`${key}`)
        .then(res => res.json())
        .then(data => {
            elCommentList.innerHTML = "";
            data.forEach(item =>{
                const clonedTemplate = elCommentTemplate.cloneNode(true);
                clonedTemplate.querySelector(".comment-title").textContent = item.name;
                clonedTemplate.querySelector(".comment-email").href = `mailto:${item.email}`;
                clonedTemplate.querySelector(".comment-email").textContent = item.email;
                clonedTemplate.querySelector(".comment-body").textContent = item.body;
            
                newFragment.appendChild(clonedTemplate)
            })
            elCommentList.appendChild(newFragment)
        })
    } catch (error) {
        console.log(error);
    }
}

elPostList.addEventListener("click", (evt) =>{
    if(evt.target.dataset.id){
        fetchThirdList(`https://jsonplaceholder.typicode.com/comments?postId=${evt.target.dataset.id}`)
    }
    if(evt.target.dataset.titleId){
        fetchThirdList(`https://jsonplaceholder.typicode.com/comments?postId=${evt.target.dataset.titleId}`)
    }
    if(evt.target.dataset.bodyId){
        fetchThirdList(`https://jsonplaceholder.typicode.com/comments?postId=${evt.target.dataset.bodyId}`)
    }
})
