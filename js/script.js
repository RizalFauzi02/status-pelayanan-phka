document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title: "Perhatian!",
        text: "Silahkan wajib copy nomor Whatsapp pasien dengan penulisan nomor 62 (contoh: 6285956368533)",
        icon: "info",
        confirmButtonText: "OK",
        timerProgressBar: true
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll(".status-btn");

    const messages = {
        "Menyiapkan Berkas Pulang": "Selamat Pagi/Siang/Sore/Malam, \nSaat ini perawat sedang menyiapkan berkas kepulangan Anda atas nama: *[Nama Pasien]*, tanggal lahir: *[Tgl Lahir]*. \nMohon menunggu, kami akan segera menginformasikan proses selanjutnya.",

        "Mengantar Obat Pasien Pulang": "Terima kasih telah bersedia menunggu. Petugas Farmasi saat ini sedang mempersiapkan obat kepulangan Anda dan akan segera mengantarkannya ke ruang perawatan.",

        "Dalam Antrian": "Berkas kepulangan Anda saat ini sedang dalam antrian di Kasir Rawat Inap. Terima kasih telah bersedia menunggu.",

        "Sedang Dalam Proses": "Berkas kepulangan Anda saat ini sedang diproses oleh Petugas Kasir Rawat Inap. Estimasi waktu penyelesaian adalah [.....] menit. Terima kasih atas pengertiannya."
    };

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let waNumber = document.getElementById("waNumber").value.trim();
            let namaPasien = document.getElementById("nama_pasien").value.trim().toUpperCase();
            let tglLahir = document.getElementById("tgl_lahir_pasien").value.trim();
            let status = this.getAttribute("data-status");

            // Validasi Input
            if (waNumber === "" || namaPasien === "" || tglLahir === "") {
                Swal.fire({
                    title: "Perhatian!",
                    text: "Harap lengkapi semua data pasien sebelum melanjutkan!",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                return;
            }

            let message = messages[status]
                .replace("[Nama Pasien]", namaPasien)
                .replace("[Tgl Lahir]", tglLahir);

            document.getElementById("message").value = message;

            // Highlight tombol yang aktif
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });
});



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
        // Tunggu 2 detik sebelum halaman di-refresh
    setTimeout(function() {
      location.reload();
    }, 2000);
}
