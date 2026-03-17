function importCSV(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const lines = e.target.result.split("\n");
        const dataMurid = [];

        // Loop mulai dari baris kedua (indeks 1) untuk melewati judul kolom
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === "") continue;

            // Memisahkan kolom dengan koma
            const kolom = lines[i].split(",");
            
            // Mapping data sesuai urutan screenshot CSV Anda
            dataMurid.push({
                no_peserta: kolom[0],
                nisn: kolom[1],
                nis: kolom[2],
                nama: kolom[3],
                jk: kolom[4],
                tmp_lahir: kolom[5],
                tgl_lahir: kolom[6],
                ayah: kolom[7],
                ibu: kolom[8],
                ijazah: kolom[9],
                ortu_ijazah: kolom[10]
            });
        }

        // Simpan ke memori browser
        localStorage.setItem('database_murid', JSON.stringify(dataMurid));
        
        // Panggil fungsi untuk mengisi dropdown
        tampilkanKeDropdown(dataMurid);
        alert("Berhasil memuat " + dataMurid.length + " data murid.");
    };
    reader.readAsText(file);
}

function tampilkanKeDropdown(data) {
    const dropdown = document.getElementById('select-murid');
    dropdown.innerHTML = '<option value="">-- Cari Nama Anak --</option>';

    data.forEach((item, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = item.nama; // Menampilkan Nama Peserta di dropdown
        dropdown.appendChild(opt);
    });
}

// Event listener saat nama dipilih di dropdown
document.getElementById('select-murid')?.addEventListener('change', function() {
    const data = JSON.parse(localStorage.getItem('database_murid'));
    const dipilih = data[this.value];

    if (dipilih) {
        // Isi otomatis ke input field
        document.getElementById('input-nisn').value = dipilih.nisn;
        document.getElementById('input-nama').value = dipilih.nama;
    }
});
