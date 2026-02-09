const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkButton = document.getElementById("add-bookmark-button");
const categoryName = document.querySelector(".category-name");
const categoryDropdown = document.getElementById("category-dropdown");
const closeFormButton = document.getElementById("close-form-button");
const addBookmarkButtonForm = document.getElementById("add-bookmark-button-form")
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url")
const bookmarkListSection = document.getElementById("bookmark-list-section")
const viewCategoryButton = document.getElementById("view-category-button")
const categoryList = document.getElementById("category-list")
const closeListSection = document.getElementById("close-list-button")
const deleteBookmarkButton = document.getElementById("delete-bookmark-button")


const getBookmarks = () => {
  const storedBookmarks = localStorage.getItem("bookmarks");

  if (!storedBookmarks) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedBookmarks);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const isValid = parsed.every(bookmark =>
      bookmark &&
      typeof bookmark === "object" &&
      "name" in bookmark &&
      "category" in bookmark &&
      "url" in bookmark
    );

    return isValid ? parsed : [];
  } catch {
    return [];
  }
};
const saveBookmarks = (bookmarks) => {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};



const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

const addOrUpdateBookmark = () => {
  const bookmarks = getBookmarks();
  bookmarks.push({
    name: nameInput.value,
    category: categoryDropdown.value,
    url: urlInput.value
  });

  saveBookmarks(bookmarks)
}

const reset = () => {
  nameInput.value = "";
  urlInput.value = "";
}

const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden")
  bookmarkListSection.classList.toggle("hidden")
}

const renderCategory = () => {
  const bookmarks = getBookmarks();
  const category = categoryName.innerText;
  const filtered = bookmarks.filter(b => b.category === category);

  categoryList.innerHTML = "";

  if (filtered.length === 0) {
    categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    return;
  }

  filtered.forEach(bookmark => {
    categoryList.innerHTML += `
      <input 
        type="radio" 
        id="${bookmark.name}" 
        value="${bookmark.name}" 
        name="bookmark"
      >
      <label for="${bookmark.name}">
        <a href="${bookmark.url}" >${bookmark.name}</a>
      </label>
    `;
  });
};


addBookmarkButton.addEventListener("click", () => {
  categoryName.innerText = categoryDropdown.value;
  displayOrCloseForm()
})

closeFormButton.addEventListener("click", () => {
  displayOrCloseForm()
})

addBookmarkButtonForm.addEventListener("click", () => {
  addOrUpdateBookmark()
  reset()
  displayOrCloseForm()
})

viewCategoryButton.addEventListener("click", () => {
  categoryName.innerText = categoryDropdown.value;
  renderCategory()
  displayOrHideCategory()
})

closeListSection.addEventListener("click", () => {
  displayOrHideCategory()
})

deleteBookmarkButton.addEventListener("click", () => {
  const selected = document.querySelector('input[name="bookmark"]:checked');
  if (!selected) return;

  const nameToDelete = selected.value;
  const category = categoryName.innerText;

  let bookmarks = getBookmarks(); 

  bookmarks = bookmarks.filter(
    b => !(b.name === nameToDelete && b.category === category)
  );

  saveBookmarks(bookmarks);
  renderCategory();
});