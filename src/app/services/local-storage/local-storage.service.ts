import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  // Function to use for the set login user details in localStorage
  setLogger(details: any): void {
    const loginData = JSON.stringify(details);
    localStorage.setItem("loginUser", loginData);
  }

  // Function to be used for set login user token
  setLoginToken(details: any): void {
    localStorage.setItem("loginToken", details?.token);
  }

  // Set the updated loginUser details
  updateUserDetails(details: any): void {
    const loginData = JSON.stringify(details);
    localStorage.setItem("loginUser", loginData);
  }

  // Function to use for the get login user details from the localStorage
  getLogger(): any {
    const loginUser: any = localStorage.getItem("loginUser");
    if (!!loginUser && loginUser !== "undefined") {
      return JSON.parse(loginUser);
    } else {
      return "";
    }
  }

  // Function to use for the get login user token from the localStorage
  getLoggerToken(): any {
    const loginToken: any = localStorage.getItem("loginToken");
    return loginToken;
  }

  // Function to use for the clear localStorage
  clearStorage(): void {
    localStorage.clear();
  }

  // Generic method to get item from localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return null;
  }

  // Generic method to set item in localStorage
  setItem(key: string, value: any): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
