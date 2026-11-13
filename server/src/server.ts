
import app from "./app.js";

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
