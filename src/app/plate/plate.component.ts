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
  videoW;
  videoH;
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
    const image = document.querySelector(".imageClass");
    console.log(image);

  }

  tabClick(e) {
    console.log(e);
    this.imgResponse = '';
    this.imgUpload = '';
    this.form.reset();
    console.log(e.index);
    if (e.index === 1) {
      this.video = document.querySelector('video');
      console.log(this.video);
      console.log(this.video.videoHeight);
      console.log(this.video.videoWidth);
      this.ratio = this.video.videoWidth / this.video.videoHeight;
      this.videoW = (this.video.videoWidth - 100);
      this.videoH = (this.videoW / this.ratio);
    }
  }
  ngAfterViewInit() {
    // const imageElement = this.imageRef.nativeElement;
    // console.log(imageElement);

  }
  changeSource() {
    const obj = this.videoSourceform.getRawValue();
    console.log(obj);
    this.videoSourceSubmitted = obj.videoSource;
    this.imageElement = this.imageRef.nativeElement;
    console.log(this.imageElement);
    this.imageElement.crossOrigin = '';
  }

  snapVideo() {
    // const video = document.querySelector('video');
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    console.log(this.videoH);
    console.log(this.videoW);
    this.canvas.width = this.videoW;
    this.canvas.height = this.videoH;
    this.context.drawImage(this.video, 0, 0, this.videoW, this.videoH);
    const dataURI = this.canvas.toDataURL('image/jpeg', 1);
    console.log(dataURI);
    this.imgResponse = dataURI;
    const base64result = dataURI.split(',')[1];
    const dataBlob = this.convertBase64(base64result, 'file');
    this.getPlateInfo(dataBlob);
  }

  snapIpCamera() {
    // this.context.fillRect(0, 0, this.w, this.h);
    console.log('snapipcamera');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    console.log('2');
    const image: HTMLImageElement = document.querySelector(".imageClass");
    console.log(image);
    this.w = image.width;
    this.h = image.height;
    image.crossOrigin = 'anonymous';
    console.log('3');
    this.context.drawImage(image, 0, 0, this.w, this.h);
    console.log('3.5');
    const dataURI = this.canvas.toDataURL('image/png');
    console.log('4');
    const base64result = dataURI.split(',')[1];
    const dataBlob = this.convertBase64(base64result, 'file');
    this.getPlateInfo(dataBlob);
  }

  convertBase64(b64Data, contentType) {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  onSelectFile(e: { target: { files: string | any[]; }; }): void {
    console.log(e.target.files);
    const img = e.target.files[0];
    console.log(typeof img);
    console.log(typeof e.target.files[0]);
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
      if (res.message === 'No Plate Detected') {
        // this.patchNumberPlate(res.message);
        alert(res.message);
      } else {
        this.imgResponse = res.plate;
        this.patchNumberPlate(res.number);
      }
    });
  }

  patchNumberPlate(text) {
    this.form.patchValue({ numberPLate: text });
  }


}
