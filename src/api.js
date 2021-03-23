import axios from "axios";

async function ping() {
  const res = await axios.get(
    "https://service-me8o3m26-1258810270.hk.apigw.tencentcs.com/release/shManager/v1/ping"
  );
  return res.data || {};
}

const api = {
  ping,
};

export default api;
