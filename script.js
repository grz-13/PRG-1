const ADMIN="grz";

const PASSWORD="54321";

let data=JSON.parse(

localStorage.getItem("prg1")

)||[];

// LOGIN

function login(){

let user=document

.getElementById("username")

.value;

let pass=document

.getElementById("password")

.value;

if(user===ADMIN

&& pass===PASSWORD){

document

.getElementById("loginPage")

.style.display="none";

document

.getElementById("dashboard")

.style.display="block";

render();

}else{

alert("Login gagal");

}

}

// LOGOUT

function logout(){

location.reload();

}

// TAMBAH DATA

function tambahData(){

let nama=document

.getElementById("namaBarang")

.value.trim();

let jumlah=parseInt(

document

.getElementById("jumlahBarang")

.value);

let jenis=document

.getElementById("jenisTransaksi")

.value;

if(!nama || jumlah<=0){

return alert("Data salah");

}

if(jenis==="Keluar"

&& jumlah>stokBarang(nama)){

return alert("Stok tidak cukup");

}

data.push({

tanggal:new Date()

.toLocaleString(),

nama,

jenis,

jumlah

});

simpan();

render();

}

// HITUNG STOK

function stokBarang(nama){

let stok=0;

data.forEach(item=>{

if(item.nama

.toLowerCase()

===nama.toLowerCase()){

if(item.jenis==="Masuk")

stok+=item.jumlah;

else

stok-=item.jumlah;

}

});

return stok;

}

// PENCARIAN

function cariBarang(){

let keyword=document

.getElementById("cariBarang")

.value.toLowerCase();

let masuk=0;

let keluar=0;

let riwayat="";

data.forEach(item=>{

if(item.nama

.toLowerCase()

===keyword){

if(item.jenis==="Masuk")

masuk+=item.jumlah;

else

keluar+=item.jumlah;

riwayat+=`

<p>

${item.tanggal}

-

${item.jenis}

${item.jumlah}

</p>

`;

}

});

document

.getElementById("hasilCari")

.innerHTML=`

<h3>${keyword}</h3>

<p>Pemasukan: ${masuk}</p>

<p>Pengeluaran: ${keluar}</p>

<p>Stok: ${masuk-keluar}</p>

${riwayat}

`;

}

// SIMPAN

function simpan(){

localStorage.setItem(

"prg1",

JSON.stringify(data)

);

}

// RENDER

function render(){

let tabel=document

.getElementById("tabelData");

tabel.innerHTML="";

let totalMasuk=0;

let totalKeluar=0;

let barang=new Set();

data.forEach(item=>{

barang.add(item.nama);

if(item.jenis==="Masuk")

totalMasuk+=item.jumlah;

else

totalKeluar+=item.jumlah;

tabel.innerHTML+=`

<tr>

<td>${item.tanggal}</td>

<td>${item.nama}</td>

<td>${item.jenis}</td>

<td>${item.jumlah}</td>

</tr>

`;

});

document

.getElementById("jenisBarang")

.innerHTML=barang.size;

document

.getElementById("totalMasuk")

.innerHTML=totalMasuk;

document

.getElementById("totalKeluar")

.innerHTML=totalKeluar;

document

.getElementById("totalStok")

.innerHTML=

totalMasuk-totalKeluar;

}