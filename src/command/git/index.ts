import { createCommand } from "commander";
import push from "./components/push";

const createGitCommand = () => createCommand("git").addCommand(push());

export default createGitCommand;
