// Bar Dashboard Logic

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

let barDrinks = getStored('barDrinks', [
    { id: 'D001', category: 'Beer', nameSize: 'Heineken 75cl', price: 3, sold: 20, remain: 50 },
    { id: 'D002', category: 'Whiskey', nameSize: 'Jameson 75cl', price: 8, sold: 10, remain: 15 },
    { id: 'D003', category: 'Vodka', nameSize: 'Smirnoff 75cl', price: 6, sold: 5, remain: 25 },
    { id: 'D004', category: 'Beer', nameSize: 'Heineken 33cl', price: 2, sold: 5, remain: 30 }
]);

function showBarEmployeeTable() {
    document.getElementById('loginContainer').style.display = 'none';
    const mainContent = document.getElementById('mainContent');
    mainContent.style.display = 'block';
    barDrinks = getStored('barDrinks', barDrinks);
    let tableRows = barDrinks.map(drink => `
        <tr>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${drink.id}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${drink.category}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${drink.nameSize}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${drink.price}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${drink.sold}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${drink.remain}</td>
        </tr>
    `).join('');
    mainContent.innerHTML = `
        <h2 style="text-align:center;margin-top:2rem;">Bar Dashboard</h2>
        <table style="width:80vw;margin:1rem auto;border-collapse:collapse;background:rgba(255,255,255,0.95);box-shadow:0 2px 8px rgba(0,180,216,0.12);">
            <thead>
                <tr style="background:#00b4d8;color:#fff;">
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Drink ID</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Category</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Name+Size</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Price</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Sold</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Remain</th>
                </tr>
            </thead>
            <tbody>${tableRows}</tbody>
        </table>
        <button id="backBtnBar" class="login-btn" style="margin:2rem auto;display:block;width:80vw;max-width:400px;background:#0077b6;">Back</button>
    `;
    document.getElementById('backBtnBar').onclick = function() {
        mainContent.style.display = 'none';
        document.getElementById('loginContainer').style.display = 'flex';
    };
}

window.showBarEmployeeTable = showBarEmployeeTable;
