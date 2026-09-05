const fs = require('fs');
const { minify } = require('terser');

async function build() {
  const source = fs.readFileSync('bookmarklet.js', 'utf8');

  const result = await minify(source, {
    compress: true,
    mangle: true,
    format: {
      comments: false
    }
  });

  if (result.error) {
    throw result.error;
  }

  const output = 'javascript:' + result.code;

  fs.writeFileSync('bookmarklet.min.js', output + '\n');

  console.log('✓ bookmarklet.min.js generated');
}

build().catch(function (error) {
  console.error(error);
  process.exit(1);
});