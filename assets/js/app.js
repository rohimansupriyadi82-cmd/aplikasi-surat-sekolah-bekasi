// Fungsi Import CSV yang disesuaikan dengan format screenshot kamu
function importCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const lines = content.split("\n");
        const dataMurid = [];

        // Dimulai dari indeks 1 untuk melewati baris judul (header)
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === "") continue;

            const kolom = lines[i].split(","); // Asumsi pemisah adalah koma
            
            // Mapping sesuai urutan di screenshot kamu
            const murid = {
                no_peserta: kolom[0],
                nisn: kolom[1],
                nis: kolom[2],
                nama: kolom[3],
                jk: kolom[4],
                tmp_lahir: kolom[5],
                tgl_lahir: kolom[6],
                ayah: kolom[7],
                ibu: kolom[8],
                seri_ijazah: kolom[9],
                ortu_ijazah: kolom[10]
            };
            dataMurid.push(murid);
        }

        // Simpan ke LocalStorage agar tidak hilang saat refresh
        localStorage.setItem('database_murid', JSON.stringify(dataMurid));
        
        // Perbarui tampilan dropdown di index.html
        updateDropdownMurid(dataMurid);
        
        alert("Berhasil mengimpor " + dataMurid.length + " data murid!");
    };
    reader.readAsText(file);
}

// Fungsi untuk mengisi dropdown "Cari Nama Anak"
function updateDropdownMurid(data) {
    const select = document.querySelector('#murid select');
    if (!select) return;

    // Bersihkan dropdown kecuali pilihan pertama
    select.innerHTML = '<option>-- Cari Nama Anak --</option>';

    data.forEach((m, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = m.nama + " (" + m.nisn + ")";
        select.appendChild(option);
    });
}

// Tambahkan listener agar saat nama dipilih, form otomatis terisi
document.querySelector('#murid select')?.addEventListener('change', function(e) {
    const data = JSON.parse(localStorage.getItem('database_murid'));
    const terpilih = data[e.target.value];

    if (terpilih) {
        document.querySelector('input[name="nisn"]').value = terpilih.nisn;
        document.querySelector('input[name="nama"]').value = terpilih.nama;
        // Tambahkan input lainnya di sini agar otomatis terisi
    }
});
