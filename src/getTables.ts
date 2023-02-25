import $ from "https://deno.land/x/dax@0.27.0/mod.ts";

// run a command
//await $`echo 5`; // outputs: 5

// more complex example outputting 1 to stdout and 2 to stderr
//await $`echo 1 && deno eval 'console.error(2);'`;

// parallel
// await Promise.all([
//   $`sleep 1 ; echo 1`,
//   $`sleep 2 ; echo 2`,
//   $`sleep 3 ; echo 3`,
// ]);

// const result = await $`psql -l`.text();
const result = await $`psql -c`.text();
try {
  await Deno.writeTextFile("hoge.txt", result);
} catch (e) {
  //return e.message;
  console.log(e.message);
}
console.log(result);