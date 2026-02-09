const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';
const postContainer = document.getElementById("posts-container")

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' }
};

const timeAgo = (time) => {
  const datePassed=new Date(time)
  const date = new Date()
  const isoDate = date.toISOString()
  const difference = date.getTime() - datePassed.getTime()
  if (difference < 3600000) {
    let minutes = Math.floor(difference / 60000)
    return `${minutes}m ago`
  } else if (difference < 86400000) {
    let hours = Math.floor(difference / 3600000)
    return `${hours}h ago`
  } else {
    let days = Math.floor(difference / 86400000)
    return `${days}d ago`
  }
}


const viewCount = (views) => {
  if (views >= 1000) {
    let viewCount = Math.floor(views / 1000)
    return `${viewCount}k`
  } else {
    return views
  }
}



const forumCategory = (id) => {

  if (allCategories.hasOwnProperty(id)) {
    return `<a class="category ${allCategories[id].className}" href="${forumCategoryUrl}${allCategories[id].className}/${id}">${allCategories[id].category}</a>`
  } else {
    return `<a class="category general" href="${forumCategoryUrl}general/${id}">General</a>`
  }

}


const avatars = (posters, users) => {
  let images = "";
  
    for (const obj of posters) {
      let userId = users.find(user => user.id === obj.user_id)
      let avatarTemplate = userId.avatar_template
      let avatarTemplateUrl = avatarTemplate.replace("{size}", "30")
      if (avatarTemplateUrl.startsWith("https")) {
        images += `<img src="${avatarTemplateUrl}" alt="${userId.name}">`
      } else {
        images += `<img src="${avatarUrl}${avatarTemplateUrl}" alt="${userId.name}">`
      }
    
  }
  return images

}


const showLatestPosts = (object) => {
  const usersArr = object.users
  const topicList = object.topic_list

  let html=""

  for (const topic of topicList.topics) {
    let { id, title, views, posts_count, slug, posters, category_id, bumped_at } = topic
    html=html+
      `
        <tr>
        <td>
        <a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>
        ${forumCategory(category_id)}
        </td>
        <td><div class="avatar-container">${avatars(posters, usersArr)}</div></td>
        <td>${posts_count - 1}</td>
        <td>${viewCount(views)}</td>
        <td>${timeAgo(bumped_at)}</td>
        </tr>
        `
  }
  postContainer.innerHTML=html
}


async function fetchData() {
  try {
    let response =  await fetch(forumLatest)
    let data = await response.json()
    showLatestPosts(data)
  } catch(error){
  console.log(error)
  }
}

fetchData()


