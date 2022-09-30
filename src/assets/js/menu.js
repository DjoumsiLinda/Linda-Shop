window.onload=function() {
  var menu = document.querySelector(".menu");
  var overlay = document.querySelector("#overlay");
  var btnx = document.querySelector(".btnX");
  menu?.addEventListener("click", handlerMenu(overlay, menu));
  overlay?.addEventListener("click", handlerOverlay(overlay));
  btnx?.addEventListener("click", handlerBtnx(overlay, btnx));

  var search = document.querySelector("#search");
  search?.addEventListener("input", handleSearch);

  var caterory = document.querySelector(".caterory");
  var cateroryList = document.querySelector(".caterory .list");
  caterory?.addEventListener("click", handlerCaterory(caterory, cateroryList));

  var tab = document.querySelector(".tab");
  tab?.addEventListener("click", openInfo(tab, 'description'));
  document.querySelector("#defaultOpen")?.click();
}

function handlerCaterory(caterory, cateroryList){
  caterory?.addEventListener("click", function () {
    cateroryList.toggleClass('hidden');
  });
}

function handlerMenu(overlay, menu) {
  menu?.addEventListener("click", function () {
    overlay.classList.add("on");
  });
}
function handlerOverlay(overlay) {
  overlay?.addEventListener("click", function () {
    overlay.classList.remove("on");
  });
}
function handlerBtnx(overlay, btnx) {
  btnx?.addEventListener("click", function () {
    overlay.classList.remove("on");
  });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ tabs
function openInfo(evt, info) {
  if(!evt || evt.currentTarget==undefined){
    return;
  }
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(info).style.display = "block";
  evt.currentTarget.className += " active";
} 

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ search

function handleSearch(e) {
  var resultsContainer = document.querySelector("#container #results");
  let products;
  let results = [];
  let id = [];

  resultsContainer.innerHTML = ""

  var value = e?.target.value; 
  
  products = fetch('http://localhost:8090/shop/products/')
    .then(function(response) {
      return response.json();
    })
    .then(function(products) {
      return products;
  })

  products.then(
    (erg)=>{
      for (var product of erg) {
        if (
          product.name.toLowerCase().indexOf(value.toLowerCase()) === 0 || 
          product.description.toLowerCase().indexOf(value.toLowerCase()) === 0 ||
          product.description.toLowerCase().includes(value.toLowerCase()) ||
          product.productTyp.toLowerCase().includes(value.toLowerCase())
        ) {
            results.push(product.description);
            id.push(product.id);
        }
      }

      console.log("matching countries", results);
      if (results.length > 0) {
        results.forEach((re, index)=>{
          const aElement = document.createElement("a");
          var link="products/"+id[index]
          aElement.href=link;
          aElement.style.textDecoration="none";
          aElement.style.color="black";
          const node = document.createElement("p");
          node.classList.add("result");
          node.style.cursor="pointer"
          node.innerHTML= re;
          aElement.append(node);
          resultsContainer.append(aElement);
        })
      } else {
        //if the user types gibberish, render a "no results" message onscreen
        resultsContainer.append("no results");
      }

      //if the input field is empty, no countries should be shown
      if (value === "") {
        resultsContainer.innerHTML = ""
      }
    }
    
  )

  //if the input field is empty, no countries should be shown
  if (value === "") {
    resultsContainer.innerHTML = ""
  }


}
