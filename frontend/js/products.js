const productForm =
    document.getElementById("productForm");

const productTable =
    document.getElementById("productTable");

const submitBtn =
    document.getElementById("submitBtn");

const searchInput =
    document.getElementById("searchInput");

let editProductId = null;
let allProducts = [];

// LOAD PRODUCTS
async function loadProducts() {

    const response = await fetch(
        "http://localhost:5000/api/products"
    );

    allProducts = await response.json();

    productTable.innerHTML = "";


    displayProducts(allProducts);
}

        function displayProducts(products){

    productTable.innerHTML = "";

    products.forEach((product) => {

        productTable.innerHTML += `

            <tr>

                <td>${product.productName}</td>

                <td>${product.category}</td>

                <td>${product.quantity}</td>

                <td>₹${product.price}</td>

                <td>

                    <button onclick="editProduct(
                        '${product._id}',
                        '${product.productName}',
                        '${product.category}',
                        '${product.quantity}',
                        '${product.price}'
                    )">

                        Edit

                    </button>


                    <button onclick="deleteProduct(
                        '${product._id}'
                    )">

                        Delete

                    </button>

                </td>

            </tr>
        `;
    });
}

// ADD OR UPDATE PRODUCT
productForm.addEventListener("submit",
async (e) => {

    e.preventDefault();

    const productName =
        document.getElementById("productName").value;

    const category =
        document.getElementById("category").value;

    const quantity =
        document.getElementById("quantity").value;

    const price =
        document.getElementById("price").value;


    const productData = {

        productName,
        category,
        quantity,
        price
    };


    // UPDATE
    if(editProductId){

        await fetch(
            `http://localhost:5000/api/products/${editProductId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(productData)
            }
        );

        alert("Product Updated");

        editProductId = null;

        submitBtn.innerText = "Add Product";

    }

    // ADD
    else {

        await fetch(
            "http://localhost:5000/api/products/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(productData)
            }
        );

        alert("Product Added");
    }


    productForm.reset();

    loadProducts();
    searchInput.addEventListener("keyup", () => {

    const searchValue =
        searchInput.value.toLowerCase();


    const filteredProducts =
        allProducts.filter((product) => {

            return product.productName
                .toLowerCase()
                .includes(searchValue);
        });


    displayProducts(filteredProducts);
});
});


// EDIT PRODUCT
function editProduct(
    id,
    name,
    category,
    quantity,
    price
){

    document.getElementById("productName").value =
        name;

    document.getElementById("category").value =
        category;

    document.getElementById("quantity").value =
        quantity;

    document.getElementById("price").value =
        price;


    editProductId = id;

    submitBtn.innerText = "Update Product";
}


// DELETE PRODUCT
async function deleteProduct(id) {

    await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
            method: "DELETE"
        }
    );

    alert("Product Deleted");

    loadProducts();
}


// INITIAL LOAD
loadProducts();