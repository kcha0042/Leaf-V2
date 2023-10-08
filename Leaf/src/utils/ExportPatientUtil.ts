import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import Patient from "../model/patient/Patient";
import Environment from "../state/environment/Environment";
import { OS } from "../state/environment/types/OS";

/**
 * Exports a list of selected patients into a CSV file format.
 *
 * @function
 * @async
 * @param {Patient[]} selectedPatients - An array of patients to be exported.
 *
 * @description
 * The function generates a CSV file with the following headers:
 * "MRN,DOB,FirstName,LastName,Gender,PhoneNumber,PostCode,TimeLastAllocated,AllocatedTo,Events".
 * The file name is generated based on the current date and time, sanitized to replace white spaces,
 * commas, colons, and slashes with underscores.
 *
 * Depending on the operating system, the function handles the file export differently:
 * 1. Android: Requests directory permissions and creates a file in the granted directory.
 * 2. iOS: Writes the CSV data directly into the file system and then shares the file.
 * 3. Web: Creates a blob and uses it to create an anchor element, which when clicked, downloads the CSV file.
 */
export const exportPatient = async (selectedPatients: Patient[]) => {
    if (selectedPatients.length == 0) {
        return;
    }
    const date = new Date();
    const dateString = date.toLocaleString();
    // Define a regular expression to match white spaces, commas, colons, and slashes.
    const regex = /[,\s:\/]/g;
    // Replace white spaces, commas, colons, and slashes with underscores.
    const sanitizedDatestring = dateString.replace(regex, "_");

    // Generate file.
    const filename = `${sanitizedDatestring}.csv`; // Assuming the file name is the date time
    var csvData = "MRN,DOB,FirstName,LastName,Gender,PhoneNumber,PostCode,TimeLastAllocated,AllocatedTo,Events\n";
    for (const patient of selectedPatients) {
        var allEvents = "";
        for (const event of patient.events) {
            allEvents += `[${event.getExportSummary()}]`;
        }
        csvData += `${patient.mrn},${patient.dob},${patient.firstName},${patient.lastName},${patient.sex},${patient.phoneNumber},${patient.postCode},${patient.timeLastAllocated},${patient.idAllocatedTo},${allEvents}\n`;
    }

    if (Environment.inst.getOS() == OS.Android) {
        const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(); // Getting permission for android.
        if (permission.granted) {
            await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri, filename, "csv")
                .then(async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, csvData, {
                        encoding: FileSystem.EncodingType.UTF8,
                    });
                })
                .catch((e) => console.log(e));
        } else {
            console.log("Permission denied");
        }
    } else if (Environment.inst.getOS() == OS.IOS) {
        // Define a regular expression to match white spaces, commas, colons, and slashes
        const regex = /[,\s:\/]/g;
        // Replace white spaces, commas, colons, and slashes with underscores
        const sanitizedFileName = filename.replace(regex, "_");
        const filePath = FileSystem.documentDirectory + sanitizedFileName;

        try {
            await FileSystem.writeAsStringAsync(filePath, csvData, { encoding: FileSystem.EncodingType.UTF8 });
            await shareAsync(filePath);
        } catch (e) {
            console.log(e);
        }
    } else if (Environment.inst.getOS() == OS.Web) {
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }
};
