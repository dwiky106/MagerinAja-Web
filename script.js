document.addEventListener('DOMContentLoaded', () => {
    const formButtons = document.querySelectorAll('.btn');
    const statusMessage = document.getElementById('statusMessage');
    const phoneNumber = '6283891543955'; // Ganti dengan nomor WhatsApp tujuan Anda (tanpa + dan spasi)
    const buktiInput = document.getElementById('bukti');
    let buktiDataURL = '';

    // Event listener untuk membaca file gambar yang diunggah
    buktiInput.addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                buktiDataURL = reader.result;
            };
            reader.readAsDataURL(file);
        } else {
            buktiDataURL = '';
        }
    });

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

            // Validasi bukti bayar
            if (!buktiDataURL) {
                statusMessage.textContent = 'Harap unggah bukti bayar.';
                statusMessage.style.color = 'red';
                return;
            }

            // Memformat pesan untuk WhatsApp
            let message = `
Halo, ada setoran tabungan baru!
Pengirim: ${pengirim}
Tanggal: ${tanggal}
Nominal: Rp ${new Intl.NumberFormat('id-ID').format(nominal)}
`;

            // Tambahkan Data URL bukti bayar
            message += `\nBukti pembayaran (Data URL): ${buktiDataURL}`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Buka tautan WhatsApp di tab baru
            window.open(whatsappURL, '_blank');

            // Beri feedback kepada pengguna
            statusMessage.textContent = 'Data dan bukti bayar sedang diproses untuk dikirim via WhatsApp.';
            statusMessage.style.color = 'green';
        });
    });
});
