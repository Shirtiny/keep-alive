import api from "./api";

async function ping() {
  try {
    const data = await api.ping();
    console.log("ping 的结果：", data);
  } catch (e) {
    console.log(e);
  }
}

const service = {
  ping,
};

export default service;
