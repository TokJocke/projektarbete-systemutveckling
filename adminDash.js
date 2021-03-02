import {makeReq, getAllCategorys, createCategoryDropDown, getAllOffers, createOfferDropDown, removeElementById} from "./main.js"
import {getAllProducts, getAllProdsInOffer} from "./products.js"

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

/*****       ADMIN DASHBOARD     *****/

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

/*****       ADMIN DASH FOR PRODUCTS     *****/        

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
        //Elements
        let newRow = document.createElement("tr")
        newRow.className="UpdatePanelProdRow"
        let productId = document.createElement("td")
        let productName = document.createElement("td")
        let productPrice = document.createElement("td")
        let productDesc = document.createElement("td")
        let productInStock = document.createElement("td")
        let productCategory = document.createElement("td")

        let buttonDiv = document.createElement("div")
        buttonDiv.className = "firstButtonDivStyle"
        let buttonTd = document.createElement("td")
        let editBtnTd = document.createElement("td")
        let deleteBtn = document.createElement("button")
        let editBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        editBtn.innerText = "Edit"

        deleteBtn.addEventListener("click", deleteProduct.bind(product))
        editBtn.addEventListener("click", editProduct.bind(product))
        //Innertext
        productId.innerText = product.productId
        productName.innerText = product.name
        productPrice.innerText = product.price
        productDesc.innerText = product.description
        productInStock.innerText = product.unitsInStock
        productCategory.innerText = product.categoryId
        //Apends

        buttonDiv.append(editBtn, deleteBtn)
        buttonTd.append(buttonDiv)
        newRow.append(productId, productName, productPrice, productDesc, productInStock, productCategory, buttonTd)
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

//Close popup window
function cancel() {
    removeElementById("editPopUpDiv")
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


/*****       ADMIN DASH FOR OFFERS     *****/

async function adminOfferPanel() {
    let allProducts = await getAllProducts() 
    let adminBox = document.getElementById("adminProductBox")
    let productWrapper = document.getElementById("adminProductWrapp")
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

    let optionDiv = document.createElement("div")
    let offerButtonDiv = document.createElement("div")
    let confirmDiv = document.createElement("div")
    offerButtonDiv.className = "secondButtonDivStyle"                                                    //HÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄR
    let createOfferBtn = document.createElement("button")
    let addToOfferBtn = document.createElement("button")
    let editOfferBtn = document.createElement("button")
    let confirmBtn = document.createElement("button")
    let offerDropDown = await createOfferDropDown()

    editOfferBtn.addEventListener("click", adminEditOfferPanel)
    createOfferBtn.addEventListener("click", adminCreateOfferPanel)
    confirmBtn.addEventListener("click", addProductsToOffer.bind(offerDropDown))                                /* WORKING HERE!!!! */
    
    addToOfferBtn.innerText = "Add products to offer"
    createOfferBtn.innerText = "Create Offer"
    editOfferBtn.innerText = "Edit Offer"
    confirmBtn.innerText = "asdsad"

    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    addToOfferTitleTd.innerHTML = "<h3>add to offer</h3>"
    
    confirmDiv.append(confirmBtn)
    offerButtonDiv.append(addToOfferBtn, createOfferBtn, editOfferBtn)
    optionDiv.append(offerDropDown, offerButtonDiv)
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productInStockTitleTd, addToOfferTitleTd)
    myTable.append(titleTr)
    adminBox.append(optionDiv, myTable, confirmDiv)

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
        checkBox.value = product.productId
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

async function adminCreateOfferPanel() {
    
    let adminProductBox = document.getElementById("adminProductBox")
    let myTable = document.createElement("table")
    let optionDiv = document.createElement("div")
    let buttonDiv = document.createElement("div")
    let offerButtonDiv = document.createElement("div")

    let nameTr = document.createElement("tr")
    let nameTd = document.createElement("td")
    let nameInput = document.createElement("td")
    let discountTr = document.createElement("tr")
    let discountTd = document.createElement("td")
    let discountInput = document.createElement("td")

    
    let addToOfferBtn = document.createElement("button")
    let createOfferBtn = document.createElement("button")
    let editOfferBtn = document.createElement("button")
    let confirmBtn = document.createElement("button")
    
    addToOfferBtn.innerText = "Add products to offer"
    createOfferBtn.innerText = "Create Offer"
    editOfferBtn.innerText = "Edit Offer"

    addToOfferBtn.addEventListener("click", adminOfferPanel)
    editOfferBtn.addEventListener("click", adminEditOfferPanel)
    
    //*****properties
    adminProductBox.innerHTML = ""
    myTable.id = "addProductTabel"
    
    nameTd.innerText = "Name"
    nameInput.innerHTML = "<input type='text' id='offerNameInput'>" 
    discountTd.innerText = "Discount"
    discountInput.innerHTML = "<input type='number' id='offerDiscountInput'>" 

    confirmBtn.innerText = "Confirm"
    confirmBtn.addEventListener("click", createOffer)
    //*****All appends

    offerButtonDiv.append(addToOfferBtn, createOfferBtn, editOfferBtn)
    buttonDiv.append(confirmBtn)
    nameTr.append(nameTd, nameInput)
    discountTr.append(discountTd, discountInput)
    myTable.append(nameTr, discountTr)
    adminProductBox.append(offerButtonDiv, myTable, buttonDiv)  

}

//Panel for Edeting offers
async function adminEditOfferPanel(value) {
    let allOffers = await getAllOffers() 
    let adminBox = document.getElementById("adminProductBox")
    let myTable = document.createElement("table")
    
    adminBox.innerHTML = ""
    myTable.id = "offerTable"
    
    let optionDiv = document.createElement("div")
    let offerDropDown = await createOfferDropDown()
    offerDropDown.class = "selectOffer"
    offerDropDown.addEventListener("change", dropDownValue.bind(offerDropDown))             // WORKIGN HERE


    let offerButtonDiv = document.createElement("div")
    let createOfferBtn = document.createElement("button")
    let addToOfferBtn = document.createElement("button")
    let editOfferBtn = document.createElement("button")

    addToOfferBtn.addEventListener("click", adminOfferPanel)
    createOfferBtn.addEventListener("click", adminCreateOfferPanel)

    createOfferBtn.innerText = "Create Offer"
    addToOfferBtn.innerText = "Add to offer"
    editOfferBtn.innerText = "Edit Offer"


    offerButtonDiv.append(addToOfferBtn, createOfferBtn, editOfferBtn)
    optionDiv.append(offerDropDown, offerButtonDiv)
    adminBox.append(optionDiv, myTable)

    renderEditOfferTable(1)
}

async function dropDownValue() {
    console.log("värde =", this.value)
    let sortedByOffer = await getAllProdsInOffer(this.value)
    console.log(sortedByOffer) 
    renderEditOfferTable(this.value)
}

//Skriver ut alla produkter från valt Offer med checkboxar
async function renderEditOfferTable(offerId) {
    let sortedByOffer = await getAllProdsInOffer(offerId)
    let adminBox = document.getElementById("adminProductBox")
    let myTable = document.getElementById("offerTable")
    let buttonDiv = document.createElement("div")
    myTable.innerHTML = ""

    let titleTr = document.createElement("tr")
    let productIdTitleTd = document.createElement("td")
    let productNameTitleTd = document.createElement("td")
    let productPriceTitleTd = document.createElement("td")
    let productInStockTitleTd = document.createElement("td")
    let addToOfferTitleTd = document.createElement("td")
    let removeFromOfferBtn = document.createElement("button")
    let removeOfferBtn = document.createElement("button")
    
    removeFromOfferBtn.addEventListener("click", removeProductsFromOffer.bind(sortedByOffer))
    removeOfferBtn.addEventListener("click", removeOffer.bind(offerId))

    titleTr.className="updatePanalTitleRow"
    productIdTitleTd.innerHTML = "<h3>Id</h3>"
    productNameTitleTd.innerHTML = "<h3>Name</h3>"
    productPriceTitleTd.innerHTML = "<h3>Price</h3>"
    productInStockTitleTd.innerHTML = "<h3>In Stock</h3>"
    addToOfferTitleTd.innerHTML = "<h3>add to offer</h3>"
    removeFromOfferBtn.innerText = "Remove from offer"
    removeOfferBtn.innerText = "Remove offer"
    
    buttonDiv.append(removeFromOfferBtn, removeOfferBtn)
    titleTr.append(productIdTitleTd, productNameTitleTd, productPriceTitleTd, productInStockTitleTd, addToOfferTitleTd)
    myTable.append(titleTr)
    adminBox.append(myTable)
    sortedByOffer.forEach(product => { 
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
        checkBox.value = product.productId
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
    myTable.append(buttonDiv)
}
//Creating offer and saving in DB
async function createOffer() {
    let offerName = document.getElementById("offerNameInput").value
    let offerDiscount = document.getElementById("offerDiscountInput").value
    let offerData = { offerName, offerDiscount}
    let data = new FormData()

    data.append("offerData", JSON.stringify(offerData))

    const response = await makeReq("./api/recievers/offerReciever.php", "POST", data)
    console.log(response)
}

async function addProductsToOffer() {                                                               
    let offerCheck = document.getElementsByClassName("offerCheck")
    let checkedArray = []
    for (let i = 0; i < offerCheck.length; i++) {
        if(offerCheck[i].checked) {
            checkedArray.push(offerCheck[i].value)
        }
    }
    body = new FormData()
    body.set("offerCheck", JSON.stringify(checkedArray))
    body.set("offerId", JSON.stringify(this.value))
   
    const response = await makeReq("./api/recievers/offerReciever.php", "POST", body)
    console.log(response)
}

async function removeProductsFromOffer() {
    let offerCheck = document.getElementsByClassName("offerCheck")
    let checkedArray = []

    for (let i = 0; i < offerCheck.length; i++) {
        if(offerCheck[i].checked) {
            checkedArray.push(offerCheck[i].value)
        }
    }

    body = new FormData()
    body.set("removeOfferCheck", JSON.stringify(checkedArray))

    const response = await makeReq("./api/recievers/offerReciever.php", "POST", body)
    console.log(response) 
    renderEditOfferTable(this[0].offerId)
}

async function removeOffer() {
                                                                                                        //WORKING HERE
    console.log(this)

    if (confirm("are you sure you want to delete offer with ID = " + this + " from products?")) {        
        let data = new FormData()
        data.append("removeOffer", JSON.stringify(this))
        const response = await makeReq("./api/recievers/offerReciever.php", "POST", data)
        console.log(response)
        adminEditOfferPanel()

    }
}

/*****       ADMIN DASH FOR ORDERS    *****/

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

/*****       ADMIN DASH FOR MAKE ADMIN    *****/

//Hämta användare
async function getUsers() {
    const response = await makeReq("./api/recievers/userReciever.php", "GET")
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
    
    


    








