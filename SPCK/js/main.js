window.onload = loadProduct;
/**
 * load product
 */
function loadProduct() {
    let products = localStorage.getItem("products");
    let procontainer = document.getElementById("products");

    // Xóa dữ liệu cũ (tránh load trùng)
    procontainer.innerHTML = "";

    if (products) {
        products = JSON.parse(products);

        products.forEach((pro, index) => {
            procontainer.innerHTML += `
                <div class="product" onclick="openEditPage(${index})">
                    <img src="${pro.image}">
                    <h4>${pro.name}</h4>
                    <p class="price">${formatPrice(pro.price)}đ</p>
                    <button class="btn-delete" onclick="deleteProduct(event, ${index})">
                🗑 Xóa
            </button>
                </div>
                  
            `;  
        });
    }
}

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN");
}

function openEditPage(index) {
    let products = JSON.parse(localStorage.getItem("products"));
    localStorage.setItem("editIndex", index);
    localStorage.setItem("editProduct", JSON.stringify(products[index]));
    window.location.href = "edit_product.html";
}

function openAddPage() {
    localStorage.removeItem("editProduct");
    localStorage.removeItem("editIndex");
    window.location.href = "add_product.html";
}

function deleteProduct(event, index) {
    event.stopPropagation(); // ngăn click lan lên sửa

    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));

    loadProduct(); // load lại danh sách
}
