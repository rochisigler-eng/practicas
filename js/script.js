const cardContainer = document.querySelector(".projectReferences")

import  {workPortfolio}  from "./data.js"

const displayProject = () => {
    workPortfolio.forEach(obj => {
        cardContainer.innerHTML +=
        `<li class="projectImgContainer">
            <a href="${obj.link}" target="_blank">
                <img class="projectImg" src="${obj.img}" alt="image of project page">
                <div class="overlay">
                <h3>${obj.name}</h3>
                </div>
            </a>
        </li>`
    })
    console.log("hello")
}

 displayProject()