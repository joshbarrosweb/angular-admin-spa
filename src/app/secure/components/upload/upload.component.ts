import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Output() uploaded = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  upload(files: FileList): void {
    const file: any = files.item(0);

    const data = new FormData();
    data.append('image', file);

    this.http
      .post(`${environment.api}/upload`, data)
      .subscribe((response: any) => {
        this.uploaded.emit(response.url);
      });
  }
}
