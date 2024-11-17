import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  uploadReport(note: string, reportFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('note', note);
    formData.append('report', reportFile);

    return this.http.post(`${this.baseUrl}/report/add`, formData, { responseType: 'text' });
  }

  downloadReport(reportLink: string): Observable<Blob> {
    const url = `${this.baseUrl}/${reportLink.startsWith('/') ? reportLink.slice(1) : reportLink}`;
    console.log(url);
    return this.http.get(url, { responseType: 'blob' });
  }
  

  getAllReports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/report/all`);
  }
}