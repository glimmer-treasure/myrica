import { Command } from 'commander';

export const getInitCommand = () => {
    const command = new Command('add');
    command
        .argument('[path]', '添加博客的默认目录')
        .action(async (path) => {
            const frontMatter = await getBlogFrontMatter()
            await createBlog(path, frontMatter)
        })
    return command
}