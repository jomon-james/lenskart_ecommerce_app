import PDFDocument from "pdfkit";

export const generateInvoice = () => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    // ✅ SIMPLE CONTENT ONLY
    doc.fontSize(18).text("Hello from your MERN App 🎉", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(12).text("This is a test PDF attachment.");
    doc.text("If you see this, PDF + Email is working correctly.");

    doc.end();
  });
};