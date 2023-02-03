import { Prompt } from "@/util/prompt";
import { CliCommand } from "@oishi/cli-core";

const initialAnswers = { name: "jinzhehao" };

export default new CliCommand({
  command: "demo",
  description: "测试指令",
  options: [
    {
      name: "-b, --no-buildCmd",
      description: "输入构建指令",
    },
  ],
  action(props) {
    console.log(props.args);
    console.log(props.opts);

    // new Prompt({ prefix: "cli" }, initialAnswers)
    //   .addInput({ name: "name", message: "您的姓名是？" })
    //   .addNumber({ name: "age", message: "您的年龄是？" })
    //   .addConfirm({ name: "isAdmin", message: "是否是管理员？" })
    //   .addPassword({ name: "password", message: "请输入您的密码" })
    //   .addList({
    //     name: "fruit1",
    //     message: "喜欢什么水果呢？",
    //     choices: ["apple", "banana", "orange"],
    //   })
    //   .addRawList({
    //     name: "fruit2",
    //     message: "喜欢什么水果呢？",
    //     choices: ["apple", "banana", "orange"],
    //   })
    //   .addCheckbox({
    //     name: "fruit3",
    //     message: "喜欢什么水果呢？",
    //     choices: ["apple", "banana", "orange"],
    //   })
    //   .execute((answers) => {
    //     props.logger.info(JSON.stringify(answers));
    //   });
  },
});
