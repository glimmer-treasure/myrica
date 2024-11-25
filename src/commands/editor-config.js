import { Command } from 'commander';
import fse from 'fs-extra'
import path from 'path'
import ora from 'ora';
import { EDITORCONFIG_API, WORK_DIRECTORY } from '../const.js'
import { asyncWrapper } from '../utils.js'

const spinner = ora()

export const getCommand = () => {
    const command = new Command('editorconfig');
    command
        .action(async () => {
            spinner.start('初始化.editorconfig文件......');
            const isExists = await fse.pathExists(path.resolve(WORK_DIRECTORY, './.editorconfig'))
            if (isExists) {
                spinner.fail('.editorconfig文件已存在')
                return
            }
            spinner.info(`当前工作目录：${WORK_DIRECTORY}`)
            spinner.start('开始下载.editorconfig');
            const [error, response] = await asyncWrapper(fetch(EDITORCONFIG_API))
            if (error) {
                spinner.fail('下载失败')
                return
            }
            const [error2, text] = await asyncWrapper(response.text())
            if (error2) {
                spinner.fail(error2)
                return
            }
            const [error3] = await asyncWrapper(fse.outputFile(path.resolve(WORK_DIRECTORY, '.editorconfig'), text))
            if (error3) {
                spinner.fail(error3)
                return
            }
            spinner.succeed('下载完成')
        })
    return command
}






