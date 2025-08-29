async function processArray() {
    const inputData = document.getElementById('inputData').value.trim();
    const apiUrl = document.getElementById('apiUrl').value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const btn = document.querySelector('.btn');

    if (!inputData) {
        showError('Please enter input data');
        return;
    }

    if (!apiUrl) {
        showError('Please enter API URL');
        return;
    }

    // Show loading
    btn.disabled = true;
    btn.textContent = 'Processing...';
    resultDiv.style.display = 'block';
    resultContent.innerHTML = '<div class="loading">🔄 Processing your request...</div>';

    try {
        // Parse input data
        const data = inputData.split(',').map(item => item.trim());

        // Make API request
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data })
        });

        const result = await response.json();

        if (response.ok && result.is_success) {
            showSuccess(result);
        } else {
            showError(result.error || 'API request failed');
        }

    } catch (error) {
        showError('Network error: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Process Array';
    }
}

function showLoading() {
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = '<div class="loading">🔄 Processing your request...</div>';
}

function showSuccess(result) {
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `
        <div class="success">✅ Request processed successfully!</div>
        <div class="result-item">
            <h4>Status</h4>
            <p>${result.is_success}</p>
        </div>
        <div class="result-item">
            <h4>User ID</h4>
            <p>${result.user_id}</p>
        </div>
        <div class="result-item">
            <h4>Email</h4>
            <p>${result.email}</p>
        </div>
        <div class="result-item">
            <h4>Roll Number</h4>
            <p>${result.roll_number}</p>
        </div>
        <div class="result-item">
            <h4>Odd Numbers</h4>
            <p>[${result.odd_numbers.join(', ')}]</p>
        </div>
        <div class="result-item">
            <h4>Even Numbers</h4>
            <p>[${result.even_numbers.join(', ')}]</p>
        </div>
        <div class="result-item">
            <h4>Alphabets (Uppercase)</h4>
            <p>[${result.alphabets.join(', ')}]</p>
        </div>
        <div class="result-item">
            <h4>Special Characters</h4>
            <p>[${result.special_characters.join(', ')}]</p>
        </div>
        <div class="result-item">
            <h4>Sum of Numbers</h4>
            <p>${result.sum}</p>
        </div>
        <div class="result-item">
            <h4>Concatenated String (Reverse + Alternating Caps)</h4>
            <p>"${result.concat_string}"</p>
        </div>
        <div class="result-item">
            <h4>Raw Response</h4>
            <pre>${JSON.stringify(result, null, 2)}</pre>
        </div>
    `;
}

function showError(message) {
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = `<div class="error">❌ ${message}</div>`;
}

document.getElementById("processBtn").addEventListener("click", processArray);
document.getElementById("processBtn").addEventListener("click", showLoading);

// Allow Enter key to submit
document.getElementById('inputData').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        processArray();
    }
});