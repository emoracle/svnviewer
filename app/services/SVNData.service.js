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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SVNDataService = (function () {
    function SVNDataService(_http) {
        this._http = _http;
    }
    SVNDataService.prototype.getJson = function () {
        return this._http.get('./data/revisions.json').map(function (x) {
            return x.json();
        });
    };
    SVNDataService.prototype.putJson = function (newJson) {
        var body = JSON.stringify(newJson);
        this._http.post('http://localhost:8001/upload', body)
            .subscribe(function (a) { }, function (error) { return console.log(error); }, function () { return console.log("Request completed"); });
    };
    SVNDataService.prototype.getRevisions = function (paden) {
        var _this = this;
        var aantalPaden = paden.length;
        var padenCounter = 0;
        paden.forEach(function (pad) {
            var aantalPackages = pad.files.length;
            var packageCounter = 0;
            pad.files.forEach(function (file) {
                var body = pad.path + '/' + file.name;
                if (pad.path != "" && file.name != "") {
                    _this._http.post('http://localhost:8001/controleer', body)
                        .subscribe(function (response) {
                        //console.log("---> Message gezet op " + response.text() + " voor " + file.name);
                        if (response.text() != file.revision) {
                            file.svn_version = "SVN versie : " + response.text();
                            file.heeftVerschil = true;
                        }
                        else {
                            file.svn_version = "";
                            file.heeftVerschil = false;
                        }
                        if (file.name == "asl_asg.pks")
                            file.heeftVerschil = false;
                    }, function (error) { return console.log(error); }, function () {
                        packageCounter++;
                        if (packageCounter >= aantalPackages) {
                            padenCounter++;
                        }
                        console.log(padenCounter + " vs " + aantalPaden);
                        if (padenCounter >= aantalPaden) {
                            return paden;
                        }
                    });
                }
                else {
                    padenCounter++;
                }
            });
        });
        if (padenCounter >= aantalPaden) {
            return paden;
        }
    };
    SVNDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SVNDataService);
    return SVNDataService;
}());
exports.SVNDataService = SVNDataService;
//# sourceMappingURL=SVNData.service.js.map