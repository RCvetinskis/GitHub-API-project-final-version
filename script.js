"use strict"

const API_URL = "https://api.github.com/users/"
const app = document.getElementById("app")
const form = document.querySelector("form")
const search = document.querySelector("input")
// load github user data
function loadGitHubUser(name){
  return fetch(API_URL + name).then(response=> response.json())
}



// load github users repostiroies
function loadCardData(data){
     app.innerHTML =
     `
     <div class="card">
     <div>
       <img
         class="avatar"
         src="${data.avatar_url}"
         alt="${data.name}"
       />
     </div>
     <div class="user-info">
       <h2>${data.name}</h2>
       <p>
         ${data.bio}
       </p>
       <ul>
         <li> <strong> ${data.followers} followers</strong></li>
         <li><strong> ${data.following} following</strong></li>
         <li><strong> ${data.public_repos} Repositories</strong></li>
       </ul>
       <div id="repos">
        
       </div>
     </div>
   </div>
     
     `
     console.log(data)
  }
  // load github users repositories
  function loadRepos(name){
    return fetch(API_URL + name + "/repos").then(response=> response.json())
  }
  
  function addReposToCard(repos){
    let allRepos = document.getElementById("repos")
     let reposSlice =repos.slice(0,20)
     console.log(reposSlice)
     reposSlice.forEach( x=>{
       let reposEl = document.createElement("a")
       reposEl.classList.add("repo")
       reposEl.innerText = x.name
       reposEl.href = x.html_url
       reposEl.target = "_blank"
       allRepos.append(reposEl)
     })


  }
  form.addEventListener("submit", function(e){
    e.preventDefault()
    let user = search.value
    if(user){
      loadGitHubUser(user).then(loadCardData)
       loadRepos(user).then(addReposToCard)
    }
   
    search.value = ""
  })

  // First load
  loadGitHubUser("RCvetinskis").then(loadCardData)
  loadRepos("RCvetinskis").then(addReposToCard)