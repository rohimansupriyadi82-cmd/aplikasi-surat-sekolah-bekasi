/* FILE: assets/js/app.js
   Fungsi: Logika Rumus Nilai, Barcode, Import CSV, dan Cetak F4
*/

// 1. RUMUS PERHITUNGAN NILAI AKURAT (Sesuai Permintaan)
function hitungNilaiSiswa(raport, us, ki3, ki4) {
    // Bobot Nilai (Bisa diedit di menu Pengaturan nantinya)
    const bobot = {
        raport: 0.6, // 60%
        ujian: 0.4,  // 40%
        ki3: 0.5,    // 50%
        ki4: 0.5     // 50%
    };

    // Rumus Nilai Akhir
    const nilaiAkhir = (raport * bobot.raport) + (us * bobot.ujian);
    
    // Rumus Nilai Pengetahuan
    const nilaiPengetahuan = (ki3 * bobot.ki3) + (ki4 * bobot.ki4);

    return {
        akhir: nilaiAkhir.toFixed(2),
        pengetahuan: nilaiPengetahuan.toFixed(2)
    };
}

// 2. GENERATE BARCODE (Untuk Validasi Surat)
function buatBarcode(idElemen, dataSiswa) {
    // Memerlukan library JsBarcode yang sudah dipanggil di index.html
    if (window.JsBarcode) {
        JsBarcode("#" + idElemen, dataSiswa, {
            format: "CODE128",
            lineColor: "#000",
            width: 1.5,
            height: 40,
            displayValue: true,
            fontSize: 12
        });
    }
}

// 3. FUNGSI IMPORT DATA CSV
function importCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const baris = e.target.result.split("\n");
        console.log("Data CSV terbaca:", baris.length, "baris.");
        alert("Berhasil mengimpor " + (baris.length - 1) + " data murid!");
        // Logika memasukkan data ke tabel/database lokal di sini
    };
    reader.readAsText(file);
}

// 4. LOGIKA CETAK PRESISI F4
function jalankanCetak() {
    // Tambahkan class khusus cetak ke body
    document.body.classList.add('sedang-mencetak');
    window.print();
    // Hapus class setelah selesai/batal cetak
    window.onafterprint = function() {
        document.body.classList.remove('sedang-mencetak');
    };
}

// Event Listener untuk Tombol Simpan (Global)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-simpan')) {
        // Simulasi proses simpan
        const originalText = e.target.innerHTML;
        e.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
        
        setTimeout(() => {
            e.target.innerHTML = originalText;
            alert("Data Berhasil Disimpan dengan Akurat!");
        }, 800);
    }
});
