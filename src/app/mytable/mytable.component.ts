import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BbqRecord, clsBbq } from '../BbqRecord.model';
//import { MymodelComponent } from '../mymodal/mymodal.component';
/*
interface DataItem {
  GIHS: string;
  name: string;
  district: number;
  address: string;
  longitude: string;
  latitude: string;
}
*/
@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {
  listOfData: BbqRecord[];
  http !: HttpClient;
  // edit data
  editData!: BbqRecord;
  // empty record is for add process
  emptyRecord: BbqRecord;
  // flag / indicator of showing modal
  modalIsVisible: boolean;
  modalTitle: string;
  // dialog
  confirmModal!: NzModalRef;
  modalService!: NzModalService;
  //serverData: String;
  //sortAgeFn = (a: DataItem, b: DataItem): number => a.age - b.age;
  nameFilterFn = (list: string[], item: BbqRecord): boolean => list.some(name => item.name.indexOf(name) !== -1);
  filterName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'John', value: 'John' }
  ];

  constructor(http: HttpClient, modal: NzModalService) { 
    console.log("mytable's constructor");
    this.http = http;
    //this.confirmModal = modal;
    //this.serverData = "";
    this.listOfData = [];
    this.modalIsVisible = false;
    this.modalService = modal;
    // empty record for add process
    this.emptyRecord = {
      GIHS: '',
      name: '',
      district: '',
      address: '',
      longitude: '',
      latitude: ''
    } 
    this.modalTitle = '';
  }

  ngOnInit(): void {
    
    this.listOfData = [];
    this.getListData();
  }

  // custom funtion (fillData) 
  fillData(arr: Object): void {
    //this.serverData = arr;
    let objData = JSON.parse(JSON.stringify(arr));
    let serverDataArr = objData.data;
    let arrTmp = [];
    console.log(serverDataArr.length);
    // bbq in serverDataArr for-loop should be referred to actual json object 
    // but not BbqRecord model
    for (let bbq of serverDataArr) {
      console.log(bbq.Name_en);
      let obj = {
        GIHS: bbq.GIHS,
        name: bbq.Name_en,
        district: bbq.District_en,
        address: bbq.Address_en,
        longitude: bbq.Longitude,
        latitude: bbq.Latitude
      }
      arrTmp.push(obj);
    }    
    this.listOfData = arrTmp;
    console.log("data source is set.");
    //this.dataSource = this.myDataSource;
  }

  // custom function to fetch data
  getListData() {
    let myurl = "http://localhost/ATWD_Project_2021/controller.php/dbinit"
    this.http.get(myurl).subscribe(
      {      
        next: (res) => {
          // console.log(res);
          console.log("data is fetched successfully.");
          this.fillData(res);          
        },
        error: (err) => {
          console.log("Server call failed: " + err);
        }
      }
    );
  }

  // INSERT
  addBbq(mTitle: string) {
    console.log("Add is clicked")
    this.editData = this.emptyRecord;
    this.modalIsVisible = true;
    this.modalTitle = mTitle;
  }

  // UPDATE
  editBbq(mTitle: string, data: BbqRecord) {
    console.log("Edit is clicked");
    //console.log(JSON.stringify(data));    
    this.editData = data;    
    this.modalIsVisible = true;
    this.modalTitle = mTitle;
  }

  // DELETE
  deleteBbq(data: BbqRecord) {
    console.log("Delete is clicked");
    let obj = new clsBbq();
    obj.setBbqRecord(data);
    let content = obj.getBbqRecord();
    //return;
    this.confirmModal = this.modalService.confirm({
      nzTitle: 'Alert',
      nzContent: 'Confirm to delete?<br/>' + content,
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let url = "http://localhost/ATWD_Project_2021/controller.php/barbecue/GIHS/"
        this.http.delete(url + data['GIHS']).subscribe({
          next: (res) => {      
            console.log("Delete success.")      
            this.getListData();        
          },
          error: (err) => {
            console.log("Delete error" + err);
          }
        });
      }
    });    
  }

  // callback when add or edit completed
  clickEvent() {
    console.log("clickEvent (callback).");
    this.getListData();
  }


}
