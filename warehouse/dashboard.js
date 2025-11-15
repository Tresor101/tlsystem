// Warehouse Dashboard Logic

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

let inventory = getStored('inventory', [
    { name: 'Beer', category: 'Alcohol', unitPrice: 2, quantityInStock: 70, quantitySold: 50, revenue: 100, restockLevel: 20, timestamp: '2025-11-15 14:30' },
    { name: 'Wine', category: 'Alcohol', unitPrice: 5, quantityInStock: 40, quantitySold: 30, revenue: 150, restockLevel: 10, timestamp: '2025-11-15 15:00' }
]);
let restockRequests = getStored('restockRequests', []);
let barDrinks = getStored('barDrinks', [
    { id: 'D001', category: 'Beer', nameSize: 'Heineken 75cl', price: 3, sold: 20, remain: 50 },
    { id: 'D002', category: 'Whiskey', nameSize: 'Jameson 75cl', price: 8, sold: 10, remain: 15 },
    { id: 'D003', category: 'Vodka', nameSize: 'Smirnoff 75cl', price: 6, sold: 5, remain: 25 },
    { id: 'D004', category: 'Beer', nameSize: 'Heineken 33cl', price: 2, sold: 5, remain: 30 }
]);

function showWarehouseDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    const mainContent = document.getElementById('mainContent');
    mainContent.style.display = 'block';
    inventory = getStored('inventory', inventory);
    restockRequests = getStored('restockRequests', restockRequests);
    let inventoryRows = inventory.map(item => `
        <tr>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${item.name}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${item.category}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${item.unitPrice}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${item.quantityInStock}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${item.restockLevel}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${item.timestamp}</td>
        </tr>
    `).join('');
    let addProductForm = `
        <form id="addWarehouseProductForm" style="margin:2rem auto;max-width:600px;background:rgba(255,255,255,0.95);padding:1rem 2rem;border-radius:12px;box-shadow:0 2px 8px rgba(0,180,216,0.12);">
            <h3>Add New Product</h3>
            <div style="display:flex;flex-wrap:wrap;gap:1rem;">
                <input type="text" id="warehouseProductName" placeholder="Product Name" required style="flex:2;padding:0.5rem;">
                <input type="text" id="warehouseProductCategory" placeholder="Category" required style="flex:1;padding:0.5rem;">
                <input type="number" id="warehouseProductUnitPrice" placeholder="Unit Price" required style="flex:1;padding:0.5rem;">
                <input type="number" id="warehouseProductQuantity" placeholder="Quantity" required style="flex:1;padding:0.5rem;">
                <input type="number" id="warehouseProductRestock" placeholder="Restock Level" required style="flex:1;padding:0.5rem;">
            </div>
            <button type="submit" class="login-btn" style="margin-top:1rem;width:100%;background:#00b894;">Add Product</button>
        </form>
    `;
    let requestRows = restockRequests.map((req, idx) => `
        <tr>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${req.drinkId}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${req.nameSize}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${req.category}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${req.numBottles}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;">${req.requestedAt}</td>
            <td style="padding:0.7rem 0.5rem;border:1px solid #ccc;"></td>
        </tr>
    `).join('');
    mainContent.innerHTML = `
        <h2 style="text-align:center;margin-top:2rem;">Warehouse Dashboard</h2>
        ${addProductForm}
        <h3>Inventory</h3>
        <table style="width:80vw;margin:1rem auto;border-collapse:collapse;background:rgba(255,255,255,0.95);box-shadow:0 2px 8px rgba(0,180,216,0.12);">
            <thead>
                <tr style="background:#00b4d8;color:#fff;">
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Name</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Category</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Unit Price</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Quantity In Stock</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Restock Level</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Timestamp</th>
                </tr>
            </thead>
            <tbody>${inventoryRows}</tbody>
        </table>
        <h3>Restock Requests</h3>
        <table style="width:80vw;margin:1rem auto;border-collapse:collapse;background:rgba(255,255,255,0.95);box-shadow:0 2px 8px rgba(0,180,216,0.12);">
            <thead>
                <tr style="background:#ffb703;color:#fff;">
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Drink ID</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Name+Size</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Category</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Number of Bottles</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Timestamp</th>
                    <th style="padding:0.8rem 0.5rem;border:1px solid #ccc;">Action</th>
                </tr>
            </thead>
            <tbody>${requestRows}</tbody>
        </table>
        <button id="backBtnWarehouse" class="login-btn" style="margin:2rem auto;display:block;width:80vw;max-width:400px;background:#0077b6;">Back</button>
    `;
    document.getElementById('addWarehouseProductForm').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('warehouseProductName').value.trim();
        const category = document.getElementById('warehouseProductCategory').value.trim();
        const unitPrice = parseFloat(document.getElementById('warehouseProductUnitPrice').value);
        const quantity = parseInt(document.getElementById('warehouseProductQuantity').value);
        const restockLevel = parseInt(document.getElementById('warehouseProductRestock').value);
        const timestamp = new Date().toISOString().slice(0,16).replace('T',' ');
        if (!name || !category || isNaN(unitPrice) || isNaN(quantity) || isNaN(restockLevel)) {
            alert('Please fill all fields with valid values.');
            return;
        }
        inventory.push({ name, category, unitPrice, quantityInStock: quantity, quantitySold: 0, revenue: 0, restockLevel, timestamp });
        showWarehouseDashboard();
    };
    document.getElementById('backBtnWarehouse').onclick = function() {
        mainContent.style.display = 'none';
        document.getElementById('loginContainer').style.display = 'flex';
        // Optionally show admin options
    };
}

window.fulfillRestockRequest = function(idx) {
    restockRequests.splice(idx, 1);
    showWarehouseDashboard();
};

// Export for use in main script
window.showWarehouseDashboard = showWarehouseDashboard;
