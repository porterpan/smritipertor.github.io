'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
    var link = data.permalink;
	var beginPos = getPosition(link, '/', 3) + 1;
	// In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
	var endPos = link.lastIndexOf('/') + 1;
    link = link.substring(beginPos, endPos);
	
    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];
 
      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
		if ($(this).attr('src')){
			// For windows style path, we replace '\' to '/'.
			var src = $(this).attr('src').replace('\\', '/');
			if(!/http[s]*.*|\/\/.*/.test(src) &&
			   !/^\s*\//.test(src)) {
			  // For "about" page, the first part of "src" can't be removed.
			  // In addition, to support multi-level local directory.
			  var linkArray = link.split('/').filter(function(elem){
				return elem != '';
			  });
			  var srcArray = src.split('/').filter(function(elem){
				return elem != '' && elem != '.';
			  });
			  if(srcArray.length > 1)
				srcArray.shift();
			  src = srcArray.join('/');
			  //$(this).attr('src', config.root + link + src);
			  //notes: src is image name,and config.root is localhost:port,the middle cahr string is my local image Repository
			  if(link.substring(0,3)=="第一章"){
				//第一章的所有图片放到这个文件夹下
				link="image1/";	
				console.info&&console.info("judement the fist capture!");
				}
			  else if(link.substring(0,3)=="第二章"){
				link="image2/";				
				console.info&&console.info("judement the second capture!");
				}
			else if(link.substring(0,3)=="第三章"){
				link="image3/";				
				console.info&&console.info("judement the third capture!");
				}
			else if(link.substring(0,3)=="第四章"){
				link="image4/";				
				console.info&&console.info("judement the fourth capture!");
				}
			else if(link.substring(0,3)=="第五章"){
				link="image5/";				
				console.info&&console.info("judement the fifth capture!");
				}
			else if(link.substring(0,3)=="第六章"){
				link="image6/";				
				console.info&&console.info("judement the sixth capture!");
				}
			else if(link.substring(0,3)=="第七章"){
				link="image7/";				
				console.info&&console.info("judement the seventh capture!");
				}

			  //$(this).attr('src', config.root + "image1/" + src);
			  $(this).attr('src', config.root + link + src);
			  console.info&&console.info("update link as:-->"+config.root + "==" + link + "==" + src);
			}
		}else{
			console.info&&console.info("no src attr, skipped...");
			console.info&&console.info($(this));
		}
      });
      data[key] = $.html();
    }
  }
});
