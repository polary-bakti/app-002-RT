import { useState } from 'react';
import { db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function BayarIuran() {
  const [file, setFile] = useState(null);

  const submit = async () => {
    const refFile = ref(storage, `bukti/${Date.now()}.jpg`);
    await uploadBytes(refFile, file);
    const url = await getDownloadURL(refFile);

    await addDoc(collection(db, 'pembayaran'), {
      nama: 'Budi',
      bulan: '2026-02',
      jumlah: 50000,
      metode: 'QRIS',
      buktiUrl: url,
      status: 'MENUNGGU_VERIFIKASI',
      createdAt: new Date()
    });

    alert('Bukti terkirim');
  };

  return (
    <>
      <h3>Bayar Iuran</h3>
      <img src="/qris-rt002.png" width="200" />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={submit}>Kirim Bukti</button>
    </>
  );
}
