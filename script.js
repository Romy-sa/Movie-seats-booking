
const movie = document.querySelector("select");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");

seats.forEach(i => {
  i.addEventListener("click", (e) => {
    e.target.classList.toggle("selected");
    calculateTotal();
  });
});

movie.addEventListener("change", () => {
   calculateTotal();
})

function calculateTotal() {
  let selectedSeatsCount = document.querySelectorAll(".row .seat.selected").length;
  let totalPrice = selectedSeatsCount * movie.value;
  count.textContent = `${selectedSeatsCount}`;
  total.textContent = `${totalPrice}`
}