import axios from "axios";

const pingUrl = process.env.PING_URL;

async function ping() {
  if(!pingUrl) {
    throw new Error("ping url为空")
  }
  const res = await axios.get(pingUrl);
  return res.data || {};
}

const api = {
  ping,
};

export default api;
