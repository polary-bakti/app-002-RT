const functions = require('firebase-functions');
const admin = require('firebase-admin');
const PDFDocument = require('pdfkit');
const fs = require('fs');

admin.initializeApp();
const db = admin.firestore();

exports.cekIuranTunggak = functions.pubsub
  .schedule('every day 07:00')
  .timeZone('Asia/Jakarta')
  .onRun(async () => {
    const snap = await db.collection('iuran')
      .where('status', '==', 'TUNGGAK')
      .where('pushSent', '==', false)
      .get();

    snap.forEach(doc => {
      doc.ref.update({ pushSent: true });
    });
  });

exports.generateRekap = functions.pubsub
  .schedule('1 of month 08:00')
  .timeZone('Asia/Jakarta')
  .onRun(async () => {
    const doc = new PDFDocument();
    const path = '/tmp/rekap.pdf';
    doc.pipe(fs.createWriteStream(path));
    doc.text('REKAP KEUANGAN RT 002');
    doc.end();
  });
