// Laundry Dashboard Logic

function showLaundryDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    const mainContent = document.getElementById('mainContent');
    mainContent.style.display = 'block';
    mainContent.innerHTML = `
        <h2 style="text-align:center;margin-top:2rem;">Laundry Dashboard</h2>
        <p>Laundry dashboard content will go here.</p>
        <button id="backBtnLaundry" class="login-btn" style="margin:2rem auto;display:block;width:80vw;max-width:400px;background:#0077b6;">Back</button>
    `;
    document.getElementById('backBtnLaundry').onclick = function() {
        mainContent.style.display = 'none';
        document.getElementById('loginContainer').style.display = 'flex';
    };
}

window.showLaundryDashboard = showLaundryDashboard;
