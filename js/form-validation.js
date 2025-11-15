// Basic form validation example
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const userType = document.getElementById('userType').value;
    if (!email || !password) {
        alert('Please enter both email and password.');
        e.preventDefault();
        return;
    }
    // Simulate successful login for demonstration
    if (userType === 'superadmin') {
        e.preventDefault();
        showSuperAdminOptions();
    }
    // Add further login logic for other user types if needed
});

function showSuperAdminOptions() {
    const container = document.querySelector('.login-container');
    container.innerHTML = `
        <h2>Super Admin Options</h2>
        <ul style="list-style:none;padding:0;">
            <li><button class="login-btn" style="margin-bottom:1rem;width:100%;">Bar &amp; Restaurant</button></li>
            <li><button class="login-btn" style="margin-bottom:1rem;width:100%;">Rooms</button></li>
            <li><button class="login-btn" style="width:100%;">Warehouse</button></li>
        </ul>
    `;
}
