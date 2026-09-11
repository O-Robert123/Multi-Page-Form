import { createTotal } from './total.js';
import * as validationExports from './validationAndNextBtn.js';

const rightSections = [...document.querySelectorAll('.right-section')];
const stepIcons = [...document.querySelectorAll('.stepflow-circle')];

export function nextStep() {
    const selectedStepIndex = rightSections.findIndex(sect => !sect.hidden);
    function nextSection() {
        if (selectedStepIndex <= 2) {
            const selectedIconIndex = stepIcons.findIndex(icon => icon.classList.contains('selected-step'));
            rightSections[selectedStepIndex].hidden = true;
            rightSections[selectedStepIndex + 1].hidden = false;
            stepIcons[selectedStepIndex].classList.remove('selected-step');
            stepIcons[selectedIconIndex + 1].classList.add('selected-step');
        }
        else {
            document.querySelector('.thank-you-container').hidden = false;
            rightSections[selectedStepIndex].hidden = true;
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
    stepIcons[selectedStepIndex].classList.remove('selected-step');
    stepIcons[selectedIconIndex - 1].classList.add('selected-step');
    if ((selectedStepIndex - 1) === 3) {
        createTotal();
    }
}