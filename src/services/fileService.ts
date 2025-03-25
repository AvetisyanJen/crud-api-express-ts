import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "../../data.json");

export const readData = (): { users: any[] } => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const parsedData = JSON.parse(data);
    if (parsedData && Array.isArray(parsedData.users)) {
      return { users: parsedData.users };
    } else {
      console.error(
        'Invalid data format, expected an object with a "users" array.'
      );
      return { users: [] };
    }
  } catch (error) {
    console.error("Error reading or parsing data:", error);
    return { users: [] };
  }
};

export const writeData = (data: { users: any[] }): void => {
  try {
    if (data && Array.isArray(data.users)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    } else {
      console.error('Data to write must be an object with a "users" array.');
    }
  } catch (error) {
    console.error("Error writing data:", error);
  }
};
