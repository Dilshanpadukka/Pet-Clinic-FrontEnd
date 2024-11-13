import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8081/api/report';

  constructor(private http: HttpClient) {}

  uploadReport(note: string, reportFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('note', note);
    formData.append('report', reportFile);

    return this.http.post(`${this.baseUrl}/add`, formData, { responseType: 'text' });
  }

  downloadReport(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileName}`, { responseType: 'blob' });
  }

  getAllReports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
}
