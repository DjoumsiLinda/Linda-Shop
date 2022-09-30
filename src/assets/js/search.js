fetch('http://localhost:8090/shop/products/')
  .then(function(response) {
    return response.json();
  })
  .then(function(products) {
    for (var product of products) {
      if (
        product.name.toLowerCase().indexOf(value.toLowerCase()) === 0 &&
          countResults <= 3
      ) {
          results.push(product.name);
          id.push(product.id);
          countResults++;
      }
    }
    console.log("matching countries", results, results.length);

    if (results.length >= 0) {
      for (let i=0; i<results.length ; results) {
        var result=results[i];
        const aElement = document.createElement("a");
        // aElement.href="products/5";
        aElement.style.textDecoration="none";
        aElement.style.color="black";
        const node = document.createElement("p");
        node.classList.add("result");
        node.style.cursor="pointer"
        node.innerHTML= result;
        aElement.append(node);
        resultsContainer.append(aElement);
      }
    } else {
      //if the user types gibberish, render a "no results" message onscreen
      resultsContainer.append("no results");
    }

    //if the input field is empty, no countries should be shown
    if (value === "") {
      resultsContainer.innerHTML = ""
    }
  });
