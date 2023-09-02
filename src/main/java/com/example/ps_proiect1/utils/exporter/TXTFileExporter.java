package com.example.ps_proiect1.utils.exporter;

public class TXTFileExporter implements FileExporter {

    @Override
    public String exportData(Object object) {

        return object.toString();
    }
}