"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SVNData_service_1 = require('../services/SVNData.service');
var Pad_model_1 = require('../model/Pad.model');
var SVNAppComponent = (function () {
    function SVNAppComponent(_dataService) {
        this._dataService = _dataService;
        this.isModified = false;
        this.showGelijken = true;
        this.isGecontroleerd = false;
        console.log('Contructor called');
    }
    SVNAppComponent.prototype.onKey = function (event) {
        this.isModified = true;
    };
    SVNAppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showGelijken = false;
        this._dataService.getJson().subscribe(function (data) {
            _this.paden = (data).map(function (obj) {
                return new Pad_model_1.Pad(true, obj.path, obj.files);
            });
        }, function (err) {
            console.log(err);
        }, function () { return console.log("Service is afgeroepen"); });
    };
    SVNAppComponent.prototype.saveClick = function () {
        this._dataService.putJson(this.paden);
        this.isModified = false;
    };
    SVNAppComponent.prototype.addPackage = function (pad) {
        var item = { "name": "", "revision": "" };
        this.paden[pad].files.push(item);
    };
    SVNAppComponent.prototype.addRepo = function (newPath) {
        var item = new Pad_model_1.Pad(true, newPath.value, []);
        this.paden.push(item);
    };
    SVNAppComponent.prototype.togglePad = function (i) {
        this.paden[i].show = !this.paden[i].show;
    };
    SVNAppComponent.prototype.controleer = function () {
        this.isGecontroleerd = true;
        this._dataService.getRevisions(this.paden);
    };
    SVNAppComponent.prototype.deleteFile = function (pad, i) {
        this.paden[pad].files.splice(i, 1);
        this.isModified = true;
    };
    SVNAppComponent.prototype.deletePad = function (pad) {
        this.paden.splice(pad, 1);
        this.isModified = true;
    };
    SVNAppComponent = __decorate([
        core_1.Component({
            selector: 'svn-app',
            templateUrl: 'app/components/SVNApp.component.html'
        }), 
        __metadata('design:paramtypes', [SVNData_service_1.SVNDataService])
    ], SVNAppComponent);
    return SVNAppComponent;
}());
exports.SVNAppComponent = SVNAppComponent;
//# sourceMappingURL=SVNApp.component.js.map