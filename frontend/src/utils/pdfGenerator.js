import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Utility to convert image URL to base64 with timeout
 */
const getBase64ImageFromURL = (url, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    
    const timer = setTimeout(() => {
      reject(new Error("Image Load Timeout: " + url));
    }, timeout);

    img.onload = () => {
      clearTimeout(timer);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => {
      clearTimeout(timer);
      reject(new Error("Image Load Error: " + url));
    };
    img.src = url;
  });
};

export const generateAdmissionPDF = async (admission) => {
  console.log("Starting PDF generation for:", admission);
  
  if (!admission) {
    alert("Error: No admission data provided.");
    return;
  }

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(14, 77, 146); // #0E4D92
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SANSKAR ENGLISH MEDIUM SCHOOL", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Where Learning Meets Innovation", pageWidth / 2, 28, { align: "center" });
    doc.text("Admission Form - Academic Year 2026-27", pageWidth / 2, 34, { align: "center" });

    let currentY = 50;

    // Photos Section
    const photos = [
      { url: admission.form_data?.childPhotoUrl, label: "Student" },
      { url: admission.form_data?.fatherPhotoUrl, label: "Father" },
      { url: admission.form_data?.motherPhotoUrl, label: "Mother" }
    ].filter(p => p.url && typeof p.url === 'string');

    if (photos.length > 0) {
      console.log("Loading photos:", photos.length);
      for (let i = 0; i < photos.length; i++) {
        try {
          const base64 = await getBase64ImageFromURL(photos[i].url);
          doc.addImage(base64, 'PNG', 20 + (i * 60), currentY, 40, 40);
          doc.setFontSize(8);
          doc.setTextColor(100);
          doc.text(photos[i].label, 40 + (i * 60), currentY + 45, { align: "center" });
        } catch (e) {
          console.warn(`Could not load image: ${photos[i].label}`, e);
        }
      }
      currentY += 55;
    }

    // Section 1: Personal Details
    console.log("Generating Section 1");
    autoTable(doc, {
      startY: currentY,
      head: [['Field', 'Information']],
      body: [
        ['Registration No', String(admission.reg_no || 'PENDING')],
        ['Student Name', `${admission.student_first_name || ''} ${admission.student_middle_name || ''} ${admission.student_surname || ''}`],
        ['Date of Birth', String(admission.dob || 'N/A')],
        ['Grade Applying For', String(admission.grade || 'N/A')],
        ['Category', String(admission.category || 'N/A')],
        ['Phone Number', String(admission.phone || 'N/A')],
        ['Email Address', String(admission.email || 'N/A')],
      ],
      theme: 'striped',
      headStyles: { fillColor: [14, 77, 146] },
      margin: { top: 10 }
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // Section 2: Family Details
    console.log("Generating Section 2");
    autoTable(doc, {
      startY: currentY,
      head: [['Relation', 'Name', 'Education']],
      body: [
        ['Father', `${admission.form_data?.fatherFirstName || ''} ${admission.form_data?.fatherMiddleName || ''} ${admission.form_data?.fatherSurname || ''}`, String(admission.form_data?.fatherEducation || 'N/A')],
        ['Mother', `${admission.form_data?.motherFirstName || ''} ${admission.form_data?.motherMiddleName || ''} ${admission.form_data?.motherSurname || ''}`, String(admission.form_data?.motherEducation || 'N/A')],
      ],
      theme: 'grid',
      headStyles: { fillColor: [14, 77, 146] }
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // Section 3: Address
    console.log("Generating Section 3");
    autoTable(doc, {
      startY: currentY,
      head: [['Residential Address']],
      body: [
        [`${admission.form_data?.address || 'N/A'}, Pincode: ${admission.form_data?.pincode || 'N/A'}`],
      ],
      theme: 'plain',
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // Section 4: Payment Info
    console.log("Generating Section 4");
    const txnId = admission.transactionId || admission.form_data?.transactionId || 'N/A';
    autoTable(doc, {
      startY: currentY,
      head: [['Transaction Details']],
      body: [
        ['Payment Status', txnId !== 'N/A' ? 'SUCCESS' : 'PENDING'],
        ['Transaction ID', String(txnId)],
        ['Submission Date', admission.createdAt ? new Date(admission.createdAt).toLocaleDateString() : new Date().toLocaleDateString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: [40, 167, 69] }
    });

    currentY = doc.lastAutoTable.finalY + 15;

    // Page break if too low
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    // Signatures
    console.log("Generating Signatures");
    try {
      if (admission.form_data?.fatherSignatureUrl) {
        const fSig = await getBase64ImageFromURL(admission.form_data.fatherSignatureUrl);
        doc.addImage(fSig, 'PNG', 20, currentY, 40, 15);
        doc.setFontSize(8);
        doc.text("Father's Signature", 40, currentY + 20, { align: "center" });
      }
      if (admission.form_data?.motherSignatureUrl) {
        const mSig = await getBase64ImageFromURL(admission.form_data.motherSignatureUrl);
        doc.addImage(mSig, 'PNG', 140, currentY, 40, 15);
        doc.setFontSize(8);
        doc.text("Mother's Signature", 160, currentY + 20, { align: "center" });
      }
    } catch (e) {
      console.warn("Could not load signatures", e);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("This is a computer generated document.", pageWidth / 2, doc.internal.pageSize.getHeight() - 15, { align: "center" });
    doc.text("Sanskar English Medium School Management System", pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });

    const fileName = `Admission_${admission.student_first_name || 'Form'}_${admission.student_surname || ''}.pdf`;
    doc.save(fileName);
    console.log("PDF Saved successfully:", fileName);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Error generating PDF: " + (error.message || "Unknown error occurred"));
  }
};
