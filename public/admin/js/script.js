//button status 
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button =>{
        button.addEventListener("click",() =>{
            const status = button.getAttribute("button-status");

            if(status) {
                url.searchParams.set("status",status);
            }else if(status=="") {
                url.searchParams.set("status","");
            }else{
                url.searchParams.delete("status",status);
            }

            window.location.href = url.href;
        });
    });
}

// end button status 

// Search from 

const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit",(e) => {
            e.preventDefault();
            const keyword = e.target.elements.keyword.value;
            if(keyword) {
                url.searchParams.set("keyword",keyword);
            }else{
                url.searchParams.delete("keyword");
            }
            window.location.href = url.href;

    });
}
// End Search from 

// Pagination

    const buttonsPagination = document.querySelectorAll("[button-pagination]");
    if(buttonsPagination) {
        let url = new URL(window.location.href);

        buttonsPagination.forEach(button => {
            button.addEventListener("click", () =>{
                const page = button.getAttribute("button-pagination");
                url.searchParams.set("page", page);
                
                window.location.href = url.href;
            });
        });
    }
// End Pagination

// CheckBox-Multi 
const checkboxMulti = document.querySelector("[check-box-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () =>{
        if(inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        }else{ 
            inputsId.forEach(input => {
                input.checked = false;
            })   
        }
    });

    inputsId.forEach(input => {
        input.addEventListener("click" , () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        });
    });
}
// End CheckBox-Multi 

// Form Change Multi 

const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkBoxMulti = document.querySelector("[check-box-multi]");
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete-all") {
            const isComfirm = confirm("Bạn Có Muốn Xóa Sản Phẩm Này Chứ!");
            if(!isComfirm) {
                return;
            }
        }

        if(inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input => {
                const id = input.value;

                if(typeChange == "change-position") {
                        const position = input.closest("tr").querySelector("input[name='position']").value;
                        ids.push(`${id}-${position}`);
                }else {
                    ids.push(id);
                }
                
            });
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();
        }else{
            alert("Hãy Chọn Ít Nhất Một Sản Phẩm !");
        }
    });
}
// End Form Change Multi 

// show alert 
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
        btnXShowAlert.classList.add("d-none");
    }, time);

    const btnXShowAlert = document.querySelector(".button-x");
    if(btnXShowAlert) {
        btnXShowAlert.addEventListener("click", () => {
            btnXShowAlert.classList.add("d-none");
            showAlert.classList.add("alert-hidden");
        });
    }
}
// end show alert 

// Upload Image 

const uploadImg = document.querySelector("[upload-img]");
if(uploadImg) {
    const uploadImgInput = document.querySelector("[upload-img-input]");
    const uploadImgPreview = document.querySelector("[upload-img-preview]");
    uploadImgInput.addEventListener("change",(e) =>  {
        const file = e.target.files[0];
        if(file) {
            uploadImgPreview.src = URL.createObjectURL(file);
        }
    });

    const imgDiv = document.querySelector("[img-div]");
    const imgSpan = imgDiv.querySelector("[img-span-x]");
    imgSpan.addEventListener("click", () => {
        uploadImgPreview.classList.add("d-none");
        imgSpan.style.display = "none"; 
        uploadImgPreview.src = "";
        uploadImgInput.value = "";
    });

}
// End Upload Image 


