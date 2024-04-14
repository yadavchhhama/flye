document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const closeButton = document.querySelector('.close');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            const grossIncome = parseFloat(document.getElementById('grossIncome').value);
            const extraIncome = parseFloat(document.getElementById('extraIncome').value);
            const deductions = parseFloat(document.getElementById('deductions').value);
            const age = document.getElementById('age').value;

            const taxableIncome = grossIncome + extraIncome - deductions;
            let taxRate;
            if (age === '<40') {
                taxRate = 0.3;
            } else if (age === '≥40 & <60') {
                taxRate = 0.4;
            } else if (age === '≥60') {
                taxRate = 0.1;
            }

            const taxAmount = (taxableIncome > 800000) ? taxRate * (taxableIncome - 800000) : 0;
            document.getElementById('taxAmount').innerText = taxAmount.toFixed(2) + " Lakhs";
            modal.style.display = 'block';
        }
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            const errorIcon = input.nextElementSibling;
            if (!input.value && input.tagName !== 'SELECT') {
                errorIcon.style.display = 'inline';
                isValid = false;
            } else {
                errorIcon.style.display = 'none';
            }
        });
        return isValid;
    }
});