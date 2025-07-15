"use strict";

export class LocalStorage {
    save(key, object) {
        try {
            // Convert the object to a JSON string
            const jsonString = JSON.stringify(object);

            // Save to local storage
            localStorage.setItem(key, jsonString);

            console.log(`Object saved to local storage with key: ${key}`);
            return true;
        } catch (error) {
            console.error("Error saving to local storage:", error);
            return false;
        }
    }

    read(key) {
        try {
            // Get the JSON string from local storage
            const jsonString = localStorage.getItem(key);

            if (jsonString === null) {
                console.log(`No data found in local storage for key: ${key}`);
                return null;
            }

            // Parse the JSON string back to an object
            const object = JSON.parse(jsonString);

            console.log(`Object retrieved from local storage with key: ${key}`);
            return object;
        } catch (error) {
            console.error("Error retrieving from local storage:", error);
            return null;
        }
    }

    delete(key) {
        localStorage.removeItem(key);
        console.log(`Removed item from local storage with key: ${key}`);
    }
}