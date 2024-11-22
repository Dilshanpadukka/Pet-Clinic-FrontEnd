import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../common/navbar/navbar.component";


@Component({
  selector: 'app-report-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.css']
})
export class ReportUploadComponent {
  note: string = '';
  selectedFile: File | null = null;
  message: string = '';

  constructor(private reportService: ReportService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile && this.note) {
      this.reportService.uploadReport(this.note, this.selectedFile).subscribe({
        next: (response) => {
          this.message = response;
        },
        error: (err) => {
          this.message = 'Failed to upload report: ' + err.message;
        }
      });
    } else {
      this.message = 'Note and file are required!';
    }
  }
}
