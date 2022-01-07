const { ImageData, getNounData, getRandomNounSeed } = require( '@nouns/assets');
const { buildSVG } = require('@nouns/sdk');
const sharp = require("sharp");
const fs = require('fs').promises;

const path = require('path')
// upscale svg and save as png

// async function writeFile(svg, fn) {
//   try {
//     await fs.writeFile(fn, svg);
//   } catch (error) {
//     console.error(`Got an error trying to write to a file: ${error.message}`);
//   }
// }

async function resizeImage(inSvg, i) {
  try {
      await sharp(Buffer.from(inSvg))
      .resize({
        width: 32*11,
        height: 32*11
      })
     .toFile('output_png_upscale/' + i + '.png');
  } catch (error) {
    console.log(error);
  }
}

  // const traitTitles = ['background', 'body', 'accessory', 'head', 'glasses'];
  // const traitNames = [
  //   ['cool', 'warm'],
  //   ...Object.values(ImageData.images).map(i => {
  //     return i.map(imageData => imageData.filename);
  //   }),
  // ];
const seeds = [] // empty Object

for(let i=0; i<10; i++) {  
  console.log(i)
  const seed = getRandomNounSeed()
  const { parts, background } = getNounData(seed);
  seed['id'] = i
  seeds.push(seed);
  const svg = buildSVG(parts, ImageData.palette, background);
  //writeFile(svg, i.toString() + '.svg')
  resizeImage(svg, i)
}

// write json 
// to do: name this attributes and add other stuff, check erc721 metadata standard (opensea docs good)
// "name": "nounsgen0#0",
// "description": "A awesome nouns derivative. For more information see our website.",
// "image": "image_url/0",
// "attributes": 

const json = JSON.stringify(seeds);

fs.writeFile('metadata.json', json, 'utf8', function(err){
    if(err){ 
          console.log(err); 
    } else {
          //Everything went OK!
    }});

