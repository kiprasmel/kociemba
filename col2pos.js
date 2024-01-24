#!/usr/bin/env node

/**
 * https://github.com/dwalton76/rubiks-cube-NxNxN-solver/blob/c776db79314db3d98cc3dd99685ca85766656937/rubikscubennnsolver/__init__.py#L552
 * self.color_map = {"U": 97, "L": 90, "F": 92, "R": 91, "B": 94, "D": 93}  # Wh  # Or  # Gr  # Rd  # Bu  # Ye
*/
const dict = {
	"w": "U", // white -> up
	"r": "R", // red -> right
	"g": "F", // green -> front
	"y": "D", // yellow -> down
	"o": "L", // orange -> left
	"b": "B", // blue -> back
}

// old:
// const dict = {
// 	"o": "U", // orange -> up
// 	"b": "R", // blue -> right
// 	"w": "F", // white -> front
// 	"r": "D", // red -> down
// 	"g": "L", // green -> left
// 	"y": "B", // yellow -> back
// }


const out = require("fs").readFileSync(0).toString()
.split("@@@")[1].trim().split("\n\n")
	.map(side => side.split("\n")).flat()
	.map(xs => xs.split("").map(x => dict[x])).flat()
	.join("")

const cnt = {}
for (const c of out) {
	if (!(c in cnt)) cnt[c] = 0
	cnt[c]++
}
const vals = Object.values(cnt)
if (vals.some(c => c !== vals[0])) {
	console.log(cnt)
	throw new Error("count mismatch.")
}
const dims = Math.sqrt(vals[0] / 6)
if (dims * dims * 6 !== vals[0]) {
	throw new Error("irregular dimentions detected.")
}

process.stdout.write(out + "\n")

