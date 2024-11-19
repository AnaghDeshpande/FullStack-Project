const form = document.querySelector("form"),
        nxtBtn = form.querySelector(".nxtBtn"),
        backBtn = form.querySelector(".backBtn"),
        allInput = form.querySelectorAll(".first input");

nxtBtn.addEventListener("click", ()=> {
    allInput.forEach(input => {
        if(input.value != ""){
            form.classList.add('secActive');
        }else{
            form.classList.remove('secActive');
        }
    })
})

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

const sellBtn = form.querySelector(".nxtBtn");
const messageDiv = document.querySelector(".message");

sellBtn.addEventListener("onkeyup", () => {
    alert("Thank you for selling!You product will be sold within 3 days...");
});
