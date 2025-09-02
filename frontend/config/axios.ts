// export function getProperPathName() {
//   let pathName = window.location.pathname;

//   if (pathName.indexOf("/") === 0) {
//     pathName = pathName.substring(1);
//   }

//   if (pathName.indexOf("/") > -1) {
//     pathName = pathName.substring(0, pathName.indexOf("/"));
//   }

//   return pathName;
// }

// export function getApiUrl() {
//   const apiPath = "api";
//   const origin = window.location.origin;
//   let pathName = getProperPathName();

//   if (pathName.length == 0) {
//     pathName = apiPath;
//   } else {
//     pathName = `${pathName}/${apiPath}`;
//   }

//   if (!import.meta.env.PROD) {
//     return "https://localhost:7232/api";
//   }

//   const calcUrl = `${origin}/${pathName}`;
//   return calcUrl;
// }

// const isProduction = process.env.NODE_ENV === "production";

// const baseUrl = getApiUrl();
