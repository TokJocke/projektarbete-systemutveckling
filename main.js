window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")
document.getElementById("menuBtn").onclick = function() {menuToggle(this)};
const cartBtn = document.getElementById("cartBtn")


function initSite() {
	if (body){
       
        
	}
}

/** menyknapp toggle */
 function menuToggle(x) {
    x.classList.toggle("change");
  } 

export async function makeReq(path, method, body) {
    try {
        let response = await fetch(path, {
            method,
            body
        })

        return response.json()
        
    }
     catch(err) {
          console.error("Failed fetch", err)
      } 
}