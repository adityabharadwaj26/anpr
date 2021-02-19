import { AnprService } from './../anpr.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.css']
})
export class PlateComponent implements OnInit {
  file: any;
  imgResponse: any;
  form: FormGroup;
  imgUpload: any;

  constructor(
    private anprService: AnprService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      numberPLate: [''],
    });
  }

  ngOnInit(): void {
  }

  addImage() {
    console.log('image add');
  }

  onSelectFile(e: { target: { files: string | any[]; }; }): void {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      // this.file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.file = reader.result;
        this.imgUpload = this.file;
        this.imgResponse = this.file;
        this.anprService.getPlate(this.file).subscribe((res) => {
          console.log(res);
          this.imgResponse = res;
          // this.imgUpload = this.file;
          this.patchNumberPlate(res.text);
        });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  patchNumberPlate(text) {
    this.form.patchValue({ numberPLate: text });
  }


}
