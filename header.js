import { getAllProducts, renderProducts, getAllProdsInCategory, amountInCart } from "./products.js"
import {makeReq, getAllCategorys, saveFilterChocie, filterProducts } from "./main.js"
window.addEventListener("load", initSite)
let body
function initSite() {
    growHeader()
    headerNavBtn() 
  }
//Creates content for header  ** möjligtvis tabort alla A taggar då länk skapas i "headerBtnLink"
export async function headerNavBtn(link) {
    //Get alla elements needed
    let allCategorys = await getAllCategorys()
    let headerTop = document.getElementById("headerTop")
    //Create a button for all categorys
    let div = document.createElement("div") 
    let h2 = document.createElement("h2")
    div.className = "headerBox"
    h2.innerText = "Alla produkter"
    div.addEventListener("click", headerBtnLink.bind("Alla Produkter"))
    div.append(h2)
    headerTop.append(div)
    //Create a button for each category
    allCategorys.forEach(category => {
      //create elements
      let div = document.createElement("div") 
      let h2 = document.createElement("h2")
      //properties
      div.className = "headerBox"
      h2.innerText = category.name
      //Appends
      div.append(h2)
      headerTop.append(div)
      div.addEventListener("click", headerBtnLink.bind(category)) 

    });
  } 


   
 /*   export function filterProducts() {
    let productContainer = document.getElementById("allProductBox")
    let headline = document.getElementById("anchorProduct")
    
    headline.innerText= "Produkter > " + this.name
    productContainer.innerHTML  = ""
    renderProducts(getAllProdsInCategory(this.categoryId)) 
    headerLinks()
  }
   
  function showAllProducts() {
    let productContainer = document.getElementById("allProductBox")
    let headline = document.getElementById("anchorProduct")
  
    headline.innerText="Produkter"
    productContainer.innerHTML  = ""
    renderProducts(getAllProducts())
    headerLinks()
  }  */
  
  

function headerBtnLink() {
    saveFilterChocie(this)
    let body = document.getElementsByTagName("body")[0]
    window.location = "./index.html#anchorProduct"
    if(body.id == "indexBody") {
      let productWrapper = document.getElementById("allProductBox")
      productWrapper.innerHTML = ""
      filterProducts()  
    }
    closeHeader()  
}






  
    
  
  export function closeHeader() {
    let menuBtn = document.getElementById("menuBtn")
    let header = document.getElementsByTagName("header")[0]
    let headerBox = document.getElementsByClassName("headerBox")
  
    menuBtn.classList.toggle("change");
    header.className = ""
    window.setTimeout(() => {
      for(let i = 0; i < headerBox.length; i++) {      
        headerBox[i].className = "headerBox"
      }
    }, 500);
    }      
    
  
  export function growHeader() {
    
    let header = document.getElementsByTagName("header")[0] 
    let headerTop = document.getElementById("headerTop")
    let menuBtn = document.getElementById("menuBtn")
    let menu = document.getElementsByClassName("menu")[0]//Change name this and the button above
    let headerBox = document.getElementsByClassName("headerBox")
   
    menu.addEventListener("click", () => {
      header.classList.toggle("growHeader")
      menuBtn.classList.toggle("change");
      headerTop.className = "showHeaderContent"
      if(header.classList == "growHeader") { 
        for(let i = 0; i < headerBox.length; i++) {
          
            headerBox[i].className = "showHeaderContent headerBox slideRight"
          }
  
        }
        else {
            window.setTimeout(() => {
  
              for(let i = 0; i < headerBox.length; i++) {
          
                headerBox[i].className = "headerBox"
              }
            }, 500);
        }
    }) 
  }
  
  