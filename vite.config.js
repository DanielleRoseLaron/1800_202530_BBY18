// This Vite config file (vite.config.js) tells Rollup (production bundler) 
// to treat multiple HTML files as entry points so each becomes its own built page.

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                login: resolve(__dirname, "login.html"),
                taskpage: resolve(__dirname, "taskpage.html"),
                profile: resolve(__dirname, "profile.html"),
                profilesettings: resolve(__dirname, "profilesettings.html"),
                pet: resolve(__dirname, "pet.html"),
                addgroup: resolve(__dirname, "addgroup.html"),
                addtask: resolve(__dirname, "addtask.html"),
                grouppage: resolve(__dirname, "grouppage.html"),
                taskgroup: resolve(__dirname, "taskpage.html"),
                leaderboard: resolve(__dirname, "leaderboard.html")
            }
        }
    }
});
