const express = require("express");
const cors = require("cors");
const { User } = require("./config"); // Giả sử User là một bộ sưu tập Firestore
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await User.add({ data }); // Sử dụng add thay vì set
  res.send({ msg: "Người dùng đã được thêm" });
});

app.listen(4000, () => console.log("Đang chạy *4000"));
