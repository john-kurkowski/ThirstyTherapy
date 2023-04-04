import posts from "./_posts.js";

const contents = JSON.stringify(
  posts.map((post) => {
    return {
      title: post.title,
      slug: post.slug,
    };
  })
);

// Sapper boilerplate
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(contents);
}
