import * as stepChange from "./sectionChange.js";

const formInputs = [...document.querySelectorAll('.step1-input')];
const labelDivs = [...document.querySelectorAll('.label-div')]
const durations = [...document.querySelectorAll('.duration')];
const addOns = [...document.querySelectorAll('.add-on')];


let paymentPlanObj;
let selectedAddOns = [];

export default function validate(btnIndex) {
    let isValid = true;
    if (btnIndex === 0) {
        for (let i = 0; i < formInputs.length; i++) {
            if (!formInputs[i].validity.valid) {
                if (!labelDivs[i].querySelector('.required')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.innerHTML = `<p class='required'>This field is required.</p>`;
                    labelDivs[i].append(errorMessage);
                }
                else {
                    null
                }
                isValid = false;
            }
            else {
                if (labelDivs[i].querySelector('.required')) {
                    const errorMessage = labelDivs[i].querySelector('.required');
                    errorMessage.remove();
                }
                else {
                    null;
                }
            }
        }
        console.log(isValid);
        if (isValid) {
            stepChange.nextStep();
        }
    }
    else if (btnIndex === 1) {
        const paymentPlan = document.querySelector('.selected-pay-plan');
        paymentPlanObj = {
            plan: `${paymentPlan.querySelector('.sub-title').textContent}`,
            duration: `${durations.find(dur => dur.classList.contains('selected-duration-option')).textContent}`,
            price: `${paymentPlan.querySelector('.sub-text').textContent}`
        }
        console.log(paymentPlanObj);
        stepChange.nextStep();
    }
    else if (btnIndex === 2) {
        addOns.forEach(opt => {
            if (opt.classList.contains('selected-add-on') && !selectedAddOns.some(addon => addon.addOn === opt.querySelector('.sub-title').textContent)) {
                selectedAddOns.push({
                    addOn: `${opt.querySelector('.sub-title').textContent}`,
                    price: `${opt.querySelector('.add-on-pricing').textContent}`
                })
            }
            else {
                null
            };
        });
        console.log(selectedAddOns);
        stepChange.nextStep();
        
    }
    else {

        stepChange.nextStep();
    }

}
export {selectedAddOns, paymentPlanObj};