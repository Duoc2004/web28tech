// Change Status 
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {

const formChangeStatus = document.querySelector("#form-change-status");

const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {

            const statusCurrent = button.getAttribute("data-status");

            const id = button.getAttribute("data-id");

            let statusChange = statusCurrent == "active" ? "inactive":"active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.action = action;
            
            formChangeStatus.submit();

        });
    });
}

// End Change Status 

// Delete Product 
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete) {
    const path = document.querySelector("#form-delete-item").getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isconfirm = confirm("Bạn Có Muốn Xóa Sản Phẩm này không ?");
            if(isconfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=PATCH`;
                formDelete.action = action;
                formDelete.submit(action);
            }
        });
    });
}

// End Delete Product 