var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    }
  });


 
 // cart
const product=[
  {
    id: 0,
    class: 'button',
    image: 'images/seeds/mushroom.jpg',
    title: 'Baishnab Mushroom',
    price: 190,
  },
  {
    id: 1,
    image: 'images/seeds/wheat_straw.jpg',
    title: 'Wheat Straw Mulch',
    price: 597,
  },
  {
    id: 2,
    image: 'images/seeds/sampada_agritech.jpg',
    title: 'Sampada Agritech',
    price: 379,
  },
  {
    id: 3,
    image: 'images/seeds/pusa_basmati.jpg',
    title: 'Malowal® Pusa Basmati 1847',
    price: 327,
  },
  {
    id: 4,
    image: 'images/fertilizer/vermi_compost.jpg',
    title: 'TrustBasket Organic Vermicompost',
    price: 385,
  },
  {
    id: 5,
    image: 'images/fertilizer/neem_powder.jpg',
    title: 'TrustBasket Neem Cake Powder',
    price: 165,
  },
  {
    id: 6,
    image: 'images/fertilizer/garuda.jpg',
    title: 'Electrical Battery Spray Machine',
    price: 4400,
  },
  {
    id: 7,
    image: 'images/fertilizer/coska.jpg',
    title: 'COSKIRA Air Pressure Sprayer',
    price: 399,
  },
  {
    id: 8,
    image: 'images/tools/bkr.jpg',
    title: 'BKR® Power Tiller',
    price: 68990,
  },
  {
    id: 9,
    image: 'images/tools/Falcon.jpg',
    title: 'FALCON FGR-16 Garden Rake',
    price: 290,
  },
  {
    id: 10,
    image: 'images/tools/kraft.jpg',
    title: '10CLUB Garden Tool Set',
    price: 599,
  },
  {
    id: 11,
    image: 'images/tools/glove.jpg',
    title: 'Garden Farming Gloves',
    price: 199,
  }
];
const categories =[...new Set(product.map((item)=>
  {return item}))]
  let i=0;
  document.getElementById("root").innerHTML= categories.map((item)=>
  {
    var {image, title, price} = item;
    return(
      `<div class="box">
        <div class="img-box">
          <img class="images" src=${image}></img>
        </div>
        <div class="bottom">
          <p>${title}</p>
          <h2>&#x20B9; ${price}.00</h2>`+
          "<button onclick='addtocart("+(i++)+")'>Add to Cart</button>"+
        `</div>
      </div>`
    )
  }).join('');

var cart =[];

function addtocart(a){
  cart.push({...categories[a]});
  displaycart();
}

function displaycart(){
  let j=0, total=0;
  document.getElementById("count").innerHTML=cart.length;
  if(cart.length==0){
    document.getElementById('cartItem').innerHTML="Your cart is empty";
    document.getElementById("total").innerHTML="&#x20B9; "+0+".00";
  }
  else{
    document.getElementById("cartItem").innerHTML=cart.map((items)=>
    {
      var {image, title, price}=items;
      total=total+price;
      document.getElementById("total").innerHTML="&#x20B9 "+total+".00";
      return(
        `<div class="cart-item">
        <div class="row-img">
          <img class='rowimg' src=${image}></img>
        </div>
        <p style='font-size:12px;'>${title}</p>
        <h2 style='font-size:15px;'>${price}.00 </h2>
        <i class="fa-solid fa-trash" onclick='delElement("+(j++)+")'></i></div>`
      );
    }).join('');
  }
}
function delElement(a){
  cart.splice(a,1);
  displaycart();
}