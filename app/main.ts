
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// 2. Import or own  module
import {MyAppModule} from './myapp.module';

// 3. Bootstrap our app
platformBrowserDynamic().bootstrapModule(MyAppModule);