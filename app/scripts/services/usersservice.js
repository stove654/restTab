'use strict';

/**
 * @ngdoc service
 * @name restTabApp.UsersService
 * @description
 * # UsersService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
  .factory('UsersService', function ($window, $q) {
        var indexedDB = $window.indexedDB;
        var db=null;
        var lastIndex=0;

        var open = function(){
            var deferred = $q.defer();
            var version = 1;
            var request = indexedDB.open("dataRestTab", version);

            request.onupgradeneeded = function(e) {
                db = e.target.result;

                e.target.transaction.onerror = indexedDB.onerror;

                if(db.objectStoreNames.contains("user")) {
                    db.deleteObjectStore("user");
                }

                var store = db.createObjectStore("user",
                    {keyPath: "id"});
            };

            request.onsuccess = function(e) {
                db = e.target.result;
                deferred.resolve();
            };

            request.onerror = function(){
                deferred.reject();
            };

            return deferred.promise;
        };

        var getUsers = function(){
            var deferred = $q.defer();

            if(db === null){
                deferred.reject("IndexDB is not opened yet!");
            }
            else{
                var trans = db.transaction(["user"], "readwrite");
                var store = trans.objectStore("user");
                var users = [];

                // Get everything in the store;
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = store.openCursor(keyRange);

                cursorRequest.onsuccess = function(e) {
                    var result = e.target.result;
                    if(result === null || result === undefined)
                    {
                        deferred.resolve(users);
                    }
                    else{
                        users.push(result.value);
                        if(result.value.id > lastIndex){
                            lastIndex=result.value.id;
                        }
                        result.continue();
                    }
                };

                cursorRequest.onerror = function(e){
                    deferred.reject("Something went wrong!!!");
                };
            }

            return deferred.promise;
        };

        var deleteTodo = function(id){
            var deferred = $q.defer();

            if(db === null){
                deferred.reject("IndexDB is not opened yet!");
            }
            else{
                var trans = db.transaction(["user"], "readwrite");
                var store = trans.objectStore("user");

                var request = store.delete(id);

                request.onsuccess = function(e) {
                    deferred.resolve();
                };

                request.onerror = function(e) {
                    console.log(e.value);
                    deferred.reject("Todo item couldn't be deleted");
                };
            }

            return deferred.promise;
        };

        var addUserAdmin = function(data){
            var deferred = $q.defer();

            if(db === null){
                deferred.reject("IndexDB is not opened yet!");
            }
            else{
                var trans = db.transaction(["user"], "readwrite");
                var store = trans.objectStore("user");
                lastIndex++;
                data.id = lastIndex;
                var request = store.put(data);
                request.onsuccess = function(e) {
                    deferred.resolve();
                };

                request.onerror = function(e) {
                    console.log(e.value);
                    deferred.reject("Todo item couldn't be added!");
                };
            }
            return deferred.promise;
        };

        return {
            open: open,
            getUsers: getUsers,
            addUserAdmin: addUserAdmin,
            deleteTodo: deleteTodo
        };

    });
