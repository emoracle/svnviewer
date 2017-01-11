import {Component, OnInit} from '@angular/core';
import {SVNDataService} from '../services/SVNData.service';
import {Pad} from '../model/Pad.model';

@Component({
    selector: 'svn-app',
    templateUrl: 'app/components/SVNApp.component.html'
})
export class SVNAppComponent implements OnInit {

    isModified: boolean = false;
    showGelijken: boolean = true;
    isGecontroleerd: boolean = false;
    jsonFile: Object;
    paden : Pad[];
    
    constructor(private _dataService:SVNDataService) {
        console.log('Contructor called');
    }

    onKey(event:any) {
        this.isModified = true;
    }

    ngOnInit() {
        this.showGelijken = false;
        this._dataService.getJson().subscribe(
            data => {
                this.paden = (data).map(obj => {
                    return new Pad(true, obj.path, obj.files);
                });
            },
            err => {
                console.log(err);
            },
            () => console.log("Service is afgeroepen")
        );
    }

    saveClick(){
        this._dataService.putJson(this.paden);
        this.isModified = false;
    }

    addPackage(pad){
      let item = {"name": "","revision":""};
      this.paden[pad].files.push(item);
    }

    addRepo(newPath){
        let item = new Pad (true, newPath.value,[]);
        this.paden.push(item);
    }

    togglePad(i){
        this.paden[i].show = !this.paden[i].show;
    }
    
    controleer(){
      this.isGecontroleerd = true;
      this._dataService.getRevisions(this.paden);
    }

    deleteFile(pad, i){
        this.paden[pad].files.splice(i,1);
        this.isModified = true;
    }

    deletePad(pad){
        this.paden.splice(pad,1);
        this.isModified = true;
    }

}
