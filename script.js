const wrapper = document.querySelector(".wrapper");
form = wrapper.querySelector("form");
fileinp = form.querySelector("input");
infoText = form.querySelector("p");
copyBtn = wrapper.querySelector(".copy");
closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code..."
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method:"POST", body:formData
    }).then(res => res.json()).then(result => {
        wrapper.classList.add("active")
        result = result[0].symbol[0].data;
        wrapper.querySelector("textarea").innerText = result
        form.querySelector("img").src = URL.createObjectURL(file);
        console.log(result);
    });
}
copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

fileinp.addEventListener("change", e=> {
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData()
    formData.append("file", file);
    fetchRequest(formData, file);
});

form.addEventListener("click", () => fileinp.click());
closeBtn.addEventListener("click", () => location.reload()); 