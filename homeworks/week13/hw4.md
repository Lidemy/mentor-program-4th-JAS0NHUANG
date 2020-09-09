## Webpack 是做什麼用的？可以不用它嗎？
先從官方文件看起吧：
> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

如上所述，webpack 就是一個現代 JavaScript 的「靜態模組打包工具」，然後它運作的方式就是在打包時建立每個模組之間的相依關聯，最後輸出一個或多個包裝好的檔案。  
首頁裡的簡易流程圖也很清楚的畫出它的運作方式以及它能透過 loaders 處理的檔案類型： JavaScript、SASS(CSS) 以及各種圖片檔。除了上面三種檔案，使用各種 loader 還能載入更多不同的資源，像是使用 file-loader 就可以載入像是字型檔之類的檔案。（這裡可以找到很多其它 loaders [webpack - Loaders](https://webpack.js.org/loaders/)，居然還有個 null-loader XD）
另外 Webpack 也是有 plug-in 可以使用，感覺好像是可以擴展 webpack 的功能，但是實際上是怎麼運作的就沒有再深入研究了。  

完完全全的可以不用它，全部自已手動完成像是 ES6+ 轉譯為 ES5-、SASS 轉譯為 CSS、處理模組間的依賴關係與衝突……等等，但是如果有一個好用的工具能用，為什麼還要自已處理這些麻煩事呢？

參考資料：  
[webpack](https://webpack.js.org/)

## gulp 跟 webpack 有什麼不一樣？
也看一下 Gulp 的首頁：  
> A toolkit to automate & enhance your workflow
Leverage gulp and the flexibility of JavaScript to automate slow, repetitive workflows and compose them into efficient build pipelines  

所以它給自已的定義是一個自動化、工作流程優化工具。而它實際上做的事情就是所謂的任務管理，也就是我們寫好我們每次需要運行的任務之後，交給它去幫我們執行。  

雖然它跟 webpack 這兩個程式的「工作結果」可能相同（轉譯 JavaScript、CSS 檔案，在 Gulp 加上 bundler 外掛也可以執行 bundle 的任務），但是兩個程式的核心功能是完全不一樣的，一個是自動化管理任務（Gulp），另外一個就是資源打包（webpack）。

參考資料：  
[Gulp](https://gulpjs.com/)

## CSS Selector 權重的計算方式為何？
CSS Specificity 其實就是「CSS 的精準度」，越「精準」的選擇器越優先處理。  
而它們「精準度」的權重計算可以分成五位數，由最精準到最不精準依序為：
- !important （無敵！）
- Style attribute（Inline style，寫在 HTML 裡的樣式） 
- ID （`#`）
- Class, pseudo-class, attribute （`.`；`:hover` 等偽類；`[type="text"]` 等屬性選擇器）
- Elements, pseudo-element（HTML 元素，如：`a`、`h1`、`p`……等等；`::before`、`::after`……等偽元素）

權重相同的話以後面出現的為準。

舉個非常簡單的例子吧：  
```
HTML:
<ul>
  <li id="哀低" class="克來斯">猜猜我是誰</li>
</ul>

CSS:
#哀低 {
  color: red;
}

ul > li.克來斯 {
  color: blue;
}
```
第一個選擇器的權重為： 0, 0, 1, 0, 0
第二個選擇器的權重為： 0, 0, 0, 1, 1

因為第一個選擇器選到了 ID 所以就算後面一個選到 Class 與 Element 還是沒辦法覆蓋前面的樣式，所以文字內容會是紅色的。  

參考資料：  
[[FE101] 前端基礎：HTML 與 CSS](https://lidemy.com/courses/390445/lectures/5958317)
[CSS Specificity](https://cssspecificity.com/)（這個網站作的很漂亮，但是效能好差阿……）
[CSS Specificity - Emma Bostian](https://dev.to/emmabostian/css-specificity-1kca)
[Specificity Calculator](https://specificity.keegan.st/)（有趣的權重計算工具）