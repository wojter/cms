import React from "react";
import moment from "moment";

const Moment = ({ date, format }) => {
  return (
    <span className="w-min whitespace-nowrap">
      {moment(date).format(format)}
    </span>
  );
};

export default Moment;
