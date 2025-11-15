// LocalStorage helpers
function getStored(key, defaultValue) {
    try {
        const val = localStorage.getItem(key);
        if (val) return JSON.parse(val);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

function setStored(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
}

// Seed default employees if missing
(function seedDefaultEmployees() {
    const defaultEmployees = [
        { username: 'jsmith002@tresorlodge.com', password: 'password123', role: 'warehouse' },
        { username: 'barman@tresorlodge.com', password: 'barpass', role: 'bar' },
        { username: 'reception1@tresorlodge.com', password: 'receppass', role: 'reception' },
        { username: 'laundry1@tresorlodge.com', password: 'laundrypass', role: 'laundry' },
        { username: 'admin@tlsystem.com', password: 'adminpass', role: 'admin' },
        { username: 'superadmin@tlsystem.com', password: 'superpass', role: 'superadmin' }
    ];
    if (!localStorage.getItem('employeeList')) {
        setStored('employeeList', defaultEmployees);
    }
})();

// Authentication and redirection only
function authenticateUser(email, password) {
    const employeeList = getStored('employeeList', []);
    // Login is successful if either username or password matches any employee record
    const user = employeeList.find(emp => emp.username === email || emp.password === password);
    if (user) {
        alert('Login successful! Redirecting to your dashboard...');
        redirectToDashboard(user.role);
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function redirectToDashboard(role) {
    switch (role) {
        case 'warehouse':
            window.location.href = 'warehouse/dashboard.html';
            break;
        case 'bar':
            window.location.href = 'bar/dashboard.html';
            break;
        case 'reception':
            window.location.href = 'reception/dashboard.html';
            break;
        case 'laundry':
            window.location.href = 'laundry/dashboard.html';
            break;
        default:
            alert('Unknown role.');
    }
}

// Example login form handler
// document.getElementById('loginForm').onsubmit = function(e) {
//     e.preventDefault();
//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value;
//     authenticateUser(email, password);
// };
