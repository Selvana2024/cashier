//get total;
//create product;
//local storage(save);
//clear inputs;
//read data in table;
//count 1000product;
//delete;
//update;
//search;
//clean data;

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let index;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = " #087100";
  } else {
    total.innerHTML = "";
    total.style.background = "#700700";
  }
}

let productData;
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        productData.push(newProduct);
      }
    } else {
      productData.push(newProduct);
    }
  } else {
    productData[index] = newProduct;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  localStorage.setItem("product", JSON.stringify(productData));
  //console.log(newProduct);
  clearData();
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `;
    getTotal();
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");
  if (productData.length > 0) {
    deleteBtn.innerHTML = `
    <button onclick="deleteAll()">Delete All (${productData.length})</button>
    `;
  } else {
    deleteBtn.innerHTML = "";

  }
}
showData();

function deleteData(i) {
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);
  showData();
}

function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  showData();
}

function updateData(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = productData[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search by title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by category";
  }
  search.focus();
  search.value='';
  showData();
  //   console.log(id);
}

function searchData(value) {
    let table = '';
  if (searchMood == "title") {

    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `;
      }
    }

  } else {
    for (let i = 0; i < productData.length; i++) {
        if (productData[i].category.includes(value.toLowerCase())) {
          table += `
          <tr>
          <td>${i + 1}</td>
          <td>${productData[i].title}</td>
          <td>${productData[i].price}</td>
          <td>${productData[i].taxes}</td>
          <td>${productData[i].ads}</td>
          <td>${productData[i].discount}</td>
          <td>${productData[i].total}</td>
          <td>${productData[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
        }
      }
  }
  document.getElementById("tbody").innerHTML = table;
  // console.log(value);
}
