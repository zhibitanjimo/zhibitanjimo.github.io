var seatsArr = [
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
      [2, 2, 1, 1, 2, 2, 1, 1, 1, 1],
      [1, 1, 3, 3, 1, 2, 2, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 0, 1, 1]
];
console.log(seatsArr);


// 1. 创建一个html字符串
var htmlStr = "<div class='box'>";
// htmlStr += "<h1>这是标题标签</h1>";

// 遍历二维数组, 创建 猫眼电影的行和列
for (var i = 0; i < seatsArr.length; i++) {
      // 拿到子数组, (每一行)
      // console.log(seatsArr[i]);

      // 创建行标签
      htmlStr += '<div class="row">';

      // 遍历子数组, 拿到子数组的每一项,  (每一列)
      for (var j = 0; j < seatsArr[i].length; j++) {

            // 判断数据, 根据数据创建指定数据的列
            switch (seatsArr[i][j]) {
                  case 0:
                        // 创建普通div
                        htmlStr += '<div class="col"></div>'
                        break;
                  case 1:
                        // 创建白色椅子
                        htmlStr += '<div class="col white"></div>'
                        break;
                  case 2:
                        // 创建红色椅子
                        htmlStr += '<div class="col red"></div>'
                        break;
                  case 3:
                        // 创建绿色椅子
                        htmlStr += '<div class="col green"></div>'
                        break;
            }


      }

      htmlStr += '</div>'
}

htmlStr += "</div>"

// console.log(htmlStr);

// 显示在页面上
document.write(htmlStr);

