document.addEventListener('DOMContentLoaded', () => {
    const formButtons = document.querySelectorAll('.btn');
    const statusMessage = document.getElementById('statusMessage');
    const phoneNumber = '6283891543955'; // Ganti dengan nomor WhatsApp tujuan Anda (tanpa + dan spasi)

    formButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pengirim = button.getAttribute('data-pengirim');
            const tanggal = document.getElementById('tanggal').value;
            const nominal = document.getElementById('nominal').value;

            // Validasi formulir
            if (!tanggal || !nominal) {
                statusMessage.textContent = 'Harap isi tanggal dan nominal terlebih dahulu.';
                statusMessage.style.color = 'red';
                return;
            }

            // Memformat pesan untuk WhatsApp
            const message = `
Tabungan baru, Langgeng terus pokoknya!
Pengirim: ${pengirim}
Tanggal: ${tanggal}
Nominal: Rp ${new Intl.NumberFormat('id-ID').format(nominal)}
(Silakan kirimkan bukti bayar di balasan chat ini ya.)`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Buka tautan WhatsApp di tab baru
            window.open(whatsappURL, '_blank');

            // Beri feedback kepada pengguna
            statusMessage.textContent = 'Formulir berhasil diproses. Aplikasi WhatsApp akan terbuka.';
            statusMessage.style.color = 'green';
        });
    });
});
