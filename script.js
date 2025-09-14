const movie = document.querySelector("#movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");

movie.value = JSON.parse(localStorage.getItem("moviePrice")) || movie.value;
let seatsInd;
let seatsCount = JSON.parse(localStorage.getItem("count")) || 0;
let totalPrice = JSON.parse(localStorage.getItem("total")) || 0;
populateUi();

//      CLICK ON SEAT
seats.forEach(seat  => {
  seat.addEventListener("click", () => {
    seat.classList.toggle("selected");
    calculateCount();
  });
});

//    
movie.addEventListener("change", () => {
  calculateCount();
});

//    CALCULATE COUNT & TOTAL
function calculateCount() {
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  seatsCount = selectedSeats.length;
  totalPrice = seatsCount * movie.value;
  saveData(selectedSeats, seatsCount, totalPrice);
  populateUi();
}

//    UPDATE COUNT & TOTAL
function updateCount() {
  count.textContent = `${seatsCount}`;
  total.textContent = `${totalPrice}`;
}

//    SAVE DATA LOCALLY
function saveData(selectedSeats, seatsCount, totalPrice) {
  localStorage.setItem("count", JSON.stringify(seatsCount));
  localStorage.setItem("total", JSON.stringify(totalPrice));
  localStorage.setItem("moviePrice", JSON.stringify(movie.value));

  seatsInd = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("seatsInd", JSON.stringify(seatsInd));
}

//    POPULATE UI
function populateUi() {
  updateCount();
  seatsInd = JSON.parse(localStorage.getItem("seatsInd"));
  if(seatsInd) {
    let selectedSeats = [...seatsInd].map(ind => [...seats][ind]);

    selectedSeats.forEach(seat => {
      seat.classList.add("selected");
    });     
  }
}