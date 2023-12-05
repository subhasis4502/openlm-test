import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

registerLicense('Mgo+DSMBaFt/QHJqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5iSXxTdkdmXHxYc3RURA==;Mgo+DSMBPh8sVXJ0S0R+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31SdkdjWX1bdXdTRWNeVQ==;ORg4AjUWIQA/Gnt2VVhiQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQd0VhWX9cdXFWQGNfU0A=;Mjc3MTEyNEAzMjMwMmUzMjJlMzBQUTJsM1Z1WGEwMTVBalA1czVhMkVDNXBwdjFxaExSeDdhWHhleFZvR3JzPQ==;Mjc3MTEyNUAzMjMwMmUzMjJlMzBscFJEZDFzTUZYM21hUDhQdER5bklJQ0tzcWhKUCt4OHhwdi85ZW9LVy80PQ==;NRAiBiAaIQQuGjN/V0Z+Xk9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdURjW39ecnFQRWZfWEN2;Mjc3MTEyN0AzMjMwMmUzMjJlMzBLdE9GSVcvdkNuczlHMXZ6THpPeDFuTXVJbENmTklnaWJHTVFYUGF3OG1jPQ==;Mjc3MTEyOEAzMjMwMmUzMjJlMzBEN3U0enF0LzZpaE1Id3pOd05MNW9mUjErd3JkbVUyOTM1OXA3MkozMkRVPQ==;Mgo+DSMBMAY9C3t2VVhiQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQd0VhWX9cdXFWQGRaUEI=;Mjc3MTEzMEAzMjMwMmUzMjJlMzBhQ0xGdmpPV3dlSUtPaG01aVBkM0lkWEpjOEQ4cXJWdGRzMmJJWUk3MVl3PQ==;Mjc3MTEzMUAzMjMwMmUzMjJlMzBGV1hUK1lIaGdoVGZvQXJZMFJhNk1yQVJlNmhBY2dTK2x1eHc5UzZTMXpjPQ==;Mjc3MTEzMkAzMjMwMmUzMjJlMzBLdE9GSVcvdkNuczlHMXZ6THpPeDFuTXVJbENmTklnaWJHTVFYUGF3OG1jPQ==')


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
