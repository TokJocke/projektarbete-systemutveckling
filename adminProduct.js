import {makeReq, getAllCategorys, createCategoryDropDown, removeElementById} from "./main.js"
import {getAllProducts} from "./products.js"

window.addEventListener("load", initSite)
let body = document.getElementById("adminProductBody")


function initSite() {
	if (body){
        myAdminBox()
        getAllProducts()
        getAllCategorys()
        getOrders()
        getUsers()
    }
}

//admin panel for adding products
async function adminAddProductPanel() {
    //*****Creating all content
    let adminProductBox = document.getElementById("adminProductBox")
    let myTable = document.createElement("table")
    let nameTr = document.createElement("tr")
    let nameTd = document.createElement("td")
    let nameInput = document.createElement("td")
    let priceTr = document.createElement("tr")
    let priceTd = document.createElement("td")
    let priceInput = document.createElement("td")
    let descTr = document.createElement("tr")
    let descTd = document.createElement("td")
    let descInput = document.createElement("td")
    let categoryTr = document.createElement("tr")
    let categoryTd = document.createElement("td")
    let categoryInput = document.createElement("td")
    let categoryDropDown = await createCategoryDropDown()
    let buttonDiv = document.createElement("div")
    let uploadImg = document.createElement("input")
    let confirmBtn = document.createElement("button")
    //*****All properties
    myTable.id = "addProductTabel"
    nameTd.innerText = "Name"
    nameInput.innerHTML = "<input type='text' id='nameInput'>" 
    priceTd.innerText = "Price"
    priceInput.innerHTML = "<input type='number' id='priceInput'>" 
    descTd.innerText = "Description"
    descInput.innerHTML = "<textarea type='text' id='descInput'>" 
    categoryTd.innerText = "Category"   
    categoryDropDown.id = "categoryInput"
    uploadImg.type = "file"
    uploadImg.name = "image"
    uploadImg.id="uploadImgInput"
    confirmBtn.innerText = "Confirm"
    confirmBtn.addEventListener("click", sendProductData)
    //*****All appends
    buttonDiv.append(uploadImg, confirmBtn)
    categoryInput.append(categoryDropDown)
    categoryTr.append(categoryTd, categoryInput)
    descTr.append(descTd, descInput)
    nameTr.append(nameTd, nameInput)
    priceTr.append(priceTd, priceInput)
    myTable.append(nameTr, priceTr, descTr, categoryTr)
    adminProductBox.append(myTable, buttonDiv)  
}

//admin panel for update / delete producs
async function adminUpdateProductPanel() {
    let allProducts = await getAllProducts() 
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
  
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    let productIdTitleTd = document.createElement("td")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productDescTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let productCategoryTitleTd = document.createElement("td")
    
    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productDescTitleTd.innerHTML = "<h3>Description</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    productCategoryTitleTd.innerHTML = "<h3>Category</h3>"
    
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productDescTitleTd, productInStockTitleTd, productCategoryTitleTd)
    myTable.append(titleTr)
    adminBox.append(myTable)

    allProducts.forEach(product => { 
        //every Td
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productId = document.createElement("td")
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productDesc = document.createElement("td")
        let productInStock = document.createElement("td")
        let productCategory = document.createElement("td")
        //Delete Button
        let deleteBtnTd = document.createElement("td")
        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", deleteProduct.bind(product))
        //Edit Button
        let editBtnTd = document.createElement("td")
        let editBtn = document.createElement("button")
        editBtn.innerText = "Edit"
        editBtn.addEventListener("click", editProduct.bind(product))
        //Innertext
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productDesc.innerText = product.description
        productInStock.innerText = product.unitsInStock
        productCategory.innerText = product.categoryId
        //Apends
        editBtnTd.append(editBtn)
        deleteBtnTd.append(deleteBtn)
        newRow.append(productId, productName, productPrice, productDesc, productInStock, productCategory, editBtnTd, deleteBtnTd)
        myTable.appendChild(newRow)
    })    
}
//Panel for Createing/appending offers
async function adminOfferPanel() {
    let allProducts = await getAllProducts() 
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
  
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    let productIdTitleTd = document.createElement("td")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let addToOfferTitleTd = document.createElement("td")
    
    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    addToOfferTitleTd.innerHTML = "<h3>add to offer</h3>"
    
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productInStockTitleTd, addToOfferTitleTd)
    myTable.append(titleTr)
    adminBox.append(myTable)

    allProducts.forEach(product => { 
        //every Td
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productId = document.createElement("td")
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productInStock = document.createElement("td")
        let addToOffer = document.createElement("td")
                
        let checkBox = document.createElement("input")
        checkBox.className = "offerCheck"
        checkBox.type = "checkbox"
        checkBox.style.width = "5vw"
        checkBox.style.height = "5vh" 
        checkBox.value = product
    





        //Innertext
        addToOffer.append(checkBox)
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productInStock.innerText = product.unitsInStock
        //Apends
        newRow.append(productId, productName, productPrice, productInStock, addToOffer)
        myTable.appendChild(newRow)
    })

    
}

//Function for deleting products from DB
async function deleteProduct() {
    if (confirm("are you sure you want to delete " + this.name + " from products?")) {        
        let data = new FormData()
        data.append("action", "removeProduct")
        data.append("product", JSON.stringify(this))
    
        const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
        adminUpdateProductPanel()
        console.log(response)
    } 
    
}


//Creating popUp for editing products
async function editProduct() {
    
    let main = document.getElementsByTagName("main")[0]
    let title = document.createElement("h2")
    let popUpDiv = document.createElement("div")
    let nameInput = document.createElement("input")
    let priceInput = document.createElement("input")
    let descInput = document.createElement("input")
    let inStockInput = document.createElement("input")
    let categoryInput = await createCategoryDropDown()
    let buttonContainer = document.createElement("div")
    let updateBtn = document.createElement("button")
    let cancelBtn = document.createElement("button")

    popUpDiv.id = "editPopUpDiv"
    nameInput.className = "editPopUpInput"
    priceInput.className = "editPopUpInput"
    descInput.className = "editPopUpInput"
    inStockInput.className = "editPopUpInput"
    categoryInput.id = "editPopUpCategory"
    
    title.innerText = this.name
    nameInput.placeholder = this.name
    priceInput.placeholder = this.price
    descInput.placeholder = this.description
    inStockInput.placeholder = this.unitsInStock
    updateBtn.innerText="update"
    cancelBtn.innerText = "cancel"
    
    priceInput.type = "number"
    inStockInput.type = "number"

    updateBtn.addEventListener("click", update.bind(this))//Alternativ lösning för att gå runt att funktionen kallas vid init    
    cancelBtn.addEventListener("click", cancel)           //==.onclick = () => { update(this.productId); }; okej eller dödssynd?

    buttonContainer.append(updateBtn, cancelBtn)
    popUpDiv.append(title, nameInput, priceInput, descInput, inStockInput, categoryInput, buttonContainer)
    main.append(popUpDiv)
}

//Function for updateing products in DB
async function update() {
    console.log(this.productId)//Med .bind lösning blir denna "this.productId"
    let input = document.getElementsByTagName("input")
    let myInputValueArray = []
    let inputCategory = document.getElementById("editPopUpCategory")
    for(let i = 0; i < input.length; i++) {
        if(input[i].value != "") {
            myInputValueArray.push(input[i].value)
        }
        else {
            myInputValueArray.push(input[i].placeholder)
        }  
    }
    myInputValueArray.push(inputCategory.value)    
    myInputValueArray.push(this.productId)//Med .bind lösning blir denna "this.productId"   
    let data = new FormData()
    data.append("action", "updateProduct")
    data.append("product", JSON.stringify(myInputValueArray))

    const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
    console.log("response = ", response)
  
    removeElementById("editPopUpDiv")
    adminUpdateProductPanel()

}
//Close popup window
function cancel() {
    removeElementById("editPopUpDiv")
}

//function for sending product data and uploading image 
async function sendProductData() {   
    let inputName = document.getElementById("nameInput").value
    let inputPrice = document.getElementById("priceInput").value
    let inputDesc = document.getElementById("descInput").value
    let inputCategory = document.getElementById("categoryInput").value
    let image = document.getElementById("uploadImgInput")
    let productData = { inputName, inputPrice, inputDesc, inputCategory }
/*     productData = JSON.stringify(productData)
 */    
    let data = new FormData() 
    data.append("image", image.files[0])
    data.append("productData", JSON.stringify(productData))

    const response = await makeReq("./api/recievers/productReciever.php", "POST", data)
    console.log(response) 
}
//Dashboard for adding / updateing products
function myAdminBox() {
    let adminUppdateBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[0]
    let adminAddBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[1]
    let adminOfferBoxBtn = document.getElementsByClassName("adminProductBoxBtn")[2]
    let adminOrderBtn = document.getElementsByClassName("adminProductBoxBtn")[3]
    let adminUserBtn = document.getElementsByClassName("adminProductBoxBtn")[4]

   

    let adminBox = document.getElementById("adminProductBox")
    adminUpdateProductPanel()

    adminAddBoxBtn.addEventListener("click", () => {
        console.log("add")
        adminBox.innerHTML = ""
        adminAddProductPanel()
    })

    adminUppdateBoxBtn.addEventListener("click", () => {
        console.log("uppdate")
        adminUpdateProductPanel()
    })

    adminOfferBoxBtn.addEventListener("click", () => {
        console.log("Offers")
        adminOfferPanel()

    })
    adminOrderBtn.addEventListener("click", () => {
        console.log("orderPanel")
        loadOrders() 
    })
    
    adminUserBtn.addEventListener("click", () => {
        console.log("userPanel")
        loadUsers()
    }) 
}

async function getOrders() {
    const response = await makeReq("./api/recievers/orderReciever.php", "GET")
    console.log(response)
    return response
}

// Hämtar å visar ordrarna i adminpanel.
async function loadOrders() {
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
    let header = document.createElement("h1")
    header.align = "center"
    header.innerText = "Mark orders as shipped"
    let searchInput = document.createElement("input")
    searchInput.placeholder = "Search for orders by orderId"
    searchInput.style.marginBottom = "5px"
    let btn = document.createElement("button")
    btn.style.height = "3vh"
    btn.innerText = "Search"   
    adminProductBox.append(header, searchInput, btn)
  
    //hämtar ordrar
    let getAllOrders = await getOrders() 

    //skapar table med titlar.
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    titleTr.align = "center"
    let orderIdTitle = document.createElement("td")
    let userIdTitle = document.createElement("td")
    let orderDateTitle = document.createElement("td")
    let shippedTitle = document.createElement("td")
    // confirm knapp
    let confirmBtn = document.createElement("button")
    confirmBtn.addEventListener("click", updateShippingStatus)
    confirmBtn.style.height = "5vh"
    confirmBtn.innerText = "Apply changes, mark order(s) as shipped"  

    orderIdTitle.innerHTML = "<h3>OrderId</h3>"
    userIdTitle.innerHTML = "<h3>UserId</h3>"
    orderDateTitle.innerHTML = "<h3>Order Date</h3>"
    shippedTitle.innerHTML = "<h3>Shipped</h3>"
    
    titleTr.append(orderIdTitle, userIdTitle, orderDateTitle, shippedTitle)
    myTable.append(titleTr)
    adminBox.append(myTable, confirmBtn)

    getAllOrders.forEach(order => {
        
        if(order.shipped == null) {

        let newRow = document.createElement("tr")
        newRow.align = "center"
        let orderId = document.createElement("td")
        let userId = document.createElement("td")
        let orderDate = document.createElement("td")
        let shipped = document.createElement("td")
        let checkbox = document.createElement("input")
        checkbox.className = "myCheckbox"
        checkbox.type = "checkbox"
        checkbox.style.width = "5vw"
        checkbox.style.height = "5vh"
        checkbox.value = order.orderId
        

        orderId.innerText = order.orderId
        userId.innerText = order.userId
        orderDate.innerText = order.orderDate
    
        shipped.append(checkbox)
        newRow.append(orderId, userId, orderDate, shipped)
        myTable.append(newRow)
        }
        
    })  
}

//Funktion som skickar upp array med checkbox value
async function updateShippingStatus() {
    let cb = document.getElementsByClassName("myCheckbox")
    let myArray = []
    for (let i = 0; i < cb.length; i++) {
        if(cb[i].checked) { 
            myArray.push(cb[i].value)           
         }
    }       
            console.log(myArray)

    body = new FormData()
    body.set("cbArray", JSON.stringify(myArray))     
    body.set("action", "loadAdminOrder")     
    
    const response = await makeReq("./api/recievers/orderReciever.php", "POST", body)
    console.log(response)
    loadOrders()
    return response 
}
//Hämta användare
async function getUsers() {
    const response = await makeReq("./api/recievers/userReciever.php?getUsers", "GET")
    console.log(response)
    return response
}
//laddar panel med alla användare
async function loadUsers() {
    let adminBox = document.getElementById("adminProductBox")
    adminBox.innerHTML = ""
    let header = document.createElement("h1")
    header.align = "center"
    header.innerText = "Update admin permissions"
    let searchInput = document.createElement("input")
    searchInput.placeholder = "Search for user by username"
    searchInput.style.marginBottom = "5px"
    let btn = document.createElement("button")
    btn.style.height = "3vh"
    btn.innerText = "Search"   
    adminProductBox.append(header, searchInput, btn)
  
    //hämtar ordrar
    let getAllUsers = await getUsers() 

    //skapar table med titlar.
    let myTable = document.createElement("table")
    let titleTr = document.createElement("tr")
    titleTr.align = "center"
    let userIdTitle = document.createElement("td")
    let usernameTitle = document.createElement("td")
    let isAdminTitle = document.createElement("td")
    let changeTitle = document.createElement("td")

    // confirm knapp
    let confirmBtn = document.createElement("button")
    confirmBtn.addEventListener("click", updateUserStatus)
    confirmBtn.style.height = "5vh"
    confirmBtn.innerText = "Apply changes"  

    userIdTitle.innerHTML = "<h3>userId</h3>"
    usernameTitle.innerHTML = "<h3>Username</h3>"
    isAdminTitle.innerHTML = "<h3>is Admin</h3>"
    changeTitle.innerHTML = "<h3>Permission</h3>"
    
    titleTr.append(userIdTitle, usernameTitle, isAdminTitle, changeTitle)
    myTable.append(titleTr)
    adminBox.append(myTable, confirmBtn)

    getAllUsers.forEach(user => {
        
        let newRow = document.createElement("tr")
        newRow.align = "center"
        let userId = document.createElement("td")
        let username = document.createElement("td")
        let isAdmin = document.createElement("td")
        let cb = document.createElement("td")
    
        let checkbox = document.createElement("input")
        checkbox.className = "myCheckbox2"
        checkbox.type = "checkbox"
        checkbox.style.width = "5vw"
        checkbox.style.height = "5vh"
        checkbox.value = user.userName
    
        userId.innerText = user.userId
        username.innerText = user.userName
        isAdmin.innerText = user.isAdmin

        if(user.isAdmin == "1") { //Checkbox är checkad om användare är admin. 
            checkbox.checked = true
        }
     
        newRow.append(userId, username, isAdmin, cb)
        cb.append(checkbox)
        myTable.append(newRow)
        
    })  
}

//Skickar upp isAdmin värden från checkbox.
async function updateUserStatus() {
    let cb = document.getElementsByClassName("myCheckbox2")
    let checkedArr = []
    let notCheckedArr = []
    for (let i = 0; i < cb.length; i++) {
        if(cb[i].checked) { 
            checkedArr.push(cb[i].value)           
        }
         else if(!cb[i].checked) {
            notCheckedArr.push(cb[i].value)
         }
    }       
            console.log("hej", checkedArr, "då", notCheckedArr)


    body = new FormData()
    body.set("checkedArr", JSON.stringify(checkedArr))
    body.set("notCheckedArr", JSON.stringify(notCheckedArr))
    body.set("action", "updateUser")        

  
  
    const response = await makeReq("./api/recievers/userReciever.php", "POST", body)
    console.log(response)
    loadUsers()
    return response 
}
    
    


    

