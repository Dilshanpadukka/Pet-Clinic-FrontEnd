import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../common/navbar/navbar.component";


@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: any[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => {
        console.error('Error fetching reports', err);
      }
    });
  }

  downloadReport(fileName: string): void {
    this.reportService.downloadReport(fileName).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading report', err);
      }
    });
  }
}
