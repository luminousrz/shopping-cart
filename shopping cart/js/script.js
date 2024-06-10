let products = [
    {title: "موبایل آیفون ۱۳ پرومکس", price: "45000000" , count: 1 , src:"./img/iphone13.jpg"},
    {title: "موبایل آیفون ۱۴ پرومکس", price: "63000000", count: 1 ,  src:"./img/iphone13Guard.jpg"},
];
products.forEach((item) =>{
    // X MARK ICON COL
    let rowDiv = document.createElement("div");
    rowDiv.classList.add('row','justify-content-center','align-items-center','pb-0','contentRow')
    let colDiv1 = document.createElement("div");
    colDiv1.classList.add('col-md-1','col-12','pe-0','ps-0','d-flex','justify-content-end')
    let iconDiv = document.createElement("div");
    iconDiv.classList.add('deleteOrderIcon');
    let deleteicon = document.createElement("i");
    deleteicon.classList.add('fa-solid','fa-xmark');
    deleteicon.addEventListener("click",(deleteIcon))
    iconDiv.appendChild(deleteicon)
    colDiv1.appendChild(iconDiv)
    rowDiv.appendChild(colDiv1)
    document.getElementsByClassName("containerOfContent")[0].appendChild(rowDiv)

    // PROUDCTS IMG COL
    let colDiv2 = document.createElement("div");
    colDiv2.classList.add('col-md-1','col-12','pe-0','ps-0','d-flex','justify-content-center')
    let imgDiv = document.createElement("div");
    imgDiv.className ="imgWrapperOfOrder";
    let img = document.createElement("img");
    img.src = `${item.src}`;
    imgDiv.appendChild(img);
    colDiv2.appendChild(imgDiv);
    rowDiv.appendChild(colDiv2);

    // PRODUCTS TEXT COL
    let colDiv3 = document.createElement("div");
    colDiv3.classList.add('col-md-2','col-12','d-flex','justify-content-center');
    let productTextDiv = document.createElement("div");
    productTextDiv.className = "productText";
    let pTag = document.createElement("p");
    pTag.innerText = `${item.title}`;
    productTextDiv.appendChild(pTag);
    let spanTag1 = document.createElement("span");
    spanTag1.innerText = `${item.price} تومان`;
    productTextDiv.appendChild(spanTag1);
    colDiv3.appendChild(productTextDiv);
    rowDiv.appendChild(colDiv3);

    // PRODUCTS COUNTER AND TOTAL PRICE COL
    let colDiv4 = document.createElement("div")
    colDiv4.classList.add('col-md-4','col-12','pe-0','ps-0','d-flex','justify-content-center');
    let orderCounterDiv = document.createElement("div");
    orderCounterDiv.className = "orderCounter";
    let increaseOrderIcon = document.createElement("i");
    increaseOrderIcon.classList.add('fa-solid','fa-caret-up');
    let numberOfOrder = document.createElement("span");
    numberOfOrder.innerText = `${item.count}`;
    let decreaseOrderIcon = document.createElement("i")
    decreaseOrderIcon.classList.add('fa-solid','fa-caret-down');
    let countWrapper = document.createElement("div");
    countWrapper.className = "countWrapper";
    countWrapper.appendChild(increaseOrderIcon)
    countWrapper.appendChild(numberOfOrder)
    countWrapper.appendChild(decreaseOrderIcon)
    orderCounterDiv.appendChild(countWrapper)
    let priceWrapper = document.createElement("div");
    priceWrapper.className = "priceWrapper";
    let pTag2 = document.createElement("p");
    pTag2.innerText = `${parseInt(item.price) * item.count}`;
    priceWrapper.appendChild(pTag2)
    orderCounterDiv.appendChild(priceWrapper);
    colDiv4.appendChild(orderCounterDiv)
    rowDiv.appendChild(colDiv4)

    // HORIZONTAL LINE UNDER PRODUCTS
    let horizontalLineDiv = document.createElement("div");
    horizontalLineDiv.className = "horizontalLine";
    rowDiv.appendChild(horizontalLineDiv)
    
})

// REMOVING EACH PRODUCT
let cartIcon = document.querySelector(".cartIcon span");
cartIcon.innerText = products.length;
function deleteIcon(index){
    let contentRows = document.querySelectorAll(".contentRow")
    products.splice(index,1)
    let content = document.querySelector(".contentRow").remove();
    updateProductsLength()
    if(products.length === 0){
        document.querySelector(".sumOfOrders").remove();
        document.querySelector(".deleteOrderButton").remove();
        let messageBox = document.createElement("p")
        messageBox.className = "deleteAllMessageBox";
        messageBox.innerText = "سبد خرید خالی است."
        let span = document.createElement("span")
        span.className = "deleteAllTextReturn"
        span.innerText = "برای برگشت به فروشگاه کلیک کنید"
        let a = document.createElement("a")
        a.href = "#"
        a.className = "deleteAllTextReturnLink"
        document.querySelector(".containerOfContent").appendChild(messageBox);
        a.appendChild(span)
        document.querySelector(".containerOfContent").appendChild(a)
    }
    if(products.length == 1 && (contentRows.length - 1) == 1){
        let cartIcon = document.querySelector(".cartIcon span");
        cartIcon.innerText = products.length;
    }else{
        let cartIcon = document.querySelector(".cartIcon span");
        cartIcon.innerText = products.length
    }
}
function updateProductsLength(){
    return products.length;
}
// COUNTER OF ORDER | TOTAL PRICE | SUM OF TOTAL PRICE 

let counter = document.querySelectorAll(".orderCounter");
counter.forEach(function(countItem , index){
    let decreasing = countItem.querySelector(".fa-caret-down");
    let increasing = countItem.querySelector(".fa-caret-up");
    let valueOfElement = countItem.querySelector(".orderCounter span");
    let totalAmount = countItem.querySelector("p")
    decreasing.addEventListener("click",function(){
        decrease(index , valueOfElement);
        update(index , valueOfElement , totalAmount)
        updateSumOfTotalPrice()
    })
    increasing.addEventListener("click",function(){
        increase(index , valueOfElement);
        update(index , valueOfElement , totalAmount)
        updateSumOfTotalPrice()
    })
    update(index , valueOfElement , totalAmount)
    updateSumOfTotalPrice()
})
function update(index , valueOfElement , totalAmount){
    let totalPrice = parseInt(products[index].price) * products[index].count;
    totalAmount.innerText = totalPrice + ' تومان';
}
function decrease(index , valueOfElement){
    if(products[index].count > 1){
        products[index].count--;
        valueOfElement.innerText = products[index].count;
    }
}
function increase(index , valueOfElement){
   if(products[index].count < 9){
    products[index].count++;
    valueOfElement.innerText = products[index].count
   }
}
function updateSumOfTotalPrice() {
    let totalPriceSum = 0;
    let totalPriceSumNumber = document.querySelector(".sumOfOrders span");
    products.forEach(function(product) {
        totalPriceSum = totalPriceSum + parseInt(product.price) * product.count;
    });
    totalPriceSumNumber.innerText = totalPriceSum + ' تومان'
}

// BUTTON FO DELETING ALL THE PRODUCTS
function deleteAll(){
    products =[];
    document.querySelector(".containerOfContent").remove();
    document.querySelector(".sumOfOrders").remove();
    document.querySelector(".deleteOrderButton").remove();
    let messageBox = document.createElement("p")
    messageBox.className = "deleteAllMessageBox";
    messageBox.innerText = "سبد خرید خالی است."
    let span = document.createElement("span")
    span.className = "deleteAllTextReturn"
    span.innerText = "برای برگشت به فروشگاه کلیک کنید"
    let a = document.createElement("a")
    a.href = "#"
    a.className = "deleteAllTextReturnLink"
    document.body.appendChild(messageBox);
    a.appendChild(span)
    document.body.appendChild(a)
    updateProductsLength()

}
document.querySelector(".deleteOrderButton button").addEventListener("click",(deleteAll))
// SWITCHING TO DARK MOOD
let switchIcons = document.querySelector(".fa-cloud-moon");

function switchToDarkMood() {
    document.body.classList.toggle("dark-theme");
    
    if(document.body.classList.contains("dark-theme")) {
        switchIcons.classList.replace('fa-cloud-moon', 'fa-sun');
        localStorage.setItem('darkTheme', 'ON');
    } else {
        switchIcons.classList.replace('fa-sun', 'fa-cloud-moon');
        localStorage.setItem('darkTheme', 'OFF');
    }
}
if(localStorage.getItem('darkTheme') === 'ON') {
    document.body.classList.add("dark-theme");
    switchIcons.classList.replace('fa-cloud-moon', 'fa-sun');
    document.body.querySelectorAll("i").style = "color:white;"
} else {
    document.body.classList.remove("dark-theme");
    switchIcons.classList.replace('fa-sun', 'fa-cloud-moon');
    document.body.querySelectorAll("i").style = "color:black;"
}

document.querySelector(".deleteOrderButton").addEventListener("click",()=>{
    if(products.length === 0){
        let cartIcon = document.querySelector(".cartIcon span");
        cartIcon.innerText = products.length;
    }
})

