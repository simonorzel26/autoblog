

# AutoBlog CLI Tool

AutoBlog is an npm CLI tool that generates blog posts in markdown format using OpenAI's GPT-3 API. With AutoBlog, you can quickly and easily create high-quality blog posts without having to spend hours researching and writing.

## Installation

You can install AutoBlog using npm. First, make sure you have Node.js installed on your machine. Then, run the following command:

```
npm install -g autoblog
```
```
yarn add -g autoblog
```
```
pnpm install -g autoblog
```

## Usage

To use AutoBlog, you'll need an OpenAI API key. You can get a key by signing up for OpenAI's GPT-3 API.

Once you have your API key, you can use AutoBlog to generate a blog post by running the following command:

```
autoblog --apiKey <your-api-key> --prompt "Your blog post prompt here"
```

AutoBlog will then generate a blog post based on your prompt and output the post in markdown format.

### Parameters

AutoBlog supports the following parameters:

- `--apiKey` (required): Your OpenAI API key.
- `--prompt` (required): The prompt for your blog post.
- `--outDir`: The output directory of the .mdx files. Default: current directory.
- `--fileName`: The filename of the created blog. Default: "Untitled".
- `--temperature`: The temperature setting for GPT-3. Default: 0.5.
- `--max_tokens`: The max_tokens setting for GPT-3. Default: 1000.

## Example

Here's an example of how you might use AutoBlog to generate a blog post:

```
autoblog --apiKey abc123 --prompt "10 Reasons Why Dogs Make Great Pets" --outDir ./blog-posts --fileName why-dogs-are-great --temperature 0.7 --max_tokens 1500
```

This command would generate a blog post with a temperature of 0.7 and max tokens of 1500 in the file `./blog-posts/why-dogs-are-great.mdx`, based on the prompt "10 Reasons Why Dogs Make Great Pets".

## License

This project is licensed under the MIT License. See the LICENSE file for details.
