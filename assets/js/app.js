// 1. FUNGSI IMPORT CSV (Disesuaikan dengan urutan kolom di Screenshot Anda)
function importCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        // Membagi baris (mendukung format Windows dan Linux)
        const rows = text.split(/\r?\n/);
        const dataMurid = [];

        // Mulai dari baris ke-2 (index 1) untuk melewati header
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === "") continue;

            // Deteksi otomatis apakah CSV menggunakan koma (,) atau titik koma (;)
            const delimiter = rows[i].includes(';') ? ';' : ',';
            const kolom = rows[i].split(delimiter);

            // Mapping berdasarkan urutan foto data Anda
            if (kolom.length >= 4) {
                dataMurid.push({
                    no_peserta: kolom[0]?.trim(),
                    nisn: kolom[1]?.trim(),
                    nis: kolom[2]?.trim(),
                    nama: kolom[3]?.trim(),
                    jk: kolom[4]?.trim(),
                    tmp_lahir: kolom[5]?.trim(),
                    tgl_lahir: kolom[6]?.trim(),
                    ayah: kolom[7]?.trim(),
                    ibu: kolom[8]?.trim(),
                    ijazah: kolom[9]?.trim(),
                    ortu_ijazah: kolom[10]?.trim()
                });
            }
        }

        if (dataMurid.length > 0) {
            localStorage.setItem('database_murid', JSON.stringify(dataMurid));
            updateDropdown(dataMurid);
            alert("Berhasil mengimpor " + dataMurid.length + " data murid!");
        } else {
            alert("Gagal membaca data. Pastikan format CSV benar.");
        }
    };
    reader.readAsText(file);
}

// 2. FUNGSI UPDATE DROPDOWN
function updateDropdown(data) {
    const select = document.querySelector('#select-murid');
    if (!select) return;

    select.innerHTML = '<option value="">-- Cari Nama Anak --</option>';
    data.forEach((m, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = m.nama;
        select.appendChild(opt);
    });
}

// 3. EVENT LISTENER SAAT NAMA DIPILIH
document.addEventListener('change', function(e) {
    if (e.target.id === 'select-murid') {
        const data = JSON.parse(localStorage.getItem('database_murid'));
        const m = data[e.target.value];

        if (m) {
            // Mengisi kotak NISN dan Nama sesuai ID yang ada di HTML
            if(document.getElementById('input-nisn')) document.getElementById('input-nisn').value = m.nisn;
            if(document.getElementById('input-nama')) document.getElementById('input-nama').value = m.nama;
        }
    }
});

// Jalankan update dropdown saat halaman direfresh jika data sudah ada
window.onload = function() {
    const storedData = localStorage.getItem('database_murid');
    if (storedData) {
        updateDropdown(JSON.parse(storedData));
    }
};
