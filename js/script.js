document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title: "Perhatian!",
        text: "Silahkan wajib copy nomor Whatsapp pasien dengan penulisan nomor 62 (contoh: 6285956368533)",
        icon: "info",
        confirmButtonText: "OK",
        timerProgressBar: true
    });
});

function setStatus(status) {
    let waNumber = document.getElementById("waNumber").value.trim();
    if (waNumber === "") {
        Swal.fire({
            title: "Perhatian!",
            text: "Masukkan Nomor WhatsApp pasien terlebih dahulu!",
            icon: "error",
            confirmButtonText: "OK",
            timerProgressBar: true
        });
        return;
    }

    let message = `Selamat Pagi/Siang/Sore/Malam Bapak/Ibu, pasien yang terhormat. Status berkas Anda di PRIMAYA HOSPITAL KARAWANG saat ini berada: ${status}. Terima kasih.`;
    document.getElementById("message").value = message;
}

function sendWhatsApp() {
    let waNumber = document.getElementById("waNumber").value.trim();
    let message = document.getElementById("message").value;

    if (waNumber === "" || message === "") {
        Swal.fire({
            title: "Perhatian!",
            text: "Pastikan nomor WhatsApp dan Pesan tidak kosong!",
            icon: "error",
            confirmButtonText: "OK",
            timerProgressBar: true
        });
        return;
    }

    let whatsappURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}
