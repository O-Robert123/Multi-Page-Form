import validate from "./validationAndNextBtn.js";
import * as stepChange from "./sectionChange.js";

const rightSections = [...document.querySelectorAll('.right-section')];
const stepCircles = [...document.querySelectorAll('.stepflow-circle')];
const nextBtns = [...document.querySelectorAll('.next-btn')];
const backBtns = [...document.querySelectorAll('.back-btn')];
const payPlans = [...document.querySelectorAll('.payment-plan')];
const durationSwitch = document.querySelector('#check');
const monthlyOption = document.querySelector('#monthly-option');
const yearlyOption = document.querySelector('#yearly-option');
const addOns = [...document.querySelectorAll('.add-on')];

let sectionIndex = rightSections.findIndex(sect => !sect.hidden);
console.log(sectionIndex);
stepCircles[sectionIndex].classList.add('selected-step');

nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(index);
        validate(index);
    });
});

backBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        stepChange.previousStep();
    });
});

payPlans.forEach((plan => {
    plan.addEventListener('click', function () {
        payPlans.forEach(p => {
            p.classList.remove('selected-pay-plan')
        })
        plan.classList.toggle('selected-pay-plan');
    })
}))

durationSwitch.addEventListener('change', function () {
    if (durationSwitch.checked) {
        monthlyOption.classList.remove('selected-duration-option');
        yearlyOption.classList.add('selected-duration-option');
        document.querySelector('#arcade-price').textContent = `$90/yr`;
        document.querySelector('#advanced-price').textContent = `$120/yr`;
        document.querySelector('#pro-price').textContent = `$150/yr`;
        payPlans.forEach(plan => {
            if (!plan.querySelector('.months-free')) {
                const freeMonths = document.createElement('p');
                freeMonths.innerHTML = `<p class='months-free'>2 months free</p>`
                plan.append(freeMonths);
            }
            else {
                null;
            }
        })
    }
    else {
        payPlans.forEach(plan => {
            plan.querySelector('.months-free').remove();
        })
        yearlyOption.classList.remove('selected-duration-option');
        monthlyOption.classList.add('selected-duration-option');
        document.querySelector('#arcade-price').textContent = `$9/mo`;
        document.querySelector('#advanced-price').textContent = `$12/mo`;
        document.querySelector('#pro-price').textContent = `$15/mo`;
    }
})

addOns.forEach(a => {
    a.addEventListener('click', function () {
        a.querySelector('.add-on-checkbox').checked = !a.querySelector('.add-on-checkbox').checked;
        a.classList.toggle('selected-add-on');
    });
});

