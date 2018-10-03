# React Animation

[5 가지 리액트 애니메이션 사용방법 비교](https://medium.com/@minoo/%EB%B2%88%EC%97%AD-5%EA%B0%80%EC%A7%80-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%9E%A5-%EB%8B%A8%EC%A0%90-%EB%B9%84%EA%B5%90-react-animations-in-depth-884ff6e61b88) 글에 나와 있는 내용을 정리하고 실습해보는 프로젝트. 그 외에 다른 글을 통해 알게 된 정보들도 같이 정리했고, 아래에 출처에 원 글을 찾아볼 수 있음.

### 5 가지 방법

1. React Component State 에 기초한 CSS Animation
2. React Component State 에 기초한 자바스크립트 스타일 애니메이션
3. React-Mition 라이브러리 by Cheng Lou
4. Animated 라이브러리
5. Velocity-React 라이브러리

---

## React Component State 에 기초한 CSS Animation

CSS 파일의 조작을 통해서 애니메이션을 조정하는 방법. **장점**은 이미 CSS 를 사용하고 있을 경우, 기존에 알고 있는 내용을 활용할 수 있기 때문에 쉽고 성능적으로도 좋다. 부드러운 transition 이 가능하고, 컴포넌트에서 렌더링이 한 번만 발생하기 떄문이다.

**단점**은 크로스 플랫폼(여러 플랫폼간에 상호적으로 사용 가능한 것)이 아니라는 것. 리액트 네이티브(모바일용 리액트)를 포함해서. CSS, DOM 에 의지하는 방법이기 때문에 복잡한 것은 불가능하다. ㅡ*여기서 말하는 복잡한 것이 어느 정도를 말하는 것일까*ㅡ

### 예제에 대한 설명(input.js)

```js
import React, { Component } from "react";
import "./input.css";

export default class Input extends Component {
  state = {
    focused: false
  };

  componentDidMount() {
    this.input.addEventListener("focus", this.focus);
    this.input.addEventListener("blur", this.focus);
  }

  focus = () => {
    this.setState(state => ({
      focused: !state.focused
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <input
            ref={input => (this.input = input)}
            className={["input", this.state.focused && "input-focused"].join(
              " "
            )}
          />
        </div>
      </div>
    );
  }
}
```

componentDidMount 에 두 개의 listener 를 더한다.

focus method 는 state 의 focused 에 따라서 toggle 를 실행할 것이다. render 에서 가장 중요한 것은 className 을 할당하는 방법이다. ㅡ*여기에서 []랑 &&을 이용해서 state 에 따라 효율적으로 className 을 할당하는 법을 알게 되었다.* ㅡ

array 의 .join()을 이용해서 string 을 얻어 className 을 가져올 수 있고, 이 배열을 만들 때 `this.state.focused && 'input-focused'`를 사용해서 focused 의 상태에 따라 input-focused 를 추가할지, 말지 정할 수 있다.

#### this.input 을 참조하는 이유

[*이해 못함*] ref method 로 reference 를 만들고, class property 로 할당하기 위해서이다. DOM 에 접근하는 작업을 componentDidMount 에서 하는 이유는 ComponentWillMount 에서는 DOM 에 올라가기 전이기 때문에, 접근이 불가능해서이다.

> (참고로, Lifecycle API 가 실행되는 순서는 constructor > componentWillMount > render > componentDidMount 이다.)

어쨌든, CSS 를 이용한 방법의 핵심은 state 에 따라서 className 을 다르게 하여 적용되는 CSS 가 바뀌도록 하는 것이다.

## React Component State 에 기초한 Javascript Style Animation

자바스크립트를 이용한 방식은 CSS 를 이용하는 방식과 매우 유사하다. JSX 문법으로 작성하는 태그에 style 속성을 자바스크립트 객체로 주는 것이다.

**장점**은 CSS 처럼 퍼포먼스적인 이득이 있고, CSS 에 의존하지 않는 방법이라는 점. **단점**도 유사한데, 크로스 플랫폼을 지원하지 않고 CSS, DOM 에 의존하기 때문에 복잡한 효과(_무엇?_)를 컨트롤하기 어렵다는 것.

### 참고할만한 글

- [Javascript DOM CSS - W3Schools](https://www.w3schools.com/js/js_htmldom_css.asp)
- [Styling and CSS - React ](https://reactjs.org/docs/faq-styling.html)

### 예제에 대한 설명(submit.js)

```js
import React, { Component } from "react";

export default class Submit extends Component {
  state = {
    disabled: true
  };

  onChange = e => {
    const length = e.target.value.length;
    if (length >= 4) {
      this.setState({ disabled: false });
    } else if (!this.state.disabled) {
      this.setState({ disabled: true });
    }
  };

  render() {
    const label = this.state.disabled ? "Disabled" : "Submit";
    const { disabled } = this.state;
    return (
      <div className="App">
        <button
          style={Object.assign(
            {},
            styles.button,
            !disabled && styles.buttonEnabled
          )}
          disabled={disabled}
        >
          {label}
        </button>
        <input style={styles.input} onChange={this.onChange} />
      </div>
    );
  }
}

const styles = {
  input: {
    width: 200,
    height: 30,
    outline: "none",
    fontSize: 20,
    padding: 10,
    border: "none",
    backgroundColor: "#ebeceb",
    marginLeft: 10,
    borderRadius: 4
  },
  button: {
    width: 100,
    height: 50,
    border: "none",
    borderRadius: 4,
    fontSize: 20,
    cursor: "pointer",
    transition: ".25s all"
  },
  buttonEnabled: {
    backgroundColor: "#ffc107",
    width: 100
  }
};
```

CSS 방식에서는 클래스 이름으로 스타일을 지정해주었다면, 자바스크립트 style 방식에서는 컴포넌트의 style 속성에 자바스크립트 객체로 정의한 스타일을 넘겨주어서 적용한다.

여기에서 새롭게 알게 된 방식은 Object.assign()을 이용해서 state 에 따라서 다른 style 을 적용해주는 방법과 render 함수에서 변수명을 state 에 따라 다르게 정해서 버튼의 내용을 바꿔주는 방법.

> 나는 상황에 따라 다른 버튼을 사용할 때, 상태에 따라 다른 버튼이 렌더링 되게 했었음. 만약 3 가지 상태가 있으면 버튼 3 개를 만드는 식. 수정/삭제처럼 두 가지 상태밖에 없는 경우에는 위 방식처럼 하는 것이 효율적일 것 같다.

## React-Motion 라이브러리

React-Motion: Cheong Lou 가 만든 라이브러리. 기본적인 아이디어는 "Spring"이라는 API 로 참조되는 것을 사용하는 것이다. 대부분의 경우에 잘 적용되고 커스터마이징이 가능하다는 장점이 있다.

이 라이브러리는 타이밍에 의존하지 않기 때문에 애니메이션을 취소하거나 정지하거나 되돌리거나 variable dimension 으로 작동할 때 유리하다.

적용하는 방법은 React Motion 에서 제공하는 컴포넌트에 style 을 설정하는 것이다. Call back function 으로 style value 를 받을 수 있다.

    <Motion style={{ x: spring(this.state.x) }}>
    {
      ({x}) =>
        <div style={{ transform: `translateX(${x}px)` }}/>
    }
    </Motion>

**장점**은 위 두 가지 방식과 다르게 크로스 플랫폼을 지원한다는 것ㅡ _플랫폼에 따라 라이브러리가 처리해주나보다._ ㅡ이고, React Native 에서도 사용이 가능하다. 내가 생각한 **단점**은 일단 저 spring(?)에 대해서 이해를 해야한다는 것. _뭔 외계어인가 싶다._ 순수 CSS 와 자바스크립트에 비해서는 (한 단계 거치는 것이기 때문에(?)) 퍼포먼스가 조금 떨어진다고 한다.

실습으로 익혀보도록 한다. 일단 라이브러리 먼저 설치한다.

    npm install --save react-motion

import 할 것은 Motion 컴포넌트와 spring ㅡ _얘는 함수인가?_ ㅡ이다.

### 예제에 대한 설명(motion.js)

```js
import React, { Component } from "react";
import { Motion, spring } from "react-motion";

export default class MyMotion extends Component {
  state = {
    height: 38
  };

  animate = () => {
    this.setState(state => ({ height: state.height === 233 ? 38 : 233 }));
  };

  render() {
    return (
      <div className="App">
        <div style={styles.button} onClick={this.animate}>
          Animate
        </div>
        <Motion style={{ height: spring(this.state.height) }}>
          {({ height }) => (
            <div style={Object.assign({}, styles.menu, { height })}>
              <p style={styles.selection}>Selection 1</p>
              <p style={styles.selection}>Selection 2</p>
              <p style={styles.selection}>Selection 3</p>
              <p style={styles.selection}>Selection 4</p>
              <p style={styles.selection}>Selection 5</p>
              <p style={styles.selection}>Selection 6</p>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

const styles = {
  menu: {
    overflow: "hidden",
    border: "2px solid #ddd",
    width: 300,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto"
  },
  selection: {
    padding: 10,
    margin: 0,
    borderBottom: "1px solid #ededed",
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    width: 200,
    height: 45,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#ffc107",
    marginLeft: "auto",
    marginRight: "auto"
  }
};
```

`<Motion>`에서 함수를 호출해서 넘겨줄 때는 객체로 전달해줘야 한다. 안그러면 작동을 안했다.

더 자세한 사용법이나 예제에 대해서는 [여기](https://github.com/chenglou/react-motion)를 참고하면 될 것 같다.

## Animated Library

리액트 네이티브에서 사용하는 것과 같은 Animated 라이브러리를 사용한다. 기본적인 아이디어는 개발자가 선언적으로 애니메이션을 만들고, 일어나는 효과들을 객체로 컨트롤 할 수 있다는 것. **장점**은 크로스 플랫폼을 지원하고, 리액트 네이티브에서 매우 안정적으로 사용되고 있다는 점. interpolate method 를 통해 하나의 값을 여러 개의 스타일에 interpolate 할 수 있다(이해 못했음). Easing 프로퍼티를 여러 군데 쉽게 삽입해서 사용할 수 있다(얘도 이해 못했음).

**단점**은 웹 버전에서 100% 안정적이지 않다는 점. (옛날 브라우저, auto-prefixing, 퍼포먼스 이슈가 있음) 리액트 네이티브에서 사용해보지 않았다면 API 를 새로 배워야 한다는 점.

### 예제에 대한 설명(animated.js)

_잘 이해가 안됨_

```js
import React, { Component } from "react";
import Animated from "animated/lib/targets/react-dom";
import Easing from "animated/lib/Easing";

export default class MyAnimated extends Component {
  animatedValue = new Animated.Value(0);

  animate = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1)
    }).start();
  };

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0]
    });
    return (
      <div className="App">
        <div style={styles.button} onClick={this.animate}>
          Animate
        </div>
        <Animated.div
          style={Object.assign({}, styles.box, {
            opacity: this.animatedValue,
            marginLeft
          })}
        >
          <p>Thanks for your submission!</p>
        </Animated.div>
      </div>
    );
  }
}

const styles = {
  button: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    width: 200,
    height: 45,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#ffc107",
    marginLeft: "auto",
    marginRight: "auto"
  },
  box: {
    border: "1px solid #ddd",
    marginTop: 10,
    width: 400,
    height: 45,
    padding: 10
  }
};
```

Animated 라이브러리에서 Animated 와 Easing 을 import 한다. new Animated.Value(0)을 통해 새 클래스를 생성하고, 기본 값을 0 으로 지정한다. `animate` method 를 통해서 애니메이션을 조작한다. `Animated.timing`을 호출해서 `this.animatedValue`의 첫 번째 argument 를, configuration object 를 두 번째 argument 로 넘겨준다.

configuration object 에는 애니메이션의 마지막 value 인 toValue, duration(애니메이션 재생시간), easing property(적용하고자 하는)를 가진다. `interpolate`를 이용해서 marginLeft 라는 새로운 값을 만들고, 애니메이션에 가져다 쓴다.(어떤 애니메이션에나 자유롭게 가져다 쓸 수 있는 값이다.) `interpolate`는 input range, output range 를 가지는 configuration object 를 취한다. input, output 을 기초로 새로운 값을 만들 수 있다.

## Velocity React Library

현재 존재하는 Velocity(Velocity.js, 애니메이션 엔진, jQuery 의 $.animate()와 같은 역할) DOM 라이브러리를 기반으로 한다. **장점**은 사용하기 매우 쉽고, API 가 심플하고 직관적이다. React Motion 에 비해 적용하기 쉽다. **단점**은 크로스 플랫폼을 지원하지 않는 것.

### 기본적인 API 사용 방법

    <VelocityComponent
      animation={{ opacity: this.state.showSubComponent ? 1 : 0 }}
      duration={500}
    >
      <MySubComponent />
    </VelocityComponent>
