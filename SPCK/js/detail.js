let pds = ""
let editIndex = ""
let products = []

window.onload = function () {
    pds = localStorage.getItem("products");
    editIndex = localStorage.getItem("editIndex");
    if (pds) {
        products = JSON.parse(pds);
    }

    const product = JSON.parse(localStorage.getItem("editProduct"));
    if (product) {
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        imageBase64 = product.image;

        const img = document.getElementById("preview");
        img.src = product.image;
        img.style.display = "block";
    }
    
};

function saveProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    if (!name || !price || !image) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    const product = {
        name: name,
        price: price,
        image: imageBase64
    };

    if (!editIndex || editIndex === "") {
        products.push(product);
    } else {
        products[editIndex] = product;
    }

    localStorage.setItem("products", JSON.stringify(products))
    resetForm();
    window.location.href = "index.html";
}






function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
    const editIndex = document.getElementById("editIndex");
    if (editIndex) {
        document.getElementById("editIndex").value = "";
    }
}

let imageBase64 = "";

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        imageBase64 = reader.result;
        const img = document.getElementById("preview");
        img.src = imageBase64;
        img.style.display = "block";
    };
    reader.readAsDataURL(file);
}
