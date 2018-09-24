# React Animation
[5가지 리액트 애니메이션 사용방법 비교](https://medium.com/@minoo/%EB%B2%88%EC%97%AD-5%EA%B0%80%EC%A7%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%9E%A5-%EB%8B%A8%EC%A0%90-%EB%B9%84%EA%B5%90-react-animations-in-depth-884ff6e61b88)) 글에 나와 있는 내용을 정리하고 실습해보는 프로젝트. 그 외에 다른 글을 통해 알게 된 정보들도 같이 정리했고, 아래에 출처에 원 글을 찾아볼 수 있음.

### 5가지 방법
1. React Component State에 기초한 CSS Animation
2. React Component State에 기초한 자바스크립트 스타일 애니메이션
3. React-Mition 라이브러리 by Cheng Lou
4. Animated 라이브러리
5. Velocity-React 라이브러리

***

## React Component State에 기초한 CSS Animation
CSS 파일의 조작을 통해서 애니메이션을 조정하는 방법. **장점**은 이미 CSS를 사용하고 있을 경우, 기존에 알고 있는 내용을 활용할 수 있기 때문에 쉽고 성능적으로도 좋다. 부드러운 transition이 가능하고, 컴포넌트에서 렌더링이 한 번만 발생하기 떄문이다. 

**단점**은 크로스 플랫폼(여러 플랫폼간에 상호적으로 사용 가능한 것)이 아니라는 것. 리액트 네이티브(모바일용 리액트)를 포함해서. CSS, DOM에 의지하는 방법이기 때문에 복잡한 것은 불가능하다. *여기서 말하는 복잡한 것이 어느 정도를 말하는 것일까*

### 예제에 대한 설명

```js
import React, { Component } from 'react';
import './input.css';

export default class Input extends Component {
  state = {
    focused: false
  }

  componentDidMount() {
    this.input.addEventListener('focus', this.focus);
    this.input.addEventListener('blur', this.focus);  
  }

  focus = () => {
    this.setState((state) => ({
      focused: !state.focused
    }))
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <input 
            ref={input => this.input = input}
            className={['input', this.state.focused && 'input-focused'].join(' ')}
          />
        </div>
      </div>
    );
  }
}
```

componentDidMount에 두 개의 listener를 더한다. 

#### this.input을 참조하는 이유 

[*이해 못함*] ref method로 reference를 만들고, class property로 할당하기 위해서이다. DOM에 접근하는 작업을 componentDidMount에서 하는 이유는 ComponentWillMount에서는 DOM에 올라가기 전이기 때문에, 접근이 불가능해서이다. 
>(참고로, Lifecycle API가 실행되는 순서는 constructor > componentWillMount > render > componentDidMount 이다.)

focus method는 state의 focused에 따라서 toggle를 실행할 것이다. render에서 가장 중요한 것은 className을 할당하는 방법이다. (*여기에서 []랑 &&을 이용해서 state에 따라 효율적으로 className을 할당하는 법을 알게 되었다.*)

array의 .join()을 이용해서 string을 얻어 className을 가져올 수 있고, 이 배열을 만들 때 `this.state.focused && 'input-focused'`를 사용해서 focused의 상태에 따라 input-focused를 추가할지, 말지 정할 수 있다.