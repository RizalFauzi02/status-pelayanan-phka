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
        "Menyiapkan Berkas Pulang": "Selamat Pagi/Siang/Sore/Malam, \n\nSaat ini perawat sedang menyiapkan berkas kepulangan Anda:\n\nNama: *[Nama Pasien]* \nTanggal lahir: *[Tgl Lahir]* \n\nMohon menunggu, kami akan segera menginformasikan proses selanjutnya.",

        "Mengantar Obat Pasien Pulang": "Terima kasih telah bersedia menunggu. Petugas Farmasi saat ini sedang mempersiapkan obat kepulangan Anda dan akan segera mengantarkannya ke ruang perawatan.",

        "Dalam Antrian": "Berkas kepulangan Anda saat ini sedang dalam antrian di Kasir Rawat Inap. Terima kasih telah bersedia menunggu.",

        "Sedang Dalam Proses": "Berkas kepulangan Anda saat ini sedang diproses oleh Petugas Kasir Rawat Inap. Estimasi waktu penyelesaian adalah [.....] menit. Terima kasih atas pengertiannya."
    };

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let waNumber = document.getElementById("waNumber").value.trim();
            let namaPasien = document.getElementById("nama_pasien").value.trim().toUpperCase();
            let tglLahirInput = document.getElementById("tgl_lahir_pasien").value.trim();
            let status = this.getAttribute("data-status");

            // Validasi Input
            if (waNumber === "" || namaPasien === "" || tglLahirInput === "") {
                Swal.fire({
                    title: "Perhatian!",
                    text: "Harap lengkapi semua data pasien sebelum melanjutkan!",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                return;
            }

            // Mengubah format tanggal lahir dari yyyy-mm-dd ke dd/mm/yyyy
            let tglLahirFormatted = formatTanggal(tglLahirInput);

            let message = messages[status]
                .replace("[Nama Pasien]", namaPasien)
                .replace("[Tgl Lahir]", tglLahirFormatted);

            document.getElementById("message").value = message;

            // Highlight tombol yang aktif
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Fungsi untuk mengubah format tanggal lahir
    function formatTanggal(dateStr) {
        let parts = dateStr.split("-"); // Memisahkan "yyyy-mm-dd"
        return `${parts[2]}/${parts[1]}/${parts[0]}`; // Menyusun kembali jadi "dd/mm/yyyy"
    }
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
