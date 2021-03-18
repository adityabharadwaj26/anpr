import { AnprService } from './../anpr.service';
import { element } from 'protractor';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css']
})
export class PlateComponent implements OnInit {
  @ViewChild('imageRef') imageRef: ElementRef;
  file: any;
  imgResponse: any;
  form: FormGroup;
  imgUpload: any;
  image: any;
  context;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  w;
  h;
  ratio;
  imageElement: HTMLImageElement;
  // videoSource;
  // videoSource1;
  videoSourceform: FormGroup;
  videoSourceSubmitted: any;

  constructor(
    private el: ElementRef,
    private anprService: AnprService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      numberPLate: [''],
    });
    this.videoSourceform = this.fb.group({
      videoSource: [''],
    });
  }

  ngOnInit(): void {
  }

  changeSource() {
    const obj = this.videoSourceform.getRawValue();
    console.log(obj);
    this.videoSourceSubmitted = obj.videoSource;
  }

  snap() {
    // this.context.fillRect(0, 0, this.w, this.h);
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    this.w = this.imageRef.nativeElement.width;
    this.h = this.imageRef.nativeElement.height;
    this.imageRef.nativeElement.crossOrigin = 'anonymous';
    this.context.drawImage(this.imageRef.nativeElement, 0, 0, this.w, this.h);
    const dataURI = this.canvas.toDataURL('image/jpeg'); // can also use 'image/png'
    this.imgResponse = dataURI;
    this.getPlateInfo(this.imgResponse);
  }

  addImage() {
    console.log('image add');
  }

  onSelectFile(e: { target: { files: string | any[]; }; }): void {
    console.log(e.target.files);
    const img = e.target.files[0];
    this.getPlateInfo(img);
    if (e.target.files && e.target.files.length > 0) {
      // this.file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.image = reader.result;
        this.imgUpload = this.image;
      });
      reader.readAsDataURL(img);
    }
  }
  private getPlateInfo(e): void {
    const file = new FormData();
    file.append('file', e);
    this.anprService.getPlate(file).subscribe((res) => {
      console.log(res);
      this.imgResponse = res.plate;
      // this.imgUpload = this.file;
      this.patchNumberPlate(res.number);
    });
  }

  patchNumberPlate(text) {
    this.form.patchValue({ numberPLate: text });
  }


}
