import PDFDocument from "pdfkit";

export const generateInvoice = (order) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40 });
    let buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    // 🧾 TITLE
    doc.fontSize(18).text("GST INVOICE", { align: "center" });
    doc.moveDown();

    // 📄 ORDER INFO
    doc.fontSize(12);
    doc.text(`Order ID: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    // 📍 CUSTOMER
    doc.text(`Customer: ${order.address.fullName}`);
    doc.text(`City: ${order.address.city}`);
    doc.moveDown();

    // 📊 TABLE HEADER
    const tableTop = 150;

    doc.text("Item", 40, tableTop);
    doc.text("Qty", 250, tableTop);
    doc.text("Price", 300, tableTop);
    doc.text("Total", 400, tableTop);

    // LINE BELOW HEADER
    doc.moveTo(40, tableTop + 15)
       .lineTo(550, tableTop + 15)
       .stroke();

    // 📦 ITEMS
    let y = tableTop + 30;

    order.items.forEach((item) => {
      doc.text(item.name, 40, y);
      doc.text(item.quantity, 250, y);
      doc.text(`₹${item.price}`, 300, y);
      doc.text(`₹${item.price * item.quantity}`, 400, y);

      y += 25;
    });

    // LINE AFTER ITEMS
    doc.moveTo(40, y)
       .lineTo(550, y)
       .stroke();

    y += 20;

    // 💰 SUMMARY
    doc.text(`Subtotal: ₹${order.subtotal.toFixed(2)}`, 350, y);
    y += 20;

    doc.text(`GST (18%): ₹${order.gstAmount.toFixed(2)}`, 350, y);
    y += 20;

    doc.fontSize(14).text(`Total: ₹${order.totalAmount.toFixed(2)}`, 350, y);

    doc.end();
  });
};