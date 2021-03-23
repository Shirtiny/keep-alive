import api from "./api";

api.ping().then((data) => {
  console.log("ping的结果：", data);
});
