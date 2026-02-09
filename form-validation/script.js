const complaintsGroup = document.getElementById("complaints-group")
const complaintDescription = document.getElementById("complaint-description")
const solutionsGroup = document.getElementById("solutions-group")
const solutionDescription = document.getElementById("solution-description")

const fullNameInput = document.getElementById("full-name")
const emailInput = document.getElementById("email")
const orderNumber = document.getElementById("order-no")
const productCodeInput = document.getElementById("product-code")
const quantityInput = document.getElementById("quantity")
const submitButton = document.getElementById("submit-btn")
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const radioButtons = document.querySelectorAll('input[type="radio"]')

const validateForm = () => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/
  const validOrderNumber = /^2024\d{6}$/
  const validProductCode = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}$/
  const validQuantity = /^[1-9]+$/
  const validDescription = /^.{20,}$/

  let obj = {
    "full-name": false,
    "email": false,
    "order-no": false,
    "product-code": false,
    "quantity": false,
    "complaints-group": false,
    "complaint-description": false,
    "solutions-group": false,
    "solution-description": false
  };
  if (fullNameInput.value !== "") {
    obj["full-name"] = true
    fullNameInput.style.borderColor = "green"
  } else {
    obj["full-name"] = false
    fullNameInput.style.borderColor = "red"
  }

  if (validEmail.test(emailInput.value)) {
    obj.email = true
    emailInput.style.borderColor = "green"
  } else {
    obj.email = false
    emailInput.style.borderColor = "red"
  }

  if (validOrderNumber.test(orderNumber.value)) {
    obj["order-no"] = true
    orderNumber.style.borderColor = "green"
  } else {
    obj["order-no"] = false
    orderNumber.style.borderColor = "red"
  }

  if (validProductCode.test(productCodeInput.value)) {
    obj["product-code"] = true
    productCodeInput.style.borderColor = "green"
  } else {
    obj["product-code"] = false
    productCodeInput.style.borderColor = "red"
  }

  if (validQuantity.test(quantityInput.value)) {
    obj.quantity = true
    quantityInput.style.borderColor = "green"
  } else {
    obj.quantity = false
    quantityInput.style.borderColor = "red"
  }

  let hasChecked = false

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      hasChecked = true
    }
  })

  if (hasChecked) {
    complaintsGroup.style.borderColor = "green"
    obj["complaints-group"] = true
  } else {
    complaintsGroup.style.borderColor = "red"
    obj["complaints-group"] = false
  }
  const isOtherComplaintChecked = Array.from(checkboxes).some(cb => cb.checked && cb.value === "other")
  if (isOtherComplaintChecked) {
    if (validDescription.test(complaintDescription.value)) {
      obj["complaint-description"] = true
      complaintDescription.style.borderColor = "green"
    } else {
      obj["complaint-description"] = false
      complaintDescription.style.borderColor = "red"
    }
  } else {
    obj["complaint-description"] = true
    complaintDescription.style.borderColor = ""
  }

  let isChecked = false

  radioButtons.forEach(button => {
    if (button.checked) {
      isChecked = true
    }
  })

  if (isChecked) {
    solutionsGroup.style.borderColor = "green"
    obj["solutions-group"] = true
  } else {
    solutionsGroup.style.borderColor = "red"
    obj["solutions-group"] = false
  }

  const isOtherSolutionChecked = Array.from(radioButtons).some(rb => rb.checked && rb.value === "other")
  if (isOtherSolutionChecked) {
    if (validDescription.test(solutionDescription.value)) {
      obj["solution-description"] = true
      solutionDescription.style.borderColor = "green"
    } else {
      obj["solution-description"] = false
      solutionDescription.style.borderColor = "red"
    }
  } else {
    obj["solution-description"]=true
    solutionDescription.style.borderColor = ""
  }

  return obj;
}

const isValid = (obj) => {
  const isTrue = Object.values(obj).every(value => value === true)
  if (isTrue) {
    return true
  } else {
    return false
  }
}

fullNameInput.addEventListener("change", () => {
  validateForm()
})
emailInput.addEventListener("change", () => {
  validateForm()
})
orderNumber.addEventListener("change", () => {
  validateForm()
})
productCodeInput.addEventListener("change", () => {
  validateForm()
})
quantityInput.addEventListener("change", () => {
  validateForm()
})
complaintDescription.addEventListener("change", () => {
  validateForm()
})
solutionDescription.addEventListener("change", () => {
  validateForm()
})
checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    validateForm()
  })
})
radioButtons.forEach(button=> button.addEventListener("change",()=>{
  validateForm()
}) )

const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const result=validateForm()

  if(isValid(result)){
    form.submit()
  } 
})