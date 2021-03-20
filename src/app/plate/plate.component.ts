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
    const dataURI = this.canvas.toDataURL('image/jpeg', 1);
    const base64result = dataURI.split(',')[1];
    const dataBlob = this.convertBase64(base64result, 'file');
    console.log(dataURI);
    const dataBlob1 = this.canvas.toBlob(function (blob) {
      console.log(blob.type);
    }, 'file');
    console.log(dataBlob1);
    // console.log(this.imageRef.nativeElement.src);
    // var link = document.createElement("a");
    // const dataURI = this.canvas.toBlob((blob) => {
    //   // canvas.toBlob(function(blob){
    //   link.href = URL.createObjectURL(blob);
    //   console.log(blob);
    //   console.log(link.href); // this line should be here
    // }, 'image/png')
    // ); // can also use 'image/png'
    // this.imgResponse = dataBlob1;
    // this.imgResponse = dataURI;
    const reader = new FileReader();
    let res;
    reader.addEventListener('loadend', () => {
      res = reader.result;
      // this.imgUpload = res;
    });
    reader.readAsDataURL(dataBlob);

    console.log(res);
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
