import { defineConfig } from "cypress";
import { exec } from "child_process";
import util from "util";
const execPromise = util.promisify(exec);

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async resetDatabase() {
          try {
            const { stdout, stderr } = await execPromise(
              "cd../ && npx prisma migrate reset --force",
            );
            if (stderr) {
              console.error("Error output:", stderr);
            }
            console.log("Reset output:", stdout);
            return null;
          } catch (error) {
            console.error("Error resetting database:", error);
            throw error;
          }
        },
      });
    },
  },
});
