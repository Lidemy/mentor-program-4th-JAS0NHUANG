## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### 1. useState()

用來初始化 state，讓 function component 也可以是「有狀態」（Stateful）的元件。  

先使用 useState() 這個 hook 建立 state，將初始值設定為 `{ initialState }` 然後用解構的方式取得回傳陣列裡面的 myState 值與 setMyState 函式。  
myState 裡面就會存有設定的 state 初始值：`{ initialState }`，`setMyState()` 函式則可以用來設定新的 state。  

可以在設定初始 state 時傳入函式以實現 lazy initial state，避免第一次 render 時顯示還未經過初始化 state 的畫面，也可以讓這個初始化的過程只在第一次渲染時進行。  

在使用 setState 函式時，可以傳入另一個函式，這個函式可以取得現在的 state 當做參數，然後再將回傳的值設定為新的 state。

範例：
```JavaScript
const [myState, setMyState] = useState({ initialState })

setMyState({ previousState => previousState + newValue })
```

### 2. useEffect

處理可能有副作用的指令函式。  

因為它會在 react 將元件渲染到畫面上之後被執行，所以它不會擋住畫面渲染的過程，如果想要在畫面渲染之前就執行的話可以使用 useLayoutEffect。

另外，第一個參數是想要執行的函式，第二個參數則是一個陣列，存有 useEffect 所依賴的值，也就是這個陣列裡的值如果有變化才會進行重新渲染，要注意的是，這個陣列裡**應該要存入所有 useEffect 依賴的值**。如果傳入的是空陣列的話就只有第一次 render 時會呼叫 useEffect 這個 hooks。如果沒有傳入陣列的話預設每次渲染都會重新執行

在 useEffect 裡還可以回傳一個函式，這個函式就是 clean up function，用以清除 effect 所建立的資料。useEffect 與其中 clean up function 的用法有點類似 class components 裡面 componentDidMount 跟 componentWillUnmount 的用法，但是執行的時間點還是有些差異。

範例：
```JavaScript
useEffect( () => {
    didUpdateFunction
    rerutn () => {
        didUpdateFunction // to be clean
    }
}, [dependencyArray])
```

### 3. useContext

用來取得一個 context 物件，並且回傳最近的上層 provider 裡面 context 的值。useContext 只能接受 context object 本身作為參數。 

想要取得這個 context 物件的話，必需在上層元件裡使用 createContext() 建立一個 context 物件。然後以 `<MyContext.Provider value={someValue}>` 的方式傳入子元件中，讓所有子元素都可以使用 context 這個物件所提供的值。 

範例：
```
// 上層元件：
const MyContext = React.createContext()

return (
    <>
        <MyContext.Provider value={someValue}>
            <ContextComponent />
        </MyContext.Provider>
    </>
)

// 子元件：
function ContextComponent() {
    const myContext = useContext(MyContext)
    // use myContext here.
}
```

它的其中一個重要功能就是可以避免上層元件必須要透過中間元件才能將 props 傳遞給最下層元件的 prop drilling 問題。  

更進階的使用，可以將所有關於 useContext、createContext 的操作都獨立出另一個檔案，並且建立的個客製化的 hooks，這樣只要直接在想要使用這些功能的地方引入客製化的 hooks 就好。（參考 Web Dev Simplified，講解 useContext 的影片。）

### 4. useLayoutEffect

功能、語法與 useEffect 相同，不同的地方在於執行的時間點，useEffect 會在渲染之後，瀏覽器顯示畫面之後才執行，而 useLayoutEffect 則會在渲染之後，瀏覽器顯示畫面之前執行。  

官方網站還是建議盡量不要用 useLayoutEffect，避免執行 hook 阻檔畫面的顯示。  

### 5. useRef

useRef 顯然與 ref 這個 React 裡面提供與 DOM 互動的物件有關，ref 不只是能與 DOM 元素互動，還可以讓我們儲存一個「可變動」（mutable）的值。

ref 與 state 很類似，但是 state 的更新會造成重新渲染，ref 更新則不會，所以它很適合拿來存放元件需要使用，但不必重新渲染的值。 

useRef 巧妙的運用 ref 的特性，讓我們能很方便的取得、設定一個「可變」並且在每次渲染之後都能夠使用的值，但是不應該濫用它，還是應該盡量把元件裡的資料交給 state 或 props 去處理。（就像盡量讓元件都是 controled component 一樣）。  

useRef 一個很好的用途就是可以記住上一次 render 的 state，寫法如下：
```JavaScript
const prevValue = useRef('')

useEffect( () => {
    prevValue.current = value
}, [value])
```

### 6. useMemo

useMemo 會回傳一個被「記住」的值，可以避免重覆進行不必要的計算。  

在 useMemo 裡放入一個函式，以及一個相依性陣列，在每次相依性陣列中的值有改變時才會重新執行函式，計算新的值回傳。另外要住意的一點是，useMemo 的函式會在 render 期間執行。  

使用時機有兩個，一個就是在函式計算比較複雜時，另外就是使用在處理物件之間相等比較的時候，因為每次 render 都是一個新的函式呼叫，所以裡面產生的物件也都是一個「全新」的物件，就算它們裡面存的值都是相同的，所以如果我們去比較渲染前後的兩個物件，它們會是不相等的，這時候就可以用 useMemo 回傳並「記住」這個物件，之後就不會因為其它狀態的改變而重新渲染了。  

### 7. useCallback

useCallback 會回傳一個被「記住」（meoized）的函式，避免不必要的重覆渲染某個元件。  

我們可以把某個函式包裝在 useCallback 裡面，然後像 useEffect 一樣傳入一個相依性陣列，只有在相依性陣列裡的值有變動時才重新建立一次函式。

程式碼的結構看起來會很像 useMemo，不同點在於 useMemo 會回傳一個函式執行後產生的值，而 useCallback 則是回傳整個函式。

### 8. useReduce

可以用來代替 useState，可以看成是功能更複雜的 useState。  

真很看起來很像 redux :D，有 action、dispatch 的概念，在需要管理比較複雜的狀態資訊時比較適合。  

### 9. useImperativeHandle 

用來向上層元件傳遞 handler。

### 10. useDebugValue  

使用 React DevTools 的時候，在客制化的 hooks 旁邊顯示想要顯示的標籤。  

---

參考資料：  
[Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)  
[Hook-flow](https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png)  
[React Hooks - Web Dev Simplified](https://www.youtube.com/playlist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h)

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

class component 的生命週期大致上可以分成四個階段：Mounting、Updating、Unmounting、Error Handling，生命週期 method 可以在一個或多個階段被使用。  

以下列出生命週期的方法：  

### 1. render()  

在 class component 裡「唯一」必需被呼叫的 method。  

它應該是一個 pure function，也就是它不應該改變元件裡的 state、props，而且每次回傳的結果應該要一致。   

它在被呼叫之後會去檢查 `this.props` 與 `this.state` 然後依照取得的資訊回傳以下幾種內容：  
- React element
- Array 與 fragments
- Portals
- String 與 numbers
- Booleans 或 null

其中比較常用到的是 React element 或 Fragments，React element 是單一 React 元素（這個元素之下也可以包含其它元素）通常透過 JSX 建立，例如：
```JavaScript
return(
    <MyComponent />
)
```  
或是：
```JavaScript
return(
    <div>
        <ChildComponent1 />
        <ChildComponent2 />
    </div>
)
```

Fragment 則是回傳多個 React 元素，例如：
```JavaScript
return(
    <>
        <div />
        <AnotherComponent />
    </>
)
```

### 2. constructor()

這個 method 會在 mount 之前被呼叫，用來初始化 state：將一個物件賦值給 `this.state`（constructor 也是在一個元件中唯一可以直接賦值給 `this.state` 的地方），以及 bind 事件處理的函式。如果不需要初始化 State 也不需要 bind 的話就不需要使用這個 method。

在使用 constructor 時必需要先呼叫 `super(props)` ，不然 `this.props` 的值就會是 `undefined` 而且可能會有不可預期的 bug 產生。

不要在 constructor 裡面使用 setState()。

### 3. componentDidMount()

會在元件被渲染並 mount 到 DOM 上時執行，它只會在元件第一次被渲染時被呼叫，適合進行 Dom 的初始化，或者執行網路請求。也因為它是在畫面被繪出之前被執行的，所以可以再呼叫一次 setState() 再觸發一次 render 然後才把最新的內容顯示出來，但是在大部分的情況之下還是應該盡量在 constructor() 裡面指定初始 state。

### 4. componentWillUnmount()

會在元件被移除之前執行，常常用來清除由 componentDidMount 所建立的內容，像是取消一個網路請求或是移除某個在 componentDidMount() 裡建立的監聽狀態。

### 5. shouldComponentUpdate()

會在接收到新的 props 跟 state 後，元件被重新 render 之前呼叫，回傳一個 boolean 值，預設值為 true，如果是 true 的話會進行 render，false 則不進行 render。  

如果回傳值是 false 的話 UNSAFE_componentWillUpdate()、render() 和 componentDidUpdate() 都不會被呼叫。  

### 6. static getDerivedStateFromProps()

每次元件 render 都會被呼叫，不論是首次 mount 或是更新時。可以針對 props 的內容判斷是否更新 state，回傳值會是一個用來更新 state 的物件或是 null 如果不需要更新 state。  

使用時機不多。  

### 7. componentDidUpdate()

在元件更新後被呼叫，不會在初次的渲染時被呼叫。  

其實很類似 componentDidMount() 的功能，適合操作 DOM、執行網路請求。  

### 8. getSnapshotBeforeUpdate()

會在最近一次渲染的輸出交給 DOM 時被呼叫，可以用來記憶 DOM 變化之前的一些資料，它的回傳值會被當作一個參數傳給 componentDidUpdate() 處理。  

### 9. componentDidCatch()  

它會在子元件發生錯誤時被呼叫，會接收一個錯誤內容 error 以及關於出錯的元件的資訊 info。 

參考資料：  
[React.Component](https://reactjs.org/docs/react-component.html)  
[State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)  
[React Lifecycle Methods diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)  
[React:"mount" vs "render"?](https://reacttraining.com/blog/mount-vs-render/)  
[React Component Lifecycle - Hooks / Methods Explained](https://www.youtube.com/watch?v=m_mtV4YaI8c)  

## 請問 class component 與 function component 的差別是什麼？

### 1. 寫法上的差別  

最直接能感受到的部分當然就是寫法上的差異，一個是寫 class 物件，一個則是寫 function 物件，大部分的情況之下 function component 加 hooks 的寫法會更簡潔一些。

### 2. 需要瞭解的背景知識不一樣  

class component 需要對 JavaScript 的 class 與物件導向的寫法有基本的瞭解，像是 extend、constructor()、super()、this……等等，特別是要清楚 this 的用法與特性，因為在 class component 中要設定 state、綁定 handler 都需要使用到 this。
function component 相對而言入門的門檻比較不一樣，畢竟 function 的概念大部分的人都比較熟悉，只需要另外掌握 closure 的概念就可以上手，當然這並不意味著它是比較簡單的。

### 3. 運作原理不同    

這是兩者之間最核心的差異，class component 在 JavaScript 裡面使用物件導向的寫法創建一個 component 實例，有「生命週期的概念」，然後藉由操作物件裡面的 this 與 state、props 互動，this 在每次渲染時都會去抓到最新的 state 與 props。  

Function component 則是運用函式閉包的特性來建立 React 元件，然後使用 hooks 來操作 State 的狀態，每一次的 render 都是一次全新的函式呼叫。Hooks 也讓程式邏輯有更好的共用性，可以很輕易的將相同的邏輯分離出來並重覆使用。  

參考資料：  
[How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)  
[從實際案例看 class 與 function component 的差異](https://blog.techbridge.cc/2020/06/13/class-function-component-and-useeffect/)  

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

這兩者是 React 在處理表單輸入資訊時可以選擇的方法，它們之間最大的差異就是輸入的資料是不是交由 React 來監控。

uncontrolled 元件的輸入內容不經由 React 控制，要在 React 中與它互動的話必需使用如 ref、useRef 與 DOM 溝通的方法來完成。  

controlled 元件的輸入內容由 React 監控，原理大概是在輸入欄位中加入 onChange 事件監控輸入內容的變化，然後將變化的內容存入一個 state 中，最後再將這個值以 value 的方式回傳給輸入欄位並顯示在畫面上。controlled component 的好處就是符合 React 「所有的畫面都由 State 產生」的原則，另外就是因為輸入的值被存在 state 中，在處理驗證、想要進行其它操作或需要將輸入的值傳遞給其它元件時時更容易被調用。

[Controlled Component ](https://reactjs.org/docs/forms.html#controlled-components) 
