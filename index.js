import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs"; // Import the fs module

// Prompt the user for a URL
inquirer
  .prompt([
    {
      message: "Enter URL:",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate the QR code image as SVG and write it to a file
    const qr_svg = qr.image(url);
    const filePath = "url.png";

    // Create and write the SVG file
    qr_svg.pipe(fs.createWriteStream(filePath));

    console.log(
      `QR code for the URL has been generated and saved as ${filePath}`
    );

    // Optionally, get the SVG as a string
    const svg_string = qr.imageSync(url, { type: "svg" });

    // Save the URL input in a text file
    fs.writeFile("url.txt", url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved to url.txt");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("An error occurred:", error);
    }
  });
