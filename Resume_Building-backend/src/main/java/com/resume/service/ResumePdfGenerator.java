package com.resume.service;


import java.io.ByteArrayOutputStream;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.resume.entity.Resume;


public class ResumePdfGenerator {

    public static byte[] generate(Resume resume) {

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph(resume.getTitle()));
            document.add(new Paragraph(resume.getSummary()));
            document.add(new Paragraph("Skills: " + resume.getSkills()));
            document.add(new Paragraph("Experience: " + resume.getExperience()));
            document.add(new Paragraph("Education: " + resume.getEducation()));

            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }
    }
}