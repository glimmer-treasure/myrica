import { Command } from 'commander';
import fse from 'fs-extra'
import path from 'path'

export const getCommand = () => {
    const command = new Command('editorconfig');
    command
        .action(async () => {
            const isExists = await fse.pathExists(path.resolve(__dirname, './.editorconfig'))
            if (!isExists) {
                fetch()
            }
            const frontMatter = await getBlogFrontMatter()
            await createBlog(path, frontMatter)
        })
    return command
}