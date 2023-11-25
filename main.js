const ads = document.getElementById("advertisement");
const alert = document.getElementById('alert');    
const buyNow = document.getElementById('final-buy-now');
const currency = new Intl.NumberFormat(undefined, {style: 'currency', currency: 'PHP'});
const product = document.getElementById("overview");
const product_list = document.querySelectorAll(".card");
const sizes = document.querySelectorAll(".overview-sizes");

function bought()
{
    var qty = document.getElementById('overview-quantity').value;
    if(qty == 0)
    {
        return;
    }

    playAds();

    var element = document.querySelector('[name="' + document.getElementById('overview-title').textContent + '"]')
    var sto = element.getAttribute("stock") - qty;
    element.setAttribute("stock", sto);
    overview(element);
    alert.classList.remove('d-none');
    alert.classList.add('d-block');
    alert.innerHTML = "Item bought. (" + qty + " pieces.)";

    updateQuantity(sto);
}

function carted()
{
    alert.classList.remove('d-none');
    alert.classList.add('d-block');
    alert.innerHTML = "Item added to the cart.";
    playAds();
}

function hide()
{
    product.classList.remove("d-flex");
    product.classList.add("d-none");
}

function jump()
{
    ads.classList.remove('d-flex');
    ads.classList.add('d-none');
    ads.children[0].volume = 0;
}

function overview(element)
{
    alert.classList.add("d-none");
    product.classList.remove("d-none");
    product.classList.add("d-flex");

    document.getElementById("overview-title").innerHTML = element.getAttribute("name");

    var stars = element.getAttribute("ratings");
    const ratings = document.getElementById("overview-rating");
    ratings.innerHTML = "";
    ratings.appendChild(document.createTextNode(stars));
    for(var i = 0; i < stars; i++)
    {
        var star = document.createElement('i');
        star.classList.add("bi");
        star.classList.add("bi-star-fill")
        ratings.appendChild(star);
    }
    for(var i = stars; i < 5; i++)
    {
        var star = document.createElement('i');
        star.classList.add("bi");
        star.classList.add("bi-star")
        ratings.appendChild(star);
    }

    document.getElementById("overview-rated").innerHTML = Math.floor(element.getAttribute("sold") * 0.93) + " Ratings";
    document.getElementById("overview-sold").innerHTML = element.getAttribute("sold") + " Sold";
    document.getElementById("overview-price").innerHTML = currency.format(element.getAttribute("price"));
    document.getElementById("overview-quantity").setAttribute("max", element.getAttribute("stock"));
    document.getElementById("overview-quantity-max").innerHTML = element.getAttribute("stock") + " pieces available";

    const img = document.getElementById("overview-product");
    img.setAttribute("src", element.children[0].getAttribute("src"));
    img.setAttribute("alt", element.children[0].getAttribute("name"));
}

function playAds()
{
    ads.classList.remove('d-none');
    ads.classList.add('d-flex');
    ads.children[0].currentTime = 0;
    ads.children[0].volume = 1;

    const skip = document.getElementById('skip');
    skip.classList.remove('d-flex');
    skip.classList.add('d-none');
    setTimeout(() => {
        skip.classList.remove('d-none');
        skip.classList.add('d-flex');
    }, 5000);
    ads.setAttribute("muted", "false");

    ads.children[0].addEventListener('ended', jump, false);
}

function selectSize(element)
{
    for (var i = 0; i < sizes.length; i++)
    {
        sizes[i].style.backgroundColor = "#f8f9fa";
        sizes[i].style.color = "#6e757c";
    }
    element.style.backgroundColor = "#6e757c";
    element.style.color = "#fff";
}

function updateQuantity(value)
{
    document.getElementById("overview-quantity-count").innerHTML = value;

    const disabled = "#81ae90";
    const enabled = "#408558";
    if (value == 0)
    {
        buyNow.style.backgroundColor = disabled;
        buyNow.value = 0;
    }
    else if (buyNow.value == 0)
    {
        buyNow.style.backgroundColor = enabled;
        buyNow.value = -1;
    }
}

for(var i = 0; i < product_list.length; i++)
{
    var element = product_list[i];
    var img = element.children[0];
    var body = element.children[1];
    var title = body.children[0];
    var price = body.children[1];

    img.setAttribute("alt", element.getAttribute("name"));
    title.innerHTML = element.getAttribute("name");
    price.innerHTML = currency.format(element.getAttribute("price"));
    element.setAttribute("onclick", "overview(this)");
}

for(var i = 0; i < sizes.length; i++)
{
    sizes[i].setAttribute("onclick", 'selectSize(this)');
}

selectSize(sizes[0]);

updateQuantity(0);

ads.children[0].volume = 0;
console.log("Time will take you away");