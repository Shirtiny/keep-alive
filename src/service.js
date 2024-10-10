/*
 * @Author: Shirtiny
 * @Date: 2021-11-14 21:55:39
 * @LastEditTime: 2021-11-21 19:12:15
 * @Description:
 */
import { reactiveX, date, util } from "@shirtiny/utils/lib";
import axios from "axios";
import { exec } from "child_process";

console.log("env:", process.env);

const pingUrl = process.env.PING_URL;
const postUrl = process.env.POST_URL;

const selfAlive = async (info) => {
  console.log("selfAlive start. waiting 10 second....")
  await util.sleep(10 * 1000);
  const startTime = date.formatTime(date.unix());

  try {
    await command("git status");
    await command(`git config --global user.email "shirtiny@gmail.com"`);
    await command(`git config --global user.name "shirtiny"`);
    await command(
      `echo ${startTime}__${String(info).replace(
        /\s*/g,
        ""
      )} >> ./self-alive.txt`
    );
    await command("git add ./self-alive.txt");
    await command(`git commit -m "self alive at ${startTime}"`);
    await command("git push");
  } catch (e) {
    console.log("selfAlive failed.");
  }
};

async function start() {
  const startTime = date.formatTime(date.unix());

  const request = async () => {
    console.log("发送请求", startTime);

    if (pingUrl) {
      const res1 = await axios.get(pingUrl);
      console.log("ping 的结果：", res1.data);
      if (!res1.data) throw new Error("ping 没有获取到结果");
    }

    if (postUrl) {
      const res2 = await axios.post(postUrl);
      console.log("post 的结果：", res2.data);
      if (!res2.data) throw new Error("post 没有获取到结果");
      // {
      //   code: 0,
      //   message: '成功',
      //   data: {
      //     ID: 20856430,
      //     CreatedAt: '2024-10-10T03:14:36.328Z',
      //     UpdatedAt: '2024-10-10T03:14:36.328Z',
      //     DeletedAt: null,
      //     UserCount: 1,
      //     Date: '2024-10-10 11:14:36 +0800'
      //   },
      //   desc: '',
      //   error: ''
      // }
      //  { code: 1, message: '失败', data: null, desc: '任务今日已执行', error: '' }
      const { code, data = {} } = res2.data;
      if (code === 0) {
        await selfAlive(data.ID);
      }
    }
  };

  const task = reactiveX.createRetryTask({
    name: "ping",
    request,
    maxRetryCount: 5,
    delay: 3,
    stopWhile: (cur, e) => {
      console.log(`retry count: ${cur} \n`, e.message);
    },
  });
  task.start();
}

function command(content) {
  return new Promise((resolve, reject) => {
    console.log("run command:", content);
    exec(content, (error, stdout, stderr) => {
      console.log(stdout);
      if (error) {
        console.error(error, "\n", stderr);
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

const service = {
  start,
  command,
};

export default service;
