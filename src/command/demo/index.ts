import { Prompt } from "@/util/prompt";
import { CliCommand } from "@oishi/cli-core";

const initialAnswers = { name: "jinzhehao" };

export default new CliCommand({
  command: "demo",
  description: "测试指令",
  action(props) {
    new Prompt({ prefix: "cli" }, initialAnswers)
      .addInput({ name: "name", message: "您的姓名是？" })
      .addNumber({ name: "age", message: "您的年龄是？" })
      .addConfirm({ name: "isAdmin", message: "是否是管理员？" })
      .addPassword({ name: "password", message: "请输入您的密码" })
      .addCheckbox({
        name: "fruit",
        message: "喜欢什么水果呢？",
        choices: ["apple", "banana", "orange"],
      })
      .execute((answers) => {
        props.logger.info(JSON.stringify(answers));
      });
  },
});
