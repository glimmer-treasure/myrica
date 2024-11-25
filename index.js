import { Command } from 'commander';
import fse from 'fs-extra';
import path from 'path';
import ora from 'ora';
import process$1 from 'process';

const EDITORCONFIG_API = 'https://raw.githubusercontent.com/glimmer-treasure/myrica/refs/heads/main/public/template/.editorconfig';
const WORK_DIRECTORY = process$1.cwd();

const asyncWrapper = async (promise) => {
    let result = new Array(2).fill(void 0);
    try {
        result[1] = await promise;
    } catch (error) {
        result[0] = error;
    } finally {
        return result
    }
};

const spinner = ora();

const getCommand$1 = () => {
    const command = new Command('editorconfig');
    command
        .action(async () => {
            spinner.start('初始化.editorconfig文件......');
            const isExists = await fse.pathExists(path.resolve(WORK_DIRECTORY, './.editorconfig'));
            if (isExists) {
                spinner.fail('.editorconfig文件已存在');
                return
            }
            spinner.info(`当前工作目录：${WORK_DIRECTORY}`);
            spinner.start('开始下载.editorconfig');
            const [error, response] = await asyncWrapper(fetch(EDITORCONFIG_API));
            if (error) {
                spinner.fail('下载失败');
                return
            }
            const [error2, text] = await asyncWrapper(response.text());
            if (error2) {
                spinner.fail(error2);
                return
            }
            const [error3] = await asyncWrapper(fse.outputFile(path.resolve(WORK_DIRECTORY, '.editorconfig'), text));
            if (error3) {
                spinner.fail(error3);
                return
            }
            spinner.succeed('下载完成');
        });
    return command
};

const getCommand = () => {
    const command = new Command('init');
    command.addCommand(getCommand$1());
    return command
};

const program = new Command();

program.addCommand(getCommand());
await program.parseAsync(process.argv);
