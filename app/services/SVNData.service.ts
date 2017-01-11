import {
    Injectable
}
    from '@angular/core';
import {
    Http
}
    from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {
    Pad
}
    from '../model/Pad.model';
import {Observable} from "rxjs";

@ Injectable()
export class SVNDataService {

  constructor(private _http : Http) {}

  getJson() {
    return this._http.get('./data/revisions.json').map(x => {
      return x.json();
    });
  }

  putJson(newJson) {
    let body = JSON.stringify(newJson);
    this._http.post('http://localhost:8001/upload', body)
        .subscribe(a => {}, error => console.log(error), () => console.log("Request completed"));
  }

  getRevisions(paden) {
    const aantalPaden:number = paden.length;
    let padenCounter:number = 0;

    paden.forEach((pad : Pad) => {
      const aantalPackages = pad.files.length;
      let packageCounter = 0;

      pad.files.forEach(file => {
        let body = pad.path + '/' + file.name;

        if (pad.path != "" && file.name != "") {
          this._http.post('http://localhost:8001/controleer', body)
              .subscribe(response => {
                    //console.log("---> Message gezet op " + response.text() + " voor " + file.name);
                    if (response.text() != file.revision) {
                      file.svn_version = "SVN versie : " + response.text();
                      file.heeftVerschil = true;
                    } else {
                      file.svn_version = "";
                      file.heeftVerschil = false;
                    }
                    if (file.name == "asl_asg.pks") file.heeftVerschil = false;
                  },
                  error => console.log(error),
                  () => {
                    packageCounter++;
                    if (packageCounter >= aantalPackages) {
                      padenCounter++;
                    }
                    console.log(padenCounter + " vs " + aantalPaden);
                    if (padenCounter >= aantalPaden) {
                      return paden;
                    }
                  });
        } else {
          padenCounter++;
        }
      });
    });
    if (padenCounter >= aantalPaden) {
      return paden;
    }
  }
}
