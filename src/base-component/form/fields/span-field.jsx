import PropTypes from "prop-types";
import { combineClasses } from "../../../utils/utility";

export const SpanField = ({
  text,
  linkText,
  linkHref = "/",
  containerClassName = "",
  linkClassName = "",
  dispatch,
  onClick,
  html,
}) => {
  const linkClasses = combineClasses("text-secondary", linkClassName);

  return dispatch ? (
    <span className={containerClassName}>
      {text}&nbsp;
      <span
        className={linkClasses}
        onClick={() => dispatch(onClick && onClick())}
      >
        {linkText}
      </span>
    </span>
  ) : html ? (
    <span
      className={containerClassName}
      onClick={() => onClick && onClick()}
      dangerouslySetInnerHTML={{ __html: html }}
    ></span>
  ) : (
    <span className={containerClassName} onClick={() => onClick && onClick()}>
      {text}
      {linkText && (
        <a className={linkClasses} href={linkHref}>
          {linkText}
        </a>
      )}
    </span>
  );
};

SpanField.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  linkText: PropTypes.string,
  linkHref: PropTypes.string,
  containerClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  dispatch: PropTypes.func,
  onClick: PropTypes.func,
  html: PropTypes.string,
};
