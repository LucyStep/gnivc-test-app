import "./Button.css";
import classNames from "classnames";

function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={classNames('button', {
        'button_result': props.result,
      })}>
      {props.children}
    </button>
  )
}

export default Button;
