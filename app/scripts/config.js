"use strict";

 angular.module("config", [])

.constant("ENV", {
  "name": "production",
  "apiEndpoint": "http://localhost:8080/api/"
})

;