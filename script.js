        const expenseList = [];
        let totalExpenses = 0;

        function showTab(tabId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
        }

        async function convertCurrency() {
            const amount = document.getElementById('amount').value;
            const currency = document.getElementById('currency').value.toUpperCase() || 'INR';

            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                const rate = data.rates[currency];

                if (rate) {
                    const convertedAmount = (amount * rate).toFixed(2);
                    document.getElementById('convertedAmount').textContent = `Converted Amount: ${convertedAmount} ${currency}`;
                } else {
                    alert('Invalid currency code.');
                }
            } catch (error) {
                console.error('Error fetching currency data:', error);
            }
        }

        function addExpense() {
            const amount = parseFloat(document.getElementById('expenseAmount').value);
            const category = document.getElementById('expenseCategory').value;

            if (!amount || isNaN(amount)) {
                alert('Please enter a valid amount.');
                return;
            }

            expenseList.push({ amount, category });
            totalExpenses += amount;

            document.getElementById('expenseList').innerHTML += `<li>${category}: $${amount.toFixed(2)}</li>`;
            document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);

            document.getElementById('expenseAmount').value = '';
            document.getElementById('expenseCategory').value = '';
        }
