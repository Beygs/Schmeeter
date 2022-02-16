import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date, { locale: fr });
    timeAgo = `Il y a ${timePeriod}`;
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
