import { CliCommand } from "@oishi/cli-core";
import { createPromptModule } from "inquirer";
import type {
  InputQuestion,
  NumberQuestion,
  ConfirmQuestion,
  ListQuestion,
  RawListQuestion,
  ExpandQuestion,
  CheckboxQuestion,
  PasswordQuestion,
  EditorQuestion,
} from "inquirer";

export default new CliCommand({
  command: "demo",
  description: "测试指令",
  action(props) {
    createPromptModule()([
      createInput({
        name: "createInput",
        message: "message: createInput",
      }),
      createNumber({ name: "createNumber", message: "message: createNumber" }),
      createConfirm({
        name: "createConfirm",
        message: "message: createConfirm",
        default: true,
      }),
      createList({
        name: "createList",
        message: "message: createList",
        choices: [
          { name: "hello", value: "heiheihei" },
          { name: "world", value: "wwwwwww" },
        ],
        default: "wwwwwww",
      }),
      createRawlist({
        name: "createRawlist",
        message: "message: createRawlist",
        choices: ["hello", "world"],
      }),
      // createExpand({
      //   name: "createExpand",
      //   message: "message: createExpand",
      //   choices: ["hello", "world"],
      // }),
      createCheckbox({
        name: "createCheckbox",
        message: "message: createCheckbox",
        choices: [
          { name: "hello", value: "heiheihei" },
          { name: "world", value: "wwwwwww" },
        ],
        default: ["wwwwwww"],
      }),
      createPassword({
        name: "createPassword",
        message: "message: createPassword",
        default: "heihei",
      }),
      createEditor({
        name: "createEditor",
        message: "message: createEditor",
        default: "hello my baby",
      }),
    ]).then((answers) => {
      props.logger.info(JSON.stringify(answers));
    });
  },
});

const createInput = (config: {
  name: string;
  message: string;
  default?: string;
  // prefix?: string;
  // when: boolean;
}): InputQuestion => {
  return {
    type: "input",
    name: config.name,
    message: config.message,
    default: config.default,
  };
};

const createNumber = (config: {
  name: string;
  message: string;
  default?: number;
  // prefix?: string;
  // when: boolean;
}): NumberQuestion => {
  return {
    type: "number",
    name: config.name,
    message: config.message,
    default: config.default,
  };
};

const createConfirm = (config: {
  name: string;
  message: string;
  default?: boolean;
  // prefix?: string;
  // when: boolean;
}): ConfirmQuestion => {
  return {
    type: "confirm",
    name: config.name,
    message: config.message,
    default: config.default,
  };
};

const createList = (config: {
  name: string;
  message: string;
  choices: ({ name: string; value: string } | string)[];
  default?: string;
  // prefix?: string;
  // when: boolean;
}): ListQuestion => {
  return {
    type: "list",
    name: config.name,
    message: config.message,
    choices: config.choices,
    default: config.default,
  };
};

const createRawlist = (config: {
  name: string;
  message: string;
  choices: ({ name: string; value: string } | string)[];
  default?: string;
  // prefix?: string;
  // when: boolean;
}): RawListQuestion => {
  return {
    type: "rawlist",
    name: config.name,
    message: config.message,
    choices: config.choices,
    default: config.default,
  };
};

const createExpand = (config: {
  name: string;
  message: string;
  choices: string[];
  default?: string;
  // prefix?: string;
  // when: boolean;
}): ExpandQuestion => {
  return {
    type: "expand",
    message: config.message,
    name: config.name,
    default: config.default,
    choices: config.choices,
  };
};

const createCheckbox = (config: {
  name: string;
  message: string;
  choices: ({ name: string; value: string } | string)[];
  default?: string[];
  // prefix?: string;
  // when: boolean;
}): CheckboxQuestion => {
  return {
    type: "checkbox",
    name: config.name,
    message: config.message,
    choices: config.choices,
    default: config.default,
  };
};

const createPassword = (config: {
  name: string;
  message: string;
  default?: string;
  // prefix?: string;
  // when: boolean;
}): PasswordQuestion => {
  return {
    type: "password",
    name: config.name,
    message: config.message,
    default: config.default,
  };
};

const createEditor = (config: {
  name: string;
  message: string;
  default?: string;
  // prefix?: string;
  // when?: boolean;
}): EditorQuestion => {
  return {
    type: "editor",
    message: config.message,
    name: config.name,
    default: config.default,
  };
};
