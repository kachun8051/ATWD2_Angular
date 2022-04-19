import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BbqRecord } from '../BbqRecord.model';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.css']
})

export class MymodelComponent implements OnInit {
  // isVisible = false;
  @Input()
  title: string;
  @Input()
  data: BbqRecord;
  @Input()
  isVisible: boolean; // flag or indicator whether showing modal
  @Output()
  isVisibleChange = new EventEmitter(); 
  @Output()
  clickEvent = new EventEmitter();

  isEdit: boolean;
  validateForm: FormGroup;
  http !: HttpClient;
  emptyRecord: BbqRecord;

  constructor(fb: FormBuilder, http: HttpClient) {
    console.log("mymodal's constructor");
    this.validateForm = fb.group({
      GIHS: [null],
      name: [null, [Validators.required]],
      district: [null, [Validators.required]],
      address: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      latitude: [null, [Validators.required]]
    });
    this.http = http;
    this.emptyRecord = {
      GIHS: '',
      name: '',
      district: '',
      address: '',
      longitude: '',
      latitude: ''
    } 
    this.data = this.emptyRecord;
    this.isVisible = false;
    this.isEdit = false;
    this.title = '';
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("mymodal.ngOnChanges");
    console.log("data input from mytable: " + JSON.stringify(this.data));
    console.log("GIHS: " + this.data['GIHS']);
    this.isVisible = true;
    //return;
    if (this.data['GIHS'] !== '') {
      this.isEdit = true;      
      this.validateForm.setValue({
        GIHS: this.data['GIHS'],
        name: this.data['name'],
        district: this.data['district'],
        address: this.data['address'],
        longitude: this.data['longitude'],
        latitude: this.data['latitude']
      });
    } else {
      this.isEdit = false;
      this.validateForm.setValue( this.emptyRecord );
    }
  }

  assignObject(objTarget: Record<string, unknown>, key: string, val: string){
    switch (key){
      case 'GIHS':
        objTarget['GIHS'] = val;
        break;
      case 'name':
        objTarget['Name_en'] = val;
        break;
      case 'district':
        objTarget['District_en'] = val;
        break;
      case 'address':
        objTarget['Address_en'] = val;
        break;
      case 'longitude':
        objTarget['Longitude'] = val;
        break;
      case 'latitude':
        objTarget['Latitude'] = val;
        break;
      default:
        objTarget['unknown'] = val;
    }     
  }

  submitForm(): void {
    //let params = {};
    let params: Record<string, unknown> = {};
    //let objTmp = {};
    for (const key in this.validateForm.controls){
      // console.log("submit form - key: " + key);
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
      if (!(this.validateForm.controls[key].status == 'VALID') && this.validateForm.controls[key].status !== 'DISABLED') {
        return;
      }
      if (this.validateForm.controls[key] && this.validateForm.controls[key].value) {
        let currValue = this.validateForm.controls[key].value;
        console.log("key: value: " +  `${key}: ${currValue}`);
        this.assignObject(params, key, currValue);
      } else {
        console.log("key: value: " +  `${key}: ${''}`);
        this.assignObject(params, key, '')
      }
    }
    console.log("submitting: " + JSON.stringify(params));
    let url = "http://localhost/ATWD_Project_2021/controller.php/barbecue"; 
    if (this.isEdit) {   
      console.log("before put.");   
      this.http.put(url, params).subscribe((res) => {
        this.clickEvent.emit();
        this.isVisible = false;
      });
    } else {
      console.log("before post.");
      this.http.post(url, params).subscribe((res) => {
        this.clickEvent.emit();
        this.isVisible = false;
      });
    }
    this.isVisibleChange.emit(false);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    //this.isVisible = false;
    this.submitForm();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}