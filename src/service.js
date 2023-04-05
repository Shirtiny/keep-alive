/*
 * @Author: Shirtiny
 * @Date: 2021-11-14 21:55:39
 * @LastEditTime: 2021-11-21 19:12:15
 * @Description:
 */
import { reactiveX, date } from "@shirtiny/utils/lib";
import axios from "axios";

console.log("env:", process.env);

const pingUrl = process.env.PING_URL;
const postUrl = process.env.POST_URL;

async function start() {
  const request = async () => {
    console.log("发送请求", date.formatTime(date.unix()));

    if (pingUrl) {
      const res1 = await axios.get(pingUrl);
      console.log("ping 的结果：", res1.data);
      if (!res1.data) throw new Error("ping 没有获取到结果");
    }

    if (postUrl) {
      const res2 = await axios.post(postUrl);
      console.log("post 的结果：", res2.data);
      if (!res2.data) throw new Error("post 没有获取到结果");
    }
  };

  const task = reactiveX.createRetryTask({
    name: "ping",
    request,
    maxRetryCount: 5,
    delay: 3,
    stopWhile: (cur, e) => {
      console.log(`retry count: ${cur}`, e.message);
    },
  });
  task.start();
}

const service = {
  start,
};

export default service;
