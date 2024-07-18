document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input");
  const totalPriceElement = document.getElementById("totalPrice");

  inputs.forEach((input) => {
    input.addEventListener("input", updatePrice);
    if (input.type === "range") {
      const valueSpan = document.getElementById(`${input.id}Value`);
      input.addEventListener("input", () => {
        valueSpan.textContent = input.value;
      });
    }
  });

  function updatePrice() {
    const hours = parseFloat(document.getElementById("hours").value);
    const chemicals = parseFloat(document.getElementById("chemicals").value);
    const miles = parseFloat(document.getElementById("miles").value);
    const hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
    const mileageRate = parseFloat(
      document.getElementById("mileageRate").value
    );
    const overheadRate =
      parseFloat(document.getElementById("overheadRate").value) / 100;
    const profitMargin =
      parseFloat(document.getElementById("profitMargin").value) / 100;

    const equipmentCost = 4.5;
    const laborCost = hours * hourlyRate;
    const mileageCost = miles * mileageRate;
    const baseCost = equipmentCost + chemicals + laborCost + mileageCost;
    const overhead = baseCost * overheadRate;
    const profit = (baseCost + overhead) * profitMargin;
    const totalPrice = baseCost + overhead + profit;

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  updatePrice();
});
