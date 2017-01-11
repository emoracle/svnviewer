import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// Custom Components
import {SVNAppComponent} from './components/SVNApp.component';

//Import services
import {SVNDataService} from './services/SVNData.service';

// Module declaration
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [SVNAppComponent],
    bootstrap: [SVNAppComponent],
    providers: [SVNDataService]
})

// Controller van deze view
export class MyAppModule {
}