window.addEventListener("load", initSite)
let body = document.getElementById("indexBody")



function initSite() {
	if (body){
       
        
	}
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