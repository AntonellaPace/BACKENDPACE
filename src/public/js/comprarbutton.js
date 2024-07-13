const comprarButton = document.querySelectorAll(".comprarButton");

comprarButton.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1000
        }).then(() => {
            const form = button.closest("form");
            if(form) form.submit();
        });
    });
});

const deleteButton = document.querySelectorAll(".deleteButton");

deleteButton.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado del carrito",
        showConfirmButton: false,
        timer: 1000
        }).then(() => {
            let form = button.closest("form");
            let url = form.getAttribute("action");
            fetch(url, {method: "DELETE"});
        });
    });
});

const eliminarButton = document.querySelectorAll(".eliminarButton");

eliminarButton.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado",
        showConfirmButton: false,
        timer: 1000
        }).then(() => {
            let form = button.closest("form");
            let url = form.getAttribute("action");
            fetch(url, {method: "DELETE"});
        });
    });
});