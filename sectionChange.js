import { createTotal } from './total.js';
import * as validationExports from './validationAndNextBtn.js';

const rightSections = [...document.querySelectorAll('.full-right')];
const stepIcons = [...document.querySelectorAll('.stepflow-circle')];
const buttonContainers = [...document.querySelectorAll('.buttons-container')]

export function nextStep() {
    const selectedStepIndex = rightSections.findIndex(sect => !sect.hidden);
    function nextSection() {
        if (selectedStepIndex <= 2) {
            const selectedIconIndex = stepIcons.findIndex(icon => icon.classList.contains('selected-step'));
            rightSections[selectedStepIndex].hidden = true;
            rightSections[selectedStepIndex + 1].hidden = false;

            rightSections[selectedStepIndex + 1].classList.remove('slideInRight');
            void rightSections[selectedStepIndex + 1].offsetWidth;
            rightSections[selectedStepIndex + 1].classList.add('slideInRight');

            stepIcons[selectedStepIndex].classList.remove('selected-step');
            stepIcons[selectedIconIndex + 1].classList.add('selected-step');

            buttonContainers[selectedStepIndex].hidden = true;
            buttonContainers[selectedStepIndex + 1].hidden = false;
        }
        else {
            rightSections[selectedStepIndex].hidden = true;
            document.querySelector('.thank-you-container').hidden = false;
            document.querySelector('.thank-you-container').classList.remove('slideInRight');
            void document.querySelector('.thank-you-container').offsetWidth;
            document.querySelector('.thank-you-container').classList.add('slideInRight');
        }
    }

    if (selectedStepIndex + 1 === 2) {
        nextSection();
        if (validationExports.paymentPlanObj.duration === 'Yearly') {
            document.querySelector('#online-service-price').textContent = `$10/yr`;
            document.querySelector('#larger-storage-price').textContent = `$20/yr`;
            document.querySelector('#customizable-profile-price').textContent = `$20/yr`;
        } else {
            null
        }
    }
    else if ((selectedStepIndex + 1) === 3) {
        nextSection();
        createTotal();
    }
    else {
        nextSection();
    }
};


export function previousStep() {
    const selectedStepIndex = rightSections.findIndex(sect => !sect.hidden);
    const selectedIconIndex = stepIcons.findIndex(icon => icon.classList.contains('selected-step'));
    rightSections[selectedStepIndex].hidden = true;
    rightSections[selectedStepIndex - 1].hidden = false;

    rightSections[selectedStepIndex - 1].classList.remove('slideInRight');
    void rightSections[selectedStepIndex - 1].offsetWidth;
    rightSections[selectedStepIndex - 1].classList.add('slideInLeft');

    stepIcons[selectedStepIndex].classList.remove('selected-step');
    stepIcons[selectedIconIndex - 1].classList.add('selected-step');

    buttonContainers[selectedStepIndex].hidden = true;
    buttonContainers[selectedStepIndex - 1].hidden = false;
    if ((selectedStepIndex - 1) === 3) {
        createTotal();
    }
}