import * as validationExports from './validationAndNextBtn.js';
export function createTotal() {
    const totalBreakdown = document.querySelector('.total-breakdown');
    totalBreakdown.innerHTML = `<div class="total-pay-plan">
          <div class="total-pay-plan-text">
            <p class="pay-plan-title"></p>
            <a href="" class="change-plan-link">Change</a>
          </div>
          <p class="plan-price"></p>
        </div>
        <hr class="total-hr">
        <div class="total-add-ons-container">

        </div>`;
    document.querySelector('.pay-plan-title').textContent = `${validationExports.paymentPlanObj.plan}(${validationExports.paymentPlanObj.duration})`;
    document.querySelector('.plan-price').textContent = `${validationExports.paymentPlanObj.price}`;
    const addOnsContainer = document.querySelector('.total-add-ons-container');
    validationExports.selectedAddOns.forEach(addon => {
        const addOn = document.createElement('div');
        addOn.classList.add('total-add-on');
        addOn.innerHTML = `<p class="total-add-on-text">${addon.addOn}</p>
            <p class="total-add-on-price">${addon.price}</p>`;
        addOnsContainer.append(addOn);
    });
    let addOnValue = 0;
    for (let i = 0; i < validationExports.selectedAddOns.length; i++) {
        addOnValue += parseFloat(validationExports.selectedAddOns[i].price.match(/\d+(\.\d+)?/)[0]);
    }
    const totalValue = document.querySelector('.total-value');
    const planValue = parseFloat(validationExports.paymentPlanObj.price.match(/\d+(\.\d+)?/)[0])
    if (validationExports.paymentPlanObj.duration === 'Monthly') {
    totalValue.textContent = `+${addOnValue + planValue}/mo`;
    }
    else {
    totalValue.textContent = `+${addOnValue + planValue}/yr`;

    }
}
