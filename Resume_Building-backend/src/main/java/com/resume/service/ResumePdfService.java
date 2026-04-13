package com.resume.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.resume.entity.Resume;

@Service
public class ResumePdfService {

    public byte[] generatePdf(Resume resume) {

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        document.add(new Paragraph("RESUME")
                .setBold()
                .setFontSize(18));

        document.add(new Paragraph("Title: " + resume.getTitle()));
        document.add(new Paragraph("Personal Info:\n" + resume.getPersonalInfo()));
        document.add(new Paragraph("Skills:\n" + resume.getSkills()));
        document.add(new Paragraph("Education:\n" + resume.getEducation()));
        document.add(new Paragraph("Experience:\n" + resume.getExperience()));
        document.add(new Paragraph("Projects:\n" + resume.getProjects()));

        document.close();
        return out.toByteArray();
    }
}
