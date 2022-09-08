// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SIGN_IN_URL :"http://localhost:3001/auth/google",
  SIGN_OUT_URL :"http://localhost:3001/auth/logout",
  RESET_PROFILE_URL :"http://localhost:3001/user/reset",
  LOGGEDIN_URL :"http://localhost:3001/auth/loggedIn",
  BUYING_POWER_URL :"http://localhost:3001/user/buyingPower",
  USERSTOCK_URL :"http://localhost:3001/stock/userStocks",
  REALTIME_URL :"http://localhost:3001/stock/realtimePrice",
  BALANCE_URL :"http://localhost:3001/user/balance",
  AUTOCOMPLETE_URL :"http://localhost:3001/stock/autocomplete",
  NEWS_URL :"http://localhost:3001/stock/news",
  CHART_URL :"http://localhost:3001/stock/chart",
  SELL_URL :"http://localhost:3001/sale/sell",
  BUY_URL :"http://localhost:3001/sale/buy",
  MAIL_URL :"http://localhost:3001/mail/sale",
  USER_URL:"http://localhost:3001/user/current",
  OWNS_STOCK_URL: "http://localhost:3001/user/ownsStock"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
