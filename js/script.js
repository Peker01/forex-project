"use strict";

const form = document.getElementById("converterForm");
const output = document.getElementById("output");
const loading = document.getElementById("loading");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const selectedCurrency = document.getElementById("currency").value;

  if (amount === "" || amount <= 0) {
    output.innerHTML = "Please enter a valid amount.";
    return;
  }

  loading.classList.remove("hidden");
  output.innerHTML = "";

  const url = `https://v6.exchangerate-api.com/v6/ab4e08248808e29c1489bedb/latest/SEK`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const exchangeRate = data?.conversion_rates?.[selectedCurrency] ?? null;

    if (!exchangeRate) {
      output.innerHTML =
        "Could not fetch exchange rate for the selected currency.";
    } else {
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      output.innerHTML = `Converted Amount: ${convertedAmount} ${selectedCurrency}`;
    }
  } catch (error) {
    console.error(error);
    output.innerHTML = "Error fetching data. Please try again later.";
  } finally {
    loading.classList.add("hidden");
  }
});
